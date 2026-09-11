// ============================================
// WHAT THIS FILE DOES (plain English):
// This is a tiny shared helper so any button on the site (the
// "BrantChat" nav item, the home "Ask about my work" button, a
// project card) can open the chat panel without being wired
// directly to it. A button announces "please open the chat" and the
// chat panel is listening for that announcement.
// ============================================

export const OPEN_CHAT_EVENT = "brantchat:open";

export function openBrantChat() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT));
  }
}

/** @deprecated Use openBrantChat; kept for older call sites in this PR branch. */
export const openChat = openBrantChat;
