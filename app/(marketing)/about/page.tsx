// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the About page: the long first-person story, a Now snapshot,
// the full work timeline, leadership, and community service. Experience
// lives here rather than as its own top-level tab.
// ============================================

import type { Metadata } from "next";
import { about } from "@/content/about";
import { now } from "@/content/now";
import { experience } from "@/content/experience";
import { leadership } from "@/content/leadership";
import { service } from "@/content/service";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { SectionBlock } from "@/components/sections/SectionBlock";
import { NowBlock } from "@/components/sections/NowBlock";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { ServiceList } from "@/components/sections/ServiceList";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";

export const metadata: Metadata = {
  title: "About",
  description: about.heading,
};

// THIS SECTION DOES: stack the biography, Now, experience, leadership, and service blocks
export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <SectionBlock id="now" heading={now.heading} intro={now.intro}>
        <FadeInOnScroll>
          <NowBlock />
        </FadeInOnScroll>
      </SectionBlock>
      <SectionBlock id="experience" heading={experience.heading} intro={experience.intro}>
        <FadeInOnScroll>
          <ExperienceTimeline entries={experience.entries} />
        </FadeInOnScroll>
      </SectionBlock>
      <SectionBlock id="leadership" heading={leadership.heading} intro={leadership.intro}>
        <FadeInOnScroll>
          <ExperienceTimeline entries={leadership.entries} />
        </FadeInOnScroll>
      </SectionBlock>
      <SectionBlock id="service" heading={service.heading} intro={service.intro}>
        <ServiceList items={service.items} />
      </SectionBlock>
    </>
  );
}
