// ============================================
// WHAT THIS FILE DOES (plain English):
// This is one chat bubble in the preview panel. Visitor messages sit
// on the right in the brand color. Assistant messages sit on the left
// on a glass card. It does not talk to any model.
// ============================================

import { cn } from "@/lib/utils/cn";

type ChatMessageProps = {
  role: "user" | "assistant";
  content: string;
};

// THIS SECTION DOES: draw one message aligned left or right based on who said it
export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-control px-3.5 py-2.5 text-sm leading-relaxed",
          isUser ? "bg-brand text-on-accent" : "border border-line bg-surface text-ink"
        )}
      >
        {content}
      </div>
    </div>
  );
}
