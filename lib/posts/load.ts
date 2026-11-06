// ============================================
// WHAT THIS FILE DOES (plain English):
// Finds the post files in content/posts, reads them, and answers the
// questions the site asks: which posts exist, which are listed today,
// and what is the post with this address. A post file that is not
// valid is skipped here (and `npm test` reports exactly what is wrong
// with it), so one typo never takes the site down. Server only.
// ============================================

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { readPost, stateOf, todayInDenver, type Post, type PostState } from "@/lib/posts/model";

export const POSTS_DIR = join(process.cwd(), "content", "posts");

export type LoadResult = { posts: Post[]; errors: string[] };

// THIS SECTION DOES: read every post file in a folder. Drafts are included here; use availablePosts() to leave them out.
export function loadPostsFrom(dir: string, knownPageKeys?: Set<string>): LoadResult {
  if (!existsSync(dir)) return { posts: [], errors: [] };
  const posts: Post[] = [];
  const errors: string[] = [];
  const slugs = new Set<string>();
  for (const file of readdirSync(dir).sort()) {
    if (!file.endsWith(".md") || file.toLowerCase() === "readme.md") continue;
    const slug = file.slice(0, -3);
    const { post, errors: problems } = readPost(slug, readFileSync(join(dir, file), "utf8"), knownPageKeys);
    errors.push(...problems);
    if (post && !slugs.has(post.slug)) {
      slugs.add(post.slug);
      posts.push(post);
    }
  }
  posts.sort((a, b) => (a.releaseDate === b.releaseDate ? (a.slug < b.slug ? -1 : 1) : a.releaseDate < b.releaseDate ? 1 : -1));
  return { posts, errors };
}

export function loadPosts(): LoadResult {
  return loadPostsFrom(POSTS_DIR);
}

// THIS SECTION DOES: every post whose page works (listed or unlisted), newest release first
export function availablePosts(): Post[] {
  return loadPosts().posts.filter((post) => !post.draft);
}

// THIS SECTION DOES: the posts shown on the site today: the Writing page, the feed, the chatbot
export function listedPosts(today: string = todayInDenver()): Post[] {
  return availablePosts().filter((post) => stateOf(post, today) === "listed");
}

export function getPost(slug: string): { post: Post; state: PostState } | null {
  const post = availablePosts().find((item) => item.slug === slug);
  return post ? { post, state: stateOf(post) } : null;
}

// THIS SECTION DOES: previous and next posts in one series, oldest first, so
// the Crew articles read 01 then 02 then 03. Only listed posts are linked,
// so an unlisted neighbor is not revealed early.
export function seriesNeighbors(
  slug: string,
  aboutKey: string,
  today: string = todayInDenver()
): { previous?: Post; next?: Post } {
  const series = listedPosts(today)
    .filter((post) => post.about.includes(aboutKey))
    .sort((a, b) => (a.releaseDate === b.releaseDate ? (a.slug < b.slug ? -1 : 1) : a.releaseDate < b.releaseDate ? -1 : 1));
  const index = series.findIndex((post) => post.slug === slug);
  if (index < 0) return {};
  return { previous: series[index - 1], next: series[index + 1] };
}
