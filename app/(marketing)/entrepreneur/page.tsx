// ============================================
// WHAT THIS FILE DOES (plain English):
// The companies he started or led, as three cards. Bridger stays
// a TestFlight beta with no user count. The closing line is his.
// ============================================

import type { Metadata } from "next";
import Image from "next/image";
import { AreaRail } from "@/components/narrative/AreaRail";
import { AreaTags } from "@/components/narrative/AreaTags";
import { SectionFrame } from "@/components/narrative/SectionFrame";
import { StoryLink } from "@/components/narrative/StoryLink";
import { areas, entrepreneur } from "@/content/narrative";
import { pageMetadata } from "@/lib/site/page-metadata";

const area = areas[3];

export const metadata: Metadata = pageMetadata({
  title: "Entrepreneur",
  description: area.deck,
  path: "/entrepreneur",
});

export default function EntrepreneurPage() {
  return (
    <SectionFrame
      id="entrepreneur"
      kicker="04 · Entrepreneur"
      title={entrepreneur.title}
      pigment={area.pigment}
      plate={area.plate}
    >
      <p className="max-w-reading text-body text-text-secondary">{entrepreneur.intro}</p>
      <ul className="mt-8 grid gap-4 lg:grid-cols-3">
        {entrepreneur.cards.map((card) => (
          <li key={card.name} className="flex flex-col rounded-panel border border-border-subtle bg-surface p-5 shadow-glass">
            {card.image ? (
              <Image
                src={card.image.src}
                alt={card.image.alt}
                width={card.image.width}
                height={card.image.height}
                sizes="(min-width: 1024px) 30vw, 100vw"
                loading="lazy"
                className="mb-4 h-40 w-full rounded-panel object-cover object-top"
              />
            ) : null}
            <h2 className="font-serif text-h3 text-ink">{card.name}</h2>
            <p className="mt-1 text-caption text-text-secondary">
              {card.role} · {card.dates}
            </p>
            <p className="mt-3 flex-1 text-body text-text-secondary">{card.summary}</p>
            <div className="mt-4">
              <AreaTags tags={card.tags} />
            </div>
            {card.href && card.hrefLabel ? (
              <p className="mt-3">
                <StoryLink href={card.href} track={card.track}>
                  {card.hrefLabel}
                </StoryLink>
              </p>
            ) : null}
          </li>
        ))}
      </ul>
      <div className="mt-8 rounded-panel border border-border-subtle bg-surface p-6 shadow-glass">
        <p className="max-w-reading text-body text-text-secondary">{entrepreneur.close}</p>
        <p className="mt-4 font-serif text-h2 text-ink">{entrepreneur.echo}</p>
      </div>
      <AreaRail current="/entrepreneur" />
    </SectionFrame>
  );
}
