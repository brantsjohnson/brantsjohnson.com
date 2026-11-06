// ============================================
// WHAT THIS FILE DOES (plain English):
// This lists the public pages for search engines, built from the
// content files so a new event or story is listed automatically.
// ============================================

import type { MetadataRoute } from "next";
import { communityDetails } from "@/content/community";
import { eventDetails } from "@/content/events";
import { poems } from "@/content/poems";
import { identity } from "@/content/site-content";
import { workDetails } from "@/content/work";
import { availablePosts } from "@/lib/posts/load";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = availablePosts();
  const paths = [
    "",
    "/about",
    "/about/pre-college",
    "/about/handmade",
    "/work",
    ...workDetails.map((item) => item.path),
    "/work/crew-brand",
    "/events",
    ...eventDetails.map((item) => item.path),
    "/community",
    ...communityDetails.map((item) => item.path),
    "/articles",
    "/writing/poetry",
    "/writing/archive",
    ...posts.map((post) => `/writing/${post.slug}`),
    ...poems.map((poem) => `/writing/poetry/${poem.slug}`),
    "/contact",
    "/ask",
    "/now",
  ];

  const dated = new Date();
  const written = new Map(posts.map((post) => [`/writing/${post.slug}`, new Date(`${post.written}T12:00:00Z`)]));
  return paths.map((path) => ({
    url: `${identity.siteUrl}${path || "/"}`,
    lastModified: written.get(path) ?? dated,
  }));
}
