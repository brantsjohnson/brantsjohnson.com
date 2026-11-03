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

export const WRITING_TAG = "writing";

export type WritingItem = {
  id: string;
  title: string;
  url: string;
  dateIso: string;
  dateLabel: string;
  source: WritingSource["id"];
  summary?: string;
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
      if (!title || !url.startsWith("http") || Number.isNaN(published.getTime())) continue;
      const dateIso = published.toISOString().slice(0, 10);
      items.push({ id: url, title, url, dateIso, dateLabel: articleDate(dateIso), source: source.id });
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
    const saved = articles.filter((article) => article.source === source.id).map(fromArticle);
    const savedKeys = new Set(saved.map((item) => pathKey(item.url)));
    const live = (await readFeed(source)).filter((item) => !savedKeys.has(pathKey(item.url)));
    const items = [...saved, ...live].sort((a, b) => (a.dateIso < b.dateIso ? 1 : -1));
    groups.push({ source, items });
  }
  return groups;
}
