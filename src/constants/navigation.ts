export interface NavItem {
  label: string;
  href: string;
}

/**
 * Desktop/mobile primary navigation — blueprint §9.
 *
 * TASK 20: `/paket`, `/galeri`, `/testimoni`, `/tentang`, `/kontak` were
 * blueprint §7's *ideal* dedicated pages, but the 20-task build only ever
 * produced blueprint §8's single consolidated homepage (each of those
 * would-be pages is really just a homepage section) plus `/booking` — so
 * those routes 404'd. Pointed at the matching homepage section's `id`
 * instead (added in TASK 20): Paket → `PackageGrid`, Galeri →
 * `GallerySection`, Testimoni → `TestimonialSection`, Tentang →
 * `WhySection` (the closest thing this site has to an "about" section),
 * Kontak → `Footer`. If real standalone pages are ever built, change
 * these back to plain paths — nothing else needs to know the difference.
 */
export const MAIN_NAV: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Paket", href: "/#paket" },
  { label: "Galeri", href: "/#galeri" },
  { label: "Testimoni", href: "/#testimoni" },
  { label: "Booking", href: "/booking" },
  { label: "Kontak", href: "/#kontak" },
];

/** Footer "Menu" column — blueprint §19. See MAIN_NAV's doc comment for the `/#...` anchors. */
export const FOOTER_MENU: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Paket", href: "/#paket" },
  { label: "Galeri", href: "/#galeri" },
  { label: "Booking", href: "/booking" },
  { label: "Tentang", href: "/#tentang" },
  { label: "Kontak", href: "/#kontak" },
];

export interface ServiceLink {
  label: string;
  slug: string;
}

/**
 * Footer "Layanan" column — blueprint §19. Links to `/booking?service=<slug>`
 * (TASK 20) — `BookingFlow` already pre-fills Step 1 from that query param,
 * which correctly shows *that* service's real per-service packages; an
 * anchor to `PackageGrid` would always show Wedding's packages regardless
 * of which service was clicked, which would be actively misleading here.
 */
export const FOOTER_SERVICES: ServiceLink[] = [
  { label: "Prewedding", slug: "prewedding" },
  { label: "Wedding", slug: "wedding" },
  { label: "Graduation", slug: "graduation" },
  { label: "Engagement", slug: "engagement" },
  { label: "Event", slug: "event" },
];
