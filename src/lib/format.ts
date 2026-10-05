/**
 * Formats a number as Rupiah the way the blueprint writes it everywhere
 * ("Rp2.500.000" — no space after "Rp"). `Intl.NumberFormat` inserts a
 * space by default, so it's stripped explicitly.
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace(/\s/g, "");
}
