// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Now page. It says what Brant is doing this month,
// in a few sentences from the checked public record. It is linked
// from the footer, not the main navigation.
// ============================================

import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { TextLink } from "@/components/ui/TextLink";
import { nowPage } from "@/content/site-content";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Now",
  description: "What Brant Johnson is working on right now.",
  path: "/now",
});

export default function NowPage() {
  return (
    <>
      <PageHero eyebrow={nowPage.eyebrow} title={nowPage.title} />
      <div className="shell pb-20">
        <div className="flex max-w-reading flex-col gap-6">
        {nowPage.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="text-body text-text-secondary">
            {paragraph}
          </p>
        ))}
        <div className="flex flex-col gap-2">
          <TextLink href="/work/intro" track="link:intro:now">
            Intro
          </TextLink>
          <TextLink href="/work/bridger" track="link:bridger:now">
            Bridger
          </TextLink>
        </div>
        </div>
      </div>
    </>
  );
}
