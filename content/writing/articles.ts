// ============================================
// WHAT THIS FILE DOES (plain English):
// The details about each published article that the site needs and a
// feed cannot give it: a cover picture for share previews, a one-line
// summary, and which Work, Events or Community pages the article is
// about. When an article names a page here, that page shows a "Read
// more" link to it automatically, and the "Ask about me" assistant
// learns about it. Every article is also listed on the Writing page,
// which falls back to this list if a feed cannot be reached.
//
// To publish: add one object to the top of this list. See
// docs/PUBLISHING.md for the full steps. Run `npm test` to check it.
// Words and addresses only, no UI.
// ============================================

import type { WritingSourceId } from "@/content/writing/sources";

export type Article = {
  id: string; // short, lowercase, hyphens: "crew-onboarding-experiments"
  title: string; // exactly as published
  date: string; // YYYY-MM-DD, the publication date
  url: string; // the live address (Substack or elsewhere)
  source: WritingSourceId;
  summary?: string; // one plain sentence, first person is fine. No dollar figures.
  cover?: { src: string; alt: string }; // a file under public/, shown when the link is shared
  about?: string[]; // page keys this article is about, e.g. ["work/crew", "events/theater"]
};

// THIS SECTION DOES: the published articles, newest first.
export const articles: Article[] = [
  {
    id: "theatre-kids-make-exceptional-employees",
    title: '13 Reasons "Theatre Kids" Make Exceptional Employees',
    date: "2026-05-04",
    url: "https://brantsjohnson.substack.com/p/13-reasons-theatre-kids-make-exceptional",
    source: "articles",
    about: ["events/theater"],
  },
  {
    id: "if-i-could-build-a-company",
    title: "If I Could Build a Company",
    date: "2026-04-26",
    url: "https://brantsjohnson.substack.com/p/if-i-could-build-a-company",
    source: "articles",
  },
  {
    id: "human-connection-in-an-ai-world",
    title: "In an AI world, human connection will be more crucial than ever",
    date: "2025-12-02",
    url: "https://brantsjohnson.substack.com/p/in-an-ai-world-human-connection-will",
    source: "articles",
  },
];

// THIS SECTION DOES: find the articles about one page, such as "work/crew", newest first
export function articlesAbout(pageKey: string): Article[] {
  return articles.filter((article) => article.about?.includes(pageKey)).sort((a, b) => (a.date < b.date ? 1 : -1));
}

// THIS SECTION DOES: a readable date like "May 4, 2026" from a YYYY-MM-DD string
export function articleDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(parsed);
}
