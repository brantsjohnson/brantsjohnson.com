// ============================================
// WHAT THIS FILE DOES (plain English):
// Where Brant's writing comes from. Each source is one newsletter or
// publication with a feed. The Writing page reads every source's feed
// (refreshed about once an hour, or right away when an agent calls
// /api/revalidate), so a new post appears on the site without anyone
// editing a file. The per-article details that a feed cannot carry
// (a cover picture, which Work or Events page it relates to) live in
// content/writing/articles.ts. See docs/PUBLISHING.md.
// Words and addresses only, no UI.
// ============================================

export type WritingSourceId = "articles" | "events-newsletter" | "github-newsletter";

export type WritingSource = {
  id: WritingSourceId;
  label: string; // the heading on the Writing page
  feedUrl: string; // the RSS feed, e.g. https://name.substack.com/feed
  subscribeUrl: string;
};

// THIS SECTION DOES: the live sources, in the order they appear on the Writing page.
// To add the events newsletter or the GitHub newsletter, add an object here with its feed
// and subscribe addresses. Do not add one until the publication exists.
export const writingSources: WritingSource[] = [
  {
    id: "articles",
    label: "Articles",
    feedUrl: "https://brantsjohnson.substack.com/feed",
    subscribeUrl: "https://brantsjohnson.substack.com/subscribe",
  },
];
