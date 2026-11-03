// ============================================
// WHAT THIS FILE DOES (plain English):
// This builds the search and share tags for one public page: the
// title, the description, the canonical path, and the Open Graph and
// Twitter card text and picture. What shows when someone shares a
// link comes from here:
//   - a page with a cover photo shares that photo, cropped to the
//     card shape with Brant kept in the center;
//   - a page without one shares a clean text card with its title;
//   - an article shares its own cover and is marked as an article.
// The pictures are made by /og/photo and /og/card on demand.
// ============================================

import type { Metadata } from "next";
import type { Photo } from "@/content/photos";

export type ShareImage = {
  photo?: Photo; // the cover photo to share
  kicker?: string; // the small label on a text card, e.g. "Events"
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: ShareImage;
  article?: { publishedTime: string }; // marks the page as an article
};

const CARD = { width: 1200, height: 630 } as const;

// THIS SECTION DOES: the address of the share picture for one page
export function shareImageUrl(title: string, image?: ShareImage): string {
  if (image?.photo) {
    const { photo } = image;
    const params = new URLSearchParams({ src: photo.src });
    if (photo.focus) {
      params.set("fx", photo.focus.x.toFixed(3));
      params.set("fy", photo.focus.y.toFixed(3));
    }
    if (photo.fit === "contain") params.set("fit", "contain");
    if (photo.bg) params.set("bg", photo.bg.replace("#", ""));
    return `/og/photo?${params.toString()}`;
  }
  const params = new URLSearchParams({ title });
  if (image?.kicker) params.set("kicker", image.kicker);
  return `/og/card?${params.toString()}`;
}

// THIS SECTION DOES: return the metadata object a page can export
export function pageMetadata({ title, description, path, image, article }: PageMetadataInput): Metadata {
  const url = shareImageUrl(title, image);
  const alt = image?.photo?.alt ?? title;
  const images = [{ url, width: CARD.width, height: CARD.height, alt }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: article ? "article" : "website",
      ...(article ? { publishedTime: article.publishedTime } : {}),
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [url],
    },
  };
}
