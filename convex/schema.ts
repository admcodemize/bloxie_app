import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Convex Schema für Bloxie Booking System
 * 
 * Tabellen:
 * - companies: Firmen mit öffentlichen Booking-Seiten
 * - availability: Verfügbare Zeitslots
 * - bookings: Gebuchte Termine
 * - rateLimits: Rate Limiting für öffentliche Endpoints
 */
export default defineSchema({
  // ==========================================
  // COMPANIES
  // ==========================================
  companies: defineTable({
    // Basis-Infos
    name: v.string(),
    slug: v.string(), // URL-freundlicher Name (z.B. "codemize")
    description: v.optional(v.string()),
    logo: v.optional(v.string()),
    
    // Owner (später mit Better Auth verknüpfen)
    ownerId: v.string(), // User ID vom Auth System
    
    // Settings
    isPublic: v.boolean(), // Sichtbar auf öffentlicher Booking-Seite?
    timezone: v.string(), // z.B. "Europe/Zurich"
    
    // Booking Settings
    bookingSettings: v.optional(v.object({
      minAdvanceBooking: v.number(), // Minuten im Voraus
      maxAdvanceBooking: v.number(), // Maximal X Tage im Voraus
      slotDuration: v.number(), // Standard Slot-Dauer in Minuten
      bufferTime: v.number(), // Puffer zwischen Terminen
    })),
    
    // Metadata
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_owner", ["ownerId"])
    .index("by_public", ["isPublic"]),

  // ==========================================
  // AVAILABILITY - Verfügbare Zeitslots
  // ==========================================
  availability: defineTable({
    companyId: v.id("companies"),
    
    // Datum und Zeit
    date: v.string(), // Format: "YYYY-MM-DD"
    startTime: v.string(), // Format: "HH:MM"
    endTime: v.string(), // Format: "HH:MM"
    duration: v.number(), // Minuten
    
    // Status
    isAvailable: v.boolean(),
    
    // Optional: Wiederkehrende Slots (für zukünftige Implementierung)
    recurrence: v.optional(v.object({
      type: v.union(
        v.literal("daily"),
        v.literal("weekly"),
        v.literal("monthly")
      ),
      endDate: v.string(),
    })),
    
    // Metadata
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_company", ["companyId"])
    .index("by_company_and_date", ["companyId", "date"])
    .index("by_date_and_availability", ["date", "isAvailable"]),

  // ==========================================
  // BOOKINGS - Gebuchte Termine
  // ==========================================
  bookings: defineTable({
    // Verknüpfungen
    companyId: v.id("companies"),
    slotId: v.id("availability"),
    
    // Kundendaten
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.optional(v.string()),
    notes: v.optional(v.string()),
    
    // Termin-Details (denormalisiert für schnellen Zugriff)
    date: v.string(),
    startTime: v.string(),
    endTime: v.string(),
    
    // Status
    status: v.union(
      v.literal("pending"),      // Neu erstellt
      v.literal("confirmed"),    // Bestätigt
      v.literal("cancelled"),    // Storniert
      v.literal("completed"),    // Abgeschlossen
      v.literal("no_show")       // Kunde nicht erschienen
    ),
    
    // Bestätigungen
    confirmationToken: v.optional(v.string()),
    confirmedAt: v.optional(v.number()),
    
    // Metadata
    createdAt: v.number(),
    updatedAt: v.number(),
    
    // IP für Rate Limiting
    ipAddress: v.optional(v.string()),
  })
    .index("by_company", ["companyId"])
    .index("by_slot", ["slotId"])
    .index("by_email", ["customerEmail"])
    .index("by_email_and_time", ["customerEmail", "createdAt"])
    .index("by_status", ["status"])
    .index("by_date", ["date"]),

  // ==========================================
  // RATE LIMITS - Schutz vor Spam
  // ==========================================
  rateLimits: defineTable({
    // Identifier (z.B. IP Address oder Email)
    identifier: v.string(),
    
    // Type der Rate Limit
    type: v.union(
      v.literal("booking_create"),  // Neue Buchung
      v.literal("slot_query"),      // Slot-Abfrage
      v.literal("company_query")    // Company-Abfrage
    ),
    
    // Timestamp
    timestamp: v.number(),
    
    // Optional: Zusätzliche Infos
    companyId: v.optional(v.id("companies")),
  })
    .index("by_identifier_and_type", ["identifier", "type", "timestamp"])
    .index("by_timestamp", ["timestamp"]),

  // ==========================================
  // USERS (Optional - für zukünftige Better Auth Integration)
  // ==========================================
  users: defineTable({
    // Better Auth User ID
    authId: v.string(),
    
    // Profil
    email: v.string(),
    name: v.string(),
    avatar: v.optional(v.string()),
    
    // Rolle
    role: v.union(
      v.literal("admin"),
      v.literal("owner"),
      v.literal("staff")
    ),
    
    // Metadata
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_auth_id", ["authId"])
    .index("by_email", ["email"]),
});

