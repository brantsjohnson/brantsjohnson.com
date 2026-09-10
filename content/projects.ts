/**
 * Projects content.
 *
 * Purpose: the source of truth for the Projects page and the project cards
 * shown around the site. Each project is a plain object, so updating a
 * description or adding a new project is a small, safe edit.
 */

export type Project = {
  // Short name used as the card title.
  name: string;
  // One-line summary shown under the title.
  tagline: string;
  // A couple of sentences of detail for the Projects page.
  description: string;
  // External link and the label shown on the button/link.
  href?: string;
  linkLabel?: string;
  // Small tags rendered as badges.
  tags: string[];
  // Marks the current primary build so it can be highlighted on the home page.
  featured?: boolean;
};

const items: Project[] = [
  {
      name: "Intro",
      tagline: "The attendee experience that brings people back.",
      description:
        "Intro turns random event networking into intentional connection. Attendees answer a few questions at registration, and Intro matches them to the sponsors, partners, and peers worth their time — then gives organizers real data to prove ROI and win renewals.",
      href: "https://intro.events",
      linkLabel: "intro.events",
      tags: ["Events", "Networking", "Product"],
      featured: true,
    },
    {
      name: "Bridger",
      tagline: "Social media for close friends.",
      description:
        "Bridger is an anti-feed, anti-doomscroll social app built for real friends — no ads, no AI slop, no influencers, no follower counts. It helps you keep up with the people you actually know, remember the little things about them, and turn boredom into real plans. Co-op-owned, so it stays accountable to its users.",
      href: "https://bridger.social",
      linkLabel: "bridger.social",
      tags: ["Social", "Community", "Co-op"],
    },
    {
      name: "Filibusters",
      tagline: "Policy theory, explained honestly.",
      description:
        "Filibusters is a policy-theory series about how government and public conversation actually work — an attempt to make the mechanics of politics clearer without the noise.",
      // TODO(brant): add the YouTube channel URL and set linkLabel to match.
      linkLabel: "YouTube (coming soon)",
      tags: ["Media", "Government", "YouTube"],
    },
];

export const projects = {
  heading: "Projects",
  intro:
    "A few things I'm building. Most of them come back to the same idea: helping people connect on purpose instead of by accident.",
  items,
};
