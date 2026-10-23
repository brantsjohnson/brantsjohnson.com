// ============================================
// WHAT THIS FILE DOES (plain English):
// The archway, the scholarship, the government work and the student years, each with its photos and the archway video.
// ============================================

import type { Metadata } from "next";
import { ChapterPage } from "@/components/narrative/ChapterPage";
import { activistChapter } from "@/content/chapters";
import { areas } from "@/content/narrative";
import { pageMetadata } from "@/lib/site/page-metadata";

const area = areas[4];

export const metadata: Metadata = pageMetadata({
  title: "Activist",
  description: area.deck,
  path: "/activist",
});

export default function ActivistPage() {
  return <ChapterPage chapter={activistChapter} href="/activist" />;
}
