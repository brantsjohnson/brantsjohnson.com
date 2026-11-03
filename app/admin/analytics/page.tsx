// ============================================
// WHAT THIS FILE DOES (plain English):
// The private analytics dashboard (brantsjohnson.com/admin/analytics).
// It shows how many people visit, which pages they open, where they
// came from, which links and buttons get clicked, which tracked links
// were shown but never clicked, and how far people scroll. Pick 7, 30
// or 90 days. Only Brant can open it (see lib/admin/auth.ts).
// ============================================

import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { summarize, type Summary } from "@/lib/analytics/aggregate";
import { analyticsConfigured, readEvents } from "@/lib/analytics/store";
import { SignOut } from "./SignOut";

export const dynamic = "force-dynamic";

const RANGES = [7, 30, 90];

function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div>
      <p className="label text-[0.66rem] text-text-secondary">{label}</p>
      <p className="mt-1 font-serif text-[clamp(2.4rem,5vw,3.6rem)] leading-none text-ink">{value}</p>
      {note ? <p className="mt-1 text-caption text-text-secondary">{note}</p> : null}
    </div>
  );
}

function Panel({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border-subtle py-10">
      <h2 className="font-serif text-h3 text-ink">{title}</h2>
      {note ? <p className="mt-1 max-w-reading text-caption text-text-secondary">{note}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Bars({ rows, unit }: { rows: { label: string; value: number }[]; unit: string }) {
  const max = Math.max(1, ...rows.map((row) => row.value));
  if (rows.length === 0) return <p className="text-caption text-text-secondary">Nothing yet.</p>;
  return (
    <ul className="flex flex-col gap-2">
      {rows.map((row) => (
        <li key={row.label} className="grid grid-cols-[minmax(0,14rem)_1fr_4rem] items-center gap-3 text-caption">
          <span className="truncate text-ink" title={row.label}>
            {row.label}
          </span>
          <span className="h-2 bg-surface-2">
            <span className="block h-2 bg-accent" style={{ width: `${Math.max(2, (row.value / max) * 100)}%` }} />
          </span>
          <span className="text-right text-text-secondary">
            {row.value} {unit}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Daily({ days }: { days: Summary["perDay"] }) {
  if (days.length === 0) return <p className="text-caption text-text-secondary">No visits recorded yet.</p>;
  const max = Math.max(1, ...days.map((day) => day.views));
  const width = 100 / days.length;
  return (
    <svg role="img" aria-label="Page views and visitors per day" viewBox="0 0 100 40" preserveAspectRatio="none" className="h-40 w-full">
      {days.map((day, index) => {
        const viewsHeight = (day.views / max) * 36;
        const visitorsHeight = (day.visitors / max) * 36;
        return (
          <g key={day.date}>
            <title>{`${day.date}: ${day.visitors} visitors, ${day.views} views`}</title>
            <rect x={index * width + width * 0.12} y={38 - viewsHeight} width={width * 0.76} height={viewsHeight} fill="#e3c58d" />
            <rect x={index * width + width * 0.12} y={38 - visitorsHeight} width={width * 0.76} height={visitorsHeight} fill="#8a6428" />
          </g>
        );
      })}
    </svg>
  );
}

export default async function AnalyticsPage({ searchParams }: { searchParams: { days?: string } }) {
  requireAdmin();
  const asked = Number(searchParams.days);
  const days = RANGES.includes(asked) ? asked : 30;

  let summary: Summary | null = null;
  let truncated = false;
  let failure = "";
  if (analyticsConfigured()) {
    try {
      const result = await readEvents(days);
      summary = summarize(result.events);
      truncated = result.truncated;
    } catch (error) {
      failure = error instanceof Error ? error.message : "The database could not be read.";
    }
  }

  return (
    <main className="shell py-16 pb-24">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="label text-accent-deep">Admin</p>
          <h1 className="mt-3 font-serif text-h1 text-ink">Analytics</h1>
        </div>
        <SignOut />
      </div>
      <nav aria-label="Range" className="mt-8 flex flex-wrap gap-x-6">
        {RANGES.map((range) => (
          <Link
            key={range}
            href={`/admin/analytics?days=${range}`}
            className={`label inline-flex min-h-[44px] items-center ${range === days ? "text-accent-deep underline decoration-accent decoration-2 underline-offset-8" : "text-ink hover:text-accent-deep"}`}
          >
            Last {range} days
          </Link>
        ))}
      </nav>

      {!analyticsConfigured() ? (
        <Panel title="Set up the database">
          <p className="max-w-reading text-body text-text-secondary">
            The site is not connected to its analytics database yet, so nothing has been recorded. Apply
            supabase/migrations/20261103_000002_analytics.sql, expose the site schema in Supabase, and set NEXT_PUBLIC_SUPABASE_URL and
            SUPABASE_SERVICE_ROLE_KEY. The steps are in docs/PUBLISHING.md, under Analytics.
          </p>
        </Panel>
      ) : failure ? (
        <Panel title="The database did not answer">
          <p className="max-w-reading text-body text-text-secondary">{failure}</p>
        </Panel>
      ) : summary ? (
        <>
          <div className="mt-6 grid grid-cols-2 gap-8 border-t border-border-subtle py-10 md:grid-cols-4">
            <Stat label="Visitors" value={String(summary.visitors)} note="One code per person per day" />
            <Stat label="Page views" value={String(summary.views)} />
            <Stat label="Pages per visitor" value={String(summary.viewsPerVisitor)} />
            <Stat label="Clicks" value={String(summary.clicks)} note="On tracked links and buttons" />
          </div>
          {truncated ? (
            <p className="text-caption text-text-secondary">This range holds more events than one page can show, so the numbers cover the earliest part. Pick a shorter range.</p>
          ) : null}

          <Panel title="Per day" note="Dark bars are visitors. Light bars are page views.">
            <Daily days={summary.perDay} />
          </Panel>

          <Panel title="Top pages" note="Depth is how far down the page people scroll, on average.">
            {summary.pages.length === 0 ? (
              <p className="text-caption text-text-secondary">Nothing yet.</p>
            ) : (
              <table className="w-full text-left text-caption">
                <thead className="label text-[0.66rem] text-text-secondary">
                  <tr>
                    <th className="py-2 pr-4 font-semibold">Page</th>
                    <th className="py-2 pr-4 font-semibold">Views</th>
                    <th className="py-2 pr-4 font-semibold">Visitors</th>
                    <th className="py-2 font-semibold">Scroll depth</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.pages.map((page) => (
                    <tr key={page.path} className="border-t border-border-subtle">
                      <td className="py-2 pr-4 text-ink">{page.path}</td>
                      <td className="py-2 pr-4">{page.views}</td>
                      <td className="py-2 pr-4">{page.visitors}</td>
                      <td className="py-2">{page.avgDepth === null ? "No data" : `${page.avgDepth}%`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Panel>

          <div className="grid gap-x-12 md:grid-cols-2">
            <Panel title="Where visitors came from" note="A shared link from Substack or LinkedIn shows here.">
              <Bars rows={summary.referrers.map((row) => ({ label: row.name, value: row.views }))} unit="views" />
            </Panel>
            <Panel title="Devices">
              <Bars rows={summary.devices.map((row) => ({ label: row.name, value: row.visitors }))} unit="visitors" />
            </Panel>
          </div>

          <Panel
            title="What gets clicked"
            note="Every link and button has a name: type, what it is, and where it sits. Seen is how many page views showed it. Rate is clicks divided by seen."
          >
            {summary.elements.length === 0 ? (
              <p className="text-caption text-text-secondary">Nothing yet.</p>
            ) : (
              <table className="w-full text-left text-caption">
                <thead className="label text-[0.66rem] text-text-secondary">
                  <tr>
                    <th className="py-2 pr-4 font-semibold">Element</th>
                    <th className="py-2 pr-4 font-semibold">Clicks</th>
                    <th className="py-2 pr-4 font-semibold">Seen</th>
                    <th className="py-2 font-semibold">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.elements.map((element) => (
                    <tr key={element.name} className="border-t border-border-subtle">
                      <td className="py-2 pr-4 text-ink">{element.name}</td>
                      <td className="py-2 pr-4">{element.clicks}</td>
                      <td className="py-2 pr-4">{element.seen}</td>
                      <td className="py-2">{element.seen ? `${element.rate}%` : "n/a"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Panel>

          <Panel title="Seen but never clicked" note="Links and buttons shown at least 5 times in this range with no clicks. These are the places to rethink.">
            {summary.neverClicked.length === 0 ? (
              <p className="text-caption text-text-secondary">None yet. Either everything gets clicked, or there is not enough traffic to say.</p>
            ) : (
              <Bars rows={summary.neverClicked.map((row) => ({ label: row.name, value: row.seen }))} unit="seen" />
            )}
          </Panel>
        </>
      ) : null}
    </main>
  );
}
