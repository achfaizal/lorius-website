import type { MetadataRoute } from "next";

import { SITE } from "@/constants/site";

/**
 * Blueprint §45 "SEO". `/api/` is disallowed (route handlers, not content —
 * nothing for a crawler to index there).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
