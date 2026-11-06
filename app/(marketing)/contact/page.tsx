// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Contact page. Email Brant opens the visitor's mail app
// with me@brantsjohnson.com already in the To line. LinkedIn and Book
// time open their pages. The form sends a note to that same address.
// The address comes from the shared inquiries record so it stays one email.
// ============================================

import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { NoteForm } from "@/components/forms/NoteForm";
import { booking, contactIntro, identity, inquiries } from "@/content/site-content";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with Brant Johnson by email or LinkedIn.",
  path: "/contact",
  image: { kicker: "Contact" },
});

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow={contactIntro.eyebrow} title={contactIntro.title} deck={contactIntro.deck} />
      <div className="shell grid gap-12 pb-20 md:grid-cols-[0.8fr_1.1fr]">
        <div>
          <h2 className="font-serif text-h3 text-ink">Ways to reach me</h2>
          <ul className="mt-5 flex flex-col gap-3">
            <li>
              <Button href={inquiries.href} track="link:inquiries:contact" className="w-full justify-start">
                Email Brant
              </Button>
            </li>
            <li>
              <Button href={identity.linkedin} variant="ghost" track="link:linkedin:contact" className="w-full justify-start">
                LinkedIn
              </Button>
            </li>
            <li>
              <Button href={booking.href} variant="ghost" track="link:book_time:contact" className="w-full justify-start">
                {booking.label}
              </Button>
            </li>
          </ul>
        </div>
        <NoteForm kind="contact" submitLabel="Send message" track="button:submit_contact:contact" />
      </div>
    </>
  );
}
