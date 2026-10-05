import type { FaqItem } from "@/data/faq";
import type { Package } from "@/data/packages";
import { SITE } from "@/constants/site";

/**
 * Blueprint §45 "SEO" structured data. Only the types that actually match
 * real content on this site are implemented — `BreadcrumbList` is
 * skipped: the site is flat (home → booking → success, no category/
 * detail hierarchy), so a breadcrumb trail wouldn't carry real
 * information for search engines. Add it if/when a deeper page hierarchy
 * (e.g. per-service or per-package detail pages) actually exists.
 */

/** LocalBusiness + ProfessionalService (blueprint §45) — emitted once, sitewide, from the root layout. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    email: SITE.email,
    telephone: `+${SITE.whatsappNumber}`,
    image: `${SITE.url}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressCountry: "ID",
    },
    sameAs: [SITE.instagram.url, SITE.tiktok.url],
  };
}

/** FAQPage (blueprint §45) — scoped to `FaqSection`, mirrors what's actually rendered there. */
export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Product/Offer (blueprint §45, "bila sesuai") — scoped to `PackageGrid`,
 * one Offer per package actually shown there. `availability` is always
 * InStock since there's no real inventory/capacity concept for a
 * photography package.
 */
export function packageOffersJsonLd(packages: Package[], serviceName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: packages.map((pkg, index) => ({
      "@type": "Product",
      position: index + 1,
      name: `${serviceName} ${pkg.name}`,
      offers: {
        "@type": "Offer",
        price: pkg.price,
        priceCurrency: "IDR",
        availability: "https://schema.org/InStock",
        url: `${SITE.url}/booking?package=${pkg.slug}`,
      },
    })),
  };
}
