// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the single place that holds the words and facts shown on
// the public site: Brant's name, the navigation labels, the home
// page copy, the proof stats, and the Experience, Service,
// Leadership, Skills, About, and Projects entries.
// Pages read from here so copy lives in one spot, never hardcoded
// inside a component. All copy here follows the no-dashes rule from
// docs/03 (dates read "Oct 2024 to Nov 2025", never with a dash).
// This file holds content only. It does not draw any UI itself.
// ============================================

// THIS SECTION DOES: describe the shapes of our content so editors get autocomplete and typos are caught
export type NavItem = {
  label: string;
  // A route item navigates to a page. A chat item opens the BrantChat panel instead of a page.
  kind: "route" | "chat";
  href?: string; // present for route items
};

export type ProofChip = {
  value: string; // the big number or word that carries the proof
  label: string; // one short line of context for that number
};

export type PhotoSlot = {
  alt: string; // what the photo shows, for screen readers and as the placeholder caption
  // Optional real image path under /public. When empty, the UI shows a framed placeholder.
  src?: string;
  // Rough shape of the frame so the gallery reserves space and never jumps as images load.
  aspect: "portrait" | "landscape" | "square";
};

export type TimelineEntry = {
  org: string;
  role: string;
  dates?: string; // optional, written without dashes; omitted when a firm date is not known
  summary: string;
};

export type SkillGroup = {
  group: string;
  items: string[];
};

export type Project = {
  name: string;
  blurb: string;
  status: "live" | "coming-soon";
  // A live on-site feature that opens the chat panel instead of navigating away.
  kind?: "chat";
  // A real, working URL. Only ever set when the link is live. Coming-soon items leave this empty.
  url?: string;
};

// THIS SECTION DOES: hold Brant's identity and the wordmark shown in the header (full name only, never initials)
export const identity = {
  fullName: "Brant S. Johnson",
  wordmark: "Brant S. Johnson", // the header shows the full name, never a "BSJ" monogram
  role: "Customer focused product manager",
  location: "American Fork, Utah. Open to relocating.",
  email: "Brantshanonjohnson@gmail.com",
  linkedin: "https://www.linkedin.com/in/brantshanonjohnson/",
};

// THIS SECTION DOES: list the main navigation, matching Brant's preferred header order
// BrantChat opens the chat panel rather than loading a page, so it has no href.
export const primaryNav: NavItem[] = [
  { label: "Home", kind: "route", href: "/" },
  { label: "BrantChat", kind: "chat" },
  { label: "Experience", kind: "route", href: "/experience" },
  { label: "Service", kind: "route", href: "/service" },
  { label: "Leadership", kind: "route", href: "/leadership" },
  { label: "Skills", kind: "route", href: "/skills" },
  { label: "About", kind: "route", href: "/about" },
];

// THIS SECTION DOES: list the quieter pages, kept out of the main row so it stays clean (docs/08 §3)
// Contact lives here only, so it appears once on the site (the "contact once" rule in docs/03).
export const secondaryNav: NavItem[] = [
  { label: "Projects", kind: "route", href: "/projects" },
  { label: "Writing", kind: "route", href: "/blog" },
  { label: "Photography", kind: "route", href: "/photography" },
  { label: "Civic Engagement", kind: "route", href: "/civic-engagement" },
  { label: "Contact", kind: "route", href: "/contact" },
];

// THIS SECTION DOES: hold the home hero copy and its two calls to action
export const hero = {
  eyebrow: "Product management",
  // The home hero shows the full name large, the way Brant's preferred header does.
  name: identity.fullName,
  // One line that says what he does, front-loaded with the meaning.
  positioning:
    "Product manager who has owned the whole thing, from KYC and onboarding to analytics, and who sells what he ships.",
  primaryCta: { label: "Ask about my work", kind: "chat" as const },
  secondaryCta: { label: "See my experience", href: "/experience" },
};

// THIS SECTION DOES: hold the proof stats shown on home for density (the first one is the Crew chip)
export const proofChips: ProofChip[] = [
  { value: "Sole PM", label: "First and only product manager at Crew Finance" },
  { value: "50%", label: "Faster onboarding from experiments I ran at Crew" },
  { value: "400", label: "Volunteers I trained and led in Birmingham, England" },
  { value: "2,270%", label: "Content lift I drove at Young Ambassadors" },
  { value: "22", label: "Youth I led on a Habitat for Humanity build in Hawaii" },
  { value: "Weekly", label: "AI training I run for the team at Utah Business" },
];

// THIS SECTION DOES: hold the home photo gallery slots
// These are framed placeholders until Brant drops real files into /public/photos.
// The alt text describes the intended photo so the layout is meaningful even while empty.
export const photoSlots: PhotoSlot[] = [
  { alt: "Brant presenting product work to a team", aspect: "landscape" },
  { alt: "Brant on the front lines at a Utah Business event", aspect: "portrait" },
  { alt: "The Crew Finance card program work in progress", aspect: "square" },
  { alt: "Brant leading youth on the Habitat for Humanity build in Hawaii", aspect: "landscape" },
];

// THIS SECTION DOES: hold the Experience timeline (paid product and sales roles)
export const experience: TimelineEntry[] = [
  {
    org: "Utah Business",
    role: "Account Executive",
    dates: "Oct 2024 to Nov 2025",
    summary:
      "Recruited to sell print, digital, and event campaigns to Utah companies. I ran AI training for the team every week and rebuilt scattered sales steps into clean Monday.com and Magazine Manager workflows.",
  },
  {
    org: "Crew Finance",
    role: "Product Manager",
    dates: "Dec 2022 to Mar 2024",
    summary:
      "The first and only product manager. I owned strategy, design, onboarding, user research, and the card program. I set up the KYC process with banking and compliance partners, and ran onboarding experiments that cut onboarding time in half.",
  },
  {
    org: "Divvy",
    role: "Product Analytics",
    summary:
      "I emailed my way into a role that did not exist yet, then ran analytics for every product team. My main project was fixing Pendo so teams could trust what it told them about how people used the app.",
  },
  {
    org: "Sandbox",
    role: "Founding Product Manager",
    summary:
      "My first real product team in tech. Four people and four interns building from scratch. I was the product manager, the salesperson, the researcher, and the one learning to code at 2 AM.",
  },
  {
    org: "FranklinCovey",
    role: "Marketing",
    summary:
      "Worked under the VP of Marketing on book launches, digital courses, and author brands. I ran the LinkedIn outreach strategy using Sales Navigator.",
  },
];

// THIS SECTION DOES: hold the Service timeline (humanitarian and community work)
export const service: TimelineEntry[] = [
  {
    org: "Habitat for Humanity, Hilo, Hawaii",
    role: "Trip Leader",
    dates: "May to Aug 2021",
    summary:
      "Led 22 youth over a series of 10 days to build a home. I planned daily service, cultural, and personal growth activities, and navigated the group through strict COVID protocol.",
  },
  {
    org: "Community service, Utah",
    role: "Volunteer",
    summary:
      "Tutored fourth graders, ran a stop bullying campaign across seven schools, and volunteered with the Boys and Girls Club.",
  },
];

// THIS SECTION DOES: hold the Leadership timeline (roles where Brant directed people and programs)
export const leadership: TimelineEntry[] = [
  {
    org: "Young Ambassadors, International Musical Theatre Company",
    role: "Public Relations Director and Performer",
    dates: "Apr 2021 to May 2023",
    summary:
      "Grew content interactions by 2,270% and expanded the audience past 3,100 followers through Facebook and Instagram campaigns.",
  },
  {
    org: "TEDxSaltLakeCity",
    role: "Organization Assistant",
    dates: "Jan to Sept 2021",
    summary:
      "Directed monthly meetings, set structured agendas and clear minutes, and designed brand creative to promote key events.",
  },
  {
    org: "Regional service, Birmingham, England",
    role: "Regional Leader",
    dates: "Oct 2017 to Sept 2019",
    summary:
      "Trained and led 400 volunteers on organizational standards and financial policy, and ran quarterly campaigns that reached thousands.",
  },
];

// THIS SECTION DOES: hold the Skills, grouped so the page scans easily instead of one long list
export const skills: SkillGroup[] = [
  {
    group: "Product",
    items: [
      "Product management",
      "Strategic roadmaps",
      "Go to market strategy",
      "User research",
      "Experimentation",
      "Product operations",
    ],
  },
  {
    group: "AI",
    items: [
      "OpenAI and Gemini APIs",
      "Prompt and retrieval design",
      "Embeddings and similarity scoring",
      "Cursor",
      "Weekly team AI training",
    ],
  },
  {
    group: "Technical",
    items: ["SQL", "Python", "React Native", "VBA for Excel", "WordPress", "CSS"],
  },
  {
    group: "Design",
    items: [
      "Figma",
      "Adobe Illustrator",
      "Adobe Lightroom",
      "Procreate",
      "Brand and packaging design",
    ],
  },
  {
    group: "Business",
    items: [
      "B2B strategy",
      "P&L management",
      "Financial modeling",
      "Startup development",
      "Process improvement",
    ],
  },
  {
    group: "Leadership",
    items: [
      "Team leadership",
      "Hiring and training",
      "Conflict management",
      "Cross functional communication",
    ],
  },
];

// THIS SECTION DOES: hold a short list of notable certifications for the Skills page
export const certifications: string[] = [
  "AWS Certified Cloud Practitioner (Jun 2025)",
  "Agile Product Owner Role (Jun 2025)",
  "Figma Essential Training (Oct 2022)",
  "Learning SQL Programming (Oct 2022)",
  "Python Data Analysis (Oct 2022)",
  "Lean Six Sigma Projects (Nov 2022)",
];

// THIS SECTION DOES: hold the About page paragraphs, written in Brant's first person voice
export const about = {
  headline: "About Brant",
  paragraphs: [
    "I am a product manager based in American Fork, Utah, and I am open to relocating.",
    "I like the whole loop, not just the build. I have owned product strategy, KYC, onboarding, and the card program at Crew Finance, run analytics across product teams at Divvy, and sold campaigns on the front lines at Utah Business. Selling what I ship shows me the gaps faster than any dashboard.",
    "My top Clifton strength is Futuristic. I think in roadmaps and in how a product wins against the field while staying useful to the customer.",
    "I use AI every day and train teams on it every week. I believe the teams that adopt tools like Cursor early will move the fastest.",
    "I studied Business Strategy with a Product Management emphasis at the BYU Marriott School of Business.",
  ],
};

// THIS SECTION DOES: hold the Projects list
// Rule from Brant: live links only. A project without a working URL is marked "coming soon"
// and is never turned into a clickable link, so the site has no dead links.
export const projects: Project[] = [
  {
    name: "BrantChat",
    blurb:
      "An AI assistant trained on my work. Ask it about my product experience, my projects, or how I think.",
    status: "live",
    kind: "chat", // opens the chat panel on this site, a working on-site feature
  },
  {
    name: "Filibusters",
    blurb:
      "A project on how political systems and procedure actually work. The live link is coming soon.",
    status: "coming-soon", // no url on purpose, so it never renders as a link
  },
  {
    name: "Conference matchmaking",
    blurb:
      "An app that uses AI to connect the right people at business conferences. The live link is coming soon.",
    status: "coming-soon",
  },
];
