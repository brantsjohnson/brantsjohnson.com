// ============================================
// WHAT THIS FILE DOES (plain English):
// One project as a card: a large cover, the title in the display
// serif, a small row of tags and one line about it. The cover
// zooms a touch on hover and the arrow moves. Some covers are
// words instead of a photo, so no card ever shows an empty frame.
// ============================================

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/editorial/Reveal";
import type { Project } from "@/content/projects";

type ProjectCardProps = {
  project: Pick<Project, "slug" | "title" | "kind" | "blurb" | "href" | "cover">;
  ratio?: string;
  delay?: number;
  sizes?: string;
  priority?: boolean;
};

export function ProjectCard({ project, ratio = "4 / 5", delay = 0, sizes = "(min-width: 1024px) 30vw, 92vw", priority }: ProjectCardProps) {
  const { cover } = project;
  return (
    <Reveal delay={delay}>
      <Link
        href={project.href}
        data-track={`link:project_${project.slug}:projects`}
        className="group block"
        aria-label={`${project.title}. ${project.blurb}`}
      >
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: ratio,
            background: cover.kind === "photo" ? (cover.photo.bg ?? "var(--color-surface-2)") : "var(--color-bg-deep)",
          }}
        >
          {cover.kind === "photo" ? (
            <Image
              src={cover.photo.src}
              alt=""
              fill
              sizes={sizes}
              quality={80}
              priority={priority}
              className="transition-transform duration-[1200ms] ease-brand group-hover:scale-[1.04]"
              style={{ objectFit: cover.photo.fit ?? "cover", objectPosition: cover.photo.position ?? "50% 50%" }}
            />
          ) : (
            <div className="flex h-full flex-col justify-between p-8">
              <span className="font-serif text-[clamp(2.2rem,4vw,3.6rem)] italic leading-[1.02] text-ink">{cover.big}</span>
              <span className="label text-accent-deep">{cover.note}</span>
            </div>
          )}
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-[1.9rem] leading-none text-ink">{project.title}</h3>
            <p className="label mt-3 text-[0.66rem] text-accent-deep">{project.kind}</p>
            <p className="mt-3 max-w-[34ch] text-caption text-text-secondary">{project.blurb}</p>
          </div>
          <span
            aria-hidden="true"
            className="mt-1 font-serif text-2xl text-ink transition-transform duration-500 ease-brand group-hover:translate-x-1 group-hover:text-accent-deep"
          >
            →
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
