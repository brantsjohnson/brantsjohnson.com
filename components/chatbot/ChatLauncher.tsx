// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Ask about me panel on every public page. The nav button,
// the hero button, and a visit to /?ask=1 all open it. The panel holds
// the same conversation as the full chat page. Escape closes it.
// ============================================

"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { ChatWidget } from "@/components/chatbot/ChatWidget";
import { OPEN_CHAT_EVENT } from "@/components/chatbot/chat-events";

export function ChatLauncher({ configured = true }: { configured?: boolean }) {
  const [open, setOpen] = useState(false);

  // THIS SECTION DOES: open when another button asks, or when the URL says ?ask=1
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    const params = new URLSearchParams(window.location.search);
    if (params.get("ask") === "1") setOpen(true);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-modal sm:inset-auto sm:bottom-24 sm:right-6">
          <div
            role="dialog"
            aria-label="Ask about me"
            className="flex h-[100dvh] w-full flex-col overflow-hidden border border-border-subtle bg-bg shadow-glass sm:h-[36rem] sm:w-[24rem] sm:rounded-panel"
          >
            <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3">
              <span className="font-serif text-h3 text-ink">Ask about me</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close Ask about me"
                data-track="button:close_chat:global"
                className="rounded-control p-2 text-ink"
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

    </>
  );
}
