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
import { getPublicWriting } from "@/lib/writing/public-posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const writing = await getPublicWriting();
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
    "/writing",
    "/writing/poetry",
    ...poems.map((poem) => `/writing/poetry/${poem.slug}`),
    "/contact",
    "/ask",
    "/now",
  ];

  const dated = new Date();
  return [
    ...paths.map((path) => ({
      url: `${identity.siteUrl}${path || "/"}`,
      lastModified: dated,
    })),
    ...writing.posts
      .filter((post) => !post.external)
      .map((post) => ({
        url: `${identity.siteUrl}${post.href}`,
        lastModified: dated,
      })),
  ];
}
