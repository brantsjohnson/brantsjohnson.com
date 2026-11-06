// ============================================
// WHAT THIS FILE DOES (plain English):
// A search file for the photographs. It is not a page people browse.
// Each picture is listed with Brant's names, Vernal, Utah, and the
// school or job that photo belongs to, so a search can pull the
// right image instead of a different person with the same name.
// ============================================

import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { photoRecord } from "@/content/photo-catalog";
import { identity } from "@/content/site-content";

export const dynamic = "force-static";

function filesUnder(dir: string, found: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) filesUnder(path, found);
    else if (/\.(webp|jpe?g|png)$/i.test(name)) found.push(path);
  }
  return found;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  const root = join(process.cwd(), "public");
  const images = filesUnder(root)
    .map((file) => photoRecord(file.slice(root.length)))
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const body = images
    .map(
      (photo) => `    <image:image>
      <image:loc>${identity.siteUrl}${escapeXml(photo.src)}</image:loc>
      <image:title>${escapeXml(photo.title)}</image:title>
      <image:caption>${escapeXml(photo.caption)}</image:caption>
      <image:geo_location>${escapeXml(photo.place)}</image:geo_location>
    </image:image>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${identity.siteUrl}/about</loc>
${body}
  </url>
</urlset>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
