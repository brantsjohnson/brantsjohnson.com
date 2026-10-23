// ============================================
// WHAT THIS FILE DOES (plain English):
// Theater and performing, from a high school stage to Hale Centre Theatre, with the production photos.
// ============================================

import type { Metadata } from "next";
import { ChapterPage } from "@/components/narrative/ChapterPage";
import { performerChapter } from "@/content/chapters";
import { areas } from "@/content/narrative";
import { pageMetadata } from "@/lib/site/page-metadata";

const area = areas[2];

export const metadata: Metadata = pageMetadata({
  title: "Performer",
  description: area.deck,
  path: "/performer",
});

export default function PerformerPage() {
  return <ChapterPage chapter={performerChapter} href="/performer" />;
}
