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
import { booking, building, hiPage, identity, inquiries, publicCv } from "@/content/site-content";
import { notesAreStored } from "@/lib/forms/deliver-note";
import { hiQrSvg } from "@/lib/hi-qr";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Good to meet you",
    description: "A quick introduction to Brant Johnson, Intro, Bridger, and how to keep in touch.",
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
      <section className="shell pb-12">
        <p className="max-w-reading text-body text-text-secondary">{hiPage.deck}</p>
        <div className="mt-10 grid gap-10 border-t border-border-subtle pt-10 md:grid-cols-2">
          <article>
            <h2 className="font-serif text-h3 text-ink">{building.intro.name}</h2>
            <p className="mt-3 text-body text-text-secondary">{building.intro.summary}</p>
            <div className="mt-4">
              <TextLink href={building.intro.href} track="link:visit_intro:hi">
                Visit Intro
              </TextLink>
            </div>
          </article>
          <article>
            <h2 className="font-serif text-h3 text-ink">{building.bridger.name}</h2>
            <p className="mt-3 text-body text-text-secondary">{building.bridger.summary}</p>
            <div className="mt-4">
              <TextLink href={building.bridger.href} track="link:visit_bridger:hi">
                Visit Bridger
              </TextLink>
            </div>
          </article>
        </div>
      </section>
      <section className="shell grid gap-10 border-t border-border-subtle py-16 pb-20 lg:grid-cols-[1.2fr_0.8fr] md:py-24">
        <div>
          <h2 className="font-serif text-h2 text-ink">Keep in touch</h2>
          <div className="mt-4 flex flex-col gap-2">
            <TextLink href={inquiries.href} track="link:inquiries:hi">
              Email me
            </TextLink>
            <TextLink href={booking.href} track="link:book_time:hi">
              {booking.label}
            </TextLink>
            <TextLink href={publicCv.href} track="link:public_cv:hi">
              Full CV
            </TextLink>
            <TextLink href="/about" track="link:about:hi">
              More about me
            </TextLink>
          </div>
          <p className="mt-4 max-w-reading text-body text-text-secondary">
            {stored
              ? "Your name and note are stored so I can follow up. You can ask me to delete them by emailing me from the Contact page."
              : "This opens your email app with the note. Nothing is saved on this site."}
          </p>
          <div className="mt-8">
            <NoteForm kind="hi" metAt={metAt} submitLabel="Open email draft" track="button:submit_hi:hi" />
          </div>
        </div>
        <div>
          <h2 className="font-serif text-h2 text-ink">QR code for this page</h2>
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
