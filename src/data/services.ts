export interface Service {
  slug: string;
  name: string;
}

/**
 * Service categories — blueprint §11, plus "Family Gathering" which isn't
 * in the blueprint's 5-category list but genuinely exists as its own
 * offering in docs/PRICE-LIST-LORIUS-PHOTOGRAPHY.pdf, so it's shown here too.
 *
 * Order matters: it is the order of the package tabs on the homepage and the
 * service chips in the booking flow (Prewedding, Wedding, Graduation first).
 */
export const SERVICES: Service[] = [
  { slug: "prewedding", name: "Prewedding" },
  { slug: "wedding", name: "Wedding" },
  { slug: "graduation", name: "Graduation" },
  { slug: "engagement", name: "Engagement" },
  { slug: "family-gathering", name: "Family Gathering" },
  { slug: "event", name: "Event" },
];
