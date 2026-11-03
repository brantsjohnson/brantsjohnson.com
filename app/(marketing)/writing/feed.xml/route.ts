// ============================================
// WHAT THIS FILE DOES (plain English):
// The RSS feed for posts written on this site. It lists only posts
// that are "listed" today, so readers who subscribe see one post a day
// as each release day arrives. Search engines and AI tools get every
// post from the sitemap and llms.txt instead.
// ============================================

import { listedPosts } from "@/lib/posts/load";
import { siteOrigin } from "@/lib/site/origin";

export const revalidate = 3600;

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function GET() {
  const origin = siteOrigin();
  const posts = listedPosts();
  if (posts.length === 0) {
    return new Response("No posts yet.", { status: 404 });
  }
  const items = posts
    .map((post) => {
      const link = `${origin}/writing/${post.slug}`;
      return `<item>
        <title>${escapeXml(post.title)}</title>
        <link>${escapeXml(link)}</link>
        <guid>${escapeXml(link)}</guid>
        <pubDate>${new Date(`${post.releaseDate}T12:00:00Z`).toUTCString()}</pubDate>
        <description>${escapeXml(post.summary)}</description>
      </item>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Brant S. Johnson</title>
    <link>${escapeXml(`${origin}/writing`)}</link>
    <description>Writing by Brant S. Johnson.</description>
    ${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
