// ============================================
// WHAT THIS FILE DOES (plain English):
// This is one poem page. The word in the URL (slug) will later match
// a poem. Right now it only proves the URL works.
// ============================================

// THIS SECTION DOES: show which poem slug was requested until real poem content exists
export default function PoemPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <section>
      <h1>Poem</h1>
      <p>Slug: {params.slug}</p>
    </section>
  );
}
