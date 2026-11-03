// ============================================
// WHAT THIS FILE DOES (plain English):
// This tells search engines to skip the site until the domain moves
// off Wix. The preview should not compete with the live site.
// Flip this when Brant approves the DNS cutover.
// ============================================

import type { MetadataRoute } from "next";
import { identity } from "@/content/site-content";

// Read the setting when asked, so turning it on needs only a redeploy.
export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  if (process.env.SITE_INDEXABLE === "true") {
    // Search engines and AI crawlers are welcome. The private areas stay closed.
    const open = { allow: ["/", "/og/", "/writing/", "/llms.txt", "/llms-full.txt"], disallow: ["/admin", "/api/"] };
    return {
      rules: [
        { userAgent: "*", ...open },
        {
          userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot", "Applebot-Extended", "CCBot", "Bingbot", "DuckAssistBot", "cohere-ai", "MistralAI-User"],
          ...open,
        },
      ],
      sitemap: `${identity.siteUrl}/sitemap.xml`,
      host: identity.siteUrl,
    };
  }

  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
