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
  role: "Senior Product Manager",
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
  label: "See full CV",
};

// THIS SECTION DOES: the one-page résumé link. public/resume.pdf is not in the
// repo yet, so href stays null and the site does not link to a missing file or
// treat the full CV as the one-page résumé. When that PDF is ready, and only
// if it has no phone number and no street address, set href to "/resume.pdf".
// The footer and the home hero read this object. The full CV at /cv.pdf stays linked.
export const publicResume: { label: string; href: string | null } = {
  label: "See résumé",
  href: null,
};

// THIS SECTION DOES: the footer row on every page, in this order.
// A null href (the résumé, until the PDF exists) is left out.
const footerItems: { label: string; href: string | null }[] = [
  publicResume,
  publicCv,
  { label: "Ask about me", href: "/ask" },
  { label: "LinkedIn", href: identity.linkedin },
  { label: "Substack", href: "https://brantsjohnson.substack.com" },
];

export const footerNav: { label: string; href: string }[] = footerItems.filter(
  (item): item is { label: string; href: string } => typeof item.href === "string" && item.href.length > 0
);

// THIS SECTION DOES: the bar across the top. Six places, in this order. The wordmark is home.
export const primaryNav: NavItem[] = [
  { label: "About", kind: "route", href: "/about" },
  { label: "Work", kind: "route", href: "/work" },
  { label: "Events", kind: "route", href: "/events" },
  { label: "Community", kind: "route", href: "/community" },
  { label: "Writing", kind: "route", href: "/writing" },
  { label: "Contact", kind: "route", href: "/contact" },
];

// THIS SECTION DOES: the home story lives in content/narrative.ts and is re-exported below.
export { hero } from "@/content/narrative";

// THIS SECTION DOES: the three facts a first-time reader should be able to repeat.
// Details live on the Work page. Dollar figures are not shown.
export const homeRecord: { kicker: string; line: string }[] = [
  {
    kicker: "Washington, D.C.",
    line: "Congressional intern for Senator Mitt Romney. Handled constituent inquiries and wrote a nuclear licensing brief.",
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
    src: "/photos/intro-live.webp",
    alt: "The live Intro site, with the attendee experience on a phone.",
    width: 1200,
    height: 750,
  },
  bridger: {
    src: "/photos/bridger-live.webp",
    alt: "The live Bridger waitlist window.",
    width: 900,
    height: 989,
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
    summary:
      "An app that helps people become friends around what they love. In a TestFlight beta.",
    href: "https://bridger.social",
    hrefLabel: "Visit Bridger",
  },
};

// THIS SECTION DOES: the About page, using the connection story that already reads like him
export const about = {
  eyebrow: "About",
  title: "People matter most.",
  paragraphs: [
    "I'm Brant Johnson. I'm a senior product manager, a creator, performer and entrepreneur, and an activist for the places that raised me.",
    "I build technology as a bridge to real human connection.",
    "Good ideas deserve to happen.",
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
    summary:
      "I started Bridger in April 2025. It is an app that helps people become friends around what they love. It is in a TestFlight beta, built with contracted engineers and designers.",
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
    summary:
      "I handled constituent inquiries and wrote a brief on nuclear licensing policy for budget appropriations.",
  },
  {
    org: "Divvy (BILL)",
    role: "Associate Product Management Analyst (internship)",
    dates: "Jun to Sept 2022",
    place: "Draper, Utah",
    summary:
      "I was the analytics partner to 8 product managers. My main project was fixing Pendo so teams could trust what it told them.",
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
    summary:
      "An app that helps people become friends around what they love. In a TestFlight beta. Founder since April 2025.",
    paragraphs: [
      "Bridger helps people become friends around what they love. I am the founder, from April 2025.",
      "It is in a TestFlight beta. The product is at bridger.social.",
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
  deck: "I'm a senior product manager, a creator, performer and entrepreneur, and an activist for the places that raised me.",
};

// THIS SECTION DOES: the public Now page. One month, only checked facts.
// TODO(brant): replace this with your own monthly note when you want a longer one.
export const nowPage = {
  eyebrow: "Now",
  title: "This month.",
  paragraphs: [
    "I am building Intro and Bridger. Good ideas deserve to happen.",
    "I am in American Fork, Utah, and I am open to relocating.",
  ],
};

// THIS SECTION DOES: find one project by the slug in its URL
export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
