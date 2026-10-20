// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Home page. It opens with the bridge line, shows five
// proof numbers, then Intro beside Bridger, then Writing when a real post exists.
// Referral links can swap the hero lines. They do not change the facts.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { OpenChatButton } from "@/components/chatbot/OpenChatButton";
import { Button } from "@/components/ui/Button";
import { building, hero, proofChips } from "@/content/site-content";
import { getActiveReferralVariant } from "@/lib/cms/get-active-referral-variant";
import { getReferralVariantContent } from "@/lib/cms/referral-variant";
import { getPublicWriting } from "@/lib/writing/public-posts";

export const metadata: Metadata = {
  title: "Home",
  description: hero.subline,
};

type HomePageProps = {
  searchParams?: Readonly<Record<string, string | string[] | undefined>>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const variantId = await getActiveReferralVariant(searchParams);
  const copy = getReferralVariantContent(variantId);
  const writing = await getPublicWriting();
  const latest = writing.posts.slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Brant S. Johnson"
        title={copy.heroHeadline}
        deck={copy.heroBody}
        tall
        mark
        actions={
          <>
            <OpenChatButton track="button:open_chat:home">{hero.primaryCta}</OpenChatButton>
            <Button href={hero.secondaryCta.href} variant="line" track="button:see_work:home">
              {hero.secondaryCta.label}
            </Button>
          </>
        }
      />

      <section aria-label="Proof" className="border-b border-border-subtle">
        <ol className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
          {proofChips.map((chip) => (
            <li key={chip.value}>
              <p className="font-serif text-h2 text-ink">{chip.value}</p>
              <div className="mt-3 h-px w-10 bg-accent" />
              <p className="mt-3 text-caption text-text-secondary">{chip.label}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="building-title" className="shell py-16">
        <div>
          <h2 id="building-title" className="font-serif text-h2 text-ink">
            {building.kicker}
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <article className="flex flex-col justify-between bg-ink p-8 text-on-hero lg:col-span-7 lg:min-h-[360px] lg:p-12">
              <div>
                <p className="text-caption uppercase tracking-[0.18em] text-accent">{building.intro.role}</p>
                <h3 className="mt-3 font-serif text-display text-accent">{building.intro.name}</h3>
                <p className="mt-4 max-w-reading text-body">{building.intro.summary}</p>
                <p className="mt-2 text-caption text-muted">{building.intro.dates}</p>
              </div>
              <div className="mt-8">
                <Button href={building.intro.href} track="button:visit_intro:home">
                  {building.intro.hrefLabel}
                </Button>
              </div>
            </article>
            <article className="flex flex-col justify-between border border-ink p-8 lg:col-span-5">
              <div>
                <p className="text-caption uppercase tracking-[0.18em] text-text-secondary">{building.bridger.role}</p>
                <h3 className="mt-3 font-serif text-h1 text-ink">{building.bridger.name}</h3>
                <p className="mt-4 text-body text-text-secondary">{building.bridger.summary}</p>
                <p className="mt-2 text-caption text-text-secondary">{building.bridger.dates}</p>
              </div>
              <div className="mt-8">
                <Button href={building.bridger.href} variant="ghost" track="button:visit_bridger:home">
                  {building.bridger.hrefLabel}
                </Button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {writing.show && (
        <section aria-labelledby="writing-title" className="border-t border-border-subtle">
          <div className="shell grid gap-8 py-16 md:grid-cols-[220px_1fr]">
            <h2 id="writing-title" className="font-serif text-h2 text-ink">
              Writing
            </h2>
            <ul className="flex flex-col gap-6">
              {latest.map((post) => (
                <li key={post.id}>
                  {post.external ? (
                    <a
                      href={post.href}
                      data-track="link:open_writing:home"
                      className="font-serif text-h3 text-ink"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {post.title}
                    </a>
                  ) : (
                    <Link href={post.href} data-track="link:open_writing:home" className="font-serif text-h3 text-ink">
                      {post.title}
                    </Link>
                  )}
                  {post.excerpt && <p className="mt-2 text-body text-text-secondary">{post.excerpt}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
