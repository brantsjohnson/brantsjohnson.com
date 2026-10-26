// ============================================
// WHAT THIS FILE DOES (plain English):
// The Community section: the overview page (the archway, the
// scholarship, public service and student government) and the full
// story of the archway and the scholarship. The words come from the
// approved copy doc. No dollar figures. Words only, no UI.
// ============================================

import { archwayVideo, ph, type Photo } from "@/content/photos";
import { go, type Detail } from "@/content/detail";

export const communityIntro = {
  label: "Community",
  title: "Community",
  description: "Community projects and public-service work I've helped bring to life, from a scholarship to a long-running construction project.",
  lead: "I've gotten involved in community projects because I cared about the people who wanted them to happen. I've helped organize a scholarship, work through public-service questions, and get a large construction project across the finish line with a lot of help.",
};

export const communityLeads = [
  {
    slug: "archway",
    title: "The Uintah Resilience Archway",
    body: "At eighteen, I drew plans for a replacement arch over my high school's road. About five years later, it was built. Getting there involved local businesses, donated labor, and a lot of phone calls.",
    linkText: "Read the archway story",
    href: "/community/archway",
    photo: ph("general/brant-alone-at-the-archway.webp", "Brant standing alone on a long road beneath the Uintah arch.", undefined, { focus: { x: 0.5, y: 0.62 } }),
  },
  {
    slug: "scholarship",
    title: "The Resilience Scholarship",
    body: "I helped start a scholarship for graduating seniors dealing with circumstances their transcripts can't show. Funding left over from the arch project helped get it going.",
    linkText: "Read about the scholarship",
    href: "/community/scholarship",
    photo: ph("general/resilience-scholarship-2023.webp", "Two scholarship recipients with Brant on stage in front of a red and white Utes backdrop.", undefined, { focus: { x: 0.5, y: 0.5 } }),
  },
];

export const publicService = {
  title: "Public service",
  body: [
    "I started by calling Vernal's city manager at sixteen and asking if I could intern. He said yes.",
    "Later I worked in the Utah Governor's Office and the state's economic development office. During COVID-19, I helped businesses understand federal grant rules. In 2022 I interned in Washington, D.C., with Senator Mitt Romney, where much of my time involved responding to constituents.",
    "I've learned a lot from hearing people explain what isn't working for them, especially when they're frustrated.",
  ],
};

export const studentGovernment = {
  title: "Student government",
  body: [
    "I was student body president in elementary school, middle school, and high school. I met regularly with administrators and counselors about student well-being, helped start an arts committee, and planned more than fifty-five assemblies.",
    "We also held a homecoming dance at an airport, with a helicopter delivering the game ball. I wrote more about that night under Events.",
  ],
  link: go("School events", "/events/school-events", "link:school_events:community"),
  extra: "I earned Eagle Scout rank, with a project to redesign a city roundabout, and volunteered with the Boys & Girls Club.",
};

// THIS SECTION DOES: photos from public service, shown in a grid with hover captions
export const serviceGallery: Photo[] = [
  ph("general/mitt-romney-photo-with-brant.webp", "Brant and Senator Mitt Romney on a staircase.", "With Senator Mitt Romney"),
  ph("general/brant-with-gov-gary-herbert.webp", "Brant in a tuxedo with Governor Gary Herbert and his wife at a holiday event.", "With Governor Gary Herbert", { position: "50% 30%" }),
  ph("general/fbla-scholars-panel.webp", "Brant in a patterned jacket smiling beside two students at a scholars panel.", "A scholars panel", { position: "30% 40%" }),
  ph("general/brant-with-kamala-harris.webp", "Brant in a dark suit beside Vice President Kamala Harris in a room with an American flag.", "With Vice President Kamala Harris"),
  ph("general/jill-biden.webp", "Brant beside First Lady Jill Biden and two others in a classroom hallway.", "With First Lady Jill Biden"),
  ph("general/brant-white-house.webp", "Brant standing in a White House hallway near the presidential flag.", "At the White House", { position: "50% 30%" }),
  ph("general/brant-in-vp-motorcade.webp", "A view from inside a motorcade with police motorcycles on the road ahead.", "In the Vice President's motorcade"),
  ph("general/brant-on-presidential-steps-in-capitol.webp", "Brant standing on grand steps in the Capitol.", "In the Capitol", { position: "50% 55%" }),
  ph("general/utah-economic-forum-conference-planned.webp", "A group posed at the Utah Economic Forum.", "Utah Economic Forum"),
];

const crumbs = (label: string) => [{ label: "Community", href: "/community" }, { label }];
const back = { href: "/community", label: "All community work" };

export const communityDetails: Detail[] = [
  {
    slug: "archway",
    path: "/community/archway",
    title: "The Uintah Resilience Archway",
    metaTitle: "The Uintah Resilience Archway",
    description: "How a high school archway in Vernal, Utah, was rebuilt with local help after years of planning.",
    crumbs: crumbs("Archway"),
    label: "Community",
    lead: ["Someone told me that projects like this never get finished. For a while, I worried they might be right."],
    glance: [
      { label: "Where", value: "Vernal, Utah" },
      { label: "Build", value: "2017 to 2023" },
      { label: "Size", value: "About 25 feet tall and 63 feet wide" },
    ],
    sections: [
      {
        id: "old-arch",
        title: "The old arch",
        body: [
          "The arch over the road to my high school came down when the road was widened. The old sign sat in a yard for years. When I was eighteen, I drew a bigger replacement and started calling companies to ask for money, steel, engineering help, or time.",
          "There were a few changes in school leadership along the way. Three principals, two school boards, and two superintendents later, we were still working on it.",
        ],
        stats: [
          { value: "25 ft", label: "tall" },
          { value: "63 ft", label: "wide" },
          { value: "5", label: "years" },
        ],
        photos: [
          ph("general/original-archway.webp", "The old Home of the Utes arch over the road.", "The old arch"),
          ph("general/real-blueprints-for-archway.webp", "The engineering blueprint of the Uintah arch.", "The blueprint", { fit: "contain", bg: "#ffffff" }),
        ],
      },
      {
        id: "getting-built",
        title: "Getting it built",
        body: [
          "I didn't do the welding. Local companies and skilled workers did that, and I'm grateful they took the calls. I kept working on the plans, donations, and coordination so we could get the arch installed.",
          "We had to rethink parts of the design when it got too complicated. The final plan was modular, and we raised the clearance by five feet so buses could pass underneath.",
        ],
        photos: [
          ph("general/brant-arch-being-welded.webp", "Brant with two builders in front of the steel arch frame.", "The frame", { focus: { x: 0.35, y: 0.42 } }),
          ph("general/screenshot-2026-10-23-at-14-01-53.webp", "Red steel arch pieces lying in the grass.", "Red steel"),
        ],
      },
      {
        id: "finished",
        title: "Under the finished arch",
        body: ["Students now take graduation photos there. Money left over from the project also helped start the Resilience Scholarship."],
        links: [go("Read about the scholarship", "/community/scholarship", "link:scholarship:archway")],
        video: archwayVideo,
        photos: [ph("general/screenshot-2026-10-23-at-14-03-32.webp", "A group of students standing on the road beneath the finished Uintah arch.", "Under the finished arch")],
      },
    ],
    links: [go("All community work", "/community", "link:community:archway")],
    back,
  },
  {
    slug: "scholarship",
    path: "/community/scholarship",
    title: "The Resilience Scholarship",
    metaTitle: "Resilience Scholarship",
    description: "The Resilience Scholarship recognizes graduating seniors in Vernal whose experiences and responsibilities may be missing from their school transcripts.",
    crumbs: crumbs("Resilience Scholarship"),
    label: "Community",
    lead: ["Some students have a lot going on outside school. They're working, taking care of siblings, or dealing with situations at home that never appear next to a GPA."],
    glance: [
      { label: "Founded", value: "2020" },
      { label: "Where", value: "Vernal, Utah" },
    ],
    sections: [
      {
        id: "why",
        title: "Why we started it",
        body: [
          "I wanted there to be a way to recognize seniors whose lives had required a kind of effort their transcripts couldn't describe.",
          "We used money left over from the archway project to help start the scholarship. I also began meeting weekly with school counselors, who knew the students and the circumstances that a normal application might miss.",
        ],
        photos: [
          ph("general/resilience-23.webp", "A scholarship recipient on stage in front of a red and white Utes backdrop.", "2023", { position: "50% 40%" }),
          ph("general/resilience-scholarship-25.webp", "Brant on stage with a recipient in front of balloons shaped like the number 25.", "2025"),
        ],
      },
      {
        id: "night",
        title: "Scholarship night",
        body: [
          "We gather people from the community to celebrate the students receiving it. Seeing those seniors recognized in front of people who care about them has been one of my favorite parts of the project.",
        ],
        photos: [ph("general/scholarship-night-fundraiser-event.webp", "A scholarship night event with a piano and round tables.", "Scholarship night")],
      },
    ],
    links: [go("Scholarship Night event", "/events/scholarship-night", "link:scholarship_night:scholarship"), go("All community work", "/community", "link:community:scholarship")],
    back,
  },
];
