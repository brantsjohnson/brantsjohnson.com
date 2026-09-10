// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Projects list page. It shows Intro as the featured
// project, then Bridger and Filibusters. The list is read from
// content/projects.ts through the CMS helper so a later database
// swap does not change this page.
// ============================================

import type { Metadata } from "next";
import { projectsPage } from "@/content/projects-page";
import { getProjects } from "@/lib/cms/projects";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";
import { StaggerChildren } from "@/components/motion/StaggerChildren";

export const metadata: Metadata = {
  title: "Projects",
  description: projectsPage.intro,
};

// THIS SECTION DOES: load projects and render the featured one plus the rest in a grid
export default async function ProjectsPage() {
  const projects = await getProjects();
  const featured = projects.find((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <section className="pb-24 pt-14 md:pb-32 md:pt-20">
      <Container>
        <PageHeader
          eyebrow={projectsPage.eyebrow}
          title={projectsPage.heading}
          description={projectsPage.intro}
        />

        {featured && (
          <FadeInOnScroll className="mt-10">
            <ProjectCard project={featured} featured />
          </FadeInOnScroll>
        )}

        <StaggerChildren className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} featured={false} />
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
