// ============================================
// WHAT THIS FILE DOES (plain English):
// This is one blog post page. The word in the URL (slug) will later
// match a published article. Right now it only proves the URL works.
// ============================================

// THIS SECTION DOES: show which post slug was requested until real article content exists
export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <section>
      <h1>Blog post</h1>
      <p>Slug: {params.slug}</p>
    </section>
  );
}
