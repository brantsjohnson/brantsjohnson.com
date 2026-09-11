// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Home page. The hero changes based on how someone arrived
// (social link, LinkedIn, default, and so on). The "Now" section below
// still shows tastes from Bridger when they are available.
// ============================================

import { Hero } from "@/components/sections/Hero";
import { Now } from "@/components/sections/Now";
import { SecurityFocus } from "@/components/sections/SecurityFocus";
import { getActiveReferralVariant } from "@/lib/cms/get-active-referral-variant";
import { getReferralVariantContent } from "@/lib/cms/referral-variant";
import { getBridgerInterests } from "@/lib/integrations/bridger";

type HomePageProps = {
  searchParams?: Readonly<Record<string, string | string[] | undefined>>;
};

// THIS SECTION DOES: hero for the visitor's referral variant, then Now
export default async function HomePage({ searchParams }: HomePageProps) {
  const variantId = await getActiveReferralVariant(searchParams);
  const heroCopy = getReferralVariantContent(variantId);

  const interests = await getBridgerInterests();

  return (
    <>
      <Hero copy={heroCopy} />
      <SecurityFocus copy={heroCopy} />
      <Now interests={interests} />
    </>
  );
}
