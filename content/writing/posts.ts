// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the shelf of Brant's public writing. Each entry is either
// a government reform essay or a newsletter letter. Pages read this
// list. A new piece appears when a real post is added here. Substack
// letters are read separately when SUBSTACK_URL is set. This file
// does not invent posts. An empty list means no local piece is published.
// ============================================

// THIS SECTION DOES: name the two kinds of writing this site is ready to hold
export type WritingKind = "essay" | "newsletter";

export type WritingPost = {
  slug: string; // the URL piece, like /writing/this-slug
  title: string;
  kind: WritingKind; // essay = government reform, newsletter = a letter
  published: string; // calendar date, written YYYY-MM-DD
  excerpt: string; // the short line on the index
  paragraphs: string[]; // the full piece, one paragraph per item
  // When this is a mirror of a letter that lives somewhere else,
  // the original stays the canonical copy. Leave this off for essays written here.
  canonicalUrl?: string;
};

// THIS SECTION DOES: hold the published pieces. Add a real post by appending an object.
// Do not put drafts, placeholders, or sample essays in this array.
export const writingPosts: WritingPost[] = [];

// THIS SECTION DOES: newest first, which is the order the index uses
export function postsNewestFirst(): WritingPost[] {
  return [...writingPosts].sort((a, b) => (a.published < b.published ? 1 : -1));
}

// THIS SECTION DOES: pull one shelf, still newest first
export function postsByKind(kind: WritingKind): WritingPost[] {
  return postsNewestFirst().filter((post) => post.kind === kind);
}

// THIS SECTION DOES: find one post by its URL slug
export function getWritingPost(slug: string): WritingPost | undefined {
  return writingPosts.find((post) => post.slug === slug);
}
