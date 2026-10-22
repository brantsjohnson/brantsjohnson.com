// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Contact page, and it is the one place the email
// address is printed. The form is the filled button. LinkedIn is a
// text link.
// ============================================

import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { TextLink } from "@/components/ui/TextLink";
import { NoteForm } from "@/components/forms/NoteForm";
import { contactIntro, identity } from "@/content/site-content";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Write Brant S. Johnson. He reads the notes.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow={contactIntro.eyebrow} title={contactIntro.title} deck={contactIntro.deck} />
      <div className="shell grid gap-12 py-12 pb-20 md:grid-cols-[0.8fr_1.1fr]">
        <div className="flex flex-col gap-2">
          <TextLink href={`mailto:${identity.email}`} track="link:email:contact">
            {identity.email}
          </TextLink>
          <TextLink href={identity.linkedin} track="link:linkedin:contact">
            LinkedIn
          </TextLink>
        </div>
        <NoteForm kind="contact" submitLabel="Send the note" track="button:submit_contact:contact" />
      </div>
    </>
  );
}
