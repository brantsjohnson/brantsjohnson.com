/**
 * Leadership content.
 *
 * Purpose: the leadership and volunteer history migrated from the live site.
 * Same shape as an experience entry (role, org, location, dates, bullets) so it
 * renders with a matching timeline. Keep these accurate; do not invent detail.
 */

import type { ExperienceEntry } from "./experience";

const entries: ExperienceEntry[] = [
  {
    role: "Organization Assistant",
    org: "TEDxSaltLakeCity",
    location: "Salt Lake City, UT",
    period: "Jan. – Sept. 2021",
    bullets: [
      "Directed the organization & management of monthly meetings, optimizing for efficiency & effective follow-ups. Implemented structured agendas & actionable minutes to ensure clear objectives & accountability, significantly enhancing team productivity & project timelines",
      "Conceptualized & designed compelling brand creatives to promote key events, employing a mix of Adobe Creative Suite & digital design principles, leading to increased event visibility & engagement, showcasing a blend of creativity & marketing acumen",
      "Systematically enhanced volunteer engagement & commitment through strategic communication & reminders by utilizing a mix of personalized outreach & automated tools to boost task completion rates to 95%, demonstrating exceptional volunteer management & motivational skills",
      "Developed & executed a creative funding strategy that successfully raised an additional $85K in donations for the 2023 event, marking a 60% increase from previous years, by employing a combination of digital marketing, social media campaigns, & community engagement to reach & exceed fundraising goals",
      "Leveraged G-Suite tools to streamline team coordination & task completion processes. Implemented automated notifications & reporting features to keep team members informed & on track, leading to a significant increase in the completion of team tasks, which improved team efficiency & fostered a culture of transparency & accountability",
    ],
  },
  {
    role: "Trip Leader",
    org: "Humanitarian XP",
    location: "Hilo, HI",
    period: "May – Aug. 2021",
    bullets: [
      "Coordinated 22 youth to build a home with Habitat for Humanity for a series of 10 days",
      "Planned cultural, social, self-development, & service activities daily that would be reevaluated based on health, weather, & demand",
      "Managed the flight schedules of 22 youths & proceeded to navigate them through strict COVID protocol",
    ],
  },
  {
    role: "Product Manager & Sales",
    org: "Regional Volunteer",
    location: "Birmingham, England",
    period: "May – Aug. 2021",
    bullets: [
      "Directed & elevated the performance of 400 volunteers, providing comprehensive training on organizational standards & financial policies to enhance overall effectiveness & compliance",
      "Conceptualized & executed impactful quarterly marketing campaigns, successfully reaching thousands, demonstrating adeptness in campaign design & audience engagement",
      "Leveraged advanced troubleshooting skills to improve internal communication, actively listening to & addressing volunteers' feedback, fostering a collaborative environment",
      "Managed & meticulously recorded over £30,000 ($37,000) in monthly expenses, ensuring financial integrity & accountability within the organization",
      "Significantly boosted office & volunteer staff efficiency threefold by transitioning the organization to a 90% electronic system within three weeks, showcasing strong change management & digital transformation skills",
      "Established & consistently met ambitious short & long-term organizational goals across 20+ regions, aligning team efforts & optimizing regional operations",
    ],
  },
  {
    role: "Various Roles",
    org: "Student Council",
    location: "Vernal, UT",
    period: "2008 – 2017",
    bullets: [
      "Led Student Council leadership from 4th grade through senior year, culminating as High School Student Body President, managing a 26-member council and collaborating closely with administrators, faculty, and counseling staff",
      "Elected Student Body President in elementary, middle, and high school, consistently recognized for initiative, creativity, and community impact",
      "Created and institutionalized the \u201cArts Chair\u201d role after developing large-scale holiday d\u00e9cor initiatives (25-ft Christmas trees, hand-painted 15-ft nutcrackers), boosting school spirit and student morale",
      "Planned and executed major school-wide events including assemblies, spirit weeks, food drives, and multiple dances; secured unique venues and experiences (e.g., homecoming in an airport hangar, helicopter \u201cball drop\u201d)",
      "Launched school's first elementary yearbook and coordinated with local media as Student Council Historian to provide school coverage",
      "Developed inclusive marketing strategies as Publicity Chair, ensuring balanced representation of all clubs and activities; initiatives praised by students and counselors for strengthening recognition and mental health",
      "Designed and led \u201cCompliment Poster\u201d campaigns credited with improving campus culture and student well-being",
      "Innovated student engagement by introducing creative fundraising strategies (e.g., stunts, challenges) to finance assemblies and events, consistently meeting or exceeding goals",
      "Delivered keynote remarks at graduation and throughout school events, recognized for engaging public speaking and ability to unite diverse audiences",
    ],
  },
];

export const leadership = {
  heading: "Leadership",
  intro:
    "Community, volunteer, and student leadership work — from organizing events to leading teams of volunteers.",
  entries,
};
