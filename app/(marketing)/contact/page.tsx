// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Contact page. It is the one place contact happens. The
// email is shown here and nowhere else. There is a short human line
// and a mailto button. There is no social dump and no form in this pass.
// ============================================

import type { Metadata } from "next";
import { contact } from "@/content/contact";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.note,
};

// THIS SECTION DOES: center the contact card on the page
export default function ContactPage() {
  return (
    <section aria-labelledby="contact-heading" className="flex min-h-[70vh] items-center justify-center px-5 py-24">
      {/* THIS SECTION DOES: fade the contact card in so this page matches the motion language of the site */}
      <FadeInOnScroll>
        <ContactBlock />
      </FadeInOnScroll>
    </section>
  );
}
