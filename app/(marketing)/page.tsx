// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Home page. It shows Brant's name and an "Ask about my work"
// button that opens the in-site chat panel (the same chat as the floating
// bubble), so visitors can ask about his work without leaving the page.
// Real hero, copy, and richer sections come in a later design pass.
// ============================================

import { OpenChatButton } from "@/components/chatbot/OpenChatButton";

// THIS SECTION DOES: show the name plus a button that opens the chat panel
export default function HomePage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-display font-semibold text-text-primary">Brant S. Johnson</h1>
      <p className="mt-4 text-body text-text-secondary">
        Resumes are old school. Ask my chatbot about my experience, skills, and interests.
      </p>

      {/* THIS SECTION DOES: open the in-site chat panel when clicked */}
      <OpenChatButton className="mt-8 rounded-xl bg-accent px-6 py-3 text-body font-medium text-white transition-colors hover:bg-accent-muted">
        Ask about my work
      </OpenChatButton>
    </section>
  );
}
