// ============================================
// WHAT THIS FILE DOES (plain English):
// A home page block for security, compliance, or privacy and trust,
// depending on the visitor's referral variant. Copy lives in
// content/referral-variants.ts; this file only lays it out.
// ============================================

import type { ReferralVariantCopy } from "@/content/referral-variants";

type SecurityFocusProps = {
  copy: ReferralVariantCopy;
};

// THIS SECTION DOES: show the variant security or trust bullets when present
export function SecurityFocus({ copy }: SecurityFocusProps) {
  const block = copy.securityFocus;
  if (!block || block.lines.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="home-security-focus-title"
      className="mx-auto w-full max-w-3xl px-4 pb-12"
      data-referral-variant={copy.id}
    >
      <h2 id="home-security-focus-title" className="text-h2 text-text-primary">
        {block.title}
      </h2>
      <ul className="mt-6 flex flex-col gap-3">
        {block.lines.map((line) => (
          <li key={line} className="text-body text-text-primary before:mr-2 before:content-['•']">
            {line}
          </li>
        ))}
      </ul>
    </section>
  );
}
