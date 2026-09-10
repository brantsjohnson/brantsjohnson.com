import { Container } from "./Container";

/**
 * "brantchat" placeholder.
 *
 * Purpose: reserves a clearly-marked spot for a future "brantchat" experience
 * WITHOUT building or inventing the chat product itself. brantchat is expected
 * to be a SEPARATE application; this site should only ever *link to* or *embed*
 * it once it exists.
 *
 * -----------------------------------------------------------------------------
 * HOW TO WIRE THIS UP LATER (pick one):
 *
 * 1) Simple link — point visitors at the separate brantchat app:
 *      <a href="https://chat.brantsjohnson.com" className="link">Open brantchat</a>
 *
 * 2) Embed — drop the external app in an iframe (only if it supports embedding):
 *      <iframe
 *        src="https://chat.brantsjohnson.com/embed"
 *        title="brantchat"
 *        className="h-[600px] w-full rounded-2xl border border-ink/10"
 *        loading="lazy"
 *      />
 *
 * 3) Widget/script — if brantchat ships an embed script, load it here (client
 *    component) rather than inventing an API surface now.
 *
 * Until then, this component renders a small, honest "coming soon" note. To hide
 * it completely, simply don't render <BrantChat /> on any page.
 * -----------------------------------------------------------------------------
 */
export function BrantChat() {
  // Flip this to true once the separate brantchat app is live and one of the
  // integration options above has been filled in.
  const isLive = false;

  if (!isLive) {
    return (
      <Container>
        <div className="rounded-2xl border border-dashed border-ink/20 bg-white/50 p-6 text-center">
          <p className="text-sm font-medium text-ink">brantchat</p>
          <p className="mt-1 text-sm text-ink-muted">
            A conversational way to get to know my work — coming soon.
          </p>
        </div>
      </Container>
    );
  }

  // TODO(brant): replace the block below with a link or embed of the separate
  // brantchat app, using one of the options documented above.
  return null;
}
