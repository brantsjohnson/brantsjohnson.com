// ============================================
// WHAT THIS FILE DOES (plain English):
// This holds the community service work shown on the About page: the
// Uintah Resilience Archway and the Resilient Scholarship. Facts come
// from the live site and personal notes. Keep them honest.
// ============================================

// THIS SECTION DOES: describe the shape of one service item
export type ServiceItem = {
  title: string;
  role: string; // the roles held, shown as a small subtitle
  period: string; // written with "to" or a single date, never a dash
  summary: string;
  note?: string; // an optional human line, such as how to help
};

// THIS SECTION DOES: the service items, most notable first
const items: ServiceItem[] = [
  {
    title: "Uintah Resilience Archway",
    role: "Designer, fundraiser, and project manager",
    period: "Completed Nov 2022",
    summary:
      "As Student Body President at Uintah High, I rebuilt the entrance arch that had been removed during renovations. I fundraised and coordinated donated services to deliver a roughly $100k archway that honors the original tradition while fitting the school's remodel.",
  },
  {
    title: "Resilient Scholarship",
    role: "Founder",
    period: "Began 2020",
    summary:
      "A scholarship for students who show real resilience but may not fit the usual 4.0 and full-slate profile. It is donor funded, and it has awarded four $1,200 scholarships so far.",
    note: "Want to help fund a future award? Reach out and I will point you to the fund.",
  },
];

// THIS SECTION DOES: bundle the service items with their intro
export const service = {
  heading: "Service",
  intro:
    "Work I have done in and for my community. This matters to me as much as the product work.",
  items,
};
