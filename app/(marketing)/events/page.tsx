// ============================================
// WHAT THIS FILE DOES (plain English):
// The Events page: an archive of events grouped by kind. Each entry
// has a small label, a short note and a link to its story. A small
// photo sits beside entries that have one. New events are added in
// content/events.ts without changing this page.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { Figure } from "@/components/editorial/Figure";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Prose } from "@/components/editorial/Prose";
import { Reveal } from "@/components/editorial/Reveal";
import { eventGroups, eventsIntro } from "@/content/events";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Events",
  description: eventsIntro.description,
  path: "/events",
});

export default function EventsPage() {
  return (
    <>
      <PageHeader id="events" label={eventsIntro.label} title={eventsIntro.title} lead={eventsIntro.lead}>
        <Prose body={eventsIntro.body} className="mt-8" />
      </PageHeader>

      {eventGroups.map((group) => (
        <section key={group.id} aria-labelledby={`${group.id}-title`} className="border-t border-border-subtle py-14 md:py-20">
          <div className="shell grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <h2 id={`${group.id}-title`} className="font-serif text-h2 text-ink">
                {group.title}
              </h2>
            </Reveal>
            <ul className="lg:col-span-8">
              {group.items.map((item, index) => (
                <Reveal as="li" key={item.href} delay={index * 0.05} className="grid gap-6 border-t border-border-subtle py-8 first:border-t-0 first:pt-0 sm:grid-cols-[1fr_11rem]">
                  <div>
                    <p className="label text-[0.66rem] text-accent-deep">{item.tag}</p>
                    <h3 className="mt-2 font-serif text-[1.9rem] leading-tight text-ink">{item.title}</h3>
                    <p className="mt-3 max-w-reading text-body text-text-secondary">{item.summary}</p>
                    <p className="mt-4">
                      <Link
                        href={item.href}
                        data-track={`link:event:${item.href.split("/").pop()}`}
                        className="text-caption text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-deep"
                      >
                        {item.linkText} →
                      </Link>
                    </p>
                  </div>
                  {item.photo ? <Figure photo={item.photo} ratio="4 / 5" sizes="11rem" className="hidden sm:block" /> : null}
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </>
  );
}
