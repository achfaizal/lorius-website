import { Check, Users } from "lucide-react";

import { getPackagesByService } from "@/data/packages";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

interface PackageSelectorProps {
  serviceSlug: string | null;
  value: string | null;
  onChange: (id: string) => void;
}

/**
 * Blueprint §23 "Step 2 — Pilih Paket" — single-select, filtered to only
 * the packages that belong to the service chosen in Step 1 (real
 * per-service pricing from docs/PRICE-LIST-LORIUS-PHOTOGRAPHY.pdf).
 */
export function PackageSelector({
  serviceSlug,
  value,
  onChange,
}: PackageSelectorProps) {
  const packages = getPackagesByService(serviceSlug);

  if (packages.length === 0) {
    return (
      <p className="text-body text-brand-gray">
        Belum ada paket untuk layanan ini.
      </p>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Pilih paket"
      className="grid grid-cols-1 gap-4 lg:grid-cols-3"
    >
      {packages.map((pkg) => {
        const isSelected = pkg.id === value;

        return (
          <button
            key={pkg.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(pkg.id)}
            className={cn(
              "relative flex flex-col gap-5 rounded-2xl border-2 p-6 text-left transition-colors",
              isSelected
                ? "border-brand bg-surface-soft-teal"
                : "border-border bg-surface-white hover:border-brand/30",
            )}
          >
            {pkg.isPopular ? (
              <span className="rounded-pill absolute -top-3 left-6 bg-brand-cyan px-3 py-1 text-[11px] font-semibold tracking-wide text-brand uppercase">
                Paling Favorit
              </span>
            ) : null}

            <div className="flex items-start justify-between gap-3">
              <span className="text-h3 text-brand">{pkg.name}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full border-2",
                  isSelected
                    ? "border-brand-cyan bg-brand-cyan"
                    : "border-border bg-surface-white",
                )}
              >
                {isSelected ? (
                  <span className="size-2.5 rounded-full bg-brand" />
                ) : null}
              </span>
            </div>

            <span className="text-h2 font-semibold text-brand">
              {formatRupiah(pkg.price)}
              <span className="text-caption font-normal text-brand-gray">
                {" "}
                / paket
              </span>
            </span>

            <ul className="flex flex-col gap-2.5">
              <li className="flex items-center gap-2.5">
                <Users
                  className="size-4 shrink-0 text-brand-cyan"
                  aria-hidden="true"
                />
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

            {pkg.note ? (
              <p className="text-caption text-brand-gray italic">{pkg.note}</p>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
