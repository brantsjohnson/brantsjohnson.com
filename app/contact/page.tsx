import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/content/site";

/**
 * Contact page.
 *
 * Purpose: a simple, direct way to reach Brant. There is no form or backend on
 * purpose — the marketing site needs no secrets — so this points straight at
 * the email address from content/site.ts.
 */
export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        intro="The best way to reach me is email. I read everything, and I try to reply."
      />

      <Container className="pb-8">
        <div className="mt-4 rounded-2xl border border-ink/10 bg-white p-8">
          <p className="text-sm uppercase tracking-widest text-ink-muted">
            Email
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-2 inline-block font-serif text-2xl font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent sm:text-3xl"
          >
            {site.email}
          </a>
        </div>
      </Container>
    </>
  );
}
