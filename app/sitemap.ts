// ============================================
// WHAT THIS FILE DOES (plain English):
// This lists the public pages for search engines. Stub sections are
// not included. Writing posts are added when they exist.
// ============================================

import type { MetadataRoute } from "next";
import { identity, projects } from "@/content/site-content";
import { writingPosts } from "@/content/writing/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/experience", "/projects", "/service", "/writing", "/contact", "/hi"];
  const dated = new Date();
  return [
    ...paths.map((path) => ({
      url: `${identity.siteUrl}${path || "/"}`,
      lastModified: dated,
    })),
    ...projects.map((project) => ({
      url: `${identity.siteUrl}/projects/${project.slug}`,
      lastModified: dated,
    })),
    ...writingPosts.map((post) => ({
      url: `${identity.siteUrl}/writing/${post.slug}`,
      lastModified: new Date(post.published),
    })),
  ];
}
