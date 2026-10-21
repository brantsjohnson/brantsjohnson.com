// ============================================
// WHAT THIS FILE DOES (plain English):
// This tells search engines to skip the site until the domain moves
// off Wix. The preview should not compete with the live site.
// Flip this when Brant approves the DNS cutover.
// ============================================

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
