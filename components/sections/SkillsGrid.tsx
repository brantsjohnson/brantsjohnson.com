// ============================================
// WHAT THIS FILE DOES (plain English):
// This draws the Skills page as a set of grouped cards (Product, AI,
// Technical, Design, Business, Leadership), each listing its skills.
// Grouping keeps a long list scannable instead of one wall of words.
// ============================================

import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { GlassPanel } from "@/components/motion/GlassPanel";
import type { SkillGroup } from "@/content/site-content";

// THIS SECTION DOES: describe what the grid needs
type SkillsGridProps = {
  groups: SkillGroup[];
};

// THIS SECTION DOES: draw one card per skill group, in a responsive grid
export function SkillsGrid({ groups }: SkillsGridProps) {
  return (
    <StaggerChildren className="shell grid grid-cols-1 gap-6 pb-16 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <StaggerItem key={group.group}>
          <GlassPanel className="h-full p-6">
            <h2 className="text-h3">{group.group}</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {group.items.map((item) => (
                <li key={item} className="text-body text-text-secondary">
                  {item}
                </li>
              ))}
            </ul>
          </GlassPanel>
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}
