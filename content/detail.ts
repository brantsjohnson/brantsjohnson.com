// ============================================
// WHAT THIS FILE DOES (plain English):
// This describes one detail page (a work story, an event, a
// community story). Each page has a title, a short lead, an "at a
// glance" row, sections with photos, and links onward. The pages in
// content/work.ts, events.ts and community.ts all use this shape.
// Words only, no UI.
// ============================================

import type { Paragraph } from "@/components/editorial/Prose";
import type { Story, StoryLinkItem } from "@/components/editorial/StoryRow";
import type { Photo } from "@/content/photos";

export type Crumb = { label: string; href?: string };

export type Detail = {
  slug: string;
  path: string;
  title: string; // the page's one h1
  metaTitle: string; // the browser tab, before " | Brant S. Johnson"
  description: string;
  crumbs: Crumb[];
  label: string; // the small label above the title
  lead: Paragraph[]; // the first paragraph is shown large
  glance?: { label: string; value: string }[];
  sections: Story[];
  gallery?: { title: string; intro?: string; photos: Photo[] };
  links?: StoryLinkItem[];
  back: { href: string; label: string };
};

// THIS SECTION DOES: a link that stays on the site
export const go = (text: string, href: string, track: string): StoryLinkItem => ({ text, href, track });

// THIS SECTION DOES: find one detail page by its slug
export function findDetail(list: Detail[], slug: string): Detail | undefined {
  return list.find((item) => item.slug === slug);
}
