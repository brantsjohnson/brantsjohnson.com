// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Projects index. Intro is the large featured panel.
// Bridger sits beside it. Ask about me opens the on-site panel.
// Every card goes somewhere that works.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { projects, projectsIntro } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Projects",
  description: projectsIntro.deck,
};

export default function ProjectsPage() {
  const featured = projects.find((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <>
      <PageHero eyebrow={projectsIntro.eyebrow} title={projectsIntro.title} deck={projectsIntro.deck} />
      <div className="shell grid gap-6 pb-16 lg:grid-cols-2">
        {featured && (
          <Link
            href={`/projects/${featured.slug}`}
            data-track="card:open_project:intro"
            className="flex min-h-[320px] flex-col justify-between bg-ink p-8 text-on-hero lg:col-span-2 lg:p-12"
          >
            <p className="text-caption uppercase tracking-[0.18em] text-accent">{featured.kicker}</p>
            <div>
              <h2 className="font-serif text-display text-accent">{featured.name}</h2>
              <p className="mt-4 max-w-reading text-body">{featured.summary}</p>
            </div>
          </Link>
        )}
        {rest.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            data-track={`card:open_project:${project.slug}`}
            className="flex min-h-[240px] flex-col justify-between border border-ink p-8"
          >
            <p className="text-caption uppercase tracking-[0.18em] text-text-secondary">{project.kicker}</p>
            <div>
              <h2 className="font-serif text-h1 text-ink">{project.name}</h2>
              <p className="mt-4 text-body text-text-secondary">{project.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
