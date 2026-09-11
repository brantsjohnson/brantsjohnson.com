// ============================================
// WHAT THIS FILE DOES (plain English):
// This holds the leadership and volunteer history shown on the About
// page. It uses the same shape as a work-history entry so it renders in
// a matching timeline. Facts are migrated from the CV and the live site.
// ============================================

import type { ExperienceEntry } from "./experience";

// THIS SECTION DOES: the leadership roles, most recent first
const entries: ExperienceEntry[] = [
  {
    role: "Organization Assistant",
    org: "TEDxSaltLakeCity",
    location: "Salt Lake City, UT",
    period: "Jan 2021 to Sept 2021",
    bullets: [
      "Ran monthly meetings with structured agendas and clear follow-ups, lifting team productivity and keeping projects on schedule",
      "Designed brand creatives for key events using the Adobe Creative Suite, which raised event visibility and engagement",
      "Built a creative funding push that raised an extra $85k for the 2023 event, a 60% increase over prior years",
      "Boosted volunteer task completion to 95% through personalized outreach and automated reminders",
    ],
  },
  {
    role: "Trip Leader",
    org: "Humanitarian XP",
    location: "Hilo, HI",
    period: "May 2021 to Aug 2021",
    bullets: [
      "Led 22 youth to build a home with Habitat for Humanity across 10 days",
      "Planned daily cultural, social, self-development, and service activities, adjusting for health, weather, and demand",
      "Managed the flight schedules of 22 youth and guided them through strict COVID protocol",
    ],
  },
  {
    role: "Product Manager and Sales, Regional Volunteer",
    org: "Community Service",
    location: "Birmingham, England",
    period: "May 2021 to Aug 2021",
    bullets: [
      "Directed 400 volunteers, training them on organizational standards and financial policies",
      "Ran quarterly marketing campaigns that reached thousands of people",
      "Managed and recorded over £30,000 (about $37,000) in monthly expenses with careful accountability",
      "Moved the organization to a 90% electronic system in three weeks, tripling office and volunteer efficiency",
    ],
  },
  {
    role: "Student Body President and Council Roles",
    org: "Student Council",
    location: "Vernal, UT",
    period: "2008 to 2017",
    bullets: [
      "Led student council from 4th grade through senior year, finishing as High School Student Body President over a 26-member council",
      "Elected student body president in elementary, middle, and high school",
      "Created the school's Arts Chair role after leading large holiday projects, including 25-foot Christmas trees and hand-painted 15-foot nutcrackers",
      "Planned assemblies, spirit weeks, food drives, and dances, and secured unusual venues such as a homecoming in an airport hangar",
      "Launched the school's first elementary yearbook and delivered keynote remarks at graduation and school events",
    ],
  },
];

// THIS SECTION DOES: bundle the leadership timeline with its intro
export const leadership = {
  heading: "Leadership",
  intro:
    "Community, volunteer, and student leadership work, from organizing events to leading teams of hundreds of volunteers.",
  entries,
};
