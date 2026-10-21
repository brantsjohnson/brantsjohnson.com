// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the short page Brant can text from an event. It is not in
// the main navigation. It takes a follow-up note and shows a QR code.
// The event name can be prefilled with ?e= on the link.
// ============================================

import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { NoteForm } from "@/components/forms/NoteForm";
import { hiPage, identity } from "@/content/site-content";
import { notesAreStored } from "@/lib/forms/deliver-note";
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
  const stored = notesAreStored();

  return (
    <>
      <PageHero eyebrow={hiPage.eyebrow} title="Good to meet you." deck={hiPage.deck} />
      <section className="shell grid gap-10 py-12 pb-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="max-w-reading text-body text-text-secondary">
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
          <div className="mt-4 max-w-[220px] bg-bg p-3" dangerouslySetInnerHTML={{ __html: qr }} />
        </div>
      </section>
    </>
  );
}
