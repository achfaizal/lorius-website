export interface Service {
  slug: string;
  name: string;
}

/**
 * The 4 services Lorius currently sells, matching the 2026 price-list
 * posters in docs/price-list-2026/.
 *
 * Order matters: it is the order of the package tabs on the homepage and the
 * service chips in the booking flow (Prewedding, Wedding, Graduation first).
 */
export const SERVICES: Service[] = [
  { slug: "prewedding", name: "Prewedding" },
  { slug: "wedding", name: "Wedding" },
  { slug: "graduation", name: "Graduation" },
  { slug: "engagement", name: "Engagement" },
];
