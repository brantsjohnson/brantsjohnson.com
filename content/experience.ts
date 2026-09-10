/**
 * Experience page content.
 *
 * Purpose: the full work history migrated from the live site. Each entry has a
 * role, organization (with an optional note like a parent company or manager),
 * location, date range, an external link, and the bullet points describing the
 * work. Adding or editing a role is a matter of editing this array.
 *
 * Note: bullets are migrated faithfully from the existing site; only obvious
 * typos were corrected. Do not invent employers, dates, or accomplishments.
 */

export type ExperienceEntry = {
  role: string;
  org: string;
  // Optional context under the org name (parent company, team, or manager).
  orgNote?: string;
  // Optional location — omitted where the source didn't reliably provide one.
  location?: string;
  // Human-readable date range, e.g. "Oct. 2024 – Nov. 2025".
  period: string;
  bullets: string[];
  // Optional link to the org/project.
  href?: string;
};

const entries: ExperienceEntry[] = [
  {
    role: "Account Executive",
    org: "Utah Business Magazine",
    location: "Salt Lake City, UT",
    period: "Oct. 2024 – Nov. 2025",
    bullets: [
      "Built expertise across 25+ marketing products (print, digital, SEO, custom publications, billboards, TV, and radio), consulting clients on the right mix to meet their goals",
      "Partnered with agency teams to design and execute integrated campaigns, providing front-line insight into what businesses actually spend money on and what drives results",
      "Gained firsthand experience with sales quotas, CRMs, and outreach tracking, strengthening my ability to collaborate with and interview sales teams as a product manager",
      "Developed sharper marketing strategy skills by identifying patterns in client success, quickly spotting gaps, and understanding when product quality, not messaging, drives outcomes",
      "Advocated for tighter collaboration between sales and product teams by translating customer objections, hesitations, and feature feedback into actionable insights",
      "Used tools like Monday.com to manage campaigns and workflows, staying organized across diverse offerings and sharpening a process-driven mindset",
    ],
  },
  {
    role: "Product Manager, Founding Team",
    org: "Crew Finance",
    location: "Lehi, UT",
    period: "Dec. 2022 – Apr. 2024",
    bullets: [
      "Conducted in-depth customer interviews and data analysis to pinpoint the startup's target customer base, directly impacting the refinement of the marketing strategy",
      "Played a beginning role in securing $2.5 million in venture capital by co-creating an influential pitch deck, highlighting the startup's potential and strategic vision",
      "Influenced product direction and design choices through collaborative leadership, aligning with market needs and company goals",
      "Applied insights from customer feedback to tailor design and strategy, ensuring product-market fit",
      "Spearheaded brand identity as the lead illustrator, crafting a unique visual language that appeals to a diverse demographic, balancing the interests of both parents and children",
      "Championed the startup's commitment to Diversity, Equity, and Inclusion (DEI), infusing core values into the brand's visual and operational identity",
      "Oversaw the end-to-end supply chain process, ensuring efficiency, cost-effectiveness, and timely delivery of products",
      "Directed the creative process for packaging design and user experience, enhancing customer satisfaction and unboxing appeal",
      "Orchestrated branding sprints utilizing the Story Brand framework, enhancing brand clarity and messaging to align with customer aspirations and market positioning",
    ],
  },
  {
    role: "Constituent Services",
    org: "Office of Senator Mitt Romney",
    location: "Washington, D.C.",
    period: "Sept. – Dec. 2022",
    bullets: [
      "Researched and consolidated nuclear licensing policy from 500 to 2 pages to inform budget appropriations",
      "Organized 50-200 daily incoming requests to provide analytics on constituent sentiment and requests of the Senator",
      "Provided weekly information tours to individuals, from all around the world, where 80+ memorized facts were shared",
    ],
  },
  {
    role: "Pendo Product Analytics",
    org: "Divvy Pay",
    orgNote: "A Bill.com company",
    location: "Draper, UT",
    period: "May – Sept. 2022",
    bullets: [
      "Integrated Pendo for the data analytics team on iOS, react native, and web applications to view thousands of customer usage",
      "Enabled CSS tagging on all UI elements to increase data accuracy to 95% by working with engineering to implement change",
      "Trained all 45 teams of UX designers, software engineers, and product managers on implementing Pendo into developments",
      "Designed companywide taxonomy of 53 elements to maintain cleanliness of Pendo across all teams and organizations",
      "Interviewed 10 other organizations and created a cost analysis of purchasing a $10,000 yearly integration with SalesForce",
      "Created operational process text and video guidebook of answers for 45 different scenarios employees may encounter",
    ],
  },
  {
    role: "Product Manager & Entrepreneur",
    org: "BackLocal",
    orgNote: "Sandbox: Technology Incubator",
    location: "Provo, UT",
    period: "Sept. 2021 – June 2022",
    bullets: [
      "Designed market strategy to take SaaS software through product development lifecycle and received revenue at launch",
      "Led team through a 7-day design and ideation sprint test to develop product strategy and proof of concept for product market fit",
      "Organized UX designer, computer scientist, visual designer, and 5 interns in an agile environment to roll-out MVP",
      "Negotiated sales partnership that enabled BackLocal to profit 33% more than the partnership outlined",
      "Coordinated with internal and external stakeholders weekly on team unity, trends in the market, and upcoming objectives",
    ],
  },
  {
    role: "Marketing Analyst",
    org: "FranklinCovey",
    orgNote: "Scott J. Miller, VP of Thought Leadership",
    location: "Salt Lake City, UT",
    period: "Jan. 2021 – Mar. 2023",
    bullets: [
      "Proactively managed transcripts of the world's largest leadership podcast listened to by over 1 million weekly subscribers",
      "Gathered 85,000 leads through LinkedIn Navigator to promote a new online entrepreneurial business training course",
      "Produced 4x more leads per hour than other employees surpassing goal of 500 by 1,500 to promote book launches",
    ],
  },
  {
    role: "Data Analyst",
    org: "BYU Public Ethics Lab",
    orgNote: "Masters of Public Administration",
    location: "Provo, UT",
    period: "Nov. 2020 – Oct. 2021",
    bullets: [
      "Redesigned 75% of project to prioritize and find correlations between data of three main performance indicators",
      "Worked with a team of 7 to revise research from 250 local government interviews with government directors",
      "Analyzed and modeled sentimental trends, within qualitative data, using SQL and VBA",
    ],
  },
  {
    role: "Constituent Services",
    org: "Governor's Office of Economic Development",
    period: "June – Nov. 2020",
    bullets: [
      "Managed citizen communication channels and litigated issues",
      "Worked with and provided materials to businesses for a statewide COVID-19 awareness campaign",
      "Helped plan and facilitate action for the 2020 Utah Economic and Energy Summit",
    ],
  },
  {
    role: "Verification Specialist",
    org: "HealthLift",
    location: "Provo, UT",
    period: "Dec. 2019 – June 2020",
    bullets: [
      "Worked with insurance companies, doctor's offices, pharmacies, and patients daily",
      "Able to verify information quickly and accurately in a positive and beneficial way for the business",
      "Knowledgeable in HIPAA laws",
      "Capable of motivating my team in positive and encouraging ways",
      "Followed up with clients promptly and swiftly",
    ],
  },
  {
    role: "Communications",
    org: "Utah Governor's Office",
    location: "Salt Lake City, UT",
    period: "Sept. – Dec. 2019",
    bullets: [
      "Responsible for organizing and documenting all constituent incoming correspondence and the Governor's weekly appointments",
      "Prepared for meetings either by: putting together briefing sheets, entertaining the constituent, or setting up the space",
      "Coordinated with various state departments to conduct tours for the office of the Governor",
      "Arranged data sheets in response to new legislation passed in Congress",
    ],
  },
  {
    role: "Executive Assistant",
    org: "Uintah County Travel & Tourism",
    location: "Vernal, UT",
    period: "Jan. – Oct. 2017",
    bullets: [
      "Advertised and assisted in organizing The 2017 Utah Symphony & Opera Performance at Dinosaur National Monument with 1000's of individuals in attendance. Hosted the annual, three day, state wide, 2017 Utah Tourism Conference",
      "Marketed weekly Uintah County events and giveaways, using various social media channels, radio, and television",
      "Used inventory skills to keep track of materials for local businesses and promptly went to resupply before empty",
      "Initiated contact and informed visitors, of all nationalities, of the larger variety of products and services available in the community",
      "Awarded for focusing on people by applying exceptional customer service skills",
      "Entrusted with the closing and opening of the department",
    ],
  },
  {
    role: "Intern",
    org: "Vernal City Manager",
    location: "Vernal, UT",
    period: "Aug. 2016 – Jan. 2017",
    bullets: [
      "First to intern for the City and engage in community development projects",
      "Youngest member of the cities quarter of a million Health and Well-being grant board",
      "Entrusted with reviewing, maintaining, and organizing confidential material",
      "Researched and developed government policy",
    ],
  },
];

export const experience = {
  heading: "Experience",
  intro:
    "My work has spanned startups, media, and government. Across all of it, the throughline is the same: building tools, spaces, and stories that bring people together.",
  entries,
};
