// ============================================
// WHAT THIS FILE DOES (plain English):
// The Crew brand, one view at a time: the wordmark, the motion,
// or the announcement graphics. The words around them are unchanged.
// ============================================

import type { Metadata } from "next";
import Image from "next/image";
import { AreaTags } from "@/components/narrative/AreaTags";
import { PanelTabs } from "@/components/narrative/PanelTabs";
import { SectionFrame } from "@/components/narrative/SectionFrame";
import { StoryLink } from "@/components/narrative/StoryLink";
import { areas, creator } from "@/content/narrative";
import { pageMetadata } from "@/lib/site/page-metadata";

const area = areas[1];
const crew = creator.crew;

export const metadata: Metadata = pageMetadata({
  title: "Crew brand",
  description: "I drew the Crew brand on an iPad.",
  path: "/creator/crew",
});

export default function CrewPage() {
  return (
    <SectionFrame id="crew-brand" kicker="Creator · Crew" title={crew.title} pigment={area.pigment} plate={area.plate}>
      <AreaTags tags={crew.tags} />
      <p className="mt-6 max-w-reading text-body text-text-secondary">{crew.body}</p>
      <div className="mt-8">
        <PanelTabs
          label="Crew brand"
          pigment={area.pigment}
          tabs={[
            {
              id: "wordmark",
              label: "Wordmark",
              content: (
                <Image
                  src={crew.wordmark.src}
                  alt={crew.wordmark.alt}
                  width={crew.wordmark.width}
                  height={crew.wordmark.height}
                  className="h-auto w-full max-w-xl mix-blend-multiply"
                />
              ),
            },
            {
              id: "motion",
              label: "Motion",
              content: (
                <ul className="grid gap-4 sm:grid-cols-2">
                  {crew.motion.map((still) => (
                    <li key={still.src}>
                      {/* GIFs have to be a plain image. next/image freezes the first frame. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={still.src} alt={still.alt} width={still.width} height={still.height} className="h-auto max-h-80 w-full rounded-panel object-contain" />
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              id: "announcements",
              label: "Announcements",
              content: (
                <ul className="grid gap-4 sm:grid-cols-2">
                  {crew.stills.map((still) => (
                    <li key={still.src}>
                      <Image
                        src={still.src}
                        alt={still.alt}
                        width={still.width}
                        height={still.height}
                        className="h-auto w-full rounded-panel"
                      />
                    </li>
                  ))}
                </ul>
              ),
            },
          ]}
        />
      </div>
      <p className="mt-8">
        <StoryLink href={crew.back.href} track={crew.back.track}>
          {crew.back.text}
        </StoryLink>
      </p>
    </SectionFrame>
  );
}
