// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the top of a quieter inner page (Contact, Ask, Now, Hi).
// It uses the same colored title card as the other pages, so every
// page opens the way the main site opens a section.
// ============================================

import { PageHeader } from "@/components/editorial/PageHeader";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  deck?: string;
};

export function PageHero({ eyebrow, title, deck }: PageHeroProps) {
  const id = eyebrow.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "page";
  return <PageHeader id={id} label={eyebrow} title={title} lead={deck} />;
}
