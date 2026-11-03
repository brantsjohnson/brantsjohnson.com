// ============================================
// WHAT THIS FILE DOES (plain English):
// Serves a post as plain markdown at /writing/<slug>.md (a rewrite in
// next.config.mjs sends that address here). AI tools and agents read
// plain text more reliably than a styled web page. It is the same
// words as the page, with the title and summary on top.
// ============================================

import { getPost } from "@/lib/posts/load";
import { postDate } from "@/lib/posts/model";
import { siteOrigin } from "@/lib/site/origin";

export const revalidate = 3600;

export function GET(_request: Request, { params }: { params: { slug: string } }) {
  const found = getPost(params.slug);
  if (!found) return new Response("Not found", { status: 404 });
  const { post, state } = found;
  const lines = [
    `# ${post.title}`,
    "",
    `> ${post.summary}`,
    "",
    `Author: Brant S. Johnson`,
    state === "listed" ? `Published: ${postDate(post.releaseDate)}` : `Written: ${postDate(post.written)}`,
    `Canonical page: ${siteOrigin()}/writing/${post.slug}`,
    ...(post.tags.length ? [`Topics: ${post.tags.join(", ")}`] : []),
    ...(post.substackUrl ? [`Also on Substack: ${post.substackUrl}`] : []),
    "",
    post.body,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
