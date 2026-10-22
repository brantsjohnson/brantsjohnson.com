// ============================================
// WHAT THIS FILE DOES (plain English):
// This builds the search and share tags for one public page:
// the title, the description, the canonical path, and the
// Open Graph and Twitter card text. The image itself comes
// from app/opengraph-image.tsx so every page has a real card.
// ============================================

import type { Metadata } from "next";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

// THIS SECTION DOES: return the metadata object a page can export
export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
