// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Contact page, and it is the one place the email
// address is printed. The form delivers a note. LinkedIn is the
// other working link.
// ============================================

import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { NoteForm } from "@/components/forms/NoteForm";
import { contactIntro, identity } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description: contactIntro.deck,
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow={contactIntro.eyebrow} title={contactIntro.title} deck={contactIntro.deck} />
      <div className="shell grid gap-12 py-16 md:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col gap-4">
          <a
            href={`mailto:${identity.email}`}
            data-track="link:email:contact"
            className="font-serif text-h2 text-ink underline decoration-accent underline-offset-8"
          >
            {identity.email}
          </a>
          <a
            href={identity.linkedin}
            data-track="link:linkedin:contact"
            className="text-body underline decoration-accent underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <NoteForm kind="contact" submitLabel="Send the note" track="button:submit_contact:contact" />
      </div>
    </>
  );
}
