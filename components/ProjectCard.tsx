import type { Project } from "@/content/projects";

/**
 * Project card.
 *
 * Purpose: renders one project (name, tagline, description, tags, and an
 * optional external link) as a self-contained card. Used on both the home page
 * and the Projects page so the two always look consistent.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6 transition-shadow hover:shadow-md">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-xl font-semibold text-ink">
          {project.name}
        </h3>
      </div>

      <p className="mt-1 text-sm font-medium text-accent">{project.tagline}</p>

      <p className="mt-3 flex-1 text-ink-soft">{project.description}</p>

      {project.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-ink/5 px-3 py-1 text-xs text-ink-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link mt-5 inline-flex items-center gap-1 text-sm font-medium"
        >
          {project.linkLabel ?? "Visit"}
          <span aria-hidden="true">↗</span>
        </a>
      ) : (
        project.linkLabel && (
          <span className="mt-5 inline-block text-sm text-ink-muted">
            {project.linkLabel}
          </span>
        )
      )}
    </article>
  );
}
