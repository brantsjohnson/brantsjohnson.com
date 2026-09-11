// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the top of the home page. It shows Brant's full name large
// in the serif typeface (the look he prefers), one line saying what
// he does, and two actions: "Ask about my work" opens BrantChat, and
// "See my experience" goes to the Experience page. The chat invite is
// visible right here on home, not buried.
// ============================================

import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";
import { Button } from "@/components/ui/Button";
import { OpenChatButton } from "@/components/chatbot/OpenChatButton";
import { hero } from "@/content/site-content";

// THIS SECTION DOES: draw the home hero with the name, the positioning line, and the two actions
export function Hero() {
  return (
    <FadeInOnScroll className="shell pt-24 pb-16 md:pt-32">
      <p className="text-caption uppercase tracking-widest text-text-secondary">{hero.eyebrow}</p>

      {/* The full name, large, in serif. This is the wordmark's moment, never initials. */}
      <h1 className="mt-4 text-display font-serif">{hero.name}</h1>

      <p className="mt-6 max-w-reading text-body text-text-secondary">{hero.positioning}</p>

      {/* Two actions: the accent chat invite is the single primary action; experience is the quieter one */}
      <div className="mt-8 flex flex-wrap gap-4">
        <OpenChatButton variant="primary">{hero.primaryCta.label}</OpenChatButton>
        <Button variant="ghost" href={hero.secondaryCta.href}>
          {hero.secondaryCta.label}
        </Button>
      </div>
    </FadeInOnScroll>
  );
}
