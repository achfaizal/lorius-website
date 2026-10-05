"use client";

import { useEffect, useRef } from "react";

import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

interface TrackInViewProps {
  event: AnalyticsEvent;
  params?: Record<string, string | number | boolean | undefined>;
  className?: string;
  children: React.ReactNode;
}

/**
 * Fires one analytics event the first time its children scroll into
 * view — e.g. `view_package` (blueprint §46) on the homepage's package
 * grid. Fires at most once per mount (tracked via a ref, not state —
 * this never needs to re-render itself, so there's nothing to gate on
 * `react-hooks/set-state-in-effect`).
 */
export function TrackInView({
  event,
  params,
  className,
  children,
}: TrackInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          trackEvent(event, params);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
    // Fire once per mount only — params are captured when triggered.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
