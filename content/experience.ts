/**
 * Experience page content.
 *
 * Purpose: a simple, honest work/experience timeline. Each entry is a plain
 * object so adding a role is just adding an item to the array.
 *
 * IMPORTANT: Dates and titles below are left as TODO placeholders on purpose —
 * fill in the real ones. Do not ship invented employers, titles, or dates.
 */

export type ExperienceEntry = {
  role: string;
  org: string;
  // Human-readable date range, e.g. "2023 – Present". Left as TODO for now.
  period: string;
  summary: string;
  // Optional link to the org/project.
  href?: string;
};

const entries: ExperienceEntry[] = [
  {
    role: "Founder",
    org: "Intro",
    period: "TODO: dates",
    summary:
      "Founded Intro, a platform that turns event networking into intentional connection — matching attendees to the right people and giving organizers real proof of ROI.",
    href: "https://intro.events",
  },
  {
    role: "Founder",
    org: "Bridger",
    period: "TODO: dates",
    summary:
      "Building Bridger, a co-op-owned social app for close friends — anti-feed and anti-doomscroll, focused on helping people keep up with the friends who actually matter.",
    href: "https://bridger.social",
  },
  {
    role: "Creator",
    org: "Filibusters",
    period: "TODO: dates",
    summary:
      "Make Filibusters, a policy-theory series that tries to explain how government and public conversation actually work.",
    // TODO(brant): add the YouTube channel URL here.
  },
  // TODO(brant): Add any earlier roles, education, or other work you want to
  // show. Keep it honest — real orgs, real dates.
];

export const experience = {
  heading: "Experience",
  intro:
    "A short view of the work I've focused on. I'll keep this current as things change.",
  entries,
};
