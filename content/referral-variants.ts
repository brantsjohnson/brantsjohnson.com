import {
  defaultAndLinkedInSecurityLines,
  socialSecurityLines,
} from "@/content/security-site-lines";

// ============================================
// WHAT THIS FILE DOES (plain English):
// Hero and focus copy for each referral-based home page variant.
// DEFAULT: people-first founder PM, light AI only where it is true.
// SOCIAL: connection and people-first tech. No AI, agentic, or LLM words.
// LINKEDIN_X: AI and agentic craft; people still matter.
//
// All on-site copy here follows docs/03-CONTENT-VOICE-GUIDELINES.md
// (no dashes used as punctuation).
// ============================================

export type ReferralVariantId = "default" | "social" | "linkedin_x";

export type ReferralSecurityFocus = {
  title: string;
  lines: string[];
};

export type ReferralVariantCopy = {
  id: ReferralVariantId;
  /** Short label for analytics or admin, not shown as a page title */
  analyticsLabel: string;
  heroHeadline: string;
  heroBody: string;
  focusLines: string[];
  /** Home page security, compliance, or privacy and trust block */
  securityFocus?: ReferralSecurityFocus;
};

// THIS SECTION DOES: hold every variant's words in one place
export const referralVariantContent: Record<ReferralVariantId, ReferralVariantCopy> = {
  default: {
    id: "default",
    analyticsLabel: "default_founder_pm",
    heroHeadline: "Good things deserve to happen.",
    heroBody:
      "Product manager and founder. I've owned the whole loop, from KYC and onboarding to analytics, and I sell what I ship.",
    focusLines: [
      "Founder and product work from the first version through launch.",
      "Intro helps people meet at live events.",
      "Bridger helps people become friends around what they love.",
      "Good products serve communities.",
    ],
    securityFocus: {
      title: "Security and compliance in product work",
      lines: [...defaultAndLinkedInSecurityLines],
    },
  },
  social: {
    id: "social",
    analyticsLabel: "social_connection",
    // Hero line for Instagram, Threads, TikTok, and Substack links.
    heroHeadline: "Good things deserve to happen.",
    heroBody:
      "I care about connection, and about technology that helps people find each other.",
    focusLines: [
      "Connection is the point of the work.",
      "Intro helps people meet in person. Bridger is a socialization app.",
      "I build tools, spaces, and stories that bring people together.",
    ],
    securityFocus: {
      title: "Privacy and trust",
      lines: [...socialSecurityLines],
    },
  },
  linkedin_x: {
    id: "linkedin_x",
    analyticsLabel: "linkedin_x_ai_craft",
    heroHeadline: "Good things deserve to happen.",
    heroBody:
      "I design and ship AI-assisted workflows where the model handles the busy work and people stay accountable. My craft is retrieval, tooling, and product judgment. People still matter.",
    focusLines: [
      "Agentic patterns that stay observable and reversible.",
      "A product judgment on what to automate and what to keep with a person.",
      "Intro is live software for events. Bridger helps people become friends around what they love.",
    ],
    securityFocus: {
      title: "Security and compliance in product work",
      lines: [...defaultAndLinkedInSecurityLines],
    },
  },
};
