import type { Package } from "@/data/packages";
import { discountPercent } from "@/data/packages";
import { formatRupiah } from "@/lib/format";

/**
 * A package's price: the normal price struck through with a "Hemat N%"
 * badge, and the current discounted price large underneath.
 */
export function PackagePrice({ pkg }: { pkg: Package }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <span className="text-caption text-brand-gray line-through">
          <span className="sr-only">Harga normal </span>
          {formatRupiah(pkg.originalPrice)}
        </span>
        <span className="rounded-pill bg-brand-cyan/25 px-2 py-0.5 text-[11px] font-semibold text-brand">
          Hemat {discountPercent(pkg)}%
        </span>
      </div>
      <div className="flex flex-wrap items-baseline gap-x-1">
        <span className="sr-only">Harga sekarang </span>
        <span className="text-h2 font-semibold text-brand">
          {formatRupiah(pkg.price)}
        </span>
        <span className="text-caption text-brand-gray">/ paket</span>
      </div>
    </div>
  );
}
