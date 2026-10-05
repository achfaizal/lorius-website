"use client";

import Link from "next/link";
import { Check, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Package } from "@/data/packages";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

import { PackagePrice } from "./package-price";

interface PackageCardProps {
  pkg: Package;
}

/** Blueprint §14 "Featured Packages" — one pricing tier card. */
export function PackageCard({ pkg }: PackageCardProps) {
  return (
    <article
      className={cn(
        "relative flex flex-col gap-6 rounded-2xl border bg-surface-white p-7 transition-transform duration-300 active:scale-[0.985]",
        pkg.isPopular
          ? "border-brand shadow-[0_16px_40px_rgba(14,54,60,0.14)] lg:-translate-y-2"
          : "border-border shadow-[0_12px_32px_rgba(14,54,60,0.06)]",
      )}
    >
      {pkg.isPopular ? (
        <span className="rounded-pill absolute -top-3 left-7 bg-brand-cyan px-3 py-1 text-[11px] font-semibold tracking-wide text-brand uppercase">
          Paling Favorit
        </span>
      ) : null}

      <h3 className="text-h3 text-brand">{pkg.name}</h3>

      <PackagePrice pkg={pkg} />

      <ul className="flex flex-col gap-3">
        <li className="flex items-center gap-2.5">
          <Users className="size-4 shrink-0 text-brand-cyan" aria-hidden="true" />
          <span className="text-body text-brand">
            {pkg.photographerCount} fotografer
          </span>
        </li>
        {pkg.features.map((label) => (
          <li key={label} className="flex items-center gap-2.5">
            <Check
              className="size-4 shrink-0 text-brand-cyan"
              aria-hidden="true"
            />
            <span className="text-body text-brand">{label}</span>
          </li>
        ))}
      </ul>


      <Button
        asChild
        variant={pkg.isPopular ? "default" : "outline"}
        className="mt-auto w-full"
      >
        <Link
          href={`/booking?service=${pkg.serviceId}&package=${pkg.slug}`}
          onClick={() =>
            trackEvent("click_booking", { source: "package_card", package: pkg.slug })
          }
        >
          Pilih Paket
        </Link>
      </Button>
    </article>
  );
}
