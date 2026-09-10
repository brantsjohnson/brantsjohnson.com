/**
 * Site-wide configuration.
 *
 * Purpose: one place for the values that appear in many spots (name, tagline,
 * contact email, navigation links, and social/external links). Editing the
 * site's identity or menu means editing this file only.
 */

export const site = {
  name: "Brant S. Johnson",
  shortName: "Brant Johnson",
  // A one-line description used for metadata and the hero subheading.
  role: "Product-minded founder",
  tagline:
    "Product-minded founder building tools for connection and community — with a working interest in product, AI, media, and government.",
  email: "me@brantsjohnson.com",
  url: "https://brantsjohnson.com",
};

/**
 * Asset placeholders.
 *
 * Purpose: holds paths/links for the headshot photo and CV that aren't
 * available yet. Both are intentionally empty so the UI can show a tasteful
 * placeholder until Brant provides the real files.
 *
 * TODO(brant): drop a headshot in /public (e.g. /public/headshot.jpg) and set
 * `headshot` to "/headshot.jpg". Add the CV PDF (e.g. /public/brant-johnson-cv.pdf)
 * and set `cvUrl` to "/brant-johnson-cv.pdf" (or an external link).
 */
export const assets: { headshot: string | null; cvUrl: string | null } = {
  headshot: null,
  cvUrl: null,
};

/**
 * Primary navigation.
 *
 * Purpose: drives the header menu and is reused for the footer. Add, remove, or
 * reorder pages here and both places update together.
 */
export const nav: { href: string; label: string }[] = [
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/leadership", label: "Leadership" },
  { href: "/projects", label: "Projects" },
  { href: "/service", label: "Service" },
  { href: "/contact", label: "Contact" },
];
