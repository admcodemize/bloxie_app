/**
 * Scheduled Functions (Cron Jobs)
 * 
 * Automatische Hintergrund-Tasks
 */

import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Bereinige alte Rate Limit Einträge alle 6 Stunden
crons.interval(
  "cleanup-rate-limits",
  { hours: 6 },
  internal.maintenance.cleanupOldRateLimits
);

// Bereinige alte stornierte Bookings alle 24 Stunden
crons.interval(
  "cleanup-old-bookings",
  { hours: 24 },
  internal.maintenance.cleanupOldBookings
);

// Markiere vergangene Slots als nicht verfügbar
crons.interval(
  "update-past-slots",
  { hours: 1 },
  internal.maintenance.updatePastSlots
);

export default crons;

