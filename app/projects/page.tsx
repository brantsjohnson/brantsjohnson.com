import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projects";

/**
 * Projects page.
 *
 * Purpose: shows every project as a card in a responsive grid. It reuses the
 * same ProjectCard as the home page and reads from content/projects.ts, so
 * adding a project appears here automatically.
 */
export const metadata: Metadata = {
  title: "Projects",
  description: projects.intro,
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader title={projects.heading} intro={projects.intro} />

      <Container className="pb-8">
        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.items.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </Container>
    </>
  );
}
