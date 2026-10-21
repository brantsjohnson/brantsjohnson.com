// ============================================
// WHAT THIS FILE DOES (plain English):
// This lists the public pages for search engines. Writing is included
// only when at least two real posts exist.
// ============================================

import type { MetadataRoute } from "next";
import { identity } from "@/content/site-content";
import { getPublicWriting } from "@/lib/writing/public-posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const writing = await getPublicWriting();
  const paths = ["", "/work", "/about", "/contact", "/ask"];
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
