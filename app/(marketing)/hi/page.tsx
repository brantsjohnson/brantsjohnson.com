// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the short page Brant can text from an event. It is not in
// the main navigation. It offers both products, a booking link, a
// follow-up note, and a QR code. The event name can be prefilled
// with ?e= on the link.
// ============================================

import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { NoteForm } from "@/components/forms/NoteForm";
import { TextLink } from "@/components/ui/TextLink";
import { booking, building, hiPage, identity, publicCv } from "@/content/site-content";
import { notesAreStored } from "@/lib/forms/deliver-note";
import { hiQrSvg } from "@/lib/hi-qr";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Hi",
    description: "A short page for people who just met Brant S. Johnson.",
    path: "/hi",
  }),
  robots: { index: false, follow: false },
};

type HiPageProps = {
  searchParams?: { e?: string };
};

export default async function HiPage({ searchParams }: HiPageProps) {
  const metAt = typeof searchParams?.e === "string" ? searchParams.e.replace(/-/g, " ") : "";
  const qr = await hiQrSvg(`${identity.siteUrl}/hi`);
  const stored = notesAreStored();

  return (
    <>
      <PageHero eyebrow={hiPage.eyebrow} title={hiPage.title} deck={hiPage.line} />
      <section className="shell pb-4">
        <p className="max-w-reading text-body text-text-secondary">{hiPage.deck}</p>
        <div className="mt-10 max-w-reading border-t border-border-subtle py-8">
          <p className="label text-text-secondary">Try it</p>
          <h2 className="mt-3 font-serif text-h2 text-ink">{building.intro.name}</h2>
          <p className="mt-3 text-body text-text-secondary">{building.intro.summary}</p>
          <div className="mt-4">
            <TextLink href={building.intro.href} track="link:visit_intro:hi">
              Visit Intro
            </TextLink>
          </div>
        </div>
        <div className="max-w-reading border-t border-border-subtle py-8">
          <h2 className="font-serif text-h2 text-ink">{building.bridger.name}</h2>
          <p className="mt-3 text-body text-text-secondary">{building.bridger.summary}</p>
          <div className="mt-4">
            <TextLink href={building.bridger.href} track="link:visit_bridger:hi">
              Visit Bridger
            </TextLink>
          </div>
        </div>
      </section>
      <section className="shell grid gap-10 py-8 pb-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="font-serif text-h2 text-ink">Stay in touch</h2>
          <div className="mt-4 flex flex-col gap-2">
            <TextLink href={booking.href} track="link:book_time:hi">
              {booking.label}
            </TextLink>
            <TextLink href={publicCv.href} track="link:public_cv:hi">
              {publicCv.label}
            </TextLink>
          </div>
          <p className="mt-4 max-w-reading text-body text-text-secondary">
            {stored
              ? "Your name and note are stored so I can follow up. You can ask me to delete them by emailing me from the Contact page."
              : "Sending opens your email app with this note. Nothing is kept on this site."}
          </p>
          <div className="mt-8">
            <NoteForm kind="hi" metAt={metAt} submitLabel="Send my note" track="button:submit_hi:hi" />
          </div>
        </div>
        <div>
          <h2 className="font-serif text-h2 text-ink">QR for this page</h2>
          <div
            className="mt-4 max-w-[220px] bg-bg p-3"
            role="img"
            aria-label="QR code for brantsjohnson.com/hi"
            dangerouslySetInnerHTML={{ __html: qr }}
          />
        </div>
      </section>
    </>
  );
}
