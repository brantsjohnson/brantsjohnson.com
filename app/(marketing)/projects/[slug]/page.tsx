// ============================================
// WHAT THIS FILE DOES (plain English):
// This is one project page. Intro and Bridger link out to the live
// product. Ask about me opens the panel on this page. Unknown slugs
// are a real not-found, not an empty project.
// ============================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { OpenChatButton } from "@/components/chatbot/OpenChatButton";
import { getProject, projects } from "@/content/site-content";

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project" };
  return { title: project.name, description: project.summary };
}

export default function ProjectPage({ params }: PageProps) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <>
      <PageHero eyebrow={project.kicker} title={project.name} deck={project.summary} />
      <article className="shell max-w-reading py-16">
        <div className="flex flex-col gap-6">
          {project.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-body">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-10">
          {project.kind === "chat" ? (
            <OpenChatButton track="button:open_chat:project-ask">Ask about me</OpenChatButton>
          ) : (
            project.href &&
            project.hrefLabel && (
              <Button href={project.href} track={`button:visit_project:${project.slug}`}>
                {project.hrefLabel}
              </Button>
            )
          )}
        </div>
      </article>
    </>
  );
}
