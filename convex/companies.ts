/**
 * Companies - Queries und Mutations
 * 
 * Verwaltung von Firmen und deren öffentlichen Booking-Seiten
 */

import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { checkRateLimit, recordRateLimit } from "./rateLimit";

// ==========================================
// PUBLIC QUERIES (für Web-App)
// ==========================================

/**
 * Holt alle öffentlichen Companies für Static Generation
 */
export const getPublicCompanies = query({
  args: {},
  handler: async (ctx) => {
    const companies = await ctx.db
      .query("companies")
      .withIndex("by_public", (q) => q.eq("isPublic", true))
      .collect();

    return companies.map((company) => ({
      _id: company._id,
      name: company.name,
      slug: company.slug,
      description: company.description,
      logo: company.logo,
      timezone: company.timezone,
    }));
  },
});

/**
 * Holt Company nach Slug (für Booking-Seiten)
 * Mit Rate Limiting
 */
export const getBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, { slug }) => {
    // Rate Limiting
    // Note: In Queries können wir nicht recordRateLimit aufrufen (nur reads erlaubt)
    // Daher nur in Mutations implementiert
    
    const company = await ctx.db
      .query("companies")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .filter((q) => q.eq(q.field("isPublic"), true))
      .first();

    if (!company) {
      return null;
    }

    // Nur öffentliche Daten zurückgeben
    return {
      _id: company._id,
      name: company.name,
      slug: company.slug,
      description: company.description,
      logo: company.logo,
      timezone: company.timezone,
      bookingSettings: company.bookingSettings,
    };
  },
});

// ==========================================
// PRIVATE MUTATIONS (für Mobile App)
// ==========================================

/**
 * Erstellt eine neue Company
 * Nur für authentifizierte User
 */
export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    logo: v.optional(v.string()),
    ownerId: v.string(),
    timezone: v.string(),
    isPublic: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // TODO: Check authentication
    // const user = await getCurrentUser(ctx);
    // if (!user) throw new Error("Unauthorized");

    // Prüfe ob Slug bereits existiert
    const existing = await ctx.db
      .query("companies")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (existing) {
      throw new Error("Slug already exists");
    }

    // Erstelle Company
    const companyId = await ctx.db.insert("companies", {
      name: args.name,
      slug: args.slug,
      description: args.description,
      logo: args.logo,
      ownerId: args.ownerId,
      timezone: args.timezone,
      isPublic: args.isPublic ?? false,
      bookingSettings: {
        minAdvanceBooking: 60, // 1 Stunde
        maxAdvanceBooking: 30 * 24 * 60, // 30 Tage
        slotDuration: 60, // 60 Minuten
        bufferTime: 15, // 15 Minuten
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return companyId;
  },
});

/**
 * Aktualisiert eine Company
 */
export const update = mutation({
  args: {
    companyId: v.id("companies"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    logo: v.optional(v.string()),
    isPublic: v.optional(v.boolean()),
    timezone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // TODO: Check authentication & authorization
    
    const { companyId, ...updates } = args;

    await ctx.db.patch(companyId, {
      ...updates,
      updatedAt: Date.now(),
    });

    return companyId;
  },
});

/**
 * Löscht eine Company
 */
export const remove = mutation({
  args: {
    companyId: v.id("companies"),
  },
  handler: async (ctx, { companyId }) => {
    // TODO: Check authentication & authorization
    
    // Lösche zugehörige Availability Slots
    const slots = await ctx.db
      .query("availability")
      .withIndex("by_company", (q) => q.eq("companyId", companyId))
      .collect();

    for (const slot of slots) {
      await ctx.db.delete(slot._id);
    }

    // Lösche Company
    await ctx.db.delete(companyId);

    return { success: true };
  },
});

