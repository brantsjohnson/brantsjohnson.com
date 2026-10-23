// ============================================
// WHAT THIS FILE DOES (plain English):
// The creator section: brand work, writing, poetry and the handmade things, each with its photos.
// ============================================

import type { Metadata } from "next";
import { ChapterPage } from "@/components/narrative/ChapterPage";
import { creatorChapter } from "@/content/chapters";
import { areas } from "@/content/narrative";
import { pageMetadata } from "@/lib/site/page-metadata";

const area = areas[1];

export const metadata: Metadata = pageMetadata({
  title: "Creator",
  description: area.deck,
  path: "/creator",
});

export default function CreatorPage() {
  return <ChapterPage chapter={creatorChapter} href="/creator" />;
}
