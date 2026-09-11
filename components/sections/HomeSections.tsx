// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the "where to go next" block on the home page. It shows a
// card for each main area (Experience, Service, Leadership, Skills)
// with a one-line description, so a first-time visitor gets a quick,
// structured map of the site, the way a good overview page does.
// ============================================

import Link from "next/link";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { GlassPanel } from "@/components/motion/GlassPanel";

// THIS SECTION DOES: hold the short doorway copy for each main section
const doorways = [
  { title: "Experience", href: "/experience", blurb: "Product and sales roles, from Crew Finance to Utah Business." },
  { title: "Service", href: "/service", blurb: "Humanitarian and community work, at home and abroad." },
  { title: "Leadership", href: "/leadership", blurb: "Teams, volunteers, and programs I have directed." },
  { title: "Skills", href: "/skills", blurb: "Product, AI, technical, design, business, and leadership." },
];

// THIS SECTION DOES: draw the doorway cards in a responsive grid
export function HomeSections() {
  return (
    <section aria-label="Explore" className="shell pb-16">
      <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {doorways.map((d) => (
          <StaggerItem key={d.title} className="h-full">
            <Link href={d.href} className="block h-full">
              <GlassPanel className="h-full p-6 transition-transform duration-[120ms] ease-brand hover:scale-[1.02]">
                <h2 className="text-h3">{d.title}</h2>
                <p className="mt-3 text-body text-text-secondary">{d.blurb}</p>
              </GlassPanel>
            </Link>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
