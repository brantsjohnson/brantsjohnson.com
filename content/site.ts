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
 * Primary navigation.
 *
 * Purpose: drives the header menu and is reused for the footer. Add, remove, or
 * reorder pages here and both places update together.
 */
export const nav: { href: string; label: string }[] = [
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/service", label: "Service" },
  { href: "/contact", label: "Contact" },
];
