/**
 * Site-wide brand/contact config. Per blueprint §34, the WhatsApp number
 * (and, by extension, the rest of this contact info) is meant to live in
 * admin settings, not be hardcoded inside components — this file is the
 * stand-in for that until the CMS/admin settings exist (TASK 17+). Only
 * this file needs to change when real values or a data source arrive.
 *
 * Contact details below are real, taken from
 * docs/PRICE-LIST-LORIUS-PHOTOGRAPHY.pdf's "Contact Person" page.
 */
export const SITE = {
  name: "Lorius",
  tagline: "moments worth keeping",
  description:
    "Fotografi wedding, prewedding, engagement, dan graduation — dikemas hangat, personal, dan mudah dibooking online.",
  city: "Bandung",
  // Real production URL, once known — see .env.example. Falls back to a
  // lorius.id placeholder (matching the old email sender's
  // placeholder domain) so metadata/sitemap/robots always have *some*
  // absolute URL to work with, even before that env var is set.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorius.id",
  whatsappNumber: "6281903570187",
  email: "loriusphotography@gmail.com",
  instagram: {
    handle: "@loriusphotography",
    url: "https://instagram.com/loriusphotography",
  },
  tiktok: {
    handle: "@loriusphotography",
    url: "https://tiktok.com/@loriusphotography",
  },
} as const;

export const DEFAULT_WHATSAPP_MESSAGE =
  "Halo Lorius, saya ingin bertanya-tanya seputar layanan fotografi kalian.";
