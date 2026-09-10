// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the footer at the bottom of every public page. It offers one
// warm invitation to get in touch (which links to the Contact page, so
// the email itself is never duplicated here), a short list of the main
// destinations, and a quiet credit line. It reads its links from
// content/site.ts.
// ============================================

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { nav, site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";

// THIS SECTION DOES: pick a few destinations to feature, skipping Home and Contact (Contact has its own line)
const footerLinks = nav.filter((link) => link.href !== "/" && link.href !== "/contact");

// THIS SECTION DOES: render the invitation, the destination list, and the credit line
export function SiteFooter() {
  return (
    <Container as="footer" className="pb-16 pt-10">
      <GlassPanel padding="lg" className="md:p-12">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          {/* THIS SECTION DOES: the one call to reach out, pointing to the Contact page */}
          <div>
            <h2 className="max-w-[420px] font-heading text-h2 font-medium tracking-tight text-ink">
              If you are building something that brings people together, I want to hear about it.
            </h2>
            <Link
              href="/contact"
              data-track="link:go_contact:global"
              className="focus-ring mt-6 inline-flex items-center gap-1.5 rounded-sm font-heading text-[15px] text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-ink"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* THIS SECTION DOES: quick links to the main sections */}
          <ul className="grid gap-3 sm:grid-cols-2 md:gap-x-10">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-track={`nav_item:${link.label.toLowerCase().replace(/\s+/g, "_")}:footer`}
                  className="focus-ring block rounded-sm font-heading text-[14.5px] text-ink transition-colors hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* THIS SECTION DOES: the quiet credit line */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">{site.name}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">Built in 2026</p>
        </div>
      </GlassPanel>
    </Container>
  );
}
