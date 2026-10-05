"use client";

import { BOOKING_SERVICES } from "@/data/booking-services";
import { cn } from "@/lib/utils";

import { PackageSelector } from "./package-selector";

interface ServicePackageStepProps {
  serviceSlug: string | null;
  packageId: string | null;
  onServiceChange: (slug: string) => void;
  onPackageChange: (id: string) => void;
}

/**
 * First booking screen: pick the service (compact chips) and, right below,
 * that service's packages — what used to be two separate steps.
 */
export function ServicePackageStep({
  serviceSlug,
  packageId,
  onServiceChange,
  onPackageChange,
}: ServicePackageStepProps) {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h2 className="text-h3 text-brand">Pilih Layanan</h2>
        <div
          role="radiogroup"
          aria-label="Pilih layanan"
          className="flex flex-wrap gap-2"
        >
          {BOOKING_SERVICES.map((service) => {
            const isSelected = service.slug === serviceSlug;
            return (
              <button
                key={service.slug}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onServiceChange(service.slug)}
                className={cn(
                  "rounded-pill min-h-11 border px-5 text-sm font-medium transition-colors active:scale-[0.98]",
                  isSelected
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-border bg-surface-white text-brand hover:border-brand/40",
                )}
              >
                {service.name}
              </button>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-h3 text-brand">Pilih Paket</h2>
        {serviceSlug ? (
          <PackageSelector
            serviceSlug={serviceSlug}
            value={packageId}
            onChange={onPackageChange}
          />
        ) : (
          <p className="text-body text-brand-gray">
            Pilih layanan di atas untuk melihat paketnya.
          </p>
        )}
      </section>
    </div>
  );
}
