// ============================================
// WHAT THIS FILE DOES (plain English):
// The town, the scholarship, and the government work, one tab each.
// The archway video has no caption track. The paragraph and the
// figcaption are the text a visitor can read.
// ============================================

import type { Metadata } from "next";
import { AreaRail } from "@/components/narrative/AreaRail";
import { CopyText } from "@/components/narrative/CopyText";
import { PanelTabs } from "@/components/narrative/PanelTabs";
import { SectionFrame } from "@/components/narrative/SectionFrame";
import { areas, activist } from "@/content/narrative";
import { pageMetadata } from "@/lib/site/page-metadata";

const area = areas[4];

export const metadata: Metadata = pageMetadata({
  title: "Activist",
  description: area.deck,
  path: "/activist",
});

export default function ActivistPage() {
  return (
    <SectionFrame id="activist" kicker="05 · Activist" title={activist.title} pigment={area.pigment} plate={area.plate}>
      <p className="max-w-reading text-body text-text-secondary">{activist.intro}</p>
      <div className="mt-8">
        <PanelTabs
          label="Activist work"
          pigment={area.pigment}
          tabs={[
            {
              id: "archway",
              label: "Archway",
              content: (
                <article>
                  <h2 className="font-serif text-h3 text-ink">{activist.archway.title}</h2>
                  {activist.archway.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)} className="mt-4 max-w-reading text-body text-text-secondary">
                      {paragraph}
                    </p>
                  ))}
                  <figure className="mt-6 max-w-xl">
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      poster={activist.archway.video.poster}
                      aria-label={activist.archway.video.label}
                      className="max-h-72 w-full rounded-panel bg-ink"
                    >
                      <source src={activist.archway.video.webm} type="video/webm" />
                      <source src={activist.archway.video.mp4} type="video/mp4" />
                    </video>
                    <figcaption className="mt-3 text-caption text-text-secondary">{activist.archway.video.label}</figcaption>
                  </figure>
                </article>
              ),
            },
            {
              id: "scholarship",
              label: "Scholarship",
              content: (
                <article>
                  <h2 className="font-serif text-h3 text-ink">{activist.scholarship.title}</h2>
                  {activist.scholarship.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)} className="mt-4 max-w-reading text-body text-text-secondary">
                      {paragraph}
                    </p>
                  ))}
                </article>
              ),
            },
            {
              id: "government",
              label: "Government",
              content: (
                <article>
                  <h2 className="font-serif text-h3 text-ink">{activist.government.title}</h2>
                  <div className="mt-4">
                    <CopyText parts={activist.government.parts} />
                  </div>
                </article>
              ),
            },
          ]}
        />
      </div>
      <AreaRail current="/activist" />
    </SectionFrame>
  );
}
