"use client";

// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the chat bubble people see on every public page. It is a
// glass pill that says "Ask about my work." Clicking it opens a
// preview panel. It does not talk to BrantChat yet and it never loads
// private knowledge in the browser.
// ============================================

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { chat } from "@/content/chat";
import { ChatPanel } from "@/components/chatbot/ChatPanel";

// THIS SECTION DOES: show the launcher pill, and swap it for the preview panel when open
export function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8">
      {open ? (
        <ChatPanel onClose={() => setOpen(false)} />
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-label="Ask about my work"
          data-track="button:open_chat:global"
          className="focus-ring group flex items-center gap-3 rounded-panel border border-line bg-glass px-4 py-3 shadow-lift backdrop-blur-glass transition-transform duration-300 hover:-translate-y-0.5"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.05]">
            <MessageCircle className="h-4 w-4 text-ink" strokeWidth={1.6} aria-hidden="true" />
          </span>
          <span className="hidden text-left sm:block">
            <span className="block font-heading text-[13.5px] font-medium text-ink">{chat.launcherLabel}</span>
            <span className="block font-heading text-[12px] text-ink-soft">{chat.launcherHint}</span>
          </span>
        </button>
      )}
    </div>
  );
}
