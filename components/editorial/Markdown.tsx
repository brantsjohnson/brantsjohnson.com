// ============================================
// WHAT THIS FILE DOES (plain English):
// Draws a post's markdown as styled page text: headings, paragraphs,
// lists, quotes, pictures, and links with the site's gold underline.
// It only draws safe pieces (see lib/posts/markdown.ts), never raw HTML.
// ============================================

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { parseMarkdown, type Block, type Inline } from "@/lib/posts/markdown";

function inline(items: Inline[], keyPrefix = "i"): ReactNode[] {
  return items.map((item, index) => {
    const key = `${keyPrefix}-${index}`;
    if (item.type === "text") return item.text;
    if (item.type === "strong") return <strong key={key} className="font-semibold text-ink">{inline(item.children, key)}</strong>;
    if (item.type === "em") return <em key={key}>{inline(item.children, key)}</em>;
    if (item.type === "code") return <code key={key} className="rounded bg-surface-2 px-1 py-0.5 text-[0.9em]">{item.text}</code>;
    const className = "text-ink underline decoration-accent decoration-2 underline-offset-[0.2em] hover:text-accent-deep";
    if (item.href.startsWith("/") || item.href.startsWith("#")) {
      return <Link key={key} href={item.href} className={className}>{inline(item.children, key)}</Link>;
    }
    return (
      <a key={key} href={item.href} className={className} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {inline(item.children, key)}
      </a>
    );
  });
}

function block(item: Block, index: number): ReactNode {
  switch (item.type) {
    case "heading":
      return item.level === 2 ? (
        <h2 key={index} className="mt-12 font-serif text-h2 text-ink">{inline(item.children)}</h2>
      ) : (
        <h3 key={index} className="mt-8 font-serif text-h3 text-ink">{inline(item.children)}</h3>
      );
    case "paragraph":
      return <p key={index} className="text-body text-text-secondary">{inline(item.children)}</p>;
    case "quote":
      return (
        <blockquote key={index} className="border-l-2 border-accent pl-6 font-serif text-[1.5rem] italic leading-snug text-ink">
          {inline(item.children)}
        </blockquote>
      );
    case "list": {
      const Tag = item.ordered ? "ol" : "ul";
      return (
        <Tag key={index} className={`flex flex-col gap-2 pl-6 text-body text-text-secondary ${item.ordered ? "list-decimal" : "list-disc"}`}>
          {item.items.map((entry, entryIndex) => (
            <li key={entryIndex}>{inline(entry)}</li>
          ))}
        </Tag>
      );
    }
    case "rule":
      return <hr key={index} className="border-border-subtle" />;
    case "code":
      return (
        <pre key={index} className="overflow-x-auto rounded bg-surface-2 p-4 text-[0.9rem] text-ink">
          <code>{item.text}</code>
        </pre>
      );
    case "image":
      return (
        <figure key={index} className="my-4">
          <Image src={item.src} alt={item.alt} width={1400} height={900} sizes="(min-width: 768px) 46rem, 92vw" className="h-auto w-full" />
        </figure>
      );
  }
}

export function Markdown({ source }: { source: string }) {
  return <div className="flex flex-col gap-6">{parseMarkdown(source).map(block)}</div>;
}
