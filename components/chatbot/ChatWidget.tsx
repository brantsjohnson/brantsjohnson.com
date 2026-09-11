// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the chat screen people actually use. It shows the conversation,
// an input box, and a few suggested questions. It talks to the server at
// /api/chatbot and streams Brant's answer back live. It never loads any
// private facts in the browser; it only sends the visitor's questions and
// shows the answers the server streams back.
// ============================================

"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { MessageContent } from "@/components/chatbot/MessageContent";

// THIS SECTION DOES: describe the optional context the widget can carry.
// "company" and "role" tailor answers; "suggestions" seeds the starter chips;
// "configured" is false when the server has no AI key set, so we can show a
// clear "not set up yet" message instead of letting the visitor hit an error.
interface ChatWidgetProps {
  company?: string;
  role?: string;
  suggestions?: string[];
  configured?: boolean;
}

// A few safe, general starter questions shown before the visitor types
const DEFAULT_SUGGESTIONS = [
  "Tell me about Brant's experience.",
  "What are Brant's strengths as a product manager?",
  "What is Brant's greatest accomplishment?",
  "What is Brant's experience with AI?",
];

// THIS SECTION DOES: pull the plain text out of an AI message, which arrives
// as a list of "parts" (the current AI SDK message shape)
function messageText(parts: { type: string; text?: string }[]): string {
  return parts
    .filter((part) => part.type === "text" && typeof part.text === "string")
    .map((part) => part.text as string)
    .join("");
}

export function ChatWidget({ company, role, suggestions, configured = true }: ChatWidgetProps) {
  // THIS SECTION DOES: if the server has no AI key, show a clear, honest
  // "not set up yet" screen instead of a chat box that would only error out
  if (!configured) {
    return (
      <div className="mx-auto flex h-full max-w-md flex-col items-center justify-center px-6 text-center">
        <h1 className="text-h3 font-semibold text-text-primary">Chat is not set up yet</h1>
        <p className="mt-3 text-body text-text-secondary">
          The assistant needs an OpenAI API key before it can answer. Once the
          site owner adds it, this chat will work here automatically.
        </p>
      </div>
    );
  }

  return <ConfiguredChatWidget company={company} role={role} suggestions={suggestions} />;
}

// THIS SECTION DOES: the real chat surface, only mounted when chat is set up.
// Kept as its own component so the chat connection (useChat) is not created at
// all in the "not set up yet" case above.
function ConfiguredChatWidget({ company, role, suggestions }: Omit<ChatWidgetProps, "configured">) {
  // THIS SECTION DOES: connect to the chat server. The transport sends the
  // optional company/role along with every message so answers can be tailored.
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chatbot",
      body: { company, role },
    }),
  });

  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const isBusy = status === "submitted" || status === "streaming";
  const starters = suggestions && suggestions.length > 0 ? suggestions : DEFAULT_SUGGESTIONS;

  // THIS SECTION DOES: keep the newest message in view as answers stream in
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBusy]);

  // THIS SECTION DOES: send whatever the visitor typed, then clear the box
  const submit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isBusy) return;
    sendMessage({ text: trimmed });
    setInput("");
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col">
      {/* THIS SECTION DOES: show the conversation, or a friendly intro first */}
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
        {!hasMessages && (
          <div className="mx-auto max-w-xl pt-8 text-center">
            <h1 className="text-h2 font-semibold text-text-primary">Ask about Brant</h1>
            <p className="mt-3 text-body text-text-secondary">
              {company
                ? `A quick way for the ${company} team to get to know Brant's work.`
                : "It is like a mini interview. Ask anything about his experience, skills, or interests."}
            </p>
          </div>
        )}

        {messages.map((message) => {
          const isUser = message.role === "user";
          return (
            <div
              key={message.id}
              className={cn("flex", isUser ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 shadow-sm",
                  isUser
                    ? "bg-accent text-white"
                    : "border border-border-subtle bg-surface text-text-primary"
                )}
              >
                {isUser ? (
                  <p className="whitespace-pre-wrap text-body">{messageText(message.parts)}</p>
                ) : (
                  <MessageContent text={messageText(message.parts)} />
                )}
              </div>
            </div>
          );
        })}

        {/* THIS SECTION DOES: show a "thinking" hint while the first words load */}
        {status === "submitted" && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-border-subtle bg-surface px-4 py-3 text-text-secondary">
              <span className="inline-flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-text-secondary" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-text-secondary [animation-delay:0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-text-secondary [animation-delay:0.3s]" />
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-border-subtle bg-surface px-4 py-3 text-text-secondary">
              Sorry, something went wrong. Please try again.
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* THIS SECTION DOES: the input area, with starter chips before first ask */}
      <div className="border-t border-border-subtle bg-glass px-4 py-4 backdrop-blur">
        {!hasMessages && (
          <div className="mb-3 flex flex-wrap justify-center gap-2">
            {starters.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => submit(question)}
                disabled={isBusy}
                className="rounded-full border border-border-subtle bg-surface px-3 py-1.5 text-caption text-text-secondary transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
              >
                {question}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(input);
          }}
          className="mx-auto flex max-w-3xl items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about Brant"
            aria-label="Ask a question about Brant"
            className="flex-1 rounded-xl border border-border-subtle bg-surface px-4 py-3 text-body text-text-primary outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={isBusy || !input.trim()}
            aria-label="Send message"
            className="rounded-xl bg-accent p-3 text-white transition-colors hover:bg-accent-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
