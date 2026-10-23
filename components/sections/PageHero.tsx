// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the top of an inner page. It sits on the cream paper with
// a large serif title and a quiet eyebrow, in the same rhythm as home.
// ============================================

type PageHeroProps = {
  eyebrow: string;
  title: string;
  deck?: string;
};

export function PageHero({ eyebrow, title, deck }: PageHeroProps) {
  return (
    <header className="shell pb-12 pt-16 md:pb-16 md:pt-24">
      <p className="label text-text-secondary">{eyebrow}</p>
      <h1 className="mt-4 font-serif text-h1 text-ink">{title}</h1>
      {deck && <p className="mt-6 text-body text-text-secondary">{deck}</p>}
    </header>
  );
}
