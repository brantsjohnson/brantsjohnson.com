// ============================================
// WHAT THIS FILE DOES (plain English):
// The Work page. Instead of a timeline, the roles are grouped under
// four threads that run through everything: Building things,
// Storytelling, Organizing and Listening. Each role has a short note
// on what he did and why it mattered. Facts come from
// docs/about-brant.md. No dollar figures. Words only, no UI.
// ============================================

import { ph, type Photo } from "@/content/photos";

export type Role = {
  org: string;
  role: string;
  dates: string;
  summary: string;
  href?: string;
  hrefLabel?: string;
};

export type Thread = {
  id: string;
  number: string;
  title: string;
  line: string; // the through-line, in one sentence
  roles: Role[];
  photo: Photo;
};

export const workIntro = {
  label: "Work",
  title: "Four threads, one through-line.",
  lead: "My résumé can look like it jumps around. Read by theme, it is the same work every time.",
};

export const threads: Thread[] = [
  {
    id: "building",
    number: "01",
    title: "Building things",
    line: "I like to take something from a rough idea to a real product that people use, and to own the whole thing while I do.",
    photo: ph("general/crew-team-photo.webp", "The Crew team piled onto a yellow couch.", "The Crew team"),
    roles: [
      {
        org: "Intro",
        role: "Founder and Product Lead",
        dates: "Nov 2025 to present",
        summary:
          "AI agent software for live events of about 100 to 600 people. It matches attendees, sponsors and organizers and explains every recommendation in plain language. Success means accepted recommendations and completed meetings, not clicks.",
        href: "/projects/intro",
        hrefLabel: "About Intro",
      },
      {
        org: "Bridger",
        role: "Founder",
        dates: "Apr 2025 to present",
        summary:
          "An app that helps people become friends around what they love. It is in a TestFlight beta, built with contracted engineers and designers.",
        href: "/projects/bridger",
        hrefLabel: "About Bridger",
      },
      {
        org: "Crew Finance",
        role: "Senior Product Manager and first employee",
        dates: "Dec 2022 to Apr 2024",
        summary:
          "I owned the Visa card issuing program end to end: the card, KYC with banking and compliance partners, manufacturing and shipping, and onboarding for parent and kid, with PCI and COPPA requirements and 8 outside suppliers. A/B experiments cut onboarding time 50% and raised engagement 20%.",
        href: "/projects/crew",
        hrefLabel: "The Crew brand",
      },
      {
        org: "BackLocal",
        role: "Head of Product, Sandbox (BYU's venture program)",
        dates: "Sept 2021 to Sept 2022",
        summary:
          "I ran more than 370 user interviews and led 5 engineers and 2 UX designers to a revenue-generating B2B launch in an 8-month program. We were one of only four teams with revenue at Demo Day.",
        href: "/projects/backlocal",
        hrefLabel: "The BackLocal story",
      },
      {
        org: "Regional volunteer organization, Birmingham, England",
        role: "Product Manager (pro bono)",
        dates: "Oct 2017 to Sept 2019",
        summary:
          "My first product role. I designed and coded three reporting tools by myself, cutting reporting from about two days to about three hours. The organization added a second engineer to maintain them.",
      },
    ],
  },
  {
    id: "storytelling",
    number: "02",
    title: "Storytelling",
    line: "A product is a story people have to understand in a few seconds. I learned that from brands, ad campaigns and the stage.",
    photo: ph("elf-photos/53362776363-e26ba4db3a-o.webp", "Elves and a yellow taxi on the snowflake stage in Elf the Musical.", "Elf the Musical"),
    roles: [
      {
        org: "Crew brand",
        role: "Lead illustrator",
        dates: "Dec 2022 to Apr 2024",
        summary:
          "There was no outside brand partner that fit, so I sketched the brand on an iPad and carried it across the card, packaging, landing page, onboarding and app. I used symbols instead of drawings of families so every kind of family could feel included.",
        href: "/projects/crew",
        hrefLabel: "See the Crew brand",
      },
      {
        org: "Utah Business Magazine and Deseret News",
        role: "Account Executive",
        dates: "Oct 2024 to Nov 2025",
        summary:
          "I chose sales on purpose, to hear \"I can't justify this spend\" from the person saying it. About 63 clients across 52 annual events. I brought sponsor objections back to product, and that problem led to Intro.",
      },
      {
        org: "BYU Young Ambassadors",
        role: "Performer",
        dates: "Apr 2021 to May 2023",
        summary:
          "The international musical theatre company. Year one was a brand-new, untested show that flopped and was cut. Year two was a well-tested show that toured South Korea. Even Broadway veterans fail when they skip testing.",
        href: "/projects/theater",
        hrefLabel: "The theater work",
      },
      {
        org: "High school theater marketing",
        role: "Marketing lead",
        dates: "Junior and senior year",
        summary:
          "I built our first social media ad strategy and led a 10-person student team. We sold out 1,200 seats every night of a 12-day run, and the program placed top 10 in the state.",
      },
      {
        org: "Writing and podcast",
        role: "Writer",
        dates: "2024 to present",
        summary: "Essays on connection, craft and AI, on Substack and LinkedIn, and a conversation on the Quick Before You Forget podcast.",
        href: "/writing",
        hrefLabel: "Read the writing",
      },
    ],
  },
  {
    id: "organizing",
    number: "03",
    title: "Organizing",
    line: "My job is usually getting the right people into one project and keeping it alive until it is finished.",
    photo: ph("general/brant-arch-being-welded.webp", "Brant with two builders in front of the steel arch frame.", "The archway frame", { position: "50% 35%" }),
    roles: [
      {
        org: "Uintah Resilience Archway",
        role: "Designer and project lead",
        dates: "2017 to 2023",
        summary:
          "At eighteen I drew a new arch for my high school's road and cold-called companies for money, steel, engineering and labor. It took about five years, three principals, two school boards and two superintendents.",
        href: "/community/archway",
        hrefLabel: "The archway story",
      },
      {
        org: "Resilience Scholarship",
        role: "Founder",
        dates: "Founded 2020",
        summary:
          "A scholarship for seniors carrying things no transcript shows, with a weekly meeting with school counselors so those students get seen.",
        href: "/community/scholarship",
        hrefLabel: "The scholarship",
      },
      {
        org: "Regional volunteer organization, Birmingham, England",
        role: "Regional Volunteer",
        dates: "Oct 2017 to Sept 2019",
        summary:
          "I led and trained about 400 volunteers across more than 20 regions and moved about 90% of admin work off paper in three weeks.",
      },
      {
        org: "TEDxSaltLakeCity",
        role: "Organization Assistant",
        dates: "Jan to Sept 2021",
        summary: "I helped organize the event behind the scenes.",
      },
      {
        org: "Student government",
        role: "Student body president, elementary, middle and high school",
        dates: "4th grade through senior year",
        summary:
          "I was the first student body president to meet weekly with administrators and counselors about student well-being, planned 55+ assemblies, and created an arts chair role that grew into a committee.",
      },
    ],
  },
  {
    id: "listening",
    number: "04",
    title: "Listening",
    line: "Data raises confidence and interviews explain what the data can't. I want my instinct fed good information.",
    photo: ph("general/mitt-romney-photo-with-brant.webp", "Brant and Senator Mitt Romney on a staircase.", "Washington, D.C."),
    roles: [
      {
        org: "Divvy (now BILL)",
        role: "Associate Product Management Analyst (internship)",
        dates: "Jun to Sept 2022",
        summary:
          "I took the project nobody wanted, fixing Pendo. I interviewed every product pod, rebuilt the taxonomy and trained 13 teams, and data accuracy reached 93%. I was the analytics partner to 8 product managers.",
      },
      {
        org: "Office of Senator Mitt Romney, U.S. Senate",
        role: "Congressional Intern, Washington, D.C.",
        dates: "Sept to Dec 2022",
        summary: "I handled 50 to 200 constituent inquiries a day and turned about 500 pages of nuclear licensing policy into a 2-page brief.",
      },
      {
        org: "BYU Public Ethics Lab",
        role: "Product and Data Analyst",
        dates: "Nov 2020 to Oct 2021",
        summary: "Research drawn from 250 local-government interviews.",
      },
      {
        org: "Utah Governor's Office of Economic Development",
        role: "Communication and Marketing Intern",
        dates: "Jul to Dec 2020",
        summary: "I advised about 950 businesses on federal grant rules during COVID-19.",
      },
      {
        org: "Utah Governor's Office",
        role: "Constituent Intern",
        dates: "Sept 2019 to Dec 2020",
        summary: "Constituent correspondence and briefing sheets for the Governor's meetings.",
      },
    ],
  },
];

// THIS SECTION DOES: the close of the page, with the traditional version for anyone who wants it
export const workClose = {
  title: "Prefer the traditional version?",
  body: "Everything above, in the order a recruiter expects it.",
};
