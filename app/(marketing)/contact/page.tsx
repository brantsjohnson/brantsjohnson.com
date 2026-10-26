// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Contact page, and it is the one place the email
// addresses are printed. The form is the filled button. Inquiries,
// LinkedIn, and Book time are text links.
// ============================================

import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { TextLink } from "@/components/ui/TextLink";
import { NoteForm } from "@/components/forms/NoteForm";
import { booking, contactIntro, identity, inquiries } from "@/content/site-content";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with Brant Johnson by email or LinkedIn.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow={contactIntro.eyebrow} title={contactIntro.title} deck={contactIntro.deck} />
      <div className="shell grid gap-12 pb-20 md:grid-cols-[0.8fr_1.1fr]">
        <div>
          <p className="label text-text-secondary">Email</p>
          <div className="mt-2">
            <TextLink href={inquiries.href} track="link:inquiries:contact">
              {inquiries.email}
            </TextLink>
          </div>
          <div className="mt-8 flex flex-col gap-1">
          <p className="label mb-1 text-text-secondary">Other email</p>
          <TextLink href={`mailto:${identity.email}`} track="link:email:contact">
            {identity.email}
          </TextLink>
          <TextLink href={identity.linkedin} track="link:linkedin:contact">
            LinkedIn
          </TextLink>
          <TextLink href={booking.href} track="link:book_time:contact">
            {booking.label}
          </TextLink>
          </div>
        </div>
        <NoteForm kind="contact" submitLabel="Send message" track="button:submit_contact:contact" />
      </div>
    </>
  );
}
