// ============================================
// WHAT THIS FILE DOES (plain English):
// The Events page: a visual grid of cards. Each card opens a
// short case study or gallery. Plenty of space between them.
// ============================================

import type { Metadata } from "next";
import { PageHeader } from "@/components/editorial/PageHeader";
import { ProjectCard } from "@/components/editorial/ProjectCard";
import { projects, projectsIntro } from "@/content/projects";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Events",
  description: projectsIntro.lead,
  path: "/events",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader id="events" label={projectsIntro.label} title={projectsIntro.title} lead={projectsIntro.lead} />
      <div className="shell pb-24">
        <ul className="grid gap-x-8 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <li key={project.slug} className={index % 3 === 1 ? "lg:mt-16" : undefined}>
              <ProjectCard
                project={project}
                ratio={index % 3 === 1 ? "4 / 5" : "1 / 1"}
                delay={(index % 3) * 0.1}
                priority={index < 3}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
