// ============================================
// WHAT THIS FILE DOES (plain English):
// The Community page and its two case studies: the Uintah Resilience
// Archway and the Resilience Scholarship. Below them sits public
// service: government work and student leadership. Facts come from
// docs/about-brant.md and the earlier site copy. No dollar figures.
// Words only, no UI.
// ============================================

import type { Story } from "@/components/editorial/StoryRow";
import { archwayVideo, ph, type Photo } from "@/content/photos";
import type { CopyPart } from "@/content/narrative";

export type CommunityCase = {
  slug: string;
  title: string;
  kind: string;
  blurb: string;
  href: string;
  cover: Photo;
  lead: string;
  meta: { label: string; value: string }[];
  stories: Story[];
  gallery?: Photo[];
};

export const communityIntro = {
  label: "Community",
  title: "Who gets seen.",
  lead: "I care about the places that raised me, and about the students whose work no transcript shows.",
};

export const communityCases: CommunityCase[] = [
  {
    slug: "archway",
    title: "The Uintah Resilience Archway",
    kind: "Design · Fundraising · Build",
    blurb:
      "At eighteen I drew a new arch for my high school's road and spent about five years getting it built.",
    href: "/community/archway",
    cover: ph("general/brant-alone-at-the-archway.webp", "Brant standing alone on a long road beneath the Uintah arch.", undefined, { position: "50% 40%" }),
    lead: "Someone told me nothing like this ever gets done.",
    meta: [
      { label: "Where", value: "Vernal, Utah" },
      { label: "Build", value: "2017 to 2023" },
      { label: "Size", value: "About 25 ft tall, 63 ft wide" },
    ],
    stories: [
      {
        id: "idea",
        eyebrow: "The idea",
        title: "Nothing like this ever gets done.",
        body: [
          "The old arch over my high school's road came down when the road was widened, and it sat in a yard for years. At eighteen I drew a bigger one and started cold-calling companies for money, steel, engineering and labor. Someone told me nothing like this ever gets done.",
          "It took about five years, three principals, two school boards and two superintendents. I didn't weld it. My job was getting the people who could into one project and keeping it alive.",
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
        id: "build",
        eyebrow: "The build",
        title: "Getting the right people into one project.",
        body: [
          "More than once I was told it was overbuilt. That's how I learned about feature creep. I designed it modular and raised it five feet so buses clear it.",
        ],
        photos: [
          ph("general/brant-arch-being-welded.webp", "Brant with two builders in front of the steel arch frame.", "The frame", { position: "50% 35%" }),
          ph("general/screenshot-2026-10-23-at-14-01-53.webp", "Red steel arch pieces lying in the grass.", "Red steel"),
        ],
      },
      {
        id: "finished",
        eyebrow: "What it became",
        title: "Seniors take their photos under it.",
        body: [
          "Seniors take graduation photos under it every year. The funds left over started the Resilience Scholarship.",
          [
            { type: "link", text: "Read how the scholarship began", href: "/community/scholarship", track: "link:scholarship:archway" },
          ] as CopyPart[],
        ],
        video: archwayVideo,
        photos: [ph("general/screenshot-2026-10-23-at-14-03-32.webp", "A group of students standing on the road beneath the finished Uintah arch.", "Under the finished arch")],
      },
    ],
  },
  {
    slug: "scholarship",
    title: "The Resilience Scholarship",
    kind: "Founder · Scholarship",
    blurb: "A scholarship for seniors carrying things no transcript shows.",
    href: "/community/scholarship",
    cover: ph("general/resilience-scholarship-2023.webp", "Two scholarship recipients on stage in front of a red and white Utes backdrop.", undefined, { position: "50% 35%" }),
    lead: "Most scholarships reward lives that already make room for perfect grades.",
    meta: [
      { label: "Founded", value: "2020" },
      { label: "Where", value: "Vernal, Utah" },
      { label: "How", value: "A weekly meeting with school counselors" },
    ],
    stories: [
      {
        id: "why",
        eyebrow: "Why it exists",
        title: "For what no transcript shows.",
        body: [
          "I knew students carrying things no transcript shows: siblings to raise, homes that weren't safe, money that wasn't there. Most scholarships reward lives that already make room for perfect grades.",
          "I founded the Resilience Scholarship in 2020 and started a weekly meeting with the school counselors so those seniors get seen. Leftover funds from the archway helped start it.",
        ],
        photos: [
          ph("general/resilience-23.webp", "A scholarship recipient on stage in front of a red and white Utes backdrop.", "2023", { position: "50% 40%" }),
          ph("general/resilience-scholarship-25.webp", "Brant on stage with a recipient in front of balloons shaped like the number 25.", "2025"),
        ],
      },
      {
        id: "night",
        eyebrow: "Scholarship night",
        title: "A night to be seen.",
        body: ["Each year a scholarship night gathers the community to honor the seniors who earned it."],
        photos: [ph("general/scholarship-night-fundraiser-event.webp", "A scholarship night event with a piano and round tables.", "Scholarship night")],
      },
    ],
  },
];

export function getCommunityCase(slug: string): CommunityCase | undefined {
  return communityCases.find((item) => item.slug === slug);
}

// THIS SECTION DOES: the public service stories, shown on the Community page below the two leads
export const serviceStories: Story[] = [
  {
    id: "government",
    eyebrow: "Public service",
    title: "Listen for what sits under the anger.",
    body: [
      "At sixteen I called our city manager and asked to be the city's first intern. He said yes. Later I interned in the Governor's Office and worked with the Governor's Office of Economic Development during COVID, advising about 950 businesses on federal grant rules. In fall 2022 I interned for Senator Mitt Romney in Washington, D.C., handling 50 to 200 constituent inquiries a day.",
      [
        { type: "text", text: "What I took from it: listen for what sits under the anger. Cost, fairness, fear, a need to be heard. That's a product skill too. " },
        { type: "link", text: "See how I listen in my work", href: "/work#listening", track: "link:work_listening:community" },
      ],
    ],
    stats: [
      { value: "950", label: "businesses advised during COVID" },
      { value: "50 to 200", label: "constituent inquiries a day" },
    ],
    photos: [
      ph("general/mitt-romney-photo-with-brant.webp", "Brant and Senator Mitt Romney on a staircase.", "With Senator Mitt Romney"),
      ph("general/brant-with-gov-gary-herbert.webp", "Brant in a tuxedo with Governor Gary Herbert and his wife at a holiday event.", "With Governor Gary Herbert", { position: "50% 30%" }),
    ],
  },
  {
    id: "students",
    eyebrow: "Student leadership",
    title: "Seen first, then the party.",
    body: [
      "I was student body president in elementary, middle and high school. I was the first student body president to meet weekly with administrators and counselors about student well-being. I created an arts chair role and grew it into a committee.",
      "I made posters for students who deserved to be seen and hung them while they were in class. I also planned 55+ assemblies, and I threw a homecoming dance inside an airport, with a helicopter delivering the game ball.",
      "I'm an Eagle Scout, and my project redesigned the city's roundabout. I've also volunteered with the Boys & Girls Club.",
    ],
    stats: [
      { value: "3", label: "student body presidencies" },
      { value: "55+", label: "assemblies planned" },
    ],
    photos: [
      ph("general/fbla-scholars-panel.webp", "Brant in a patterned jacket smiling beside two students at a scholars panel.", "A scholars panel", { position: "30% 40%" }),
    ],
  },
];

// THIS SECTION DOES: photos from public service, shown in a grid with hover captions
export const serviceGallery: Photo[] = [
  ph("general/brant-with-kamala-harris.webp", "Brant in a dark suit beside Vice President Kamala Harris in a room with an American flag.", "With Vice President Kamala Harris"),
  ph("general/jill-biden.webp", "Brant beside First Lady Jill Biden and two others in a classroom hallway.", "With First Lady Jill Biden"),
  ph("general/brant-white-house.webp", "Brant standing in a White House hallway near the presidential flag.", "At the White House", { position: "50% 30%" }),
  ph("general/brant-in-vp-motorcade.webp", "A view from inside a motorcade with police motorcycles on the road ahead.", "In the Vice President's motorcade"),
  ph("general/brant-on-presidential-steps-in-capitol.webp", "Brant standing on grand steps in the Capitol.", "In the Capitol", { position: "50% 55%" }),
  ph("general/utah-economic-forum-conference-planned.webp", "A group posed at the Utah Economic Forum.", "Utah Economic Forum"),
];
