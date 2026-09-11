// ============================================
// WHAT THIS FILE DOES (plain English):
// This is a button that opens the in-site chat panel when clicked (for
// example the home page "Ask about my work" button). It does not draw the
// chat itself; it just sends the "open chat" signal, and the floating
// ChatLauncher panel hears it and opens.
// ============================================

"use client";

import { openChat } from "@/components/chatbot/chat-events";

// THIS SECTION DOES: render a button that, when clicked, opens the chat panel
export function OpenChatButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button type="button" onClick={openChat} className={className}>
      {children}
    </button>
  );
}
