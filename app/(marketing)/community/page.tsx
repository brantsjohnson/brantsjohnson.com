// ============================================
// WHAT THIS FILE DOES (plain English):
// The Community page. The archway and the scholarship lead, each
// with a large photo and a link to its own page. Public service
// and student government sit beneath them, with a grid of photos
// whose captions show on hover.
// ============================================

import type { Metadata } from "next";
import { Figure } from "@/components/editorial/Figure";
import { Gallery } from "@/components/editorial/Gallery";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Prose } from "@/components/editorial/Prose";
import { Reveal } from "@/components/editorial/Reveal";
import { OnwardLinks } from "@/components/editorial/OnwardLinks";
import { communityIntro, communityLeads, publicService, serviceGallery, studentGovernment } from "@/content/community";
import { sectionCovers } from "@/content/covers";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Leadership",
  description: communityIntro.description,
  path: "/community",
  image: { photo: sectionCovers.community },
});

export default function CommunityPage() {
  return (
    <>
      <PageHeader id="community" label={communityIntro.label} title={communityIntro.title} lead={communityIntro.lead} />

      <section aria-label="Lead stories" className="shell grid gap-x-10 gap-y-20 pb-24 md:grid-cols-2">
        {communityLeads.map((item, index) => (
          <Reveal key={item.slug} delay={index * 0.12} className={index === 1 ? "md:mt-24" : undefined}>
            <Figure photo={item.photo} ratio={index === 0 ? "4 / 5" : "1 / 1"} priority sizes="(min-width: 768px) 46vw, 92vw" />
            <h2 className="mt-6 font-serif text-[clamp(2rem,3.4vw,3rem)] leading-[1.02] text-ink">{item.title}</h2>
            <p className="mt-4 max-w-[40ch] text-body text-text-secondary">{item.body}</p>
            <OnwardLinks
              className="mt-5"
              links={[{ text: item.linkText, href: item.href, track: `link:${item.slug}:community` }]}
            />
          </Reveal>
        ))}
      </section>

      <section id="public-service" aria-labelledby="public-service-title" className="scroll-mt-24 border-t border-border-subtle py-16 md:py-24">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <h2 id="public-service-title" className="font-serif text-h2 text-ink">
              {publicService.title}
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <Prose body={publicService.body} />
          </Reveal>
        </div>
      </section>

      <section id="student-government" aria-labelledby="student-government-title" className="scroll-mt-24 border-t border-border-subtle py-16 md:py-24">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <h2 id="student-government-title" className="font-serif text-h2 text-ink">
              {studentGovernment.title}
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <Prose body={studentGovernment.body} />
            <OnwardLinks className="mt-6" links={[studentGovernment.link]} />
            <p className="mt-8 max-w-reading text-body text-text-secondary">{studentGovernment.extra}</p>
          </Reveal>
        </div>
      </section>

      <Gallery title="Photos from public service" intro="Hover over a photo for its caption." photos={serviceGallery} />
    </>
  );
}
