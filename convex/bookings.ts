/**
 * Bookings - Queries und Mutations
 * 
 * Verwaltung von Terminen und Buchungen mit Rate Limiting
 */

import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { checkRateLimit, recordRateLimit, RateLimitError } from "./rateLimit";

// ==========================================
// PUBLIC QUERIES (für Web-App)
// ==========================================

/**
 * Holt verfügbare Zeitslots für eine Company
 * Öffentlich zugänglich für Booking-Seiten
 */
export const getAvailableSlots = query({
  args: {
    companySlug: v.string(),
    startDate: v.string(), // "YYYY-MM-DD"
    endDate: v.string(), // "YYYY-MM-DD"
  },
  handler: async (ctx, { companySlug, startDate, endDate }) => {
    // 1. Finde Company
    const company = await ctx.db
      .query("companies")
      .withIndex("by_slug", (q) => q.eq("slug", companySlug))
      .filter((q) => q.eq(q.field("isPublic"), true))
      .first();

    if (!company) {
      return [];
    }

    // 2. Hole verfügbare Slots im Datumsbereich
    const slots = await ctx.db
      .query("availability")
      .withIndex("by_company_and_date", (q) =>
        q.eq("companyId", company._id).gte("date", startDate).lte("date", endDate)
      )
      .filter((q) => q.eq(q.field("isAvailable"), true))
      .collect();

    // 3. Sortiere nach Datum und Zeit
    const sortedSlots = slots.sort((a, b) => {
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date);
      }
      return a.startTime.localeCompare(b.startTime);
    });

    // 4. Nur öffentliche Informationen zurückgeben
    return sortedSlots.map((slot) => ({
      id: slot._id,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      duration: slot.duration,
    }));
  },
});

/**
 * Holt ein einzelnes Booking (für Bestätigung)
 */
export const getBooking = query({
  args: {
    bookingId: v.id("bookings"),
    confirmationToken: v.optional(v.string()),
  },
  handler: async (ctx, { bookingId, confirmationToken }) => {
    const booking = await ctx.db.get(bookingId);

    if (!booking) {
      return null;
    }

    // Validiere Token wenn vorhanden
    if (confirmationToken && booking.confirmationToken !== confirmationToken) {
      return null;
    }

    // Hole Company Info
    const company = await ctx.db.get(booking.companyId);

    return {
      _id: booking._id,
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
      status: booking.status,
      notes: booking.notes,
      company: company ? {
        name: company.name,
        logo: company.logo,
      } : null,
    };
  },
});

// ==========================================
// PUBLIC MUTATIONS (für Web-App)
// ==========================================

/**
 * Erstellt eine neue Buchung
 * MIT RATE LIMITING zum Schutz vor Spam
 */
export const create = mutation({
  args: {
    slotId: v.id("availability"),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.optional(v.string()),
    notes: v.optional(v.string()),
    ipAddress: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // ========================================
    // 1. RATE LIMITING
    // ========================================
    const identifier = args.customerEmail;
    const rateLimitCheck = await checkRateLimit(ctx, identifier, "booking_create");

    if (rateLimitCheck.limited) {
      const resetIn = Math.ceil((rateLimitCheck.resetAt - Date.now()) / 1000 / 60);
      throw new RateLimitError(
        `Zu viele Buchungsversuche. Bitte versuchen Sie es in ${resetIn} Minuten erneut.`,
        rateLimitCheck.resetAt,
        rateLimitCheck.remaining
      );
    }

    // ========================================
    // 2. VALIDIERUNG
    // ========================================

    // 2.1 Slot existiert und ist verfügbar?
    const slot = await ctx.db.get(args.slotId);
    if (!slot) {
      throw new Error("Slot nicht gefunden");
    }

    if (!slot.isAvailable) {
      throw new Error("Dieser Zeitslot ist nicht mehr verfügbar");
    }

    // 2.2 Company existiert?
    const company = await ctx.db.get(slot.companyId);
    if (!company || !company.isPublic) {
      throw new Error("Company nicht gefunden");
    }

    // 2.3 Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(args.customerEmail)) {
      throw new Error("Ungültige E-Mail-Adresse");
    }

    // 2.4 Doppelbuchung vermeiden (gleiche Email, gleicher Slot)
    const existingBooking = await ctx.db
      .query("bookings")
      .withIndex("by_slot", (q) => q.eq("slotId", args.slotId))
      .filter((q) => q.eq(q.field("customerEmail"), args.customerEmail))
      .first();

    if (existingBooking) {
      throw new Error("Sie haben diesen Zeitslot bereits gebucht");
    }

    // ========================================
    // 3. BUCHUNG ERSTELLEN (Atomisch)
    // ========================================

    // 3.1 Slot sperren
    await ctx.db.patch(args.slotId, {
      isAvailable: false,
      updatedAt: Date.now(),
    });

    // 3.2 Confirmation Token generieren
    const confirmationToken = Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    // 3.3 Booking erstellen
    const bookingId = await ctx.db.insert("bookings", {
      companyId: company._id,
      slotId: args.slotId,
      customerName: args.customerName,
      customerEmail: args.customerEmail,
      customerPhone: args.customerPhone,
      notes: args.notes,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      status: "pending",
      confirmationToken,
      ipAddress: args.ipAddress,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // 3.4 Rate Limit aufzeichnen
    await recordRateLimit(ctx, identifier, "booking_create", company._id);

    // ========================================
    // 4. RETURN
    // ========================================
    return {
      bookingId,
      confirmationToken,
      company: {
        name: company.name,
        email: "noreply@bloxie.ch", // TODO: Company Email
      },
      booking: {
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
      },
    };
  },
});

/**
 * Storniert eine Buchung
 */
export const cancel = mutation({
  args: {
    bookingId: v.id("bookings"),
    confirmationToken: v.string(),
  },
  handler: async (ctx, { bookingId, confirmationToken }) => {
    // 1. Booking finden und validieren
    const booking = await ctx.db.get(bookingId);
    if (!booking) {
      throw new Error("Buchung nicht gefunden");
    }

    if (booking.confirmationToken !== confirmationToken) {
      throw new Error("Ungültiger Bestätigungscode");
    }

    if (booking.status === "cancelled") {
      throw new Error("Buchung wurde bereits storniert");
    }

    // 2. Slot wieder freigeben
    await ctx.db.patch(booking.slotId, {
      isAvailable: true,
      updatedAt: Date.now(),
    });

    // 3. Booking Status aktualisieren
    await ctx.db.patch(bookingId, {
      status: "cancelled",
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// ==========================================
// PRIVATE QUERIES (für Mobile App)
// ==========================================

/**
 * Holt alle Bookings für eine Company
 * Nur für authentifizierte Owner
 */
export const getByCompany = query({
  args: {
    companyId: v.id("companies"),
    status: v.optional(
      v.union(
        v.literal("pending"),
        v.literal("confirmed"),
        v.literal("cancelled"),
        v.literal("completed"),
        v.literal("no_show")
      )
    ),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
  },
  handler: async (ctx, { companyId, status, startDate, endDate }) => {
    // TODO: Check authentication & authorization
    
    let query = ctx.db
      .query("bookings")
      .withIndex("by_company", (q) => q.eq("companyId", companyId));

    // Filter nach Status
    if (status) {
      query = query.filter((q) => q.eq(q.field("status"), status));
    }

    // Filter nach Datum
    if (startDate) {
      query = query.filter((q) => q.gte(q.field("date"), startDate));
    }
    if (endDate) {
      query = query.filter((q) => q.lte(q.field("date"), endDate));
    }

    const bookings = await query.collect();

    // Sortiere nach Datum
    return bookings.sort((a, b) => {
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date);
      }
      return a.startTime.localeCompare(b.startTime);
    });
  },
});

/**
 * Aktualisiert Booking Status
 */
export const updateStatus = mutation({
  args: {
    bookingId: v.id("bookings"),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("cancelled"),
      v.literal("completed"),
      v.literal("no_show")
    ),
  },
  handler: async (ctx, { bookingId, status }) => {
    // TODO: Check authentication & authorization

    const booking = await ctx.db.get(bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }

    await ctx.db.patch(bookingId, {
      status,
      ...(status === "confirmed" && { confirmedAt: Date.now() }),
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

