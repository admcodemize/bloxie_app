/**
 * Availability - Queries und Mutations
 * 
 * Verwaltung von verfügbaren Zeitslots
 */

import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// ==========================================
// PRIVATE QUERIES (für Mobile App)
// ==========================================

/**
 * Holt alle Availability Slots für eine Company
 */
export const getByCompany = query({
  args: {
    companyId: v.id("companies"),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
    isAvailable: v.optional(v.boolean()),
  },
  handler: async (ctx, { companyId, startDate, endDate, isAvailable }) => {
    // TODO: Check authentication & authorization

    let query = ctx.db
      .query("availability")
      .withIndex("by_company", (q) => q.eq("companyId", companyId));

    // Filter nach Datum
    if (startDate) {
      query = query.filter((q) => q.gte(q.field("date"), startDate));
    }
    if (endDate) {
      query = query.filter((q) => q.lte(q.field("date"), endDate));
    }

    // Filter nach Verfügbarkeit
    if (isAvailable !== undefined) {
      query = query.filter((q) => q.eq(q.field("isAvailable"), isAvailable));
    }

    const slots = await query.collect();

    // Sortiere nach Datum und Zeit
    return slots.sort((a, b) => {
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date);
      }
      return a.startTime.localeCompare(b.startTime);
    });
  },
});

// ==========================================
// PRIVATE MUTATIONS (für Mobile App)
// ==========================================

/**
 * Erstellt einen neuen Availability Slot
 */
export const create = mutation({
  args: {
    companyId: v.id("companies"),
    date: v.string(),
    startTime: v.string(),
    endTime: v.string(),
    duration: v.number(),
    isAvailable: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // TODO: Check authentication & authorization

    // Validierung: Slot überschneidet sich nicht mit existierenden
    const existingSlots = await ctx.db
      .query("availability")
      .withIndex("by_company_and_date", (q) =>
        q.eq("companyId", args.companyId).eq("date", args.date)
      )
      .collect();

    for (const slot of existingSlots) {
      if (
        (args.startTime >= slot.startTime && args.startTime < slot.endTime) ||
        (args.endTime > slot.startTime && args.endTime <= slot.endTime) ||
        (args.startTime <= slot.startTime && args.endTime >= slot.endTime)
      ) {
        throw new Error("Slot überschneidet sich mit existierendem Slot");
      }
    }

    const slotId = await ctx.db.insert("availability", {
      companyId: args.companyId,
      date: args.date,
      startTime: args.startTime,
      endTime: args.endTime,
      duration: args.duration,
      isAvailable: args.isAvailable ?? true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return slotId;
  },
});

/**
 * Erstellt mehrere Slots für einen Zeitraum
 * Nützlich für wiederkehrende Verfügbarkeiten
 */
export const createBulk = mutation({
  args: {
    companyId: v.id("companies"),
    startDate: v.string(),
    endDate: v.string(),
    timeSlots: v.array(
      v.object({
        startTime: v.string(),
        endTime: v.string(),
        duration: v.number(),
      })
    ),
    daysOfWeek: v.optional(v.array(v.number())), // 0-6 (Sonntag-Samstag)
  },
  handler: async (ctx, { companyId, startDate, endDate, timeSlots, daysOfWeek }) => {
    // TODO: Check authentication & authorization

    const created: string[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Iteriere durch alle Tage
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay();
      const dateStr = d.toISOString().split("T")[0];

      // Überspringe Tage, die nicht in daysOfWeek sind
      if (daysOfWeek && !daysOfWeek.includes(dayOfWeek)) {
        continue;
      }

      // Erstelle Slots für diesen Tag
      for (const slot of timeSlots) {
        try {
          const slotId = await ctx.db.insert("availability", {
            companyId,
            date: dateStr,
            startTime: slot.startTime,
            endTime: slot.endTime,
            duration: slot.duration,
            isAvailable: true,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          });
          created.push(slotId);
        } catch (error) {
          // Überspringe bei Fehler (z.B. Überschneidung)
          console.error(`Failed to create slot: ${error}`);
        }
      }
    }

    return { created: created.length, slotIds: created };
  },
});

/**
 * Aktualisiert einen Availability Slot
 */
export const update = mutation({
  args: {
    slotId: v.id("availability"),
    isAvailable: v.optional(v.boolean()),
    startTime: v.optional(v.string()),
    endTime: v.optional(v.string()),
    duration: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // TODO: Check authentication & authorization

    const { slotId, ...updates } = args;

    await ctx.db.patch(slotId, {
      ...updates,
      updatedAt: Date.now(),
    });

    return slotId;
  },
});

/**
 * Löscht einen Availability Slot
 */
export const remove = mutation({
  args: {
    slotId: v.id("availability"),
  },
  handler: async (ctx, { slotId }) => {
    // TODO: Check authentication & authorization

    // Prüfe ob Slot bereits gebucht ist
    const booking = await ctx.db
      .query("bookings")
      .withIndex("by_slot", (q) => q.eq("slotId", slotId))
      .first();

    if (booking && booking.status !== "cancelled") {
      throw new Error("Slot kann nicht gelöscht werden - bereits gebucht");
    }

    await ctx.db.delete(slotId);
    return { success: true };
  },
});

