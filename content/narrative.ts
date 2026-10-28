// ============================================
// WHAT THIS FILE DOES (plain English):
// This holds the shared words that several pages use: the home
// headline and intro, the menu, and the list of published writing.
// Page-specific stories live in content/about.ts, work.ts,
// events.ts and community.ts. This file
// does not draw UI. Dates use "to". Unconfirmed numbers are left out.
// ============================================

// THIS SECTION DOES: one piece of a paragraph, either words or an in-sentence link
export type CopyPart =
  | { type: "text"; text: string }
  | { type: "link"; text: string; href: string; track: string };

export type StoryNavItem = { label: string; href: string };

export type WritingShelfItem = {
  title: string;
  date: string;
  href: string;
};

// THIS SECTION DOES: the six places in the top menu, in order
export const storyNav: StoryNavItem[] = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Events", href: "/events" },
  { label: "Community", href: "/community" },
  { label: "Writing", href: "/writing" },
  { label: "Contact", href: "/contact" },
];

// THIS SECTION DOES: the opening of the home page. The large line is the headline and the page's one h1.
export const hero = {
  eyebrow: "Brant S. Johnson",
  name: "Brant S. Johnson",
  headline: "Good things deserve to happen.",
  description:
    "I'm Brant Johnson. I help people get their ideas built, put on events, and work on software that makes it easier for people to connect.",
  paragraphs: [
    "I love helping people get their ideas built. I've worked on software, helped put on a lot of events, and gotten involved in a few ideas that required more people than anyone expected.",
    "These days I'm building Intro and Bridger, two projects that grew out of my favorite part of the work: helping people find each other so they can make something happen.",
  ],
};

// THIS SECTION DOES: the published Substack pieces. Drafts stay off.
export const publishedWriting: WritingShelfItem[] = [
  {
    title: '13 Reasons "Theatre Kids" Make Exceptional Employees',
    date: "May 4, 2026",
    href: "https://brantsjohnson.substack.com/p/13-reasons-theatre-kids-make-exceptional",
  },
  {
    title: "If I Could Build a Company",
    date: "Apr 26, 2026",
    href: "https://brantsjohnson.substack.com/p/if-i-could-build-a-company",
  },
  {
    title: "In an AI world, human connection will be more crucial than ever",
    date: "Dec 2, 2025",
    href: "https://brantsjohnson.substack.com/p/in-an-ai-world-human-connection-will",
  },
];

// THIS SECTION DOES: the last section, one email and two ways to continue
export const contactBlock = {
  id: "contact",
  title: "Say hi",
  line: "The fastest way to reach me is email.",
};
