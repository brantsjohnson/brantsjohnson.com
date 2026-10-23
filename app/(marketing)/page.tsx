// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the homepage. It is a short overview: the headline and
// five doors. Each door opens its own page.
// ============================================

import type { Metadata } from "next";
import { OverviewHome } from "@/components/narrative/OverviewHome";
import { hero } from "@/content/narrative";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Brant S. Johnson. Good ideas deserve to happen.",
    description: hero.identity,
    path: "/",
  }),
  title: { absolute: "Brant S. Johnson. Good ideas deserve to happen." },
};

export default function HomePage() {
  return <OverviewHome />;
}
