/**
 * Hero section copy (blueprint §10). Kept as data — not hardcoded in the
 * component — since this is exactly the kind of content the admin CMS
 * (§38) is meant to eventually manage ("hero copy; hero image").
 */
export const HERO_CONTENT = {
  eyebrow: "PHOTOGRAPHY FOR YOUR STORIES",
  // "Lorius" is rendered as the LoriusWordmark image inline (see
  // hero-section.tsx), not as text — kept out of this string so there's
  // no risk of it silently duplicating "Lorius" as plain text too.
  headlineLines: ["Abadikan momen", "terbaikmu bersama"],
  description:
    "Setiap momen berharga layak untuk diabadikan dengan indah. Kami hadir untuk mengubah momen istimewamu menjadi kenangan yang tak terlupakan.",
  // TASK 20: "/paket" was a dedicated page that never got built (only
  // the homepage sitemap §8 sections exist) — points at PackageGrid's
  // `id="paket"` instead. See navigation.ts's doc comment for the rest.
  ctaPrimary: { label: "Lihat Paket", href: "/#paket" },
  ctaSecondary: { label: "Konsultasi via WhatsApp" },
} as const;

export interface TrustPoint {
  label: string;
}

/** Blueprint §10 "Trust Points". */
export const TRUST_POINTS: TrustPoint[] = [
  { label: "Fotografer Profesional" },
  { label: "Hasil Berkualitas Tinggi" },
  { label: "Pelayanan Ramah" },
];
