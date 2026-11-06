// ============================================
// WHAT THIS FILE DOES (plain English):
// Magazine features that appear on the Articles page, under the
// Features heading. Each one is a published piece, with the title,
// the magazine, and the file a visitor opens to read it.
// This file only stores those words. The page decides how they look.
// ============================================

export type Feature = {
  id: string;
  title: string;
  publication: string;
  dateLabel: string;
  href: string;
};

export const features: Feature[] = [
  {
    id: "basin-living",
    title: "Thinking Globally, Acting Locally",
    publication: "Basin Living",
    dateLabel: "November 2020",
    href: "/images/brant-uploads/press/bl-feature-2020-11.pdf",
  },
];
