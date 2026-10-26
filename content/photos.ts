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
  position?: string; // which part stays in view when a photo is cropped (used when there is no focus)
  focus?: { x: number; y: number }; // where the subject is, 0 to 1. Crops keep this point centered.
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
  focus: { x: 0.5, y: 0.32 },
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

// THIS SECTION DOES: the About photo, Brant under a double rainbow. The focus keeps him centered in any crop.
export const aboutPhoto: Photo = {
  src: "/images/brant-about.webp",
  alt: "Brant standing on a country road under a double rainbow, one hand raised.",
  width: 1410,
  height: 970,
  focus: { x: 0.62, y: 0.52 },
};

// THIS SECTION DOES: choose the object-position for a photo cropped to a box of a given width over height.
// With a focus point, the crop is placed so the subject sits as close to the center as the photo allows.
export function objectPositionFor(photo: Photo, boxRatio: number): string {
  if (!photo.focus) return photo.position ?? "50% 50%";
  const imageRatio = photo.width / photo.height;
  const place = (point: number, visible: number) =>
    visible >= 1 ? 50 : Math.round(Math.min(1, Math.max(0, (point - visible / 2) / (1 - visible))) * 100);
  if (imageRatio > boxRatio) return `${place(photo.focus.x, boxRatio / imageRatio)}% 50%`;
  return `50% ${place(photo.focus.y, imageRatio / boxRatio)}%`;
}

// THIS SECTION DOES: read a CSS ratio such as "4 / 5" as a number
export function parseRatio(ratio: string | undefined, fallback: number): number {
  if (!ratio) return fallback;
  const [a, b] = ratio.split("/").map((part) => Number.parseFloat(part));
  return a && b ? a / b : fallback;
}
