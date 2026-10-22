// ============================================
// WHAT THIS FILE DOES (plain English):
// This tells search engines to skip the site until the domain moves
// off Wix. The preview should not compete with the live site.
// Flip this when Brant approves the DNS cutover.
// ============================================

import type { MetadataRoute } from "next";
import { identity } from "@/content/site-content";

// TODO(brant): set SITE_INDEXABLE=true at DNS cutover so this preview
// does not stay hidden after it replaces the Wix site.

export default function robots(): MetadataRoute.Robots {
  if (process.env.SITE_INDEXABLE === "true") {
    return {
      rules: { userAgent: "*", allow: "/" },
      sitemap: `${identity.siteUrl}/sitemap.xml`,
      host: identity.siteUrl,
    };
  }

  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
