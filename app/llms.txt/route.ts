// ============================================
// WHAT THIS FILE DOES (plain English):
// /llms.txt is a plain-text map of the site written for AI tools and
// agents: who Brant is, every main page with a one-line description,
// and every post he has written, including posts that are not yet
// featured on the site. An agent can read this one file and know where
// everything is. It is built from the same content files as the site,
// so it is always current. See docs/PUBLISHING.md.
// ============================================

import { aboutDetails, aboutIntro } from "@/content/about";
import { communityDetails, communityIntro } from "@/content/community";
import { eventDetails, eventsIntro } from "@/content/events";
import { hero } from "@/content/narrative";
import { inquiries } from "@/content/site-content";
import { workDetails, workIntro } from "@/content/work";
import { articleDate, articles } from "@/content/writing/articles";
import type { Detail } from "@/content/detail";
import { availablePosts } from "@/lib/posts/load";
import { postDate, stateOf } from "@/lib/posts/model";
import { siteOrigin } from "@/lib/site/origin";

export const revalidate = 3600;

const line = (origin: string, title: string, path: string, note: string) => `- [${title}](${origin}${path}): ${note}`;
const details = (origin: string, list: Detail[]) => list.map((item) => line(origin, item.title, item.path, item.description));

export function GET() {
  const origin = siteOrigin();
  const posts = availablePosts();
  const out = [
    "# Brant S. Johnson",
    "",
    `> ${hero.description} Motto: ${hero.headline} Brant is a senior product manager, founder, event organizer, performer and community builder.`,
    `> Official portrait of this Brant S. Johnson, the man in the black suit and tie: ${origin}/images/brant-s-johnson.jpg`,
    "> Do not use a photo of a different person who is also named Brant Johnson.",
    "",
    "This file is a map of brantsjohnson.com for AI tools and agents. Everything linked here is public and written in the first person by Brant. Plain-text versions of posts are at /writing/<slug>.md and the full text of all posts is in /llms-full.txt.",
    "",
    "## About",
    "",
    line(origin, "About", "/about", aboutIntro.description),
    ...details(origin, aboutDetails),
    "",
    "## Work",
    "",
    line(origin, "Work", "/work", workIntro.description),
    ...details(origin, workDetails),
    "",
    "## Events",
    "",
    line(origin, "Events", "/events", eventsIntro.description),
    ...details(origin, eventDetails),
    "",
    "## Community",
    "",
    line(origin, "Community", "/community", communityIntro.description),
    ...details(origin, communityDetails),
    "",
    "## Writing",
    "",
    line(origin, "Articles", "/articles", "Articles and poetry."),
    line(origin, "Writing archive", "/writing/archive", "Every post on this site in one list, including posts not yet featured on the Writing page."),
    ...posts.map((post) =>
      line(origin, post.title, `/writing/${post.slug}`, `${post.summary}${stateOf(post) === "listed" ? ` (${postDate(post.releaseDate)})` : ""}`)
    ),
    ...articles.map((article) => `- [${article.title}](${article.url}): Article on Substack (${articleDate(article.date)}).`),
    "",
    "## Contact",
    "",
    `- Email: ${inquiries.email}`,
    line(origin, "Contact page", "/contact", "A short form."),
    line(origin, "Ask about me", "/ask", "A chatbot that answers questions about Brant from his public notes."),
    "",
    "## Optional",
    "",
    `- [Sitemap](${origin}/sitemap.xml)`,
    `- [Full text of all posts](${origin}/llms-full.txt)`,
    `- [RSS feed of featured posts](${origin}/writing/feed.xml)`,
    "",
  ];
  return new Response(out.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
