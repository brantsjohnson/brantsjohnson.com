// ============================================
// WHAT THIS FILE DOES (plain English):
// This builds the list of writing shown on the Writing page. For each
// source in content/writing/sources.ts it reads the live feed (kept
// for about an hour, or refreshed at once when an agent calls
// /api/revalidate), and merges in the details Brant saved for each
// article in content/writing/articles.ts. If a feed cannot be read,
// the saved list still shows, so the page is never empty. A post
// published on Substack therefore appears on the site on its own.
// Server only.
// ============================================

import "server-only";
import { articleDate, articles, type Article } from "@/content/writing/articles";
import { writingSources, type WritingSource } from "@/content/writing/sources";
import { listedPosts } from "@/lib/posts/load";
import { isDefaultSubstackPost, isSubstackStarterFeedItem } from "@/lib/writing/feed-filters";

export const WRITING_TAG = "writing";

export type WritingItem = {
  id: string;
  title: string;
  url: string;
  dateIso: string;
  dateLabel: string;
  source: WritingSource["id"];
  summary?: string;
  image?: string; // a picture from the article, used on the Articles page
  internal?: boolean; // a post written on this site (opens here, not in a new tab)
};

export type WritingGroup = { source: WritingSource; items: WritingItem[] };

// THIS SECTION DOES: turn feed text into plain words
function decode(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num: string) => String.fromCodePoint(Number(num)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function plain(value: string): string {
  return decode(value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function tag(block: string, name: string): string {
  const match = block.match(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return match ? plain(match[1]) : "";
}

// THIS SECTION DOES: pull the article picture and the one-sentence description out of a feed item
function feedImage(block: string): string | undefined {
  const enclosure = block.match(/<enclosure\b[^>]*\burl="([^"]+)"/i);
  if (enclosure) return decode(enclosure[1]);
  const image = block.match(/<img\b[^>]*\bsrc="([^"]+)"/i);
  return image ? decode(image[1]) : undefined;
}

function feedSummary(block: string): string | undefined {
  const text = tag(block, "description").replace(/^TL:?DR\s*/i, "");
  if (!text) return undefined;
  const sentence = text.split(/(?<=[.!?])\s/)[0] ?? text;
  return sentence.length > 220 ? `${sentence.slice(0, 217).trim()}...` : sentence;
}

function pathKey(href: string): string {
  try {
    return new URL(href).pathname.replace(/\/$/, "");
  } catch {
    return href;
  }
}

// THIS SECTION DOES: read one feed. Any failure returns nothing, never an error.
async function readFeed(source: WritingSource): Promise<WritingItem[]> {
  try {
    const response = await fetch(source.feedUrl, {
      headers: { Accept: "application/rss+xml, application/xml, text/xml" },
      next: { revalidate: 3600, tags: [WRITING_TAG] },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return [];
    const xml = await response.text();
    const items: WritingItem[] = [];
    for (const block of xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? []) {
      const title = tag(block, "title");
      const url = tag(block, "link");
      const published = new Date(tag(block, "pubDate"));
      if (
        !title ||
        !url.startsWith("http") ||
        Number.isNaN(published.getTime()) ||
        isSubstackStarterFeedItem(url, title)
      ) {
        continue;
      }
      const dateIso = published.toISOString().slice(0, 10);
      items.push({
        id: url,
        title,
        url,
        dateIso,
        dateLabel: articleDate(dateIso),
        source: source.id,
        summary: feedSummary(block),
        image: feedImage(block),
      });
    }
    return items;
  } catch {
    return [];
  }
}

function fromArticle(article: Article): WritingItem {
  return {
    id: article.id,
    title: article.title,
    url: article.url,
    dateIso: article.date,
    dateLabel: articleDate(article.date),
    source: article.source,
    summary: article.summary,
  };
}

// THIS SECTION DOES: the list for the Writing page, one group per source, newest first
export async function getWritingGroups(): Promise<WritingGroup[]> {
  const groups: WritingGroup[] = [];
  for (const source of writingSources) {
    const liveAll = await readFeed(source);
    const liveByPath = new Map(liveAll.map((item) => [pathKey(item.url), item]));
    // Saved details win, but a feed can still supply the picture and the one-sentence summary.
    const saved = articles
      .filter((article) => article.source === source.id)
      .map((article) => {
        const item = fromArticle(article);
        const feed = liveByPath.get(pathKey(item.url));
        return {
          ...item,
          summary: item.summary || feed?.summary,
          image: item.image || feed?.image,
        };
      });
    const savedKeys = new Set(saved.map((item) => pathKey(item.url)));
    const live = liveAll.filter((item) => !savedKeys.has(pathKey(item.url)));
    // Posts written on this site join the main Articles list once their release day arrives.
    const written: WritingItem[] =
      source.id === "articles"
        ? listedPosts().map((post) => ({
            id: `post:${post.slug}`,
            title: post.title,
            url: `/writing/${post.slug}`,
            dateIso: post.releaseDate,
            dateLabel: articleDate(post.releaseDate),
            source: "articles" as const,
            summary: post.summary,
            internal: true,
          }))
        : [];
    // If a post is also on Substack, show the site's version once.
    const onSite = new Set(listedPosts().filter((post) => post.substackUrl).map((post) => pathKey(post.substackUrl as string)));
    const others = [...saved, ...live].filter(
      (item) => !onSite.has(pathKey(item.url)) && !isDefaultSubstackPost(item.url)
    );
    const items = [...written, ...others].sort((a, b) => (a.dateIso < b.dateIso ? 1 : -1));
    groups.push({ source, items });
  }
  return groups;
}
