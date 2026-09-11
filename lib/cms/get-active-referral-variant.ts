// ============================================
// WHAT THIS FILE DOES (plain English):
// Server-only helper for marketing pages. It picks the active referral
// variant by checking the current URL query first, then the cookie
// middleware set on earlier visits.
// ============================================

import { cookies } from "next/headers";
import type { ReferralVariantId } from "@/content/referral-variants";
import {
  REFERRAL_VARIANT_COOKIE,
  parseReferralVariantCookie,
  referralSourceFromSearchParams,
  resolveReferralVariantFromSource,
} from "@/lib/cms/referral-variant";

type SearchParamInput =
  | URLSearchParams
  | Readonly<Record<string, string | string[] | undefined>>;

// THIS SECTION DOES: resolve variant for this request on the server
export async function getActiveReferralVariant(
  searchParams?: SearchParamInput
): Promise<ReferralVariantId> {
  const sourceFromQuery = searchParams ? referralSourceFromSearchParams(searchParams) : null;
  if (sourceFromQuery) {
    return resolveReferralVariantFromSource(sourceFromQuery);
  }

  const cookieStore = await cookies();
  const stored = cookieStore.get(REFERRAL_VARIANT_COOKIE)?.value;
  return parseReferralVariantCookie(stored);
}
