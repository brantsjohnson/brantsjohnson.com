// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the home page. It tells Brant's story in one scroll:
// senior product manager, then creator, performer, entrepreneur,
// and activist. The words live in the narrative content file.
// ============================================

import type { Metadata } from "next";
import { NarrativeHome } from "@/components/narrative/NarrativeHome";
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
  return <NarrativeHome />;
}
