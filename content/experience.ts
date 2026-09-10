// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the full work history shown as a timeline on the About page.
// Each entry has a role, an organization (with an optional note like a
// parent company or manager), a location, a date range, and the bullet
// points describing the work. Adding or editing a role is just editing
// this list. Facts follow the CV and LinkedIn, not the older Wix site.
// ============================================

// THIS SECTION DOES: describe the shape of one timeline entry (reused by leadership too)
export type ExperienceEntry = {
  role: string;
  org: string;
  orgNote?: string; // parent company, team, or manager, when useful
  location?: string;
  period: string; // written with "to", never a dash, per the voice rules
  bullets: string[];
  href?: string;
};

// THIS SECTION DOES: the roles, most recent first.
// Utah Business ended Nov 2025 (not "Present"); Crew Finance is the founding-team role.
const entries: ExperienceEntry[] = [
  {
    role: "Account Executive",
    org: "Utah Business Magazine",
    location: "Salt Lake City, UT",
    period: "Oct 2024 to Nov 2025",
    bullets: [
      "Built expertise across 25+ marketing products (print, digital, SEO, custom publications, billboards, TV, and radio), advising clients on the right mix to meet their goals",
      "Partnered with agency teams to design and run integrated campaigns, gaining front-line insight into what businesses actually spend money on and what drives results",
      "Worked daily with sales quotas, CRMs, and outreach tracking, which sharpened my ability to collaborate with and interview sales teams as a product manager",
      "Spotted patterns in client success to tell quickly when product quality, not messaging, was the real lever",
      "Turned customer objections and feature feedback into clear input for product and sales teams",
    ],
  },
  {
    role: "Principal Product Manager, Founding Team",
    org: "Crew Finance",
    location: "Lehi, UT",
    period: "Dec 2022 to Mar 2024",
    bullets: [
      "Helped secure $2.5 million in venture capital by co-creating the pitch deck that told the company story",
      "Taught myself illustration with no formal art classes and hand-drew the entire brand identity as lead illustrator",
      "Added animation and a full dark mode, and kept design in house, internalizing work worth roughly $110k and saving 350+ hours",
      "Ran customer interviews and data analysis to pinpoint the target customer and refine the marketing strategy",
      "Shaped product direction and design choices to align with market needs and company goals",
      "Directed packaging design and the unboxing experience to raise customer satisfaction",
    ],
  },
  {
    role: "Constituent Services",
    org: "Office of Senator Mitt Romney",
    location: "Washington, D.C.",
    period: "Sept 2022 to Dec 2022",
    bullets: [
      "Researched and condensed nuclear licensing policy from 500 pages to 2 to inform budget appropriations",
      "Organized 50 to 200 daily incoming requests into analytics on constituent sentiment for the Senator",
      "Gave weekly information tours to visitors from around the world, sharing 80+ memorized facts",
    ],
  },
  {
    role: "Product Analytics, Pendo",
    org: "Divvy Pay",
    orgNote: "A Bill.com company",
    location: "Draper, UT",
    period: "May 2022 to Sept 2022",
    bullets: [
      "Integrated Pendo across iOS, React Native, and web so the data team could see how thousands of customers used the product",
      "Enabled CSS tagging on all UI elements, working with engineering to raise data accuracy to 95%",
      "Trained all 45 teams of designers, engineers, and product managers on using Pendo in their work",
      "Designed a companywide taxonomy of 53 elements to keep Pendo clean across every team",
    ],
  },
  {
    role: "Product Manager and Entrepreneur",
    org: "BackLocal",
    orgNote: "Sandbox technology incubator",
    location: "Provo, UT",
    period: "Sept 2021 to June 2022",
    bullets: [
      "Took SaaS software through the product development lifecycle and earned revenue at launch",
      "Led a 7-day design and ideation sprint to build product strategy and a proof of concept for product-market fit",
      "Organized a designer, an engineer, a visual designer, and 5 interns in an agile team to roll out the MVP",
      "Negotiated a sales partnership that returned 33% more than the original terms outlined",
    ],
  },
  {
    role: "Marketing Analyst",
    org: "FranklinCovey",
    orgNote: "For Scott J. Miller, VP of Thought Leadership",
    location: "Salt Lake City, UT",
    period: "Jan 2021 to Mar 2023",
    bullets: [
      "Managed transcripts for the world's largest leadership podcast, listened to by over 1 million weekly subscribers",
      "Gathered 85,000 leads through LinkedIn Navigator to promote a new online business training course",
      "Produced 4 times more leads per hour than peers, beating a goal of 500 by 1,500 for book launches",
    ],
  },
  {
    role: "Data Analyst",
    org: "BYU Public Ethics Lab",
    orgNote: "Master of Public Administration program",
    location: "Provo, UT",
    period: "Nov 2020 to Oct 2021",
    bullets: [
      "Redesigned 75% of a project to find correlations between three main performance indicators",
      "Worked with a team of 7 to revise research from 250 local government interviews",
      "Modeled sentiment trends within qualitative data using SQL and VBA",
    ],
  },
  {
    role: "Constituent Services",
    org: "Governor's Office of Economic Development",
    location: "Salt Lake City, UT",
    period: "June 2020 to Nov 2020",
    bullets: [
      "Managed citizen communication channels and helped resolve issues",
      "Provided materials to businesses for a statewide COVID-19 awareness campaign",
      "Helped plan and run the 2020 Utah Economic and Energy Summit",
    ],
  },
  {
    role: "Verification Specialist",
    org: "HealthLift",
    location: "Provo, UT",
    period: "Dec 2019 to June 2020",
    bullets: [
      "Worked daily with insurance companies, doctor offices, pharmacies, and patients",
      "Verified information quickly and accurately in a way that helped both patients and the business",
      "Applied HIPAA rules carefully and followed up with clients promptly",
    ],
  },
  {
    role: "Communications",
    org: "Utah Governor's Office",
    location: "Salt Lake City, UT",
    period: "Sept 2019 to Dec 2019",
    bullets: [
      "Organized and documented incoming constituent correspondence and the Governor's weekly appointments",
      "Prepared briefing sheets and hosted constituents ahead of meetings",
      "Coordinated with state departments to conduct tours for the office of the Governor",
    ],
  },
  {
    role: "Executive Assistant",
    org: "Uintah County Travel and Tourism",
    location: "Vernal, UT",
    period: "Jan 2017 to Oct 2017",
    bullets: [
      "Helped organize the 2017 Utah Symphony and Opera performance at Dinosaur National Monument for thousands of attendees",
      "Hosted the annual three-day statewide 2017 Utah Tourism Conference",
      "Marketed weekly county events and giveaways across social media, radio, and television",
      "Awarded for exceptional customer service and trusted with opening and closing the department",
    ],
  },
  {
    role: "Intern",
    org: "Vernal City Manager",
    location: "Vernal, UT",
    period: "Aug 2016 to Jan 2017",
    bullets: [
      "First to intern for the city and take part in community development projects",
      "Youngest member of the city's quarter-million-dollar health and well-being grant board",
      "Reviewed, maintained, and organized confidential material and researched government policy",
    ],
  },
];

// THIS SECTION DOES: bundle the timeline with its intro so pages read from one place
export const experience = {
  heading: "Experience",
  intro:
    "My work spans startups, media, and government. The throughline is the same everywhere: build tools, spaces, and stories that bring people together.",
  entries,
};
