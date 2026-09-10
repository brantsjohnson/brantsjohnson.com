import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { service } from "@/content/service";

/**
 * Service page.
 *
 * Purpose: highlights community and service work (the Uintah Resilience Archway
 * and the Resilient Scholarship). Each item is a card with a short description
 * and an optional link. Content lives in content/service.ts.
 */
export const metadata: Metadata = {
  title: "Service",
  description: service.intro,
};

export default function ServicePage() {
  return (
    <>
      <PageHeader title={service.heading} intro={service.intro} />

      <Container className="pb-8">
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          {service.items.map((item) => (
            <article
              key={item.title}
              className="flex flex-col rounded-2xl border border-ink/10 bg-white p-6"
            >
              <h2 className="font-serif text-xl font-semibold text-ink">
                {item.title}
              </h2>
              <p className="mt-1 text-sm font-medium text-accent">
                {item.role}
              </p>
              <p className="text-xs uppercase tracking-wide text-ink-muted">
                {item.period}
              </p>
              <p className="mt-3 flex-1 text-ink-soft">{item.summary}</p>
              {item.note && (
                <p className="mt-4 rounded-lg bg-ink/5 px-4 py-3 text-sm text-ink-soft">
                  {item.note}
                </p>
              )}
              {item.href && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link mt-4 inline-block text-sm font-medium"
                >
                  Learn more ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
