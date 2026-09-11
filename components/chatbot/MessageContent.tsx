// ============================================
// WHAT THIS FILE DOES (plain English):
// This turns the AI's answer text into nicely formatted, safe-to-show
// content. It understands a little bit of markdown: bold text with
// **stars**, bullet lists, and simple headings. It does NOT run any raw
// HTML from the model, so a weird answer can never inject code into the
// page. It only draws plain React text pieces.
// ============================================

import React from "react";

// THIS SECTION DOES: split a line into normal text and **bold** pieces,
// returning React spans. We handle only bold to keep this small and safe.
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    nodes.push(
      <strong key={`${keyPrefix}-b-${i}`} className="font-semibold">
        {match[1]}
      </strong>
    );
    lastIndex = pattern.lastIndex;
    i += 1;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

// THIS SECTION DOES: walk the answer line by line and group bullet lines into
// real lists, headings into bold headings, and everything else into paragraphs
export function MessageContent({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let listItems: string[] = [];
  let blockIndex = 0;

  // Flush any collected bullet lines into a single <ul>
  const flushList = () => {
    if (listItems.length === 0) return;
    const items = listItems;
    blocks.push(
      <ul key={`ul-${blockIndex++}`} className="my-2 list-disc space-y-1 pl-5">
        {items.map((item, idx) => (
          <li key={idx}>{renderInline(item, `li-${blockIndex}-${idx}`)}</li>
        ))}
      </ul>
    );
    listItems = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (trimmed === "") {
      flushList();
      continue;
    }

    // A bullet point line
    const bulletMatch = trimmed.match(/^[-•*]\s+(.*)$/);
    if (bulletMatch) {
      listItems.push(bulletMatch[1]);
      continue;
    }

    // A heading line like "## Section"
    const headingMatch = trimmed.match(/^#{1,6}\s+(.*)$/);
    if (headingMatch) {
      flushList();
      blocks.push(
        <p key={`h-${blockIndex++}`} className="mt-3 mb-1 font-semibold text-text-primary">
          {renderInline(headingMatch[1].replace(/\*\*/g, ""), `h-${blockIndex}`)}
        </p>
      );
      continue;
    }

    // A normal paragraph line
    flushList();
    blocks.push(
      <p key={`p-${blockIndex++}`} className="leading-relaxed">
        {renderInline(trimmed, `p-${blockIndex}`)}
      </p>
    );
  }

  flushList();

  return <div className="space-y-1 text-body">{blocks}</div>;
}
