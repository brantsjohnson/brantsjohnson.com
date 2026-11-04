// ============================================
// WHAT THIS FILE DOES (plain English):
// A clear invitation to Ask about me. It sits on the home page and
// the About page so the chatbot is easy to find, not only a small
// link in the footer. The button opens the Ask page.
// ============================================

import { Button } from "@/components/ui/Button";

export function AskPanel({ where }: { where: "home" | "about" }) {
  return (
    <section aria-labelledby={`ask-panel-${where}`} className="shell py-8 md:py-12">
      <div className="page-masthead relative">
        <div aria-hidden="true" className="absolute inset-0 translate-x-2 translate-y-2 rounded-[18px] bg-[#0c1f30]" />
        <div className="relative flex flex-col gap-8 rounded-[18px] bg-[#122e48] px-6 py-8 shadow-glass md:flex-row md:items-end md:justify-between md:px-10 md:py-10">
          <div className="max-w-[40rem]">
            <p className="label">Ask</p>
            <h2 id={`ask-panel-${where}`} className="mt-3 font-serif text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.98]">
              Ask about me
            </h2>
            <p className="mt-4 text-body text-on-hero">
              I have worked on a lot of different things. Ask a question and I will answer from the public notes on this site. If the answer is not in those notes, it should say so.
            </p>
          </div>
          <Button href="/ask" track={`button:ask_about_me:${where}`} className="min-h-[56px] shrink-0 px-8 text-[1.15rem]">
            Ask a question
          </Button>
        </div>
      </div>
    </section>
  );
}
