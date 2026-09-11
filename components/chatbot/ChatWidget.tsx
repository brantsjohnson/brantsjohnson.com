// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the BrantChat bubble people see on every public page. It
// sits in the bottom-right corner. Clicking it (or the "BrantChat"
// nav item, or the home "Ask about my work" button) opens a glass
// chat panel. The visitor types a question, and it is sent to the
// server at /api/chatbot. Private notes never load in the browser;
// only the server's answer comes back. The panel has one close
// control, keeps keyboard focus inside while open, and closes on
// the Escape key.
// ============================================

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { OPEN_CHAT_EVENT } from "@/components/chatbot/chat-events";

// THIS SECTION DOES: describe one line in the conversation
type ChatMessage = {
  from: "you" | "brantchat";
  text: string;
};

// A short, human welcome so the panel is never empty (docs/03 empty-state rule).
const WELCOME: ChatMessage = {
  from: "brantchat",
  text: "Hi, I am BrantChat. Ask me about Brant's product work, his projects, or how he thinks.",
};

export function ChatWidget() {
  // THIS SECTION DOES: remember whether the panel is open, the typed question, and the conversation
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [sending, setSending] = useState(false);

  const reduceMotion = useReducedMotion();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // THIS SECTION DOES: listen for the shared "please open the chat" announcement from other buttons
  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, openHandler);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, openHandler);
  }, []);

  // --- ACCESSIBILITY: move focus into the panel when it opens, and close on Escape ---
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      const escHandler = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", escHandler);
      return () => window.removeEventListener("keydown", escHandler);
    }
    // When closing, send focus back to the launcher so keyboard users are not lost.
    launcherRef.current?.focus();
  }, [open]);

  // THIS SECTION DOES: send the typed question to the server and show the answer
  const send = useCallback(async () => {
    const question = draft.trim();
    if (!question || sending) return;

    setMessages((prev) => [...prev, { from: "you", text: question }]);
    setDraft("");
    setSending(true);

    try {
      // --- PRIVACY: only the question goes out; the server keeps private notes and returns just the answer ---
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });
      const data = await res.json().catch(() => null);
      const reply =
        data?.answer ||
        data?.message ||
        "BrantChat is not fully wired up yet. Check back soon.";
      setMessages((prev) => [...prev, { from: "brantchat", text: reply }]);
    } catch {
      // A plain, useful error, per the copy rules in docs/03.
      setMessages((prev) => [
        ...prev,
        { from: "brantchat", text: "That did not go through. Try again in a moment." },
      ]);
    } finally {
      setSending(false);
    }
  }, [draft, sending]);

  return (
    <>
      {/* THIS SECTION DOES: the always-visible launcher in the bottom-right corner */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close BrantChat" : "Open BrantChat"}
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-modal flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-glass transition-transform duration-[120ms] ease-brand hover:scale-[1.05] focus-visible:outline-none"
      >
        {/* The icon is paired with an accessible name above, since a sparkle or bubble alone is ambiguous (docs/14 §7). */}
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* THIS SECTION DOES: the docked chat panel, revealed when open */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="BrantChat"
            initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-modal flex h-[70vh] max-h-[560px] w-[calc(100vw-48px)] max-w-[400px] flex-col overflow-hidden rounded-panel border border-border-subtle bg-glass shadow-glass backdrop-blur-glass"
          >
            {/* Panel header: title plus the one close control (docs/14 §6.1) */}
            <div className="flex items-center justify-between border-b border-border-subtle px-6 py-4">
              <span className="font-serif text-h3">BrantChat</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close BrantChat"
                className="flex h-9 w-9 items-center justify-center rounded-control text-text-secondary hover:text-text-primary focus-visible:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            {/* Message list */}
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={m.from === "you" ? "text-right" : "text-left"}
                >
                  <span
                    className={
                      m.from === "you"
                        ? "inline-block rounded-control bg-accent px-4 py-2 text-body text-white"
                        : "inline-block rounded-control bg-surface px-4 py-2 text-body text-text-primary"
                    }
                  >
                    {m.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Composer: one labeled input plus a send button */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send();
              }}
              className="flex items-end gap-2 border-t border-border-subtle px-4 py-3"
            >
              <label htmlFor="brantchat-input" className="sr-only">
                Ask BrantChat a question
              </label>
              <textarea
                id="brantchat-input"
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  // Enter sends; Shift plus Enter makes a new line.
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send();
                  }
                }}
                rows={1}
                placeholder="Ask about my work"
                className="max-h-28 flex-1 resize-none rounded-control border border-border-subtle bg-surface px-4 py-2 text-body text-text-primary focus-visible:outline-none"
              />
              <button
                type="submit"
                disabled={sending}
                aria-label="Send question"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-accent text-white transition-transform duration-[120ms] ease-brand hover:scale-[1.05] disabled:opacity-60 focus-visible:outline-none"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
