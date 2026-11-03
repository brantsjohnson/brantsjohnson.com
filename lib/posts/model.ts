// ============================================
// WHAT THIS FILE DOES (plain English):
// The rules for a post: what fields it has, whether it is a draft,
// "unlisted" (the page works and search and AI can find it, but the
// site does not list it yet) or "listed" (shown on the Writing page,
// in the feed and to the chatbot), and a check that a post file is
// complete. A post's state depends only on its release date, so
// pre-written posts switch from unlisted to listed on their day with
// no one editing anything. No page code here, so it can be tested.
// ============================================

import { parseFrontmatter, type FrontmatterValue } from "@/lib/posts/frontmatter";

export type PostState = "draft" | "unlisted" | "listed";

export type Post = {
  slug: string; // from the file name
  title: string;
  summary: string; // one plain sentence, used in lists, feeds, search and share previews
  releaseDate: string; // YYYY-MM-DD. The day the post is listed on the site.
  written: string; // YYYY-MM-DD. The day the post became available. Defaults to releaseDate.
  draft: boolean; // true = not available at all (404, not in sitemap)
  tags: string[];
  about: string[]; // page keys like work/crew
  cover?: { src: string; alt: string };
  substackUrl?: string; // set once it is also posted on Substack
  body: string; // markdown
};

export const TIME_ZONE = "America/Denver";

// THIS SECTION DOES: today's date in Brant's time zone, as YYYY-MM-DD
export function todayInDenver(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

export function stateOf(post: Pick<Post, "draft" | "releaseDate">, today: string = todayInDenver()): PostState {
  if (post.draft) return "draft";
  return today < post.releaseDate ? "unlisted" : "listed";
}

const isDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(`${value}T00:00:00Z`).getTime());
const asString = (value: FrontmatterValue | undefined) => (typeof value === "string" ? value : "");
const asList = (value: FrontmatterValue | undefined) => (Array.isArray(value) ? value : []);

// THIS SECTION DOES: turn a post file into a Post, or say exactly what is wrong with it
export function readPost(slug: string, source: string, knownPageKeys?: Set<string>): { post: Post | null; errors: string[] } {
  const parsed = parseFrontmatter(source);
  const errors = parsed.errors.map((message) => `${slug}: ${message}`);
  const { data, body } = parsed;
  const problem = (message: string) => errors.push(`${slug}: ${message}`);

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) problem("the file name must be lowercase words joined by hyphens, for example crew-onboarding.md");
  const title = asString(data.title);
  const summary = asString(data.summary);
  const releaseDate = asString(data.releaseDate);
  const written = asString(data.written) || releaseDate;
  if (!title) problem("title is required");
  if (!summary) problem("summary is required (one plain sentence)");
  else if (summary.length > 200) problem("summary should be 200 characters or fewer");
  if (!isDate(releaseDate)) problem("releaseDate must be a real date written YYYY-MM-DD");
  if (!isDate(written)) problem("written must be a real date written YYYY-MM-DD");
  if (isDate(written) && isDate(releaseDate) && written > releaseDate) problem("written cannot be later than releaseDate");
  if (!body || body.split(/\s+/).length < 30) problem("the body is missing or very short");
  if (data.draft !== undefined && typeof data.draft !== "boolean") problem("draft must be true or false");

  const about = asList(data.about);
  if (knownPageKeys) for (const key of about) if (!knownPageKeys.has(key)) problem(`about "${key}" is not a page. Use section/slug, for example work/crew.`);

  const coverSrc = asString(data.cover);
  const coverAlt = asString(data.coverAlt);
  if (coverSrc && !coverAlt) problem("a cover needs coverAlt, a short description of the picture");
  if (coverSrc && !coverSrc.startsWith("/")) problem("cover must be a file path starting with /, for example /images/brant-uploads/...");

  const substackUrl = asString(data.substackUrl);
  if (substackUrl && !substackUrl.startsWith("https://")) problem("substackUrl must start with https://");

  if (errors.length) return { post: null, errors };
  return {
    post: {
      slug,
      title,
      summary,
      releaseDate,
      written,
      draft: data.draft === true,
      tags: asList(data.tags),
      about,
      cover: coverSrc ? { src: coverSrc, alt: coverAlt } : undefined,
      substackUrl: substackUrl || undefined,
      body,
    },
    errors,
  };
}

// THIS SECTION DOES: a readable date like "Nov 10, 2026" from YYYY-MM-DD
export function postDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}
