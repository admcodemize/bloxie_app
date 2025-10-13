/**
 * Rate Limiting Helpers für Convex
 * 
 * Schützt öffentliche Endpoints vor Missbrauch und Spam
 */

import { MutationCtx, QueryCtx } from "./_generated/server";

// Rate Limit Konfiguration
export const RATE_LIMITS = {
  // Booking Creation: Max 3 Versuche in 5 Minuten pro Email
  BOOKING_CREATE: {
    maxAttempts: 3,
    windowMs: 5 * 60 * 1000, // 5 Minuten
  },
  
  // Slot Queries: Max 30 Anfragen in 1 Minute pro IP
  SLOT_QUERY: {
    maxAttempts: 30,
    windowMs: 1 * 60 * 1000, // 1 Minute
  },
  
  // Company Queries: Max 100 Anfragen in 1 Minute pro IP
  COMPANY_QUERY: {
    maxAttempts: 100,
    windowMs: 1 * 60 * 1000, // 1 Minute
  },
} as const;

/**
 * Prüft ob ein Rate Limit erreicht wurde
 * 
 * @param ctx - Query oder Mutation Context
 * @param identifier - Eindeutiger Identifier (z.B. IP, Email)
 * @param type - Type des Rate Limits
 * @returns true wenn Limit erreicht, false wenn OK
 */
export async function checkRateLimit(
  ctx: QueryCtx | MutationCtx,
  identifier: string,
  type: "booking_create" | "slot_query" | "company_query"
): Promise<{ limited: boolean; remaining: number; resetAt: number }> {
  const config = RATE_LIMITS[type.toUpperCase() as keyof typeof RATE_LIMITS];
  const now = Date.now();
  const windowStart = now - config.windowMs;

  // Zähle Requests im aktuellen Zeitfenster
  const recentRequests = await ctx.db
    .query("rateLimits")
    .withIndex("by_identifier_and_type", (q) =>
      q
        .eq("identifier", identifier)
        .eq("type", type)
        .gte("timestamp", windowStart)
    )
    .collect();

  const requestCount = recentRequests.length;
  const remaining = Math.max(0, config.maxAttempts - requestCount);
  
  // Finde ältesten Request für Reset-Zeit
  const oldestRequest = recentRequests[0];
  const resetAt = oldestRequest 
    ? oldestRequest.timestamp + config.windowMs 
    : now + config.windowMs;

  return {
    limited: requestCount >= config.maxAttempts,
    remaining,
    resetAt,
  };
}

/**
 * Speichert einen Rate Limit Eintrag
 * 
 * @param ctx - Mutation Context
 * @param identifier - Eindeutiger Identifier
 * @param type - Type des Rate Limits
 * @param companyId - Optional: Company ID
 */
export async function recordRateLimit(
  ctx: MutationCtx,
  identifier: string,
  type: "booking_create" | "slot_query" | "company_query",
  companyId?: string
): Promise<void> {
  await ctx.db.insert("rateLimits", {
    identifier,
    type,
    timestamp: Date.now(),
    ...(companyId && { companyId: companyId as any }),
  });
}

/**
 * Bereinigt alte Rate Limit Einträge
 * Sollte periodisch ausgeführt werden (z.B. via Scheduled Function)
 * 
 * @param ctx - Mutation Context
 * @param olderThanMs - Lösche Einträge älter als X Millisekunden
 */
export async function cleanupRateLimits(
  ctx: MutationCtx,
  olderThanMs: number = 24 * 60 * 60 * 1000 // 24 Stunden
): Promise<number> {
  const cutoff = Date.now() - olderThanMs;
  
  const oldEntries = await ctx.db
    .query("rateLimits")
    .withIndex("by_timestamp", (q) => q.lt("timestamp", cutoff))
    .collect();

  for (const entry of oldEntries) {
    await ctx.db.delete(entry._id);
  }

  return oldEntries.length;
}

/**
 * Helper: Extrahiert Identifier aus Request (IP oder Fallback)
 * 
 * Für Next.js/Vercel Edge Functions
 */
export function getIdentifier(request?: Request): string {
  if (!request) return "unknown";

  // Versuche IP aus verschiedenen Headers zu extrahieren
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") || // Cloudflare
    "unknown";

  return ip;
}

/**
 * Rate Limit Error Response
 */
export class RateLimitError extends Error {
  constructor(
    message: string,
    public resetAt: number,
    public remaining: number
  ) {
    super(message);
    this.name = "RateLimitError";
  }
}

