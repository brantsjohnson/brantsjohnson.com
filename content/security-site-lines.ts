// ============================================
// WHAT THIS FILE DOES (plain English):
// Content-locked security and compliance lines for the public site.
// DEFAULT and LINKEDIN_X share the technical set. SOCIAL uses trust
// wording only (no AI, agentic, or LLM jargon). SOC 2 language is
// readiness and aligned controls, not a claimed certification.
// ============================================

export const defaultAndLinkedInSecurityLines = [
  "I treat security and compliance as product work: access control, encryption at rest, audit trails, and SOC 2 aligned controls built into how we ship.",
  "On Bridger and Intro, sensitive fields are designed so plaintext PII is not the default path: field level encryption and split key patterns keep data usable without leaving it exposed.",
  "For AI features I care about protections in the loop: least privilege access, careful handling of model inputs, break glass for emergencies, and clear ownership when something goes wrong.",
  "Cybersecurity is not a slide at the end. It is how onboarding, KYC style checks, and admin tools get scoped before they reach users.",
  "I would rather show control readiness (who can see what, what is encrypted, what is logged) than claim a badge we have not earned.",
] as const;

export const socialSecurityLines = [
  "I build technology that protects people: privacy by default, careful access, and systems that earn trust.",
  "Bridger and Intro are designed so personal details stay protected, not sitting around in the open.",
  "Security and compliance are part of caring for the community, not a marketing afterthought.",
] as const;
