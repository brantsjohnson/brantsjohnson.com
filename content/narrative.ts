// ============================================
// WHAT THIS FILE DOES (plain English):
// This holds the shared words that several pages use: the home
// headline, the beliefs, where he comes from, the list of published
// writing, and the poetry page intro. Page-specific stories live in
// content/about.ts, work.ts, projects.ts and community.ts. This file
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

// THIS SECTION DOES: the opening of the home page. The large line is the headline.
export const hero = {
  eyebrow: "Senior Product Manager",
  name: "Brant S. Johnson",
  headline: "Good ideas deserve to happen.",
  identity:
    "I'm a senior product manager, a creator, performer and entrepreneur, and an activist for the places that raised me.",
  thesis: "I build technology as a bridge to real human connection.",
  location: "American Fork, Utah. Open to relocating.",
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

// THIS SECTION DOES: the poetry page intro. The poems themselves are in content/poems.ts.
export const poetry = {
  title: "Poetry",
  intro: "Some things only fit in a poem.",
};

// THIS SECTION DOES: where he comes from, in the order the story tells it
export const story = {
  id: "story",
  title: "Where I come from",
  paragraphs: [
    [
      {
        type: "text",
        text: "I grew up in Vernal, Utah. Early on I figured out that one person can touch hundreds of lives. I didn't need to be president or run a giant company to matter. I had a sphere of influence, and I could do something with it.",
      },
    ],
    [
      {
        type: "text",
        text: "So I did, in small ways first. In school I'd find students who deserved to be seen, make them a poster and hang it while they were in class. They'd come out and ask if they could keep it. Sometimes the product is simple. Someone needs proof that another person noticed them. ",
      },
      {
        type: "link",
        text: "The archway came next",
        href: "/community/archway",
        track: "link:archway:story",
      },
    ],
    [
      {
        type: "text",
        text: "After high school I spent two years in Birmingham, England, where I built my first real system. Then came Sandbox, Divvy, Washington, Crew, sales on purpose, and my own companies. I earned a BS in Business and Analysis at Utah Valley University in 2025, later than a recruiter might expect. I finished it. When something matters to me, I have a hard time leaving it unfinished.",
      },
    ],
    [
      {
        type: "text",
        text: "Read as single lines, my résumé can look like it jumps around. Read as a life, it's the same pattern every time. I see something that isn't working, I care enough to get involved, I learn what I need to learn, I pull people together, and I stay with it. The titles changed more than the work did. ",
      },
      {
        type: "link",
        text: "See the through-lines in Work",
        href: "/work",
        track: "link:work:story",
      },
    ],
  ] as CopyPart[][],
};

// THIS SECTION DOES: the short list of beliefs
export const beliefs = {
  id: "beliefs",
  title: "What I believe",
  items: [
    "People matter most. Technology is a bridge, not the point.",
    "Ownership isn't doing every task. It's knowing which tasks have to happen and getting the right people on them.",
    "Difficult isn't impossible.",
    "Feed your instinct good information. Data raises confidence. Interviews explain what the data can't.",
    "Build the necessities, then the extras, then one thing nobody asked for that makes people smile.",
    "I can own the research and the recommendation. I don't own every final call.",
    "Being serious about work and silly about life aren't in conflict.",
    "What should we not build? is a real question.",
  ],
};

// THIS SECTION DOES: the last section, one email and two ways to continue
export const contactBlock = {
  id: "contact",
  title: "Say hi",
  line: "The fastest way to reach me is email.",
};
