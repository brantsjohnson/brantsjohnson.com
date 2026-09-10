/**
 * Service page content.
 *
 * Purpose: describes community/service work. Seeded with the two items from the
 * live site — the Uintah Resilience Archway and the Resilient Scholarship.
 * Details are kept as short, honest placeholders for Brant to expand.
 */

export type ServiceItem = {
  title: string;
  summary: string;
  // Optional link if there's a page to point to.
  href?: string;
};

const items: ServiceItem[] = [
  {
    title: "Uintah Resilience Archway",
    summary:
      "TODO: Add a short description of the Uintah Resilience Archway — what it is, why it exists, and your role in it.",
  },
  {
    title: "Resilient Scholarship",
    summary:
      "TODO: Add a short description of the Resilient Scholarship — who it supports, what it funds, and how it started.",
  },
];

export const service = {
  heading: "Service",
  intro:
    "Work I've done in and for my community. This matters to me as much as the product work.",
  items,
};
