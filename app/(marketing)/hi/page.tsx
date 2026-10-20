// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the short page Brant can text from an event. It says what
// he does, links the two live products, and takes a follow-up note.
// The event name can be prefilled with ?e= on the link. A QR code
// points at this page on the public site.
// ============================================

import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { NoteForm } from "@/components/forms/NoteForm";
import { building, hiPage, identity } from "@/content/site-content";
import { hiQrSvg } from "@/lib/hi-qr";

export const metadata: Metadata = {
  title: "Hi",
  description: hiPage.title,
  robots: { index: false, follow: false },
};

type HiPageProps = {
  searchParams?: { e?: string };
};

export default async function HiPage({ searchParams }: HiPageProps) {
  const metAt = typeof searchParams?.e === "string" ? searchParams.e.replace(/-/g, " ") : "";
  const qr = await hiQrSvg(`${identity.siteUrl}/hi`);

  return (
    <>
      <PageHero eyebrow={hiPage.eyebrow} title={hiPage.title} deck={hiPage.deck} tall />
      <section className="shell grid gap-6 py-16 md:grid-cols-2">
        <article className="flex flex-col justify-between bg-ink p-8 text-on-hero">
          <div>
            <h2 className="font-serif text-h1 text-accent">{building.intro.name}</h2>
            <p className="mt-3 text-body">{building.intro.summary}</p>
          </div>
          <div className="mt-8">
            <Button href={building.intro.href} track="button:visit_intro:hi">
              {building.intro.hrefLabel}
            </Button>
          </div>
        </article>
        <article className="flex flex-col justify-between border border-ink p-8">
          <div>
            <h2 className="font-serif text-h1 text-ink">{building.bridger.name}</h2>
            <p className="mt-3 text-body text-text-secondary">{building.bridger.summary}</p>
          </div>
          <div className="mt-8">
            <Button href={building.bridger.href} variant="ghost" track="button:visit_bridger:hi">
              {building.bridger.hrefLabel}
            </Button>
          </div>
        </article>
      </section>

      <section className="border-t border-border-subtle">
        <div className="shell grid gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="font-serif text-h2 text-ink">Stay in touch</h2>
            <p className="mt-4 max-w-reading text-body text-text-secondary">{hiPage.privacy}</p>
            <div className="mt-8">
              <NoteForm kind="hi" metAt={metAt} submitLabel="Send my note" track="button:submit_hi:hi" />
            </div>
          </div>
          <div>
            <h2 className="font-serif text-h3 text-ink">QR for this page</h2>
            <div
              className="mt-4 max-w-[220px] bg-bg p-3"
              dangerouslySetInnerHTML={{ __html: qr }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
