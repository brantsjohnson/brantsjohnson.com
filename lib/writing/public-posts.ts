// ============================================
// WHAT THIS FILE DOES (plain English):
// This builds the public writing list. Local essays and letters come
// from content/writing/posts.ts. When SUBSTACK_URL is set, letters
// are also read from that publication's RSS feed. The site shows
// Writing only when this list has at least two real posts. A missing
// URL, an empty feed, or a failed fetch leaves the list empty.
// ============================================

import "server-only";
import { cache } from "react";
import { postsNewestFirst, type WritingKind } from "@/content/writing/posts";
import { substackBase } from "@/lib/site/public-env";

// THIS SECTION DOES: describe one public piece, whether it lives here or on Substack
export type PublicWritingItem = {
  id: string;
  title: string;
  excerpt: string;
  published: string;
  href: string;
  external: boolean;
  kind: WritingKind;
  sortKey: string;
};

export type PublicWriting = {
  posts: PublicWritingItem[];
  essays: PublicWritingItem[];
  letters: PublicWritingItem[];
  show: boolean;
  subscribeUrl: string | null;
  feedUrl: string | null;
};

// THIS SECTION DOES: turn RSS text into plain words for a title or excerpt
function decodeXml(value: string): string {
  const withoutCdata = value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");
  return withoutCdata
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num: string) => String.fromCodePoint(Number(num)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function plainText(value: string): string {
  return decodeXml(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tagText(block: string, tag: string): string {
  const match = block.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return match ? plainText(match[1]) : "";
}

function itemLink(block: string): string {
  const text = tagText(block, "link");
  if (text.startsWith("http")) return text;
  const href = block.match(/<link\b[^>]*href=["']([^"']+)["']/i);
  return href?.[1] ?? "";
}

function displayDate(raw: string): { label: string; sortKey: string } {
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return { label: raw, sortKey: raw };
  const label = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
  return { label, sortKey: date.toISOString() };
}

function localItems(): PublicWritingItem[] {
  return postsNewestFirst().map((post) => ({
    id: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    published: post.published,
    href: `/writing/${post.slug}`,
    external: false,
    kind: post.kind,
    sortKey: post.published,
  }));
}

// THIS SECTION DOES: read Substack letters. Any failure returns no letters.
async function substackItems(base: string): Promise<PublicWritingItem[]> {
  try {
    const response = await fetch(`${base}/feed`, {
      headers: { Accept: "application/rss+xml, application/xml, text/xml" },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return [];
    const xml = await response.text();
    const blocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];
    const items: PublicWritingItem[] = [];
    for (const block of blocks) {
      const title = tagText(block, "title");
      const href = itemLink(block);
      if (!title || !href.startsWith("http")) continue;
      const dated = displayDate(tagText(block, "pubDate"));
      const excerpt = tagText(block, "description");
      items.push({
        id: href,
        title,
        excerpt: excerpt.length > 220 ? `${excerpt.slice(0, 220).trim()}...` : excerpt,
        published: dated.label,
        href,
        external: true,
        kind: "newsletter",
        sortKey: dated.sortKey,
      });
    }
    return items;
  } catch {
    return [];
  }
}

// THIS SECTION DOES: assemble the list once per request and say whether Writing is public
export const getPublicWriting = cache(async (): Promise<PublicWriting> => {
  const base = substackBase();
  const remote = base ? await substackItems(base) : [];
  const posts = [...localItems(), ...remote].sort((a, b) => (a.sortKey < b.sortKey ? 1 : -1));
  const localCount = posts.filter((post) => !post.external).length;
  return {
    posts,
    essays: posts.filter((post) => post.kind === "essay"),
    letters: posts.filter((post) => post.kind === "newsletter"),
    // Two real pieces is the smallest shelf worth a public page.
    show: posts.length >= 2,
    subscribeUrl: base ? `${base}/subscribe` : null,
    feedUrl: localCount > 0 ? "/writing/feed.xml" : base ? `${base}/feed` : null,
  };
});
