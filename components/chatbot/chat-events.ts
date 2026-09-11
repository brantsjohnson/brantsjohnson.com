// ============================================
// WHAT THIS FILE DOES (plain English):
// This is a tiny shared "signal" so a button anywhere on the page (like the
// home "Ask about my work" button) can tell the floating chat panel to open,
// without those two pieces having to know about each other directly. It just
// sends and listens for one named browser event.
// ============================================

// THIS SECTION DOES: the single event name both sides agree on
export const OPEN_CHAT_EVENT = "brantchat:open";

// THIS SECTION DOES: ask the chat panel to open (safe to call from any client button)
export function openChat(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_CHAT_EVENT));
  }
}
