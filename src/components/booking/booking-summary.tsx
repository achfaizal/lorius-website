import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/format";

interface BookingSummaryProps {
  isLastStep: boolean;
  onAdvance: () => void;
  advanceDisabled?: boolean;
  serviceName?: string | null;
  packageName?: string | null;
  packagePrice?: number | null;
  date?: string | null;
  slot?: string | null;
  location?: string | null;
}

/**
 * Blueprint §29 "Booking Summary", trimmed to what the short booking form
 * collects. The price is the package price only — transport and any extras
 * are agreed with the admin over WhatsApp — and the DP (50%) is shown as an
 * estimate. The website stores nothing; the last step's button hands the
 * summary to WhatsApp (see `BookingFlow`).
 */
export function BookingSummary({
  isLastStep,
  onAdvance,
  advanceDisabled,
  serviceName,
  packageName,
  packagePrice,
  date,
  slot,
  location,
}: BookingSummaryProps) {
  const primaryLabel = isLastStep ? "Kirim Booking ke WhatsApp" : "Lanjutkan";
  const price = packagePrice ?? 0;
  const dp = Math.round(price * 0.5);

  const detailRows: [string, string][] = [
    ["Layanan", serviceName ?? "—"],
    ["Paket", packageName ?? "—"],
    ["Tanggal", date ?? "—"],
    ["Waktu", slot ?? "—"],
    ["Lokasi", location || "—"],
  ];

  const costRows: [string, string][] = [
    ["Harga Paket", formatRupiah(price)],
    ["Estimasi DP (50%)", formatRupiah(dp)],
    ["Estimasi Sisa", formatRupiah(price - dp)],
  ];

  const button = (
    <Button type="button" onClick={onAdvance} disabled={advanceDisabled}>
      {isLastStep ? <MessageCircle aria-hidden="true" /> : null}
      {primaryLabel}
    </Button>
  );

  return (
    <>
      <aside className="hidden lg:block">
        <div className="sticky top-28 flex flex-col gap-5 rounded-2xl border border-border bg-surface-white p-6 shadow-[0_12px_32px_rgba(14,54,60,0.06)]">
          <h2 className="text-h3 text-brand">Ringkasan Booking</h2>

          <dl className="flex flex-col gap-2.5">
            {detailRows.map(([label, val]) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <dt className="text-body text-brand-gray">{label}</dt>
                <dd className="text-body text-right font-medium text-brand">
                  {val}
                </dd>
              </div>
            ))}
          </dl>

          <div className="border-t border-border" />

          <dl className="flex flex-col gap-2.5">
            {costRows.map(([label, val]) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <dt className="text-body text-brand-gray">{label}</dt>
                <dd className="text-body font-medium text-brand">{val}</dd>
              </div>
            ))}
          </dl>

          <p className="text-caption text-brand-gray">
            Belum termasuk transport atau tambahan lain — admin akan
            mengonfirmasi total akhirnya.
          </p>

          <Button
            type="button"
            className="w-full"
            onClick={onAdvance}
            disabled={advanceDisabled}
          >
            {isLastStep ? <MessageCircle aria-hidden="true" /> : null}
            {primaryLabel}
          </Button>
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface-white/95 px-5 py-3 backdrop-blur-sm lg:hidden">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <div>
            <p className="text-caption text-brand-gray">Estimasi DP (50%)</p>
            <p className="text-body font-semibold text-brand">{formatRupiah(dp)}</p>
          </div>
          {button}
        </div>
      </div>
    </>
  );
}
