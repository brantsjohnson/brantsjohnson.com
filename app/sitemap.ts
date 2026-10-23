// ============================================
// WHAT THIS FILE DOES (plain English):
// This lists the public pages for search engines. Writing is included
// only when at least two real posts exist.
// ============================================

import type { MetadataRoute } from "next";
import { poems } from "@/content/poems";
import { identity } from "@/content/site-content";
import { getPublicWriting } from "@/lib/writing/public-posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const writing = await getPublicWriting();
  const paths = [
    "",
    "/product",
    "/creator",
    "/creator/poetry",
    "/creator/blog",
    "/creator/crew",
    "/performer",
    "/entrepreneur",
    "/activist",
    "/story",
    "/beliefs",
    "/work",
    "/about",
    "/contact",
    "/ask",
    "/now",
    ...poems.map((poem) => `/creator/poetry/${poem.slug}`),
  ];
  if (writing.show) paths.push("/writing");
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
