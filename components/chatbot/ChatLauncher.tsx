// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the little round chat button that floats in the bottom-right
// corner of the marketing pages (including the home page). Tapping it opens
// a small panel with the chat inside, so visitors can ask about Brant right
// where they are without leaving the page. It reuses the same ChatWidget and
// the same server brain as the /chat page.
// ============================================

"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { ChatWidget } from "@/components/chatbot/ChatWidget";
import { OPEN_CHAT_EVENT } from "@/components/chatbot/chat-events";

// THIS SECTION DOES: "configured" tells the panel whether the server has an
// AI key set, so the chat can show a clear "not set up yet" message instead
// of a confusing error when it is missing.
export function ChatLauncher({ configured = true }: { configured?: boolean }) {
  const [open, setOpen] = useState(false);

  // THIS SECTION DOES: open the panel when any "Ask about my work" style
  // button sends the open-chat signal
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
  }, []);

  // THIS SECTION DOES: let people close the panel by pressing the Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* THIS SECTION DOES: the open chat panel. On phones it fills the screen;
          on larger screens it is a tidy card anchored bottom-right. */}
      {open && (
        <div className="fixed inset-0 z-50 sm:inset-auto sm:bottom-24 sm:right-6">
          <div className="flex h-[100dvh] w-full flex-col overflow-hidden border border-border-subtle bg-surface shadow-xl sm:h-[36rem] sm:w-96 sm:rounded-2xl">
            <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3">
              <span className="font-semibold text-text-primary">Ask about Brant</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-lg p-1 text-text-secondary transition-colors hover:bg-glass hover:text-text-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1">
              <ChatWidget configured={configured} />
            </div>
          </div>
        </div>
      )}

      {/* THIS SECTION DOES: the floating round button that opens or closes chat */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with BrantChat"}
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-colors hover:bg-accent-muted"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
}
