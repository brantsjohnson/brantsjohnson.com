"use client";

// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the glass chat panel that opens from the launcher. It looks
// like a real chat window so the later BrantChat integration has a
// home, but it does not call a model and it does not load private
// knowledge. Anything the visitor types gets a honest "not wired yet"
// reply from content/chat.ts.
// ============================================

import { useState, type FormEvent } from "react";
import { ArrowUp, Minus } from "lucide-react";
import { chat } from "@/content/chat";
import { Badge } from "@/components/ui/Badge";
import { IconButton } from "@/components/ui/IconButton";
import { ChatMessage } from "@/components/chatbot/ChatMessage";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ChatPanelProps = {
  onClose: () => void;
};

// THIS SECTION DOES: keep a tiny local transcript and reply with the preview string only
export function ChatPanel({ onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: chat.welcome },
  ]);
  const [draft, setDraft] = useState("");

  function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: "user", content: trimmed },
      { id: `preview-${Date.now()}`, role: "assistant", content: chat.previewReply },
    ]);
    setDraft("");
  }

  return (
    <section
      aria-label="Chat preview"
      className="glass flex h-[440px] w-[min(100vw-2.5rem,380px)] flex-col overflow-hidden rounded-panel border border-line shadow-lift"
    >
      <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand/[0.08] font-mono text-xs font-medium text-brand">
            BJ
          </span>
          <div>
            <p className="text-[13px] font-medium leading-tight text-ink">{chat.panelTitle}</p>
            <p className="text-[11px] leading-tight text-ink-soft">{chat.panelSubtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone="accent" dot>
            Preview
          </Badge>
          <IconButton
            label="Close chat"
            variant="ghost"
            size="sm"
            onClick={onClose}
            icon={<Minus className="h-4 w-4" aria-hidden="true" />}
          />
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} role={message.role} content={message.content} />
        ))}
      </div>

      <form onSubmit={handleSend} className="border-t border-line p-3">
        <div className="flex items-center gap-2 rounded-control border border-line bg-surface px-3 py-1.5 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
          <label htmlFor="brantchat-composer" className="sr-only">
            Message BrantChat
          </label>
          <input
            id="brantchat-composer"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={chat.placeholder}
            className="h-8 flex-1 bg-transparent text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!draft.trim()}
            className="focus-ring inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-on-accent transition-colors hover:bg-brand-soft disabled:opacity-30"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </form>
    </section>
  );
}
