import type { ExperienceEntry } from "@/content/experience";

/**
 * Timeline component.
 *
 * Purpose: renders a list of role/entry objects as a vertical timeline with a
 * dot per item, the role and organization, optional org note and location, the
 * date range, and the bullet points. Shared by the Experience and Leadership
 * pages so both look identical.
 */
export function Timeline({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <ol className="space-y-12 border-l border-ink/10 pl-6">
      {entries.map((entry, i) => (
        <li key={i} className="relative">
          {/* Timeline dot */}
          <span
            aria-hidden="true"
            className="absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-paper"
          />
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h2 className="font-serif text-xl font-semibold text-ink">
              {entry.role} <span className="text-ink-soft">· {entry.org}</span>
            </h2>
            <span className="text-sm text-ink-muted">{entry.period}</span>
          </div>

          {(entry.orgNote || entry.location) && (
            <p className="mt-1 text-sm text-ink-muted">
              {[entry.orgNote, entry.location].filter(Boolean).join(" · ")}
            </p>
          )}

          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink-soft marker:text-accent/50">
            {entry.bullets.map((bullet, b) => (
              <li key={b}>{bullet}</li>
            ))}
          </ul>

          {entry.href && (
            <a
              href={entry.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link mt-3 inline-block text-sm font-medium"
            >
              Learn more ↗
            </a>
          )}
        </li>
      ))}
    </ol>
  );
}
