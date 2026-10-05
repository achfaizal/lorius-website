"use client";

import { useState } from "react";

import { TrackInView } from "@/components/analytics";
import { Section, SectionHeading } from "@/components/layout";
import { Reveal } from "@/components/motion";
import { BOOKING_SERVICES } from "@/data/booking-services";
import { getPackagesByService } from "@/data/packages";
import { packageOffersJsonLd } from "@/lib/structured-data";
import { cn } from "@/lib/utils";

import { PackageCard } from "./package-card";

/**
 * Blueprint §14 "Featured Packages". Mirrors booking Step 1 → 2: pick an
 * event type first (tabs), then see that event's own package lineup
 * (docs/PRICE-LIST-LORIUS-PHOTOGRAPHY.pdf). "Pilih Paket" deep-links into
 * `/booking?service=…&package=…`, so the booking flow opens with both
 * already chosen. `id="paket"` is the navbar/footer "Paket" link's scroll
 * target (TASK 20 — there's no dedicated `/paket` catalog page).
 */
export function PackageGrid() {
  const [serviceSlug, setServiceSlug] = useState(BOOKING_SERVICES[0].slug);
  const service = BOOKING_SERVICES.find((s) => s.slug === serviceSlug)!;
  const packages = getPackagesByService(serviceSlug);

  return (
    <Section id="paket" background="cream" waveFrom="brand" className="overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(packageOffersJsonLd(packages, service.name)),
        }}
      />
      <SectionHeading
        align="center"
        title="Paket Pilihan"
        description="Pilih jenis acara dulu, lalu lihat paket yang tersedia dan langsung lanjut ke booking."
      />

      <Reveal>
      <div
        role="tablist"
        aria-label="Pilih jenis acara"
        className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:mt-10 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {BOOKING_SERVICES.map((s) => {
          const isActive = s.slug === serviceSlug;
          return (
            <button
              key={s.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setServiceSlug(s.slug)}
              className={cn(
                "rounded-pill shrink-0 border px-5 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-brand bg-brand text-white"
                  : "border-border bg-surface-white text-brand hover:border-brand/40",
              )}
            >
              {s.name}
            </button>
          );
        })}
      </div>
      </Reveal>

      <TrackInView
        key={serviceSlug}
        event="view_package"
        params={{ service: serviceSlug }}
        // Swipeable row: auto side-margins on the first/last card center the
        // lineup when it fits and collapse to 0 when it overflows (so the
        // first card is never clipped). Vertical padding leaves room for the
        // popular card's lift + badge, which overflow-x would otherwise clip.
        className="mt-6 flex snap-x snap-mandatory items-center gap-6 overflow-x-auto px-4 pt-8 pb-8 lg:gap-8"
      >
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="flex w-[85%] max-w-[380px] shrink-0 snap-center first:ml-auto last:mr-auto sm:w-[360px] [&>article]:w-full"
          >
            <PackageCard pkg={pkg} />
          </div>
        ))}
      </TrackInView>
    </Section>
  );
}
