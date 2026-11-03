// ============================================
// WHAT THIS FILE DOES (plain English):
// The web address the site is running at, for building full links in
// files meant for machines (sitemap, llms.txt, feeds). On a preview it
// is the preview address; otherwise it is the public domain.
// ============================================

import { identity } from "@/content/site-content";

export function siteOrigin(): string {
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return (configured || identity.siteUrl).replace(/\/$/, "");
}
