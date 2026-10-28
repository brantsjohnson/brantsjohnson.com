// ============================================
// WHAT THIS FILE DOES (plain English):
// The Work page: quick previews of the work, grouped by kind. Each
// item opens into a longer story. The full CV closes the page.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Reveal } from "@/components/editorial/Reveal";
import { Button } from "@/components/ui/Button";
import { workGroups, workIntro } from "@/content/work";
import { publicCv, publicResume } from "@/content/site-content";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description: workIntro.description,
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHeader id="work" label={workIntro.label} title={workIntro.title} lead={workIntro.lead}>
        <p className="mt-6 max-w-reading text-text-secondary">{workIntro.second}</p>
      </PageHeader>

      {workGroups.map((group) => (
        <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} className="scroll-mt-24 border-t border-border-subtle py-14 md:py-20">
          <div className="shell grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <h2 id={`${group.id}-title`} className="font-serif text-h2 text-ink">
                {group.title}
              </h2>
            </Reveal>
            <ol className="lg:col-span-8">
              {group.items.map((item, index) => (
                <Reveal as="li" key={item.org} delay={index * 0.04} className="border-t border-border-subtle py-8 first:border-t-0 first:pt-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="font-serif text-[1.9rem] leading-tight text-ink">{item.org}</h3>
                    {item.dates ? <p className="label text-[0.66rem] text-text-secondary">{item.dates}</p> : null}
                  </div>
                  {item.role ? <p className="label mt-2 text-[0.68rem] text-accent-deep">{item.role}</p> : null}
                  <p className="mt-4 max-w-reading text-body text-text-secondary">{item.summary}</p>
                  {item.links?.length ? (
                    <p className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
                      {item.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          data-track={`link:work_item:${link.href.split("/").pop()}`}
                          className="text-caption text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-deep"
                        >
                          {link.text} →
                        </Link>
                      ))}
                    </p>
                  ) : null}
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      ))}

      <section className="border-t border-border-subtle bg-bg-deep py-16 md:py-24">
        <div className="shell flex flex-wrap items-center justify-between gap-6">
          <h2 className="font-serif text-h2 text-ink">The full list</h2>
          <div className="flex flex-wrap gap-4">
            {publicResume.href ? (
              <Button href={publicResume.href} track="button:resume:work">
                {publicResume.label}
              </Button>
            ) : null}
            <Button href={publicCv.href} variant={publicResume.href ? "ghost" : "primary"} track="button:cv:work">
              Full CV
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
