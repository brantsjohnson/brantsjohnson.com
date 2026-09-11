// ============================================
// WHAT THIS FILE DOES (plain English):
// This draws the "Now" section on the home page: a calm panel that
// shows the tastes Brant shares from Bridger (hobbies, movies, books,
// and what he is currently reading). It does not fetch anything on
// its own. The page hands it the data, and this file only decides how
// it looks.
//
// If there is no data (Bridger is off, not set up, or set to private)
// it shows a short honest placeholder instead. It never shows made-up
// tastes.
// ============================================

import type { BridgerInterests } from "@/lib/integrations/bridger";
import { nowContent } from "@/content/now";

// THIS SECTION DOES: describe what this section needs from the page
type NowProps = {
  interests: BridgerInterests | null;
};

// THIS SECTION DOES: turn Bridger's raw timestamp into a friendly date like "September 11, 2026".
// If the timestamp is missing or unreadable, we return nothing so no broken date shows.
function formatUpdated(updatedAt: string): string | null {
  if (!updatedAt) return null;
  const when = new Date(updatedAt);
  if (Number.isNaN(when.getTime())) return null;
  return when.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// THIS SECTION DOES: draw one labeled group of tastes (for example, "Movies" and its items).
// Items render as small pills. Nothing is shown if the group is empty.
function TasteGroup({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-caption uppercase tracking-wide text-text-secondary">{label}</h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-full border border-border-subtle bg-surface px-3 py-1 text-caption text-text-primary"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// THIS SECTION DOES: draw the whole Now section
export function Now({ interests }: NowProps) {
  // Work out whether there is anything real to show. An empty Bridger reply is treated like no reply.
  const hasTastes =
    interests !== null &&
    (interests.hobbies.length > 0 ||
      interests.movies.length > 0 ||
      interests.books.length > 0 ||
      interests.currentlyReading !== undefined);

  const updatedLabel = interests ? formatUpdated(interests.updatedAt) : null;

  return (
    // --- ACCESSIBILITY: the heading names this region for screen readers ---
    <section aria-labelledby="now-heading" className="mx-auto w-full max-w-3xl px-4 py-16">
      {/* THIS SECTION DOES: show the heading and one-line intro */}
      <div className="flex flex-col gap-2">
        <h2 id="now-heading" className="text-h2 text-text-primary">
          {nowContent.heading}
        </h2>
        <p className="text-body text-text-secondary">{nowContent.intro}</p>
      </div>

      {/* THIS SECTION DOES: the glass panel that holds the tastes or the placeholder */}
      <div className="mt-8 rounded-2xl border border-border-subtle bg-glass p-8 backdrop-blur-[var(--glass-blur)]">
        {hasTastes ? (
          <div className="flex flex-col gap-8">
            {/* Currently reading gets its own line since it is a single, current item. */}
            {interests?.currentlyReading ? (
              <div className="flex flex-col gap-2">
                <h3 className="text-caption uppercase tracking-wide text-text-secondary">
                  {nowContent.labels.currentlyReading}
                </h3>
                <p className="text-body text-text-primary">
                  {interests.currentlyReading.title}
                  {interests.currentlyReading.author
                    ? ` ${nowContent.readingByline} ${interests.currentlyReading.author}`
                    : ""}
                </p>
              </div>
            ) : null}

            <TasteGroup label={nowContent.labels.hobbies} items={interests?.hobbies ?? []} />
            <TasteGroup label={nowContent.labels.movies} items={interests?.movies ?? []} />
            <TasteGroup label={nowContent.labels.books} items={interests?.books ?? []} />

            {/* THIS SECTION DOES: show how fresh the shared tastes are, when we know */}
            {updatedLabel ? (
              <p className="text-caption text-text-secondary">
                {nowContent.updatedPrefix} {updatedLabel}
              </p>
            ) : null}
          </div>
        ) : (
          // Honest empty state. No invented tastes ever show here.
          <p className="text-body text-text-secondary">{nowContent.emptyState}</p>
        )}
      </div>
    </section>
  );
}
