// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the About / biography page. It introduces who Brant is and
// how he thinks about security and compliance in product work. Deeper
// narrative sections can grow here over time without duplicating the
// variant-specific home hero.
// ============================================

import { aboutSecurityFocus } from "@/content/about-security";

// THIS SECTION DOES: short about stub plus security and compliance emphasis
export default function AboutPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-h1 text-text-primary">About</h1>
      <p className="mt-4 text-body text-text-secondary">
        I am a founder and product leader who puts people first. I build products and systems where
        teams and customers stay in the loop, with security and compliance treated as part of the
        product, not a late audit surprise.
      </p>

      <h2 className="mt-12 text-h2 text-text-primary">{aboutSecurityFocus.title}</h2>
      <p className="mt-4 text-body text-text-secondary">{aboutSecurityFocus.intro}</p>
      <ul className="mt-6 flex flex-col gap-3">
        {aboutSecurityFocus.lines.map((line) => (
          <li key={line} className="text-body text-text-primary before:mr-2 before:content-['•']">
            {line}
          </li>
        ))}
      </ul>
    </section>
  );
}
