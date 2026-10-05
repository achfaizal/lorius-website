/**
 * Real packages from docs/PRICE-LIST-LORIUS-PHOTOGRAPHY.pdf — replaces the
 * earlier placeholder Basic/Signature/Premium set from TASK 06. Every
 * service now has its own package lineup (1-3 tiers depending on the
 * service, matching the PDF exactly) instead of one generic set shared by
 * everyone.
 *
 * The PDF's package contents don't cleanly fit a single rigid schema
 * (duration is only ever given for Graduation; videographer/crew only
 * apply to some tiers; photo counts are phrased differently per package —
 * "60 Foto" in an album vs. "36 Foto Editing" vs. "Bonus 20 Foto
 * Editing") — so everything except price and photographer count lives in
 * `features` as plain bullets, mirroring the PDF's own bullet lists
 * rather than forcing mismatched structured fields.
 */
export interface Package {
  id: string;
  serviceId: string;
  name: string;
  slug: string;
  price: number;
  photographerCount: number;
  isPopular: boolean;
  features: string[];
  /** The PDF's "*Jika ada request lain bisa didiskusikan bersama kami" note, where present. */
  note?: string;
}

const CUSTOM_REQUEST_NOTE = "Ada kebutuhan lain? Bisa didiskusikan bersama kami.";

export const PACKAGES: Package[] = [
  // --- Wedding ---
  {
    id: "wedding-silver",
    serviceId: "wedding",
    name: "Silver",
    slug: "wedding-silver",
    price: 1_500_000,
    photographerCount: 2,
    isPopular: false,
    features: [
      "1 Album Photobook Standar 60 Foto + File Backup",
      "1 Cetak 12R",
      "1 Crew (Pengatur Gaya)",
    ],
  },
  {
    id: "wedding-gold",
    serviceId: "wedding",
    name: "Gold",
    slug: "wedding-gold",
    price: 2_000_000,
    photographerCount: 2,
    isPopular: true,
    features: [
      "1 Album Photobook Standar 60 Foto",
      "1 Cetak 12R",
      "1 Video Cinematic",
      "All File Backup",
      "1 Videografer",
      "1 Crew (Pengatur Gaya)",
    ],
  },
  {
    id: "wedding-diamond",
    serviceId: "wedding",
    name: "Diamond",
    slug: "wedding-diamond",
    price: 2_700_000,
    photographerCount: 2,
    isPopular: false,
    features: [
      "1 Album Photobook Standar 60 Foto",
      "1 Cetak 12R",
      "1 Video Cinematic + Liputan",
      "All File Backup",
      "1 Videografer",
      "1 Crew (Pengatur Gaya)",
    ],
  },

  // --- Prewedding ---
  {
    id: "prewedding-silver",
    serviceId: "prewedding",
    name: "Silver",
    slug: "prewedding-silver",
    price: 800_000,
    photographerCount: 1,
    isPopular: false,
    features: ["36 Foto Editing", "All File Backup", "1 Crew (Pengatur Gaya)"],
  },
  {
    id: "prewedding-gold",
    serviceId: "prewedding",
    name: "Gold",
    slug: "prewedding-gold",
    price: 1_000_000,
    photographerCount: 1,
    isPopular: true,
    features: [
      "36 Foto Editing",
      "3 Foto Cetak 12R",
      "All File Backup",
      "1 Crew (Pengatur Gaya)",
    ],
  },
  {
    id: "prewedding-diamond",
    serviceId: "prewedding",
    name: "Diamond",
    slug: "prewedding-diamond",
    price: 1_500_000,
    photographerCount: 1,
    isPopular: false,
    features: [
      "36 Foto Editing",
      "3 Foto Cetak 12R",
      "1 Video Cinematic",
      "1 Videografer",
      "1 Crew (Pengatur Gaya)",
    ],
  },

  // --- Engagement ---
  {
    id: "engagement-full-event",
    serviceId: "engagement",
    name: "Full Event",
    slug: "engagement-full-event",
    price: 800_000,
    photographerCount: 1,
    isPopular: false,
    features: ["All File Backup + Bonus 20 Foto Editing", "1 Crew (Pengatur Gaya)"],
    note: CUSTOM_REQUEST_NOTE,
  },

  // --- Graduation ---
  {
    id: "graduation-one-person",
    serviceId: "graduation",
    name: "1 Person",
    slug: "graduation-1-person",
    price: 300_000,
    photographerCount: 1,
    isPopular: false,
    features: ["All File Backup + Bonus 10 Foto Editing", "2 jam sesi pemotretan"],
  },
  {
    id: "graduation-family",
    serviceId: "graduation",
    name: "Family / Pasangan",
    slug: "graduation-family",
    price: 500_000,
    photographerCount: 1,
    isPopular: false,
    features: ["All File Backup + Bonus 10 Foto Editing", "2 jam sesi pemotretan"],
    note: CUSTOM_REQUEST_NOTE,
  },

  // --- Family Gathering ---
  {
    id: "family-gathering-full-event",
    serviceId: "family-gathering",
    name: "Full Event",
    slug: "family-gathering-full-event",
    price: 800_000,
    photographerCount: 1,
    isPopular: false,
    features: ["All File Backup + Bonus 20 Foto Editing", "1 Crew (Pengatur Gaya)"],
    note: CUSTOM_REQUEST_NOTE,
  },

  // --- Event (Birthday, Art Performance) ---
  {
    id: "event-full-event",
    serviceId: "event",
    name: "Full Event",
    slug: "event-full-event",
    price: 800_000,
    photographerCount: 1,
    isPopular: false,
    features: ["All File Backup + Bonus 20 Foto Editing", "1 Crew (Pengatur Gaya)"],
    note: CUSTOM_REQUEST_NOTE,
  },
];

/** All packages belonging to one service (booking Step 2 filters by this). */
export function getPackagesByService(serviceSlug: string | null): Package[] {
  if (!serviceSlug) return [];
  return PACKAGES.filter((pkg) => pkg.serviceId === serviceSlug);
}
