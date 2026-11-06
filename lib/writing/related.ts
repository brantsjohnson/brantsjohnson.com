// ============================================
// WHAT THIS FILE DOES (plain English):
// Builds the "Read more" list for a Work, Events, or other detail
// page. It joins two sources: external articles saved in
// content/writing/articles.ts, and posts written on this site whose
// release day has arrived. Both use the same about key, such as
// work/crew, so a new listed post shows up on its own. Newest first.
// ============================================

import { articlesAbout } from "@/content/writing/articles";
import { listedPosts } from "@/lib/posts/load";

export type RelatedArticle = {
  id: string;
  title: string;
  date: string;
  url: string;
  summary?: string;
  internal?: boolean; // true = a post on this site, opened here instead of a new tab
};

// THIS SECTION DOES: collect every listed article about one page, without duplicating the same address
export function relatedArticles(pageKey: string, today?: string): RelatedArticle[] {
  const fromPosts: RelatedArticle[] = listedPosts(today)
    .filter((post) => post.about.includes(pageKey))
    .map((post) => ({
      id: `post:${post.slug}`,
      title: post.title,
      date: post.releaseDate,
      url: `/writing/${post.slug}`,
      summary: post.summary,
      internal: true,
    }));
  const fromArticles: RelatedArticle[] = articlesAbout(pageKey).map((article) => ({
    id: article.id,
    title: article.title,
    date: article.date,
    url: article.url,
    summary: article.summary,
  }));
  const seen = new Set<string>();
  return [...fromPosts, ...fromArticles]
    .filter((article) => {
      if (seen.has(article.url)) return false;
      seen.add(article.url);
      return true;
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.id < b.id ? -1 : 1));
}
