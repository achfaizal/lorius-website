import { GoogleAnalytics } from "@next/third-parties/google";

/**
 * Blueprint §46 "Analytics" — GA4 via the official `@next/third-parties`
 * package (handles gtag script loading/dataLayer init correctly, rather
 * than hand-rolling it). Meta Pixel / TikTok Pixel (both marked
 * "optional" in the blueprint) are intentionally NOT added — there's no
 * real pixel ID for either, and injecting a placeholder one would send
 * fabricated tracking data nowhere useful. Add them the same way if/when
 * the user provides real IDs.
 *
 * Renders nothing (not even an empty script) when `NEXT_PUBLIC_GA_
 * MEASUREMENT_ID` is unset, so no analytics request ever fires without a
 * real, intentional measurement ID configured — see `lib/analytics.ts`'s
 * `trackEvent`, which no-ops safely in that case too.
 */
export function AnalyticsScript() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!gaId) return null;
  return <GoogleAnalytics gaId={gaId} />;
}
