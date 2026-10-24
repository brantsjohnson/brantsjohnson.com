// ============================================
// WHAT THIS FILE DOES (plain English):
// The Community page. The archway and the scholarship lead, each
// with a large photo and a link to its own page. Public service
// (government work and student leadership) sits beneath them, with
// a grid of photos whose captions show on hover.
// ============================================

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Gallery } from "@/components/editorial/Gallery";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Reveal } from "@/components/editorial/Reveal";
import { StoryRow } from "@/components/editorial/StoryRow";
import { communityCases, communityIntro, serviceGallery, serviceStories } from "@/content/community";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Community",
  description: communityIntro.lead,
  path: "/community",
});

export default function CommunityPage() {
  return (
    <>
      <PageHeader id="community" label={communityIntro.label} title={communityIntro.title} lead={communityIntro.lead} />

      <section aria-label="Lead stories" className="shell grid gap-x-10 gap-y-20 pb-24 md:grid-cols-2">
        {communityCases.map((item, index) => (
          <Reveal key={item.slug} delay={index * 0.12} className={index === 1 ? "md:mt-24" : undefined}>
            <Link href={item.href} data-track={`link:${item.slug}:community`} className="group block">
              <div className="relative overflow-hidden bg-surface-2" style={{ aspectRatio: index === 0 ? "4 / 5" : "1 / 1" }}>
                <Image
                  src={item.cover.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 46vw, 92vw"
                  quality={80}
                  priority
                  className="transition-transform duration-[1200ms] ease-brand group-hover:scale-[1.04]"
                  style={{ objectFit: "cover", objectPosition: item.cover.position ?? "50% 50%" }}
                />
              </div>
              <p className="label mt-6 text-accent-deep">{item.kind}</p>
              <h2 className="mt-3 font-serif text-[clamp(2rem,3.4vw,3rem)] leading-[1.02] text-ink">{item.title}</h2>
              <p className="mt-4 max-w-[40ch] text-body text-text-secondary">{item.blurb}</p>
              <p className="label mt-5 inline-flex items-center gap-3 text-ink group-hover:text-accent-deep">
                Read the story <span aria-hidden="true">→</span>
              </p>
            </Link>
          </Reveal>
        ))}
      </section>

      <div id="public-service" className="scroll-mt-24">
        <div className="shell border-t border-border-subtle pt-16">
          <div className="gold-rule" aria-hidden="true" />
          <h2 className="mt-6 font-serif text-h2 text-ink">Public service</h2>
        </div>
        {serviceStories.map((story, index) => (
          <StoryRow key={story.id} story={story} flip={index % 2 === 0} />
        ))}
      </div>

      <Gallery title="Along the way" intro="Moments from public service. Hover a photo for its caption." photos={serviceGallery} />
    </>
  );
}
