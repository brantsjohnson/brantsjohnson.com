import { ReactNode } from "react";
import { Container } from "./Container";

/**
 * Page header.
 *
 * Purpose: the consistent title block at the top of interior pages (About,
 * Experience, etc.). Takes a heading and an optional intro line so every page
 * opens the same way.
 */
export function PageHeader({
  title,
  intro,
}: {
  title: string;
  intro?: ReactNode;
}) {
  return (
    <Container className="pb-4 pt-16 sm:pt-24">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {title}
      </h1>
      {intro && (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {intro}
        </p>
      )}
    </Container>
  );
}
