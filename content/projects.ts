// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the source of truth for the Projects page and the project
// cards shown on the home page. Each project is a plain object, so
// updating a description or adding a project is a small, safe edit.
// The database helper in lib/cms is the future path once projects move
// into Supabase; for now the content lives here so it is easy to edit.
// ============================================

// THIS SECTION DOES: describe the shape of one project
export type Project = {
  slug: string; // used in the URL and as a stable id
  name: string; // card title
  tagline: string; // one short line under the title
  description: string; // a couple of sentences for the Projects page
  status: string; // a short human label such as "Currently building"
  href?: string; // external link, if there is one
  linkLabel?: string; // the words shown on the link
  tags: string[]; // small chips
  featured?: boolean; // marks the main build so home can highlight it
};

// THIS SECTION DOES: list the projects, most important first.
// Facts follow the content canon: Intro is the featured build; Filibusters covers policy theory, not opinions.
export const projects: Project[] = [
  {
    slug: "intro",
    name: "Intro",
    tagline: "The attendee experience that brings people back.",
    description:
      "Intro turns random event networking into intentional connection. Attendees answer a few questions at registration, and Intro matches them to the sponsors, partners, and peers worth their time. Organizers get real data to prove the value and win renewals.",
    status: "Currently building",
    href: "https://intro.events",
    linkLabel: "intro.events",
    tags: ["Events", "Networking", "Product"],
    featured: true,
  },
  {
    slug: "bridger",
    name: "Bridger",
    tagline: "Social media for close friends.",
    description:
      "Bridger is an anti-feed social app built for real friends. No ads, no AI slop, no influencers, no follower counts. It helps you keep up with the people you actually know, remember the little things about them, and turn boredom into real plans. It is co-op owned, so it stays accountable to its users.",
    status: "Building",
    href: "https://bridger.social",
    linkLabel: "bridger.social",
    tags: ["Social", "Community", "Co-op"],
  },
  {
    slug: "filibusters",
    name: "Filibusters",
    tagline: "Policy theory, explained honestly.",
    description:
      "Filibusters is a policy-theory series about how government and public conversation actually work. It focuses on structure and mechanics over teams and opinions, an attempt to make the machinery of politics clearer without the noise.",
    status: "Writing",
    // TODO(brant): add the YouTube channel URL and set linkLabel to match.
    linkLabel: "YouTube, coming soon",
    tags: ["Media", "Government"],
  },
];

// THIS SECTION DOES: give pages easy helpers to read one project or the featured one
export function getFeaturedProject(): Project | undefined {
  return projects.find((project) => project.featured);
}

export function getSupportingProjects(): Project[] {
  return projects.filter((project) => !project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
