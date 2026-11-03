// ============================================
// WHAT THIS FILE DOES (plain English):
// /llms-full.txt is the full text of every post on the site in one
// plain-text file, for AI tools and agents that want to read the
// writing without opening each page. It includes posts that are not
// yet featured on the site. It is the same words as the pages.
// ============================================

import { availablePosts } from "@/lib/posts/load";
import { postDate, stateOf } from "@/lib/posts/model";
import { siteOrigin } from "@/lib/site/origin";

export const revalidate = 3600;

export function GET() {
  const origin = siteOrigin();
  const sections = availablePosts().map((post) => {
    const listed = stateOf(post) === "listed";
    return [
      `# ${post.title}`,
      "",
      `> ${post.summary}`,
      "",
      `Author: Brant S. Johnson`,
      listed ? `Published: ${postDate(post.releaseDate)}` : `Written: ${postDate(post.written)}`,
      `Page: ${origin}/writing/${post.slug}`,
      ...(post.tags.length ? [`Topics: ${post.tags.join(", ")}`] : []),
      "",
      post.body,
    ].join("\n");
  });
  const text = sections.length ? sections.join("\n\n---\n\n") : "# Brant S. Johnson\n\nNo posts yet.";
  return new Response(`${text}\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
