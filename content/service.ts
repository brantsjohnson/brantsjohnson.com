/**
 * Service page content.
 *
 * Purpose: describes community/service work. Seeded with the two items from the
 * live site — the Uintah Resilience Archway and the Resilient Scholarship.
 * Details are kept as short, honest placeholders for Brant to expand.
 */

export type ServiceItem = {
  title: string;
  // Role(s) held, shown as a small subtitle.
  role: string;
  // Timeframe, e.g. "Completed Nov. 2022".
  period: string;
  summary: string;
  // Optional call to action (used by the Resilient Scholarship donation note).
  note?: string;
  // Optional link if there's a page to point to.
  href?: string;
};

const items: ServiceItem[] = [
  {
    title: "Uintah Resilience Archway",
    role: "Designer, Fundraiser & Project Manager",
    period: "Completed Nov. 2022",
    summary:
      "As Student Body President at Uintah High, I rebuilt the traditional entrance arch that had been removed during renovations. I fundraised and coordinated donated services to deliver a roughly $100k archway that honors the original tradition while fitting the school's remodel.",
  },
  {
    title: "Resilient Scholarship",
    role: "Founder",
    period: "Began 2020",
    summary:
      "A scholarship for students who show real resilience but may not fit the traditional 4.0-and-extracurriculars profile. It's donor-funded, and has awarded four $1,200 scholarships to date.",
    note: "Want to help fund a future award? Reach out to Brant to donate.",
  },
];

export const service = {
  heading: "Service",
  intro:
    "Work I've done in and for my community. This matters to me as much as the product work.",
  items,
};
