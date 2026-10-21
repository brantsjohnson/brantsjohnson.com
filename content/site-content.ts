// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the single place that holds the words and facts shown on
// the public site: name, navigation, home, about, experience, projects,
// service, contact, and the short /hi page. Pages read from here so
// copy lives in one spot. Dates are written with "to", never a dash.
// Unverified claims are not in this file. They are listed in VERIFY.md.
// This file holds content only. It does not draw any UI.
// ============================================

// THIS SECTION DOES: describe the shapes of the content so typos are caught early
export type NavItem = {
  label: string;
  kind: "route" | "chat";
  href?: string;
};

export type ProofChip = {
  value: string;
  label: string;
};

export type ExperienceRole = {
  org: string;
  role: string;
  dates: string;
  place?: string;
  summary: string;
  href?: string;
  hrefLabel?: string;
};

export type ServiceStory = {
  title: string;
  role: string;
  dates: string;
  place?: string;
  paragraphs: string[];
};

export type Project = {
  slug: string;
  name: string;
  kicker: string;
  summary: string;
  paragraphs: string[];
  href?: string;
  hrefLabel?: string;
  kind?: "chat";
  featured?: boolean;
};

// THIS SECTION DOES: hold Brant's identity. The header shows the full name, never initials.
export const identity = {
  fullName: "Brant S. Johnson",
  wordmark: "Brant S. Johnson",
  role: "Customer-focused product manager",
  location: "American Fork, Utah. Open to relocating.",
  email: "me@brantsjohnson.com",
  linkedin: "https://www.linkedin.com/in/brantshanonjohnson/",
  siteUrl: "https://www.brantsjohnson.com",
};

// THIS SECTION DOES: list the main navigation. Ask is the one chat entry, and it is a page.
export const primaryNav: NavItem[] = [
  { label: "Home", kind: "route", href: "/" },
  { label: "Work", kind: "route", href: "/work" },
  { label: "About", kind: "route", href: "/about" },
  { label: "Contact", kind: "route", href: "/contact" },
  { label: "Ask about me", kind: "route", href: "/ask" },
];

// THIS SECTION DOES: the home hero. Referral traffic may swap the lines.
export const hero = {
  headline: "I build technology as a bridge to real human connection.",
  subline:
    "Product manager and founder. I've owned the whole loop, from KYC and onboarding to analytics, and I sell what I ship.",
  primaryCta: { label: "See the work", href: "/work" },
};

// THIS SECTION DOES: one proof sentence under the hero, then three numbers in the band
export const proofLine =
  "First and only product manager at Crew Finance, where onboarding got twice as fast.";

export const homeStats: ProofChip[] = [
  { value: "50%", label: "Faster onboarding at Crew" },
  { value: "$2.5M", label: "Raise modeled at Crew" },
  { value: "400", label: "Volunteers led in Birmingham" },
];

// THIS SECTION DOES: real photographs from the current Wix site, sized for the web.
// Birmingham volunteers and Bridger screens are not here.
export const photos = {
  speaking: {
    src: "/photos/brant-speaking-on-stage.jpg",
    alt: "Brant S. Johnson speaking on stage.",
    width: 2000,
    height: 1269,
  },
  podium: {
    src: "/photos/brant-at-podium.jpg",
    alt: "Brant S. Johnson speaking at a wooden podium.",
    width: 2000,
    height: 1117,
  },
  archwayCrane: {
    src: "/photos/archway-crane-install.jpg",
    alt: "A crane setting the Uintah archway over the road.",
    width: 2200,
    height: 1259,
  },
  archwayCrew: {
    src: "/photos/archway-build-crew.jpg",
    alt: "A crew building a frame for the Uintah Resilience Archway.",
    width: 2000,
    height: 1221,
  },
  scholarship2021: {
    src: "/photos/resilience-scholarship-2021.jpg",
    alt: "Brant S. Johnson with three 2021 Resilience Scholarship recipients.",
    width: 1567,
    height: 1045,
  },
  scholarship2022: {
    src: "/photos/resilience-scholarship-2022.jpg",
    alt: "A 2022 Resilience Scholarship recipient with her certificate.",
    width: 1280,
    height: 854,
  },
  logo: {
    src: "/photos/brant-s-johnson-logo.png",
    alt: "",
    width: 292,
    height: 291,
  },
};

// THIS SECTION DOES: the two products on home. Intro is the featured one.
export const building = {
  kicker: "Currently building",
  intro: {
    name: "Intro",
    role: "Founder and Product Lead",
    dates: "Nov 2025 to present",
    summary: "AI agent software for live events.",
    href: "https://intro.events",
    hrefLabel: "Visit Intro",
  },
  bridger: {
    name: "Bridger",
    role: "Founder",
    dates: "Apr 2025 to present",
    summary:
      "1,778 users, about 230 part-time volunteers, and contracted engineers and designers.",
    href: "https://bridger.social",
    hrefLabel: "Visit Bridger",
  },
};

// THIS SECTION DOES: the About page, using the connection story that already reads like him
export const about = {
  eyebrow: "About",
  title: "People matter most.",
  paragraphs: [
    "I'm Brant Johnson, a product-minded entrepreneur and community builder who believes connection is the antidote to loneliness, and the foundation of any thriving society.",
    "Over the years, I've worked in product management, AI, media, and government, and I've seen both the good and the bad of what technology can do.",
    "On one hand, it can pull us into endless scrolling and shallow interactions. On the other, it has the power to rebuild trust, spark collaboration, and make relationships stronger. I'm choosing the latter.",
    "My career has taken me through startups where I helped shape fintech products, media organizations where I connected with CEOs and entrepreneurs, and political spaces where I saw how communities thrive when people are engaged.",
    "Across all of it, one theme has been constant. I love building tools, spaces, and stories that bring people together.",
    "The work comes back to the same belief: people matter most.",
    "I don't see technology as the end goal. I see it as a bridge to stronger friendships, better communities, and more meaningful lives.",
  ],
  educationTitle: "Education",
  education:
    "I earned a BS in Business and Analysis at Utah Valley University, Woodbury School of Business, in 2025.",
  location: "I live in American Fork, Utah, and I am open to relocating.",
  skillsTitle: "Skills",
  skills:
    "Pendo Essentials for Web, SQL, Python, Figma, and an Agile Foundations course certificate.",
  outsideTitle: "Outside work",
  outside: [
    "I designed, fundraised, and managed the Uintah Resilience Archway in Vernal. The build ran from 2017 to 2023.",
    "I founded the Resilience Scholarship in 2020 so more graduating seniors could be seen, and I started a weekly meeting with the school counselors.",
  ],
};

// THIS SECTION DOES: the experience timeline, newest first, checked facts only
export const experienceIntro = {
  eyebrow: "Experience",
  title: "The work, in order.",
  deck: "About six years of product work, from a volunteer organization in Birmingham to the products I am building now.",
};

export const experience: ExperienceRole[] = [
  {
    org: "Intro",
    role: "Founder and Product Lead",
    dates: "Nov 2025 to present",
    summary: "I build AI agent software for live events.",
    href: "https://intro.events",
    hrefLabel: "Visit Intro",
  },
  {
    org: "Bridger",
    role: "Founder",
    dates: "Apr 2025 to present",
    summary:
      "I started Bridger in April 2025. It is in TestFlight beta with 1,778 users, about 230 part-time volunteers, and contracted engineers and designers.",
    href: "https://bridger.social",
    hrefLabel: "Visit Bridger",
  },
  {
    org: "Utah Business",
    role: "Account Executive",
    dates: "Oct 2024 to Nov 2025",
    place: "Salt Lake City",
    summary:
      "I sold print, digital, and event campaigns across 63 clients and 52 annual events. I partnered with agency teams, ran weekly AI training for the team, and kept the work in Monday.com and Magazine Manager.",
  },
  {
    org: "Crew Finance",
    role: "Senior Product Manager (first employee)",
    dates: "Dec 2022 to Apr 2024",
    place: "Remote",
    summary:
      "I was the first employee and the only product manager. I owned the Visa card issuing program, set up KYC with banking and compliance partners, and ran onboarding experiments that cut onboarding time in half. I built the financial models behind a $2.5M raise, and I led the brand identity as lead illustrator.",
  },
  {
    org: "Office of Senator Mitt Romney",
    role: "Congressional Intern",
    dates: "Sept 6 to Dec 8, 2022",
    place: "Washington, D.C.",
    summary: "I interned in the Washington, D.C. office.",
  },
  {
    org: "Divvy (BILL)",
    role: "Associate Product Management Analyst (internship)",
    dates: "Jun to Sept 2022",
    place: "Draper, Utah",
    summary:
      "I was the analytics partner to 8 product managers. I did not own a roadmap. My main project was fixing Pendo so teams could trust what it told them.",
  },
  {
    org: "BackLocal",
    role: "Head of Product",
    dates: "Sept 2021 to Sept 2022",
    place: "Sandbox, Provo",
    summary:
      "I led product in the Sandbox venture program, ran more than 370 user interviews, and led a 7-day design sprint. The product had revenue at launch.",
  },
  {
    org: "Regional Volunteer Organization",
    role: "Product Manager (pro bono)",
    dates: "Oct 2017 to Sept 2019",
    place: "Birmingham, England",
    summary:
      "I trained and led 400 volunteers and built 3 internal reporting tools. Reporting dropped from about 2 days to about 3 hours, and adoption led the organization to add a second engineer.",
  },
];

// THIS SECTION DOES: service and leadership stories that are safe to print
export const serviceIntro = {
  eyebrow: "Service & Leadership",
  title: "Work that stayed in the town.",
  deck: "The archway, the scholarship, a build in Hawaii, TEDxSaltLakeCity, and student government.",
};

export const serviceStories: ServiceStory[] = [
  {
    title: "Uintah Resilience Archway",
    role: "Designer, fundraiser, and project manager",
    dates: "2017 to 2023",
    place: "Vernal, Utah",
    paragraphs: [
      "For more than 60 years Uintah had an archway. I decided to reconstruct a new one.",
      "I fundraised and asked people to donate their services. I designed it, managed the build, and saw it through from 2017 to 2023.",
    ],
  },
  {
    title: "Resilience Scholarship",
    role: "Founder",
    dates: "Began 2020",
    place: "Vernal, Utah",
    paragraphs: [
      "A lot of scholarships go to students whose lives already make room for high grades and long activity lists.",
      "I founded the Resilience Scholarship in 2020, and I started a weekly meeting with the school counselors so more graduating seniors could be seen.",
      "If you want to donate, write me from the Contact page.",
    ],
  },
  {
    title: "Habitat for Humanity, Hilo",
    role: "Trip leader",
    dates: "May to Aug 2021",
    place: "Hilo, Hawaii",
    paragraphs: [
      "I led 22 youth over a series of 10 days to build a home.",
      "I planned daily service, cultural, and personal growth activities, and navigated the group through strict COVID protocol.",
    ],
  },
  {
    title: "TEDxSaltLakeCity",
    role: "Organization Assistant",
    dates: "Jan to Sept 2021",
    paragraphs: [
      "I directed monthly meetings, set structured agendas and clear minutes, and designed brand creative to promote events.",
      "That role ended in September 2021.",
    ],
  },
  {
    title: "Student government",
    role: "Student body president",
    dates: "Elementary, middle, and high school",
    place: "Vernal, Utah",
    paragraphs: [
      "I was student body president in elementary, middle, and high school in Vernal, Utah.",
    ],
  },
];

// THIS SECTION DOES: the projects. Live links only. Ask about me opens the on-site panel.
export const projectsIntro = {
  eyebrow: "Projects",
  title: "Two products, and a way to ask.",
  deck: "Intro is the featured build. Bridger is in TestFlight. Ask about me stays on this site.",
};

export const projects: Project[] = [
  {
    slug: "intro",
    name: "Intro",
    kicker: "Featured",
    summary: "AI agent software for live events. Founder and Product Lead since November 2025.",
    paragraphs: [
      "Intro is AI agent software for live events. I am Founder and Product Lead, from November 2025.",
      "The product is live. This page does not stand in for it.",
    ],
    href: "https://intro.events",
    hrefLabel: "Visit Intro",
    featured: true,
  },
  {
    slug: "bridger",
    name: "Bridger",
    kicker: "Beta",
    summary:
      "A TestFlight beta I started in April 2025. 1,778 users, about 230 part-time volunteers, and contracted engineers and designers.",
    paragraphs: [
      "I started Bridger in April 2025 as Founder. It is in TestFlight beta.",
      "1,778 people use it. About 230 part-time volunteers are part of the work, along with contracted engineers and designers.",
    ],
    href: "https://bridger.social",
    hrefLabel: "Visit Bridger",
  },
];

// THIS SECTION DOES: the writing shelves. Posts themselves live in content/writing/posts.ts.
export const writingIntro = {
  eyebrow: "Writing",
  title: "Essays and letters.",
  deck: "Government reform essays live here. Newsletter letters are mirrored one day later, with a link back to the original.",
  essayShelf: "Government reform",
  letterShelf: "Newsletter",
};

// THIS SECTION DOES: the contact page. This is the one place the email address is shown.
export const contactIntro = {
  eyebrow: "Contact",
  title: "Write me.",
  deck: "If you want to talk about the work, send a note. I read them.",
};

// THIS SECTION DOES: the short page he can text from an event
export const hiPage = {
  eyebrow: "Hi",
  title: "I build technology as a bridge to real human connection.",
  deck: "Product manager and founder. Try the work, then leave a way for me to follow up.",
};

// THIS SECTION DOES: find one project by the slug in its URL
export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
