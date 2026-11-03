// ============================================
// WHAT THIS FILE DOES (plain English):
// Builds the structured data (schema.org Article) that tells search
// engines and AI tools what a post is: its title, author, summary,
// picture, subject tags and word count. Before a post's release day
// the published date is left out and only the date it was written is
// given, so the page never claims a future date.
// ============================================

import { toPlainText, parseMarkdown } from "@/lib/posts/markdown";
import type { Post, PostState } from "@/lib/posts/model";

export function postJsonLd(post: Post, state: PostState, origin: string) {
  const url = `${origin}/writing/${post.slug}`;
  const words = toPlainText(parseMarkdown(post.body)).split(/\s+/).filter(Boolean).length;
  const image = post.cover ? `${origin}/og/photo?src=${encodeURIComponent(post.cover.src)}` : `${origin}/og/card?title=${encodeURIComponent(post.title)}&kicker=Writing`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    url,
    mainEntityOfPage: url,
    inLanguage: "en",
    author: { "@type": "Person", name: "Brant S. Johnson", url: origin },
    publisher: { "@type": "Person", name: "Brant S. Johnson", url: origin },
    image,
    keywords: post.tags.join(", ") || undefined,
    wordCount: words,
    dateCreated: post.written,
    dateModified: post.written,
    ...(state === "listed" ? { datePublished: post.releaseDate } : {}),
    ...(post.substackUrl ? { sameAs: post.substackUrl } : {}),
  };
}
