// ============================================
// WHAT THIS FILE DOES (plain English):
// A small, safe reader for the markdown in post files. It supports
// what a post needs: ## and ### headings, paragraphs, bullet and
// numbered lists, quotes, a divider, code blocks, pictures on their
// own line, and inside text: **bold**, *italic*, `code` and
// [links](address). It produces plain data, never raw HTML, so a post
// can never inject code into a page. It can also turn a post back
// into plain text for search data and the AI-readable files.
// ============================================

export type Inline =
  | { type: "text"; text: string }
  | { type: "strong"; children: Inline[] }
  | { type: "em"; children: Inline[] }
  | { type: "code"; text: string }
  | { type: "link"; href: string; children: Inline[] };

export type Block =
  | { type: "heading"; level: 2 | 3; children: Inline[] }
  | { type: "paragraph"; children: Inline[] }
  | { type: "list"; ordered: boolean; items: Inline[][] }
  | { type: "quote"; children: Inline[] }
  | { type: "rule" }
  | { type: "code"; text: string }
  | { type: "image"; src: string; alt: string };

// THIS SECTION DOES: allow only normal addresses in links and pictures
export function safeHref(href: string): string | null {
  const value = href.trim();
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  if (value.startsWith("#")) return value;
  if (/^https:\/\//i.test(value) || /^mailto:/i.test(value)) return value;
  return null;
}

// THIS SECTION DOES: read bold, italic, code and links inside a line of text
export function parseInline(text: string): Inline[] {
  const out: Inline[] = [];
  let rest = text;
  const push = (value: string) => {
    if (value) out.push({ type: "text", text: value });
  };
  const patterns: { name: "code" | "link" | "strong" | "em"; re: RegExp }[] = [
    { name: "code", re: /`([^`]+)`/ },
    { name: "link", re: /\[([^\]]+)\]\(([^)\s]+)\)/ },
    { name: "strong", re: /\*\*([^*]+)\*\*/ },
    { name: "em", re: /(?:\*([^*\s][^*]*)\*|_([^_\s][^_]*)_)/ },
  ];
  while (rest.length > 0) {
    let best: { index: number; match: RegExpExecArray; name: (typeof patterns)[number]["name"] } | null = null;
    for (const { name, re } of patterns) {
      const match = re.exec(rest);
      if (match && (best === null || match.index < best.index)) best = { index: match.index, match, name };
    }
    if (!best) {
      push(rest);
      break;
    }
    push(rest.slice(0, best.index));
    const { match, name } = best;
    if (name === "code") out.push({ type: "code", text: match[1] });
    else if (name === "strong") out.push({ type: "strong", children: parseInline(match[1]) });
    else if (name === "em") out.push({ type: "em", children: parseInline(match[1] ?? match[2]) });
    else {
      const href = safeHref(match[2]);
      if (href) out.push({ type: "link", href, children: parseInline(match[1]) });
      else push(match[1]);
    }
    rest = rest.slice(best.index + match[0].length);
  }
  return out;
}

// THIS SECTION DOES: read a whole post body into blocks
export function parseMarkdown(source: string): Block[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i += 1;
      continue;
    }
    if (line.trim().startsWith("```")) {
      const code: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith("```")) code.push(lines[i++]);
      i += 1;
      blocks.push({ type: "code", text: code.join("\n") });
      continue;
    }
    const heading = /^(#{2,3})\s+(.+)$/.exec(line);
    if (heading) {
      blocks.push({ type: "heading", level: heading[1].length === 2 ? 2 : 3, children: parseInline(heading[2].trim()) });
      i += 1;
      continue;
    }
    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      blocks.push({ type: "rule" });
      i += 1;
      continue;
    }
    const image = /^!\[([^\]]*)\]\(([^)\s]+)\)$/.exec(line.trim());
    if (image) {
      const src = safeHref(image[2]);
      if (src && !src.startsWith("mailto:")) blocks.push({ type: "image", src, alt: image[1] });
      i += 1;
      continue;
    }
    if (line.startsWith(">")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) quote.push(lines[i++].replace(/^>\s?/, ""));
      blocks.push({ type: "quote", children: parseInline(quote.join(" ").trim()) });
      continue;
    }
    const bullet = /^\s*[-*]\s+/;
    const numbered = /^\s*\d+[.)]\s+/;
    if (bullet.test(line) || numbered.test(line)) {
      const ordered = numbered.test(line);
      const items: Inline[][] = [];
      while (i < lines.length && (ordered ? numbered : bullet).test(lines[i])) {
        items.push(parseInline(lines[i].replace(ordered ? numbered : bullet, "").trim()));
        i += 1;
      }
      blocks.push({ type: "list", ordered, items });
      continue;
    }
    const paragraph: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,3}\s|>|```|\s*[-*]\s|\s*\d+[.)]\s|-{3,}$)/.test(lines[i])) paragraph.push(lines[i++].trim());
    if (paragraph.length === 0) {
      i += 1;
      continue;
    }
    blocks.push({ type: "paragraph", children: parseInline(paragraph.join(" ")) });
  }
  return blocks;
}

function inlineText(items: Inline[]): string {
  return items
    .map((item) => {
      if (item.type === "text" || item.type === "code") return item.text;
      return inlineText(item.children);
    })
    .join("");
}

// THIS SECTION DOES: the post as plain text, for word counts and the AI-readable files
export function toPlainText(blocks: Block[]): string {
  return blocks
    .map((block) => {
      if (block.type === "heading") return `${"#".repeat(block.level)} ${inlineText(block.children)}`;
      if (block.type === "paragraph" || block.type === "quote") return inlineText(block.children);
      if (block.type === "list") return block.items.map((item, index) => `${block.ordered ? `${index + 1}.` : "-"} ${inlineText(item)}`).join("\n");
      if (block.type === "code") return block.text;
      if (block.type === "image") return block.alt ? `[Image: ${block.alt}]` : "";
      return "";
    })
    .filter(Boolean)
    .join("\n\n");
}
