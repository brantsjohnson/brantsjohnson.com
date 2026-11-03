// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Ask about me chat when the AI model is switched on.
// A visitor can ask anything about Brant. The question goes to the
// server at /api/chatbot, which answers only from the public notes,
// and the answer streams in word by word. If the model cannot answer
// (no budget left, a network problem, a model error), the same
// question is answered from the public notes with no model, so the
// visitor always gets a reply. Nothing private is loaded in the browser.
// ============================================

"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { MessageContent } from "@/components/chatbot/MessageContent";
import { Button } from "@/components/ui/Button";
import { PRESET_QUESTIONS } from "@/lib/ai/answer-question";

function textOf(parts: { type: string; text?: string }[]): string {
  return parts
    .filter((part) => part.type === "text" && typeof part.text === "string")
    .map((part) => part.text as string)
    .join("");
}

export function AskAssistant() {
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chatbot" }),
  });
  const [input, setInput] = useState("");
  const [fallbacks, setFallbacks] = useState<Record<string, string>>({});
  const endRef = useRef<HTMLLIElement>(null);
  const busy = status === "submitted" || status === "streaming";

  // When the model cannot answer, answer the last question from the public notes instead.
  useEffect(() => {
    if (!error) return;
    const users = messages.filter((message) => message.role === "user");
    const last = users[users.length - 1];
    if (!last || fallbacks[last.id] !== undefined) return;
    const question = textOf(last.parts);
    const earlier = users.slice(0, -1).map((message) => textOf(message.parts));
    setFallbacks((current) => ({ ...current, [last.id]: "" }));
    fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, earlier }),
    })
      .then((response) => response.json() as Promise<{ answer?: string; error?: string }>)
      .then((body) =>
        setFallbacks((current) => ({
          ...current,
          [last.id]: body.answer ?? body.error ?? "That question did not go through. Try again.",
        }))
      )
      .catch(() =>
        setFallbacks((current) => ({ ...current, [last.id]: "That question did not go through. Try again." }))
      );
  }, [error, messages, fallbacks]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages, fallbacks, busy]);

  const ask = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || busy) return;
    sendMessage({ text: trimmed });
    setInput("");
  };

  return (
    <div className="shell flex flex-col gap-8 py-8 pb-24">
      <ol className="flex min-h-[8rem] flex-col gap-5" aria-live="polite">
        {messages.length === 0 && (
          <li className="max-w-[40rem] text-body text-text-secondary">
            Ask a question. Answers come from my public notes. If a fact is not there, it should say so.
          </li>
        )}
        {messages.map((message, index) => {
          const isUser = message.role === "user";
          const text = textOf(message.parts);
          const next = messages[index + 1];
          const needsFallback = isUser && fallbacks[message.id] !== undefined && next?.role !== "assistant";
          return (
            <li key={message.id} className="flex flex-col gap-5">
              <div
                aria-label={isUser ? "You" : "Answer"}
                className={isUser ? "flex justify-end" : "flex justify-start"}
              >
                {isUser ? (
                  <p className="max-w-[36rem] bg-surface-2 px-4 py-3 text-body text-ink">{text}</p>
                ) : text ? (
                  <div className="max-w-[40rem] text-body text-text-secondary">
                    <MessageContent text={text} />
                  </div>
                ) : null}
              </div>
              {needsFallback && fallbacks[message.id] ? (
                <p aria-label="Answer" className="max-w-[40rem] text-body text-text-secondary">
                  {fallbacks[message.id]}
                </p>
              ) : null}
            </li>
          );
        })}
        {status === "submitted" && (
          <li className="text-text-secondary" aria-label="Thinking">
            <span className="inline-flex gap-1">
              <span className="h-2 w-2 animate-bounce rounded-full bg-text-secondary" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-text-secondary [animation-delay:0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-text-secondary [animation-delay:0.3s]" />
            </span>
          </li>
        )}
        <li ref={endRef} aria-hidden="true" />
      </ol>

      {messages.length === 0 && (
        <div className="flex flex-wrap gap-2" aria-label="Suggested questions">
          {PRESET_QUESTIONS.map((question) => (
            <button
              key={question}
              type="button"
              disabled={busy}
              onClick={() => ask(question)}
              className="inline-flex min-h-[44px] items-center rounded-full border border-border-subtle px-4 text-left text-body text-ink transition-colors hover:border-accent disabled:opacity-50"
              data-track="button:preset_question:ask"
            >
              {question}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          ask(input);
        }}
        className="flex items-center gap-3"
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          aria-label="Ask a question about Brant"
          placeholder="Ask me something…"
          className="min-h-[44px] flex-1 border-b border-ink bg-transparent text-body text-ink outline-none"
        />
        <Button type="submit" track="button:send_question:ask" ariaLabel="Send question">
          {busy ? "Sending" : "Send"}
        </Button>
      </form>
    </div>
  );
}
