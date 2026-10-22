// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the home page. A person should be able to say who Brant is,
// name three pieces of work, and know how to write him, without hunting.
// The order is the hero, three facts, Intro, the archway photograph,
// then a way to the contact page. The headline stays the same for
// every visitor unless a referral link or a ?hero= preview says otherwise.
// ============================================

import type { Metadata } from "next";
import Image from "next/image";
import { SeeTheWorkButton, WorkSectionView } from "@/components/home/HeroExperiment";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { building, hero, homeRecord, photos } from "@/content/site-content";
import { getActiveReferralVariant } from "@/lib/cms/get-active-referral-variant";
import { getReferralVariantContent } from "@/lib/cms/referral-variant";
import { heroHeadlineFor, parseHeroExperimentId } from "@/lib/hero-experiment";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Brant S. Johnson, product manager and founder",
    description:
      "Brant S. Johnson builds technology as a bridge to real human connection. Product manager and founder, open to relocating.",
    path: "/",
  }),
  title: { absolute: "Brant S. Johnson, product manager and founder" },
};

type HomePageProps = {
  searchParams?: Readonly<Record<string, string | string[] | undefined>>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const variantId = await getActiveReferralVariant(searchParams);
  const copy = getReferralVariantContent(variantId);
  const previewRaw = searchParams?.hero;
  const preview = parseHeroExperimentId(typeof previewRaw === "string" ? previewRaw : previewRaw?.[0]);
  const showPreview = Boolean(preview) && variantId === "default";
  const headline = showPreview && preview ? heroHeadlineFor(preview) : copy.heroHeadline;

  return (
    <>
      {showPreview && preview && <WorkSectionView variant={preview} />}
      <section className="bg-ink text-on-hero">
        <div className="grid lg:min-h-[88vh] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-end px-[var(--page-gutter)] py-14 lg:py-20 lg:pr-16">
            <h1 className="font-serif text-display text-accent" data-hero-variant={showPreview ? preview : "canonical"}>
              {headline}
            </h1>
            <p className="mt-6 max-w-reading text-body text-on-hero">{copy.heroBody}</p>
            <p className="mt-4 text-body text-on-hero">{hero.availability}</p>
            <div className="mt-10">
              {showPreview && preview ? (
                <SeeTheWorkButton href={hero.primaryCta.href} label={hero.primaryCta.label} variant={preview} />
              ) : (
                <Button href={hero.primaryCta.href} track="button:see_work:home">
                  {hero.primaryCta.label}
                </Button>
              )}
            </div>
          </div>
          <div className="relative h-[52vh] sm:h-[64vh] lg:h-auto lg:min-h-[88vh]">
            <Image
              src={photos.speaking.src}
              alt={photos.speaking.alt}
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover object-[center_18%]"
            />
          </div>
        </div>
      </section>

      <section className="shell py-16 md:py-24" aria-label="Selected work">
        <h2 className="font-serif text-h2 text-ink">The short version.</h2>
        <ol className="mt-8">
          {homeRecord.map((item, index) => (
            <li
              key={item.kicker}
              className="grid gap-3 border-t border-border-subtle py-8 md:grid-cols-[4.5rem_14rem_1fr] md:items-baseline md:gap-8"
            >
              <p className="font-serif text-h2 text-ink">0{index + 1}</p>
              <p className="label text-text-secondary">{item.kicker}</p>
              <p className="max-w-reading text-body text-ink">{item.line}</p>
            </li>
          ))}
        </ol>
        <div className="border-t border-border-subtle pt-8">
          <TextLink href="/work" track="link:work:home">
            Read the full record
          </TextLink>
        </div>
      </section>

      <section id="work" className="border-t border-border-subtle">
        <div id="intro" className="shell grid items-center gap-x-16 gap-y-10 py-16 md:py-24 lg:grid-cols-2">
          <div>
            <p className="label text-text-secondary">{building.kicker}</p>
            <h2 className="mt-4 font-serif text-display text-ink">{building.intro.name}</h2>
            <p className="mt-6 max-w-reading text-body text-text-secondary">
              {building.intro.summary} {building.intro.role}, {building.intro.dates}.
            </p>
            <div className="mt-6">
              <TextLink href={building.intro.href} track="link:visit_intro:home">
                Visit Intro
              </TextLink>
            </div>
          </div>
          <Image
            src={photos.intro.src}
            alt={photos.intro.alt}
            width={photos.intro.width}
            height={photos.intro.height}
            sizes="(min-width: 1024px) 420px, 70vw"
            className="mx-auto h-auto w-full max-w-[280px] sm:max-w-[360px]"
          />
        </div>
      </section>

      <section aria-label="Uintah Resilience Archway">
        <figure>
          <Image
            src={photos.archwayCrane.src}
            alt={photos.archwayCrane.alt}
            width={photos.archwayCrane.width}
            height={photos.archwayCrane.height}
            sizes="100vw"
            className="h-auto max-h-[80vh] w-full object-cover"
          />
          <figcaption className="shell flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
            <p className="text-body text-ink">Uintah Resilience Archway, Vernal, Utah.</p>
            <TextLink href="/about#service" track="link:archway:home">
              Read the story
            </TextLink>
          </figcaption>
        </figure>
      </section>

      <section className="shell py-20 md:py-28">
        <h2 className="font-serif text-h2 text-ink">Write me.</h2>
        <p className="mt-4 max-w-reading text-body text-text-secondary">
          If you want to talk about the work, send a note. I read them.
        </p>
        <div className="mt-6">
          <TextLink href="/contact" track="link:contact:home">
            Go to contact
          </TextLink>
        </div>
      </section>
    </>
  );
}
