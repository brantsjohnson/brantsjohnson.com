// ============================================
// WHAT THIS FILE DOES (plain English):
// A search file for the photographs and videos. It is not a page
// people browse. Each picture is listed under the page that shows
// it, with Brant's names and the place that photo belongs to.
// ============================================

import { identity } from "@/content/site-content";
import { imagePages, imageSitemapXml } from "@/lib/site/sitemap-data";

export const dynamic = "force-static";

export function GET() {
  const xml = imageSitemapXml(identity.siteUrl, imagePages());
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
