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
import { creatorChapter } from "@/content/chapters";
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
                  sizes="(min-width: 768px) 36rem, 100vw"
                  loading="lazy"
                  className="h-auto w-full max-w-xl rounded-panel bg-[#f4f2ec] p-4"
                />
              ),
            },
            {
              id: "motion",
              label: "Motion",
              content: (
                <ul className="grid gap-4 sm:grid-cols-2">
                  {crew.motion.map((clip) => (
                    <li key={clip.mp4}>
                      <video
                        loop
                        muted
                        autoPlay
                        playsInline
                        preload="none"
                        poster={clip.poster}
                        width={clip.width}
                        height={clip.height}
                        aria-label={clip.alt}
                        className="h-auto max-h-80 w-full rounded-panel object-contain"
                      >
                        <source src={clip.webm} type="video/webm" />
                        <source src={clip.mp4} type="video/mp4" />
                      </video>
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              id: "illustrations",
              label: "Illustrations",
              content: (
                <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {creatorChapter.strip.map((still) => (
                    <li
                      key={still.src}
                      className="relative overflow-hidden rounded-[6px] border border-border-subtle"
                      style={{ aspectRatio: "1 / 1", background: still.bg ?? "var(--color-surface)" }}
                    >
                      <Image
                        src={still.src}
                        alt={still.alt}
                        fill
                        sizes="(min-width: 768px) 22vw, 46vw"
                        quality={70}
                        loading="lazy"
                        className="object-contain p-2"
                      />
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
                        sizes="(min-width: 640px) 40vw, 100vw"
                        loading="lazy"
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
