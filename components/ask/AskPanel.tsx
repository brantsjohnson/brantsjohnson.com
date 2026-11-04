// ============================================
// WHAT THIS FILE DOES (plain English):
// The one rounded panel on the site. It invites someone to ask
// about Brant, and it lives on the home page only. The heading
// says it once. The button opens the chat.
// ============================================

import { Button } from "@/components/ui/Button";

export function AskPanel() {
  return (
    <section aria-labelledby="ask-panel-home" className="shell py-8 md:py-12">
      <div className="ask-panel flex flex-col gap-6 rounded-[18px] bg-[#122e48] px-6 py-8 md:flex-row md:items-end md:justify-between md:px-10 md:py-10">
        <div className="max-w-[40rem]">
          <h2 id="ask-panel-home" className="font-serif text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.98]">
            Ask about me
          </h2>
          <p className="ask-copy mt-4 text-body">
            I have worked on a lot of different things. The chat answers from the public notes on this site. If the answer is not in those notes, it should say so.
          </p>
        </div>
        <Button href="/ask" track="button:ask_about_me:home" className="shrink-0">
          Open the chat
        </Button>
      </div>
    </section>
  );
}
