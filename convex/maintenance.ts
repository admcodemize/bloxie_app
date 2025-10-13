/**
 * Maintenance - Interne Functions für Cleanup
 * 
 * Diese Functions werden via Cron Jobs ausgeführt
 */

import { internalMutation } from "./_generated/server";
import { cleanupRateLimits } from "./rateLimit";

/**
 * Bereinigt alte Rate Limit Einträge (älter als 24 Stunden)
 */
export const cleanupOldRateLimits = internalMutation({
  args: {},
  handler: async (ctx) => {
    const deleted = await cleanupRateLimits(ctx, 24 * 60 * 60 * 1000);
    console.log(`Cleaned up ${deleted} old rate limit entries`);
    return { deleted };
  },
});

/**
 * Bereinigt alte stornierte Bookings (älter als 90 Tage)
 */
export const cleanupOldBookings = internalMutation({
  args: {},
  handler: async (ctx) => {
    const cutoff = Date.now() - 90 * 24 * 60 * 60 * 1000; // 90 Tage

    const oldBookings = await ctx.db
      .query("bookings")
      .withIndex("by_status", (q) => q.eq("status", "cancelled"))
      .filter((q) => q.lt(q.field("createdAt"), cutoff))
      .collect();

    for (const booking of oldBookings) {
      await ctx.db.delete(booking._id);
    }

    console.log(`Cleaned up ${oldBookings.length} old cancelled bookings`);
    return { deleted: oldBookings.length };
  },
});

/**
 * Markiert vergangene Slots als nicht verfügbar
 */
export const updatePastSlots = internalMutation({
  args: {},
  handler: async (ctx) => {
    const today = new Date().toISOString().split("T")[0];

    const pastSlots = await ctx.db
      .query("availability")
      .withIndex("by_date_and_availability", (q) =>
        q.eq("isAvailable", true).lt("date", today)
      )
      .collect();

    for (const slot of pastSlots) {
      await ctx.db.patch(slot._id, {
        isAvailable: false,
        updatedAt: Date.now(),
      });
    }

    console.log(`Updated ${pastSlots.length} past slots`);
    return { updated: pastSlots.length };
  },
});

