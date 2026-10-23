// ============================================
// WHAT THIS FILE DOES (plain English):
// This holds the home-page story: the hero card, the section order,
// and the paragraphs that jump between Product, Creator, Performer,
// Entrepreneur, and Activist. Pages read it. It does not draw UI.
// Dates use "to". Unconfirmed numbers and titles are left out.
// ============================================

import { poems, type Poem } from "@/content/poems";

// THIS SECTION DOES: one piece of a paragraph, either words or an in-sentence link
export type CopyPart =
  | { type: "text"; text: string }
  | { type: "link"; text: string; href: string; track: string };

export type AreaTag = { label: string; href: string };

export type StoryNavItem = { label: string; href: string };

export type WritingShelfItem = {
  title: string;
  date: string;
  href: string;
};

export type CrewStill = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

// THIS SECTION DOES: the order of the sticky nav. It matches the section headers.
export const storyNav: StoryNavItem[] = [
  { label: "Senior Product Manager", href: "#product" },
  { label: "Creator", href: "#creator" },
  { label: "Performer", href: "#performer" },
  { label: "Entrepreneur", href: "#entrepreneur" },
  { label: "Activist", href: "#activist" },
  { label: "Story", href: "#story" },
  { label: "Beliefs", href: "#beliefs" },
  { label: "Contact", href: "#contact" },
];

// THIS SECTION DOES: the opening card. The large line is the headline.
// Senior Product Manager stays a small label above the name.
export const hero = {
  eyebrow: "Senior Product Manager",
  name: "Brant S. Johnson",
  headline: "Good ideas deserve to happen.",
  identity:
    "I'm a senior product manager, a creator, performer and entrepreneur, and an activist for the places that raised me.",
  location: "American Fork, Utah. Open to relocating.",
  storyCta: { label: "Read my story", href: "#product" },
  resumeCta: { label: "See résumé", href: "/resume.pdf" },
};

// THIS SECTION DOES: the product story, then the compact role list on the page
export const product = {
  id: "product",
  title: "Senior Product Manager",
  paragraphs: [
    [
      {
        type: "text",
        text: "I build technology as a bridge to real human connection. I've owned the whole thing, from a Visa card program and onboarding to analytics, and I've sold what I ship.",
      },
    ],
    [
      {
        type: "text",
        text: "I was the first employee and the only product manager at Crew Finance, a family banking startup. I owned the Visa card issuing program: the card, KYC with our banking and compliance partners, manufacturing and shipping, and the onboarding a parent and a kid both had to get through. The experiments I ran cut onboarding time in half. I left as Senior Product Manager in April 2024.",
      },
    ],
    [
      {
        type: "text",
        text: "There was no outside brand partner that fit, so I sketched one on my iPad. The CEO said run with it. ",
      },
      {
        type: "link",
        text: "See how I did the branding for Crew",
        href: "#crew-brand",
        track: "link:crew_brand:product",
      },
    ],
    [
      {
        type: "text",
        text: "Before Crew, I was the analytics partner to 8 product managers at Divvy (now BILL). My main job was fixing Pendo so teams could trust what it told them. I'm comfortable with instinct. I want my instinct fed good information.",
      },
    ],
    [
      {
        type: "text",
        text: "At BackLocal, in BYU's Sandbox venture program, I was Head of Product. We ran more than 370 user interviews and had revenue at launch. ",
      },
      {
        type: "link",
        text: "BackLocal is also a creator story",
        href: "#creator-backlocal",
        track: "link:backlocal_creator:product",
      },
    ],
    [
      {
        type: "text",
        text: "My first product was not called product. In Birmingham, England, I led 400 volunteers and built 3 reporting tools by myself. Weekly reporting went from about 2 days to about 3 hours, and the organization added a second engineer to keep the tools running.",
      },
    ],
    [
      {
        type: "text",
        text: "Then I chose sales on purpose. At Utah Business I sold print, digital and event campaigns across 63 clients and 52 annual events. I wanted to hear \"I can't justify this spend\" from the person saying it. It changed how I think about value.",
      },
    ],
  ] as CopyPart[][],
  quote:
    "Product teams are closer to theater than to a sports team: different crafts, different constraints, one experience.",
  quoteLink: {
    text: "Why theater",
    href: "#performer",
    track: "link:why_theater:product",
  },
};

// THIS SECTION DOES: brands, essays, and poems. Performing is its own section.
export const creator = {
  id: "creator",
  title: "Creator",
  intro: [
    {
      type: "text",
      text: "I make things people can see and hold: brands, shows, essays and poems. The craft side is not a hobby next to the job. It's how I learned to do the job. ",
    },
    {
      type: "link",
      text: "See the performing work",
      href: "#performer",
      track: "link:performing:creator",
    },
  ] as CopyPart[],
  crew: {
    id: "crew-brand",
    title: "Crew brand",
    tags: [
      { label: "Product", href: "#product" },
      { label: "Creator", href: "#creator" },
    ] as AreaTag[],
    body: "I drew the Crew brand on an iPad. I wasn't a trained designer, so I learned the tools, learned enough illustration to carry a system, and worked with our UX designer so the card, the packaging, the landing page, onboarding and the app felt like one product. The hard part was tone. Family banking can't feel childish to the parent or like your mom's bank to the kid.",
    wordmark: {
      src: "/images/crew-wordmark-2024.jpg",
      alt: "Crew wordmark Brant designed in 2024",
      width: 1600,
      height: 400,
    },
    motion: [
      {
        src: "/creator/crew/Van-Crew.GIF",
        alt: "Crew illustration of a van packed with household things.",
        width: 2530,
        height: 2827,
      },
      {
        src: "/creator/crew/Bathtub-Crew.GIF",
        alt: "Crew illustration of a claw-foot bathtub and a rubber duck.",
        width: 2732,
        height: 2048,
      },
    ] as CrewStill[],
    stills: [
      {
        src: "/creator/crew/crew-social-announcement.png",
        alt: "Crew announcement graphic reading Banking built for families, with a drawn hand holding a card.",
        width: 1080,
        height: 1080,
      },
      {
        src: "/creator/crew/crew-linkedin-announcement.png",
        alt: "Wide Crew announcement graphic reading Banking built for families, with a drawn hand holding a card.",
        width: 1700,
        height: 1080,
      },
    ] as CrewStill[],
    back: {
      text: "Back to the product story",
      href: "#product",
      track: "link:product:crew_brand",
    },
  },
  backlocal: {
    id: "creator-backlocal",
    title: "BackLocal",
    tags: [
      { label: "Product", href: "#product" },
      { label: "Creator", href: "#creator" },
      { label: "Entrepreneur", href: "#entrepreneur" },
    ] as AreaTag[],
    body: "In Sandbox I worked on branding as well as product, alongside customer interviews and a team of about ten people.",
    link: {
      text: "Read the BackLocal product story",
      href: "#product",
      track: "link:product:creator_backlocal",
    },
  },
  writing: {
    id: "writing",
    title: "Writing",
    all: { text: "All writing", href: "/writing", track: "link:writing:creator" },
    subscribe: {
      text: "Subscribe",
      href: "https://brantsjohnson.substack.com/subscribe",
      track: "link:subscribe:creator",
    },
  },
  poetry: {
    id: "poetry",
    title: "Poetry",
    intro: "Some things only fit in a poem.",
    poems: poems as Poem[],
  },
};

// THIS SECTION DOES: the published Substack pieces named in the spec. Drafts stay off.
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

// THIS SECTION DOES: theater and performing, as its own section, text first
export const performer = {
  id: "performer",
  title: "Performer",
  tags: [
    { label: "Creator", href: "#creator" },
    { label: "Product", href: "#product" },
  ] as AreaTag[],
  paragraphs: [
    "I love theater, even though singing in public is one of my biggest fears. In high school I was recognized among the top high-school actors in Utah twice, and I ran marketing for our shows. For The Little Mermaid I turned the school into part of the show: seaweed curtains, banners, things hanging overhead. Attendance grew to levels the program hadn't seen. Later I made BYU Young Ambassadors as a non-major, came back for a second year and toured internationally, including South Korea. I was cast at Hale Centre Theatre in Elf the Musical, a dream I'd said out loud for years.",
    "Theater taught me how I run a product team. The costume designer isn't the choreographer. Nobody's craft is decoration.",
  ],
  workLink: {
    text: "How that shows up at work",
    href: "#product",
    track: "link:product:performer",
  },
  essay: {
    text: 'Read "13 Reasons Theatre Kids Make Exceptional Employees"',
    href: "https://brantsjohnson.substack.com/p/13-reasons-theatre-kids-make-exceptional",
    track: "link:theatre_essay:performer",
  },
};

export type VentureCard = {
  name: string;
  role: string;
  dates: string;
  summary: string;
  tags: AreaTag[];
  href?: string;
  hrefLabel?: string;
  track?: string;
  image?: { src: string; alt: string; width: number; height: number };
};

// THIS SECTION DOES: the companies he started or led, without a Bridger user count
export const entrepreneur = {
  id: "entrepreneur",
  title: "Entrepreneur",
  intro:
    "At Utah Business I kept seeing the same problem. Events and sponsorships are full of people paying for connection with no good way to make it happen or measure it. Sponsors want real conversations. Attendees want the right people, not more people. I'd been teaching myself the new AI stack at night so I wouldn't go stale. So I built.",
  cards: [
    {
      name: "Intro",
      role: "Founder and Product Lead",
      dates: "Nov 2025 to present",
      summary: "AI agent software for live events.",
      tags: [
        { label: "Entrepreneur", href: "#entrepreneur" },
        { label: "Product", href: "#product" },
      ],
      href: "https://intro.events",
      hrefLabel: "Visit Intro",
      track: "link:visit_intro:entrepreneur",
      image: {
        src: "/photos/intro-live.jpg",
        alt: "The live Intro site, with the attendee experience on a phone.",
        width: 1600,
        height: 1000,
      },
    },
    {
      name: "Bridger",
      role: "Founder",
      dates: "Apr 2025 to present",
      summary:
        "An app that helps people become friends around what they love. In a TestFlight beta, built with contracted engineers and designers.",
      tags: [
        { label: "Entrepreneur", href: "#entrepreneur" },
        { label: "Product", href: "#product" },
      ],
      href: "https://bridger.social",
      hrefLabel: "Visit Bridger",
      track: "link:visit_bridger:entrepreneur",
      image: {
        src: "/photos/bridger-live.jpg",
        alt: "The live Bridger waitlist window.",
        width: 948,
        height: 1042,
      },
    },
    {
      name: "BackLocal",
      role: "Head of Product",
      dates: "Sept 2021 to Sept 2022",
      summary: "Head of Product in BYU's Sandbox venture program.",
      tags: [
        { label: "Product", href: "#product" },
        { label: "Creator", href: "#creator" },
        { label: "Entrepreneur", href: "#entrepreneur" },
      ],
      href: "#product",
      hrefLabel: "Product story",
      track: "link:product:entrepreneur_backlocal",
    },
  ] as VentureCard[],
  close:
    "Building alone taught me what kind of builder I am. I can build by myself. I don't want to. The parts I've loved most were watching a designer make something better than I could and an engineer find a way through a wall. I'd rather build big things with a great team.",
  echo: "Good ideas deserve to happen.",
};

// THIS SECTION DOES: the town, the scholarship, and the government work
export const activist = {
  id: "activist",
  title: "Activist",
  intro: "I care about who gets seen. That started in a small town and it has followed me to Washington.",
  archway: {
    title: "The Uintah Resilience Archway",
    paragraphs: [
      "The old arch over my high school's road came down when the road was widened, and it sat in a yard for years. At eighteen I drew a bigger one and started cold-calling companies for money, steel, engineering and labor. Someone told me nothing like this ever gets done. It took about five years, three principals, two school boards and two superintendents. The finished arch is about 25 feet tall and 63 feet wide. I didn't weld it. My job was getting the people who could into one project and keeping it alive.",
    ],
    video: {
      src: "/activist/archway-video-all.mp4",
      label: "The Uintah Resilience Archway in Vernal, Utah",
    },
  },
  scholarship: {
    title: "The Resilience Scholarship",
    paragraphs: [
      "I knew students carrying things no transcript shows: siblings to raise, homes that weren't safe, money that wasn't there. Most scholarships reward lives that already make room for perfect grades. I founded the Resilience Scholarship in 2020 and started a weekly meeting with the school counselors so those seniors get seen.",
    ],
  },
  government: {
    title: "Government, up close",
    parts: [
      {
        type: "text",
        text: "At sixteen I called our city manager and asked to be the city's first intern. He said yes. Later I interned in the Governor's Office and worked with the Governor's Office of Economic Development during COVID, on small-business grant work. In fall 2022 I interned for Senator Mitt Romney in Washington, D.C., handling constituent inquiries and writing a brief on nuclear licensing policy. What I took from it: listen for what sits under the anger. Cost, fairness, fear, a need to be heard. That's a product skill too. ",
      },
      {
        type: "link",
        text: "See how I listen to customers",
        href: "#product",
        track: "link:product:activist",
      },
    ] as CopyPart[],
  },
};

// THIS SECTION DOES: where he came from, in the order the spec tells it
export const story = {
  id: "story",
  title: "Where I come from",
  paragraphs: [
    [
      {
        type: "text",
        text: "I grew up in Vernal, Utah. My dad was a teacher. He died when I was ten, and at his funeral I looked out at a room of hundreds of people. I remember being shocked that one person could touch that many lives. I didn't need to be president or run a giant company to matter. I had a sphere of influence, and I could do something with it.",
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
        href: "#activist",
        track: "link:activist:story",
      },
    ],
    [
      {
        type: "text",
        text: "After high school I spent two years in Birmingham, England, where I built my first real system. Then came Sandbox, Divvy, Washington, Crew, a layoff when the money ran short, sales on purpose, a second layoff, and my own companies. I earned a BS in Business and Analysis at Utah Valley University in 2025, later than a recruiter might expect. I finished it. When something matters to me, I have a hard time leaving it unfinished.",
      },
    ],
    [
      {
        type: "text",
        text: "Read as single lines, my résumé can look like it jumps around. Read as a life, it's the same pattern every time. I see something that isn't working, I care enough to get involved, I learn what I need to learn, I pull people together, and I stay with it. The titles changed more than the work did.",
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
