// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Home page. It stacks the chat-forward hero (with referral
// variant copy when applicable), proof chips, photo mosaic, doorway cards,
// the security focus block, and Bridger "Now" tastes when available.
// ============================================

import { Hero } from "@/components/sections/Hero";
import { HomeSections } from "@/components/sections/HomeSections";
import { Now } from "@/components/sections/Now";
import { PhotoMosaic } from "@/components/sections/PhotoMosaic";
import { ProofChips } from "@/components/sections/ProofChips";
import { SecurityFocus } from "@/components/sections/SecurityFocus";
import { getActiveReferralVariant } from "@/lib/cms/get-active-referral-variant";
import { getReferralVariantContent } from "@/lib/cms/referral-variant";
import { getBridgerInterests } from "@/lib/integrations/bridger";

type HomePageProps = {
  searchParams?: Readonly<Record<string, string | string[] | undefined>>;
};

// THIS SECTION DOES: assemble the home page from its sections, top to bottom
export default async function HomePage({ searchParams }: HomePageProps) {
  const variantId = await getActiveReferralVariant(searchParams);
  const heroCopy = getReferralVariantContent(variantId);
  const interests = await getBridgerInterests();

  return (
    <>
      <Hero copy={heroCopy} />
      <ProofChips />
      <PhotoMosaic />
      <HomeSections />
      <SecurityFocus copy={heroCopy} />
      <Now interests={interests} />
    </>
  );
}
