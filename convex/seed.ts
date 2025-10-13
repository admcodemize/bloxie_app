/**
 * Seed Data - Demo-Daten für Entwicklung
 * 
 * Führen Sie diese Mutation manuell im Convex Dashboard aus,
 * um Demo-Daten zu erstellen.
 */

import { mutation } from "./_generated/server";

export const seedDemoData = mutation({
  args: {},
  handler: async (ctx) => {
    console.log("🌱 Seeding demo data...");

    // ==========================================
    // 1. DEMO COMPANY
    // ==========================================
    const companyId = await ctx.db.insert("companies", {
      name: "Codemize GmbH",
      slug: "codemize",
      description: "Software-Entwicklung und Beratung",
      logo: "https://placehold.co/200x200/667eea/white?text=CM",
      ownerId: "demo-owner-id",
      isPublic: true,
      timezone: "Europe/Zurich",
      bookingSettings: {
        minAdvanceBooking: 60, // 1 Stunde
        maxAdvanceBooking: 30 * 24 * 60, // 30 Tage
        slotDuration: 60, // 60 Minuten
        bufferTime: 15, // 15 Minuten
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    console.log(`✅ Created company: ${companyId}`);

    // ==========================================
    // 2. DEMO AVAILABILITY SLOTS
    // ==========================================
    const slots = [];
    
    // Erstelle Slots für die nächsten 14 Tage
    for (let day = 0; day < 14; day++) {
      const date = new Date();
      date.setDate(date.getDate() + day);
      const dateStr = date.toISOString().split("T")[0];

      // Überspringe Wochenenden
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) continue;

      // Erstelle Slots von 9:00 - 17:00 (stündlich)
      for (let hour = 9; hour < 17; hour++) {
        const startTime = `${hour.toString().padStart(2, "0")}:00`;
        const endTime = `${(hour + 1).toString().padStart(2, "0")}:00`;

        const slotId = await ctx.db.insert("availability", {
          companyId,
          date: dateStr,
          startTime,
          endTime,
          duration: 60,
          isAvailable: true,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });

        slots.push(slotId);
      }
    }

    console.log(`✅ Created ${slots.length} availability slots`);

    // ==========================================
    // 3. DEMO BOOKING (Optional)
    // ==========================================
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    // Buche den 10:00 Slot
    const tomorrowSlots = await ctx.db
      .query("availability")
      .withIndex("by_company_and_date", (q) =>
        q.eq("companyId", companyId).eq("date", tomorrowStr)
      )
      .filter((q) => q.eq(q.field("startTime"), "10:00"))
      .first();

    if (tomorrowSlots) {
      const bookingId = await ctx.db.insert("bookings", {
        companyId,
        slotId: tomorrowSlots._id,
        customerName: "Max Mustermann",
        customerEmail: "max.mustermann@example.com",
        customerPhone: "+41 79 123 45 67",
        notes: "Demo Buchung",
        date: tomorrowStr,
        startTime: "10:00",
        endTime: "11:00",
        status: "confirmed",
        confirmationToken: "demo-token-123",
        confirmedAt: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      // Slot als gebucht markieren
      await ctx.db.patch(tomorrowSlots._id, {
        isAvailable: false,
        updatedAt: Date.now(),
      });

      console.log(`✅ Created demo booking: ${bookingId}`);
    }

    // ==========================================
    // 4. WEITERE DEMO COMPANIES
    // ==========================================
    const additionalCompanies = [
      {
        name: "Design Studio Pro",
        slug: "designstudio",
        description: "Kreative Design-Lösungen",
        logo: "https://placehold.co/200x200/764ba2/white?text=DS",
      },
      {
        name: "Consulting Partners",
        slug: "consulting",
        description: "Business Consulting",
        logo: "https://placehold.co/200x200/f093fb/white?text=CP",
      },
    ];

    for (const company of additionalCompanies) {
      const id = await ctx.db.insert("companies", {
        ...company,
        ownerId: "demo-owner-id",
        isPublic: true,
        timezone: "Europe/Zurich",
        bookingSettings: {
          minAdvanceBooking: 60,
          maxAdvanceBooking: 30 * 24 * 60,
          slotDuration: 30,
          bufferTime: 10,
        },
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      console.log(`✅ Created company: ${company.name} (${id})`);

      // Erstelle ein paar Slots
      const today = new Date();
      for (let day = 0; day < 7; day++) {
        const date = new Date(today);
        date.setDate(date.getDate() + day);
        const dateStr = date.toISOString().split("T")[0];

        for (let hour = 9; hour < 17; hour += 2) {
          await ctx.db.insert("availability", {
            companyId: id,
            date: dateStr,
            startTime: `${hour.toString().padStart(2, "0")}:00`,
            endTime: `${(hour + 2).toString().padStart(2, "0")}:00`,
            duration: 120,
            isAvailable: true,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          });
        }
      }
    }

    console.log("🎉 Seeding completed!");

    return {
      success: true,
      companies: 3,
      slots: slots.length,
      message: "Demo data created successfully",
    };
  },
});

/**
 * Löscht alle Demo-Daten
 * VORSICHT: Löscht ALLE Daten in der Datenbank!
 */
export const clearAllData = mutation({
  args: {},
  handler: async (ctx) => {
    console.log("🗑️ Clearing all data...");

    // Lösche alle Bookings
    const bookings = await ctx.db.query("bookings").collect();
    for (const booking of bookings) {
      await ctx.db.delete(booking._id);
    }

    // Lösche alle Availability Slots
    const slots = await ctx.db.query("availability").collect();
    for (const slot of slots) {
      await ctx.db.delete(slot._id);
    }

    // Lösche alle Companies
    const companies = await ctx.db.query("companies").collect();
    for (const company of companies) {
      await ctx.db.delete(company._id);
    }

    // Lösche alle Rate Limits
    const rateLimits = await ctx.db.query("rateLimits").collect();
    for (const limit of rateLimits) {
      await ctx.db.delete(limit._id);
    }

    console.log("✅ All data cleared");

    return {
      success: true,
      deleted: {
        bookings: bookings.length,
        slots: slots.length,
        companies: companies.length,
        rateLimits: rateLimits.length,
      },
    };
  },
});

