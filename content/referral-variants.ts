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
    heroHeadline: "Founder and product leader who puts people first.",
    heroBody:
      "I build products and systems where teams and customers stay in the loop, not lost in dashboards. I use modern tools when they earn trust and save real time. Most of my energy goes to clarity, ownership, and work that holds up after launch.",
    focusLines: [
      "Founder and PM work across zero to one and scale.",
      "Bridger and Intro help people connect around shared tastes, not endless feeds.",
      "SOC 2 aligned security and compliance practices for product orgs, from access control to auditability.",
      "Civic systems and co-ops remind me that good products serve communities.",
    ],
    securityFocus: {
      title: "Security and compliance in product work",
      lines: [
        "I design systems with SOC 2 aligned controls: access, encryption, logging, and change management as product requirements, not afterthoughts.",
        "Shipped products need cybersecurity fundamentals: least privilege, secrets hygiene, encryption in transit and at rest, and audit trails teams can use.",
        "Phones, emails, and profile data are crown jewels. Field level encryption, split key custody, and audited break glass for raw PII stay in the spec.",
        "When models assist the workflow, I minimize PII in inputs and keep identity linked graphs out of training paths. No plaintext crown jewels in logs or analytics.",
      ],
    },
  },
  social: {
    id: "social",
    analyticsLabel: "social_connection",
    // Required hero line for Instagram, Threads, TikTok, and Substack links.
    heroHeadline: "Technology should bring people together, not keep them scrolling alone.",
    heroBody:
      "I care about ending isolation online and building ethical, people-first tech. Bridger and Intro are about real connection over performance. I follow co-ops, Filibuster, and other voices that explain how systems actually work.",
    focusLines: [
      "Connection beats vanity metrics.",
      "Shared tastes and introductions, not another algorithmic feed.",
      "Privacy and trust by design: encryption, tight access, and audited paths when support needs sensitive data.",
      "Systems thinking from Filibuster and cooperative models I trust.",
    ],
    securityFocus: {
      title: "Privacy and trust",
      lines: [
        "People share phones, emails, and profiles because they trust the product. I treat that data like crown jewels, not ad inventory.",
        "Encryption, least privilege access, and clear consent are part of the experience, not a policy page buried in settings.",
        "When someone needs sensitive data for support, access is rare, time limited, and logged so trust stays earned.",
      ],
    },
  },
  linkedin_x: {
    id: "linkedin_x",
    analyticsLabel: "linkedin_x_ai_craft",
    heroHeadline: "Agentic products with a human spine.",
    heroBody:
      "I design and ship AI-assisted workflows where the model does the busy work and people stay accountable. My craft is retrieval, tooling, and product judgment in an AI world. People still matter. That is the point of the automation.",
    focusLines: [
      "Agentic patterns that stay observable and reversible.",
      "SOC 2 aligned controls and AI data protections: scrubbed model inputs, field level encryption, break glass access.",
      "PM and founder lens on what to automate versus what to keep human.",
      "Bridger and Intro as products, not demos.",
    ],
    securityFocus: {
      title: "Security for agentic products",
      lines: [
        "I design product systems with SOC 2 aligned controls: access, encryption, logging, and change management as requirements, not afterthoughts.",
        "Cybersecurity fundamentals for shipped products: access control, secrets, encryption at rest and in transit, least privilege, and auditability.",
        "Phones, emails, and profile data get field level encryption, split key custody, and audited break glass. Plaintext crown jewels do not belong in logs or analytics.",
        "AI assisted workflows scrub or omit PII from model inputs and keep identity linked graphs out of training paths.",
      ],
    },
  },
};
