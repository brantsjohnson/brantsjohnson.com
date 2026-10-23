// ============================================
// WHAT THIS FILE DOES (plain English):
// Theater and performing live here, including BYU Young Ambassadors.
// The photo frame stays empty until a picture is ready.
// The essay and the product link stay in the sentence.
// ============================================

import type { Metadata } from "next";
import { AreaRail } from "@/components/narrative/AreaRail";
import { AreaTags } from "@/components/narrative/AreaTags";
import { PhotoSlot } from "@/components/narrative/PhotoSlot";
import { SectionFrame } from "@/components/narrative/SectionFrame";
import { StoryLink } from "@/components/narrative/StoryLink";
import { areas, performer } from "@/content/narrative";
import { pageMetadata } from "@/lib/site/page-metadata";

const area = areas[2];

export const metadata: Metadata = pageMetadata({
  title: "Performer",
  description: area.deck,
  path: "/performer",
});

export default function PerformerPage() {
  return (
    <SectionFrame id="performer" kicker="03 · Performer" title={performer.title} pigment={area.pigment} plate={area.plate}>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div>
          <AreaTags tags={performer.tags} />
          <div className="mt-6 flex flex-col gap-6">
            {performer.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="max-w-reading text-body text-text-secondary">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <StoryLink href={performer.workLink.href} track={performer.workLink.track}>
              {performer.workLink.text}
            </StoryLink>
            <StoryLink href={performer.essay.href} track={performer.essay.track}>
              {performer.essay.text}
            </StoryLink>
          </div>
        </div>
        <PhotoSlot orientation="landscape" className="max-w-none lg:aspect-[4/5]" />
      </div>
      <AreaRail current="/performer" />
    </SectionFrame>
  );
}
