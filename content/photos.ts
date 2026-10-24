// ============================================
// WHAT THIS FILE DOES (plain English):
// This describes a photo on a page (its file, its words for screen
// readers, its shape and an optional hover caption) and builds one
// from a file in public/images/brant-uploads. It holds no story text.
// ============================================

import { photoSizes } from "@/content/photo-sizes";

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string; // shows only when the photo is hovered or focused
  bg?: string; // a ground for drawings with see-through edges
  fit?: "cover" | "contain";
  position?: string; // which part stays in view when a photo is cropped
};

export type Video = {
  mp4: string;
  webm: string;
  poster: string;
  label: string;
  width: number;
  height: number;
};

const UPLOADS = "/images/brant-uploads/";

// The Crew drawings have see-through backgrounds. On a dark or white page their
// black linework disappears. This warm cream ground makes every drawing readable.
export const CREW_GROUND = "#f3ece0";

// THIS SECTION DOES: build a Photo from a file in public/images/brant-uploads
export function ph(file: string, alt: string, caption?: string, extra?: Partial<Photo>): Photo {
  const size = photoSizes[file];
  if (!size) throw new Error(`No size on record for ${file}`);
  return { src: `${UPLOADS}${file}`, alt, width: size[0], height: size[1], caption, ...extra };
}

// THIS SECTION DOES: build a Crew drawing, set on its cream ground
export function crew(file: string, alt: string, caption?: string, extra?: Partial<Photo>): Photo {
  return ph(`crew-illustrations/${file}`, alt, caption, { bg: CREW_GROUND, fit: "contain", ...extra });
}

// THIS SECTION DOES: the headshot, used on the home page and About
export const headshot: Photo = {
  src: "/images/brant-headshot.webp",
  alt: "Brant S. Johnson smiling in a black suit and tie against a soft white background.",
  width: 876,
  height: 974,
};

export const archwayVideo: Video = {
  mp4: "/activist/archway-video.mp4",
  webm: "/activist/archway-video.webm",
  poster: "/activist/archway-poster.webp",
  label: "The Uintah Resilience Archway in Vernal, Utah",
  width: 854,
  height: 480,
};
