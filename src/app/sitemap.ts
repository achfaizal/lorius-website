import type { MetadataRoute } from "next";

import { SITE } from "@/constants/site";

/**
 * Blueprint §45 "SEO". Only the site's real, existing, publicly-indexable
 * routes. `/paket`,
 * `/galeri`, `/testimoni`, `/kontak`, `/tentang` aren't separate routes
 * either (as of TASK 20 they're anchors into homepage sections — see
 * `constants/navigation.ts`), so `/` already covers them; no `#fragment`
 * entries needed, sitemaps don't operate at that granularity anyway.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE.url}/booking`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE.url}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
