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

// THIS SECTION DOES: the meeting link Brant sent. Pages that offer a conversation use it.
export const booking = {
  href: "https://calendar.app.google/qj9tb56BYCdppJPk9",
  label: "Book time",
};

// THIS SECTION DOES: the studio inquiries address. The site did not already have one.
export const inquiries = {
  email: "brantshanonjohnson@gmail.com",
  href: "mailto:brantshanonjohnson@gmail.com",
  label: "Inquiries",
};

// THIS SECTION DOES: the résumé file in public/cv.pdf. The link is the file itself.
export const publicCv = {
  href: "/cv.pdf",
  label: "Public CV",
};

// THIS SECTION DOES: list the main navigation. Ask is the one chat entry, and it is a page.
export const primaryNav: NavItem[] = [
  { label: "Home", kind: "route", href: "/" },
  { label: "Work", kind: "route", href: "/work" },
  { label: "About", kind: "route", href: "/about" },
  { label: "Contact", kind: "route", href: "/contact" },
  { label: "Ask about me", kind: "route", href: "/ask" },
];

// THIS SECTION DOES: the one public headline. Every visitor sees this sentence.
export const hero = {
  headline: "Good ideas deserve to happen.",
  subline: "Creative strategy, community building, campaigns, events, and ambitious experiments.",
  studio: "A studio for consulting, creative projects, opportunities, partnerships, and events.",
  practice: "Independent creative practice",
  name: "Brant S. Johnson. American Fork, Utah. Open to relocating.",
};

// THIS SECTION DOES: the three facts a first-time reader should be able to repeat.
// Details live on the Work page. Dollar figures are not shown.
export const homeRecord: { kicker: string; line: string }[] = [
  {
    kicker: "Washington, D.C.",
    line: "Congressional intern, Office of Senator Mitt Romney.",
  },
  {
    kicker: "Product",
    line: "First product manager at Crew Finance. Onboarding got twice as fast.",
  },
  {
    kicker: "Media",
    line: "Account executive at Utah Business, across 63 clients and 52 events.",
  },
];

// THIS SECTION DOES: live screenshots of the public products, cropped to one frame.
export const photos = {
  intro: {
    src: "/photos/intro-live.jpg",
    alt: "The live Intro site, with the attendee experience on a phone.",
    width: 1600,
    height: 1000,
  },
  bridger: {
    src: "/photos/bridger-live.jpg",
    alt: "The live Bridger waitlist window.",
    width: 948,
    height: 1042,
  },
};

// THIS SECTION DOES: the two products on the public site, with the links Brant confirmed.
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
    summary: "A socialization app in a beta of about 25 people.",
    href: "https://bridger.social",
    hrefLabel: "Visit Bridger",
  },
};

// THIS SECTION DOES: the About page, using the connection story that already reads like him
export const about = {
  eyebrow: "About",
  title: "People matter most.",
  paragraphs: [
    "I'm Brant Johnson. I run a studio for consulting, creative projects, opportunities, partnerships, and events.",
    "I have worked in product, media, and government. I build tools, spaces, and stories that bring people together.",
    "Good ideas deserve to happen. I take them on as products, partnerships, and events.",
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
  deck: "Intro and Bridger, then the roles.",
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
    summary: "I started Bridger in April 2025. It is a socialization app in a beta of about 25 people.",
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
      "I was the first employee and the only product manager. I owned the Visa card issuing program, set up KYC with banking and compliance partners, and ran onboarding experiments that cut onboarding time in half. I built the financial models for a raise, and I led the brand identity as lead illustrator.",
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
  deck: "Intro and Bridger are the live builds. Ask about me stays on this site.",
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
    kicker: "Also building",
    summary: "A socialization app in a beta of about 25 people. Founder since April 2025.",
    paragraphs: [
      "Bridger is a socialization app. I am the founder, from April 2025.",
      "It is in a beta of about 25 people. The product is at bridger.social.",
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
  deck: "For a project, a partnership, or an event, write inquiries. I read them.",
};

// THIS SECTION DOES: the short page he can text from an event
export const hiPage = {
  eyebrow: "Hi",
  title: "Good to meet you.",
  line: "Good ideas deserve to happen.",
  deck: "A studio for consulting, creative projects, opportunities, partnerships, and events.",
};

// THIS SECTION DOES: the public Now page. One month, only checked facts.
// TODO(brant): replace this with your own monthly note when you want a longer one.
export const nowPage = {
  eyebrow: "Now",
  title: "This month.",
  paragraphs: [
    "I run a studio for consulting, creative projects, opportunities, partnerships, and events. I am building Intro and Bridger.",
    "I am in American Fork, Utah, and I am open to relocating.",
  ],
};

// THIS SECTION DOES: find one project by the slug in its URL
export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
