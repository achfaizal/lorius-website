"use client";

import { useEffect } from "react";

import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

interface AnalyticsPageViewProps {
  event: AnalyticsEvent;
  params?: Record<string, string | number | boolean | undefined>;
}

/**
 * Fires one analytics event on mount — e.g. `view_home` (blueprint §46).
 * A tiny client component so the page itself (e.g. `app/page.tsx`) can
 * stay a server component; this is the only part of it that needs the
 * browser. Renders nothing.
 */
export function AnalyticsPageView({ event, params }: AnalyticsPageViewProps) {
  useEffect(() => {
    trackEvent(event, params);
    // Fire once per mount only — params are captured at mount time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return null;
}
