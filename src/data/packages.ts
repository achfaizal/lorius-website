/**
 * Packages from the 2026 promo price-list posters (4 services x Silver /
 * Gold / Platinum; the source images are kept in `docs/price-list-2026/`).
 * Every package shows its normal price struck through next to the current
 * discounted price. Wording is normalized to the site's usual phrasing
 * ("Foto Editing", "1 Videografer", "1 Crew (Pengatur Gaya)"); every package
 * includes 1 photographer, so that's a number field and the rest of each
 * poster's bullet list lives in `features`.
 */
export interface Package {
  id: string;
  serviceId: string;
  name: string;
  slug: string;
  /** Current (discounted) price in rupiah — what the customer pays. */
  price: number;
  /** Normal price in rupiah, shown struck through. Always above `price`. */
  originalPrice: number;
  photographerCount: number;
  /**
   * Fixed length of the shoot in hours, when the package defines one (only
   * Graduation does: 1 / 1 / 3 hours). The booking form then fills the session
   * length in automatically and only asks for a start time.
   */
  durationHours?: number;
  isPopular: boolean;
  features: string[];
}

export const PACKAGES: Package[] = [
  {
    id: "graduation-silver",
    serviceId: "graduation",
    name: "Silver",
    slug: "graduation-silver",
    originalPrice: 370_000,
    price: 299_000,
    photographerCount: 1,
    durationHours: 1,
    isPopular: false,
    features: ["1 Person", "All File Backup", "50 Foto Editing", "1 Jam Kerja"],
  },
  {
    id: "graduation-gold",
    serviceId: "graduation",
    name: "Gold",
    slug: "graduation-gold",
    originalPrice: 500_000,
    price: 350_000,
    photographerCount: 1,
    durationHours: 1,
    isPopular: true,
    features: ["Family / Couple", "File Backup", "Semua Foto Editing", "50 Foto Editing", "1 Jam Kerja"],
  },
  {
    id: "graduation-platinum",
    serviceId: "graduation",
    name: "Platinum",
    slug: "graduation-platinum",
    originalPrice: 1_500_000,
    price: 1_200_000,
    photographerCount: 1,
    durationHours: 3,
    isPopular: false,
    features: ["Video Cinematic", "All File Backup", "Semua Foto Editing", "1 Videografer", "1 Crew (Pengatur Gaya)", "3 Jam Kerja"],
  },
  {
    id: "engagement-silver",
    serviceId: "engagement",
    name: "Silver",
    slug: "engagement-silver",
    originalPrice: 1_200_000,
    price: 1_000_000,
    photographerCount: 1,
    isPopular: false,
    features: ["File Backup", "1 Crew (Pengatur Gaya)", "50+ Foto Editing"],
  },
  {
    id: "engagement-gold",
    serviceId: "engagement",
    name: "Gold",
    slug: "engagement-gold",
    originalPrice: 1_800_000,
    price: 1_499_000,
    photographerCount: 1,
    isPopular: true,
    features: ["Video Cinematic", "File Backup", "1 Videografer", "1 Crew (Pengatur Gaya)", "50+ Foto Editing"],
  },
  {
    id: "engagement-platinum",
    serviceId: "engagement",
    name: "Platinum",
    slug: "engagement-platinum",
    originalPrice: 2_300_000,
    price: 2_000_000,
    photographerCount: 1,
    isPopular: false,
    features: ["Video Cinematic", "1 Cetak 12R", "File Backup", "Semua Foto Editing", "1 Videografer", "1 Crew (Pengatur Gaya)"],
  },
  {
    id: "wedding-silver",
    serviceId: "wedding",
    name: "Silver",
    slug: "wedding-silver",
    originalPrice: 1_500_000,
    price: 1_299_000,
    photographerCount: 1,
    isPopular: false,
    features: ["1 Album Photobook Standar", "File Backup", "1 Crew (Pengatur Gaya)"],
  },
  {
    id: "wedding-gold",
    serviceId: "wedding",
    name: "Gold",
    slug: "wedding-gold",
    originalPrice: 2_500_000,
    price: 2_299_000,
    photographerCount: 1,
    isPopular: true,
    features: ["1 Album Photobook", "Video Cinematic", "File Backup", "1 Videografer", "1 Crew (Pengatur Gaya)"],
  },
  {
    id: "wedding-platinum",
    serviceId: "wedding",
    name: "Platinum",
    slug: "wedding-platinum",
    originalPrice: 3_000_000,
    price: 2_800_000,
    photographerCount: 1,
    isPopular: false,
    features: ["1 Album Photobook", "1 Cetak 15R", "Video Cinematic", "File Backup", "1 Videografer", "1 Crew (Pengatur Gaya)"],
  },
  {
    id: "prewedding-silver",
    serviceId: "prewedding",
    name: "Silver",
    slug: "prewedding-silver",
    originalPrice: 1_000_000,
    price: 800_000,
    photographerCount: 1,
    isPopular: false,
    features: ["All File Backup", "1 Crew (Pengatur Gaya)"],
  },
  {
    id: "prewedding-gold",
    serviceId: "prewedding",
    name: "Gold",
    slug: "prewedding-gold",
    originalPrice: 1_800_000,
    price: 1_499_000,
    photographerCount: 1,
    isPopular: true,
    features: ["File Backup", "Video Cinematic", "1 Videografer", "1 Crew (Pengatur Gaya)"],
  },
  {
    id: "prewedding-platinum",
    serviceId: "prewedding",
    name: "Platinum",
    slug: "prewedding-platinum",
    originalPrice: 2_000_000,
    price: 1_800_000,
    photographerCount: 1,
    isPopular: false,
    features: ["Video Cinematic", "All File Backup", "2 Cetak 12R", "1 Videografer", "1 Crew (Pengatur Gaya)"],
  },
];

/** All packages belonging to one service (booking screen 1 filters by this). */
export function getPackagesByService(serviceSlug: string | null): Package[] {
  if (!serviceSlug) return [];
  return PACKAGES.filter((pkg) => pkg.serviceId === serviceSlug);
}

/** Discount as a whole percentage, e.g. 370K -> 299K is 19%. */
export function discountPercent(pkg: Package): number {
  return Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);
}
