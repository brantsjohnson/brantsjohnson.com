// ============================================
// WHAT THIS FILE DOES (plain English):
// One place that decides whether search engines and AI crawlers may
// index the site. Until the domain moves off Wix, SITE_INDEXABLE is
// not "true" and every page says no. After the move, it is "true" and
// pages say yes. Pages that set their own robots rules (posts, the
// archive) use this so they never open themselves up early.
// ============================================

import type { Metadata } from "next";

export function indexable(): boolean {
  return process.env.SITE_INDEXABLE === "true";
}

export function indexingRobots(): NonNullable<Metadata["robots"]> {
  return indexable() ? { index: true, follow: true } : { index: false, follow: false };
}
