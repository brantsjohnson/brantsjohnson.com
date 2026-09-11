// ============================================
// WHAT THIS FILE DOES (plain English):
// This is a tiny shared helper so any button on the site (the
// "BrantChat" nav item, the home "Ask about my work" button, a
// project card) can open the chat panel without being wired
// directly to it. A button announces "please open the chat" and the
// chat panel is listening for that announcement. This keeps the
// button and the panel from needing to know about each other.
// ============================================

// THIS SECTION DOES: name the single announcement both sides agree on
export const OPEN_CHAT_EVENT = "brantchat:open";

// THIS SECTION DOES: send the "please open the chat" announcement
export function openBrantChat() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT));
  }
}
