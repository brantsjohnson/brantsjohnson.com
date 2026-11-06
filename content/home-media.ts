// ============================================
// WHAT THIS FILE DOES (plain English):
// The photos and lines on the home page: the index of five places,
// and the four cards under "A few places to start." The page draws
// them. The sitemap reads the same list, so a photo on the home
// page is filed under the home page.
// ============================================

import { sectionCovers } from "@/content/covers";
import { crew, ph, type Photo } from "@/content/photos";

export type HomeIndexRow = {
  href: string;
  title: string;
  line: string;
  linkText: string;
  photo: Photo;
  track: string;
};

export type HomeStartCard = {
  title: string;
  tag: string;
  line: string;
  href: string;
  linkText: string;
  photo: Photo;
  ratio: string;
  track: string;
};

// THIS SECTION DOES: the five places in the home index. The photo
// beside the list is the same cover the section page shares.
export const homeIndex: HomeIndexRow[] = [
  {
    href: "/about",
    title: "About",
    line: "The longer introduction, plus a few stories I'd have trouble fitting into a résumé.",
    linkText: "Meet me",
    photo: sectionCovers.about,
    track: "link:index_about:home",
  },
  {
    href: "/work",
    title: "Experience",
    line: "Products I've built, teams I've worked with, and what I learned doing it.",
    linkText: "See the experience",
    photo: sectionCovers.work,
    track: "link:index_work:home",
  },
  {
    href: "/events",
    title: "Events",
    line: "Conferences I've helped put on, community events, parties, and performances.",
    linkText: "Explore events",
    photo: sectionCovers.events,
    track: "link:index_events:home",
  },
  {
    href: "/community",
    title: "Leadership",
    line: "Service, the archway, the scholarship, and the other work I stayed with.",
    linkText: "See leadership",
    photo: sectionCovers.community,
    track: "link:index_community:home",
  },
  {
    href: "/articles",
    title: "Articles",
    line: "Articles and poetry. No elaborate introduction required.",
    linkText: "Read the articles",
    photo: sectionCovers.writing,
    track: "link:index_writing:home",
  },
];

// THIS SECTION DOES: the four cards a visitor can open from the home page.
export const homeStarts: HomeStartCard[] = [
  {
    title: "Bridger",
    tag: "Social software",
    line: "I'm building it to help people form friendships through the things they love and give third places better ways to bring people together.",
    href: "/work/bridger",
    linkText: "The Bridger story",
    photo: { src: "/photos/bridger-live.webp", alt: "The live Bridger waitlist window.", width: 900, height: 989, position: "50% 0%" },
    ratio: "4 / 5",
    track: "link:start_bridger:home",
  },
  {
    title: "Intro",
    tag: "Events + AI",
    line: "A tool I'm building for event organizers who want people to leave having met somebody useful, interesting, or worth seeing again.",
    href: "/work/intro",
    linkText: "How Intro started",
    photo: { src: "/photos/intro-live.webp", alt: "The live Intro site, with the attendee experience on a phone.", width: 1200, height: 750, position: "30% 0%" },
    ratio: "4 / 5",
    track: "link:start_intro:home",
  },
  {
    title: "Events I've helped put on",
    tag: "Event work",
    line: "Business conferences, community gatherings, and a few events that needed a lot of convincing before they happened.",
    href: "/events",
    linkText: "See the events",
    photo: ph("general/brant-planning-conference-founder-friday.webp", "A group selfie at Founder Friday in front of a bright stage."),
    ratio: "4 / 5",
    track: "link:start_events:home",
  },
  {
    title: "Crew",
    tag: "Product + illustration",
    line: "I helped build a banking product for families. I also ended up drawing a large part of its brand.",
    href: "/work/crew",
    linkText: "See Crew",
    photo: crew("door-summer.webp", "A Crew illustration of a blue front door with a wreath and two shrubs."),
    ratio: "4 / 5",
    track: "link:start_crew:home",
  },
];
