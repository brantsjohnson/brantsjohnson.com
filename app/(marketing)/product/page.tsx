// ============================================
// WHAT THIS FILE DOES (plain English):
// The product room. One role shows at a time so the page stays
// short. The words are the same ones the story already used.
// ============================================

import type { Metadata } from "next";
import { AreaRail } from "@/components/narrative/AreaRail";
import { CopyText } from "@/components/narrative/CopyText";
import { PanelTabs } from "@/components/narrative/PanelTabs";
import { SectionFrame } from "@/components/narrative/SectionFrame";
import { StoryLink } from "@/components/narrative/StoryLink";
import { areas, product } from "@/content/narrative";
import { pageMetadata } from "@/lib/site/page-metadata";

const area = areas[0];

export const metadata: Metadata = pageMetadata({
  title: "Senior Product Manager",
  description: area.deck,
  path: "/product",
});

export default function ProductPage() {
  return (
    <SectionFrame id="product" kicker="01 · Product" title={product.title} pigment={area.pigment} plate={area.plate}>
      <PanelTabs
        label="Product roles"
        pigment={area.pigment}
        tabs={[
          { id: "overview", label: "Overview", content: <CopyText parts={product.paragraphs[0]} /> },
          {
            id: "crew",
            label: "Crew",
            content: (
              <div className="flex flex-col gap-6">
                <CopyText parts={product.paragraphs[1]} />
                <CopyText parts={product.paragraphs[2]} />
              </div>
            ),
          },
          { id: "divvy", label: "Divvy", content: <CopyText parts={product.paragraphs[3]} /> },
          { id: "backlocal", label: "BackLocal", content: <CopyText parts={product.paragraphs[4]} /> },
          { id: "birmingham", label: "Birmingham", content: <CopyText parts={product.paragraphs[5]} /> },
          { id: "sales", label: "Utah Business", content: <CopyText parts={product.paragraphs[6]} /> },
        ]}
      />
      <blockquote className="mt-8 max-w-reading rounded-panel border border-border-subtle bg-surface p-6 shadow-glass">
        <p className="font-serif text-h3 text-ink">{product.quote}</p>
        <p className="mt-4">
          <StoryLink href={product.quoteLink.href} track={product.quoteLink.track}>
            {product.quoteLink.text}
          </StoryLink>
        </p>
      </blockquote>
      <p className="mt-6">
        <StoryLink href="/work" track="link:work_history:product">
          See full work history
        </StoryLink>
      </p>
      <AreaRail current="/product" />
    </SectionFrame>
  );
}
