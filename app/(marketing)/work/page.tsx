// ============================================
// WHAT THIS FILE DOES (plain English):
// The Work page. The experience is grouped under four threads
// (Building things, Storytelling, Organizing, Listening) instead of
// a timeline. Each thread has a one-sentence through-line, a photo,
// and the roles under it with what he did and why it mattered. A
// downloadable CV closes the page for anyone who wants the
// traditional version.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { Figure } from "@/components/editorial/Figure";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Reveal } from "@/components/editorial/Reveal";
import { Button } from "@/components/ui/Button";
import { threads, workClose, workIntro } from "@/content/work";
import { publicCv, publicResume } from "@/content/site-content";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description: workIntro.lead,
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHeader id="work" label={workIntro.label} title={workIntro.title} lead={workIntro.lead}>
        <nav aria-label="Threads" className="mt-12 flex flex-wrap gap-x-10 gap-y-2">
          {threads.map((thread) => (
            <a
              key={thread.id}
              href={`#${thread.id}`}
              data-track={`link:thread_${thread.id}:work`}
              className="label inline-flex min-h-[44px] items-center gap-3 text-ink transition-colors hover:text-accent-deep"
            >
              <span className="text-accent-deep">{thread.number}</span>
              {thread.title}
            </a>
          ))}
        </nav>
      </PageHeader>

      {threads.map((thread, index) => (
        <section
          key={thread.id}
          id={thread.id}
          aria-labelledby={`${thread.id}-title`}
          className="scroll-mt-24 border-t border-border-subtle py-16 md:py-28"
        >
          <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className={index % 2 === 1 ? "lg:order-2 lg:col-span-4 lg:col-start-9" : "lg:col-span-4"}>
              <div className="lg:sticky lg:top-28">
                <Reveal>
                  <p className="label text-accent-deep">Thread {thread.number}</p>
                  <h2 id={`${thread.id}-title`} className="mt-4 font-serif text-h2 text-ink">
                    {thread.title}
                  </h2>
                  <p className="mt-6 font-serif text-[1.35rem] italic leading-snug text-ink">{thread.line}</p>
                </Reveal>
                <div className="mt-10 hidden max-w-[20rem] lg:block">
                  <Figure photo={thread.photo} ratio="4 / 5" sizes="22rem" />
                </div>
              </div>
            </div>

            <ol className={index % 2 === 1 ? "lg:order-1 lg:col-span-7" : "lg:col-span-7 lg:col-start-6"}>
              {thread.roles.map((role, roleIndex) => (
                <Reveal as="li" key={`${role.org}-${role.role}`} delay={roleIndex * 0.03} className="border-t border-border-subtle py-8 first:border-t-0 first:pt-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="font-serif text-[1.8rem] leading-tight text-ink">{role.org}</h3>
                    <p className="label text-[0.66rem] text-text-secondary">{role.dates}</p>
                  </div>
                  <p className="label mt-2 text-[0.68rem] text-accent-deep">{role.role}</p>
                  <p className="mt-4 max-w-reading text-body text-text-secondary">{role.summary}</p>
                  {role.href ? (
                    <p className="mt-4">
                      <Link
                        href={role.href}
                        data-track={`link:role:${thread.id}`}
                        className="text-caption text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-deep"
                      >
                        {role.hrefLabel ?? "Read more"} →
                      </Link>
                    </p>
                  ) : null}
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      ))}

      <section className="border-t border-border-subtle bg-bg-deep py-20 md:py-28">
        <div className="shell flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <h2 className="font-serif text-h2 text-ink">{workClose.title}</h2>
            <p className="mt-3 text-text-secondary">{workClose.body}</p>
          </Reveal>
          <div className="flex flex-wrap gap-4">
            {publicResume.href ? (
              <Button href={publicResume.href} track="button:resume:work">
                {publicResume.label}
              </Button>
            ) : null}
            <Button href={publicCv.href} variant={publicResume.href ? "ghost" : "primary"} track="button:cv:work">
              Download full CV
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
