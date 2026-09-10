// ============================================
// WHAT THIS FILE DOES (plain English):
// This is one photo collection page. The name in the URL
// (collection-slug) will later match a grouped set of photos.
// Right now it only proves the URL works.
// ============================================

// THIS SECTION DOES: show which collection was requested until real photo data exists
export default function PhotographyCollectionPage({
  params,
}: {
  params: { "collection-slug": string };
}) {
  return (
    <section>
      <h1>Photo collection</h1>
      <p>Collection: {params["collection-slug"]}</p>
    </section>
  );
}
