// ============================================
// WHAT THIS FILE DOES (plain English):
// The companies he started or led, with live screenshots. Bridger stays a TestFlight beta with no user count.
// ============================================

import type { Metadata } from "next";
import { ChapterPage } from "@/components/narrative/ChapterPage";
import { entrepreneurChapter } from "@/content/chapters";
import { areas } from "@/content/narrative";
import { pageMetadata } from "@/lib/site/page-metadata";

const area = areas[3];

export const metadata: Metadata = pageMetadata({
  title: "Entrepreneur",
  description: area.deck,
  path: "/entrepreneur",
});

export default function EntrepreneurPage() {
  return <ChapterPage chapter={entrepreneurChapter} href="/entrepreneur" />;
}
