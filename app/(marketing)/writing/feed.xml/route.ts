// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the RSS feed for pieces published on this site. It is
// available only when a real local post exists. Newsletter mirrors
// point their canonical link at the original.
// ============================================

import { identity } from "@/content/site-content";
import { postsNewestFirst } from "@/content/writing/posts";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  const posts = postsNewestFirst();
  if (posts.length === 0) {
    return new Response("No posts yet.", { status: 404 });
  }
  const items = posts
    .map((post) => {
      const link = post.canonicalUrl ?? `${identity.siteUrl}/writing/${post.slug}`;
      return `<item>
        <title>${escapeXml(post.title)}</title>
        <link>${escapeXml(link)}</link>
        <guid>${escapeXml(`${identity.siteUrl}/writing/${post.slug}`)}</guid>
        <pubDate>${escapeXml(new Date(post.published).toUTCString())}</pubDate>
        <description>${escapeXml(post.excerpt)}</description>
      </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(identity.fullName)} writing</title>
    <link>${identity.siteUrl}/writing</link>
    <description>Government reform essays and newsletter letters.</description>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
