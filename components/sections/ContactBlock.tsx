// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Contact page's single glass card: a short human line and
// the email address. The email is shown here and nowhere else on the
// public site. The button opens a mail draft. There is no contact form
// in this pass.
// ============================================

import { ArrowUpRight } from "lucide-react";
import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";

// THIS SECTION DOES: render the centered contact card with the mailto action
export function ContactBlock() {
  const mailto = `mailto:${site.email}`;

  return (
    <GlassPanel padding="lg" className="w-full max-w-xl px-8 py-12 sm:px-14 sm:py-16">
      <Eyebrow>{contact.eyebrow}</Eyebrow>
      <h1 id="contact-heading" className="mt-6 font-heading text-h1 font-medium tracking-tight text-ink">
        {contact.heading}
      </h1>
      <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-soft">{contact.note}</p>

      <div className="mt-10 border-t border-line pt-8">
        <a
          href={mailto}
          data-track="link:mailto:contact"
          className="focus-ring rounded-sm text-lg font-medium tracking-tight text-brand underline-offset-[6px] hover:underline sm:text-xl"
        >
          {site.email}
        </a>
        <div className="mt-8">
          <Button
            href={mailto}
            trackId="button:send_note:contact"
            trailingIcon={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
          >
            {contact.ctaLabel}
          </Button>
        </div>
      </div>
    </GlassPanel>
  );
}
