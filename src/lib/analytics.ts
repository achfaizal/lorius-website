import { sendGAEvent } from "@next/third-parties/google";

/**
 * Blueprint §46 "Analytics" event vocabulary, typed so call sites can't
 * typo an event name. `payment_started` from the blueprint's list is
 * deliberately omitted — there's no payment step anymore (see
 * [[lorius-price-list-and-no-payment]] in memory), so nothing would ever
 * fire it.
 */
export type AnalyticsEvent =
  | "view_home"
  | "click_booking"
  | "click_whatsapp"
  | "view_package"
  | "select_service"
  | "select_package"
  | "select_date"
  | "booking_started"
  | "booking_step_completed"
  | "booking_completed"
  | "booking_abandoned"
  | "photobooth_open"
  | "photobooth_start"
  | "photobooth_complete"
  | "photobooth_shot"
  | "photobooth_download"
  | "photobooth_share";

/**
 * Whether `<GoogleAnalytics>` is actually mounted (root layout only
 * renders it when this env var is set — see `components/analytics`).
 * `NEXT_PUBLIC_*` vars are inlined at build time, so this is safe to read
 * from client components too.
 */
const GA_ENABLED = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);

/**
 * Fires a GA4 event. Safe to call unconditionally from any client
 * component: when GA isn't configured, this no-ops instead of calling
 * `sendGAEvent` (which would otherwise `console.warn` on every call,
 * since its dataLayer is never initialized without `<GoogleAnalytics>`
 * mounted). Same best-effort philosophy as `sendBookingEmails` —
 * analytics must never break the feature it's observing.
 */
export function trackEvent(
  event: AnalyticsEvent,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (!GA_ENABLED) return;
  sendGAEvent("event", event, params ?? {});
}
