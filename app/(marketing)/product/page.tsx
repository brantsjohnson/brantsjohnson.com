// ============================================
// WHAT THIS FILE DOES (plain English):
// The product section: short stops on the career, each with its photos, plus the full work history link.
// ============================================

import type { Metadata } from "next";
import { ChapterPage } from "@/components/narrative/ChapterPage";
import { StoryLink } from "@/components/narrative/StoryLink";
import { productChapter } from "@/content/chapters";
import { areas } from "@/content/narrative";
import { pageMetadata } from "@/lib/site/page-metadata";

const area = areas[0];

export const metadata: Metadata = pageMetadata({
  title: "Senior Product Manager",
  description: area.deck,
  path: "/product",
});

export default function ProductPage() {
  return <ChapterPage chapter={productChapter} href="/product" extra={
    <p>
      <StoryLink href="/work" track="link:work_history:product">
        See full work history
      </StoryLink>
    </p>
  } />;
}
