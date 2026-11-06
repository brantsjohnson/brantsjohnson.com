// ============================================
// WHAT THIS FILE DOES (plain English):
// This lists the public pages for search engines. Each address
// appears once. A date is included only when the page has a real
// date, so a new build does not look like every page just changed.
// ============================================

import type { MetadataRoute } from "next";
import { identity } from "@/content/site-content";
import { availablePosts } from "@/lib/posts/load";
import { pageEntries } from "@/lib/site/sitemap-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return pageEntries(availablePosts()).map((entry) => ({
    url: `${identity.siteUrl}${entry.path === "/" ? "/" : entry.path}`,
    ...(entry.lastModified ? { lastModified: new Date(`${entry.lastModified}T12:00:00Z`) } : {}),
  }));
}
