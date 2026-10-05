import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { AnalyticsScript } from "@/components/analytics";
import { SkipLink } from "@/components/layout";
import { Footer, FloatingActionButton, Navbar } from "@/components/marketing";
import { SITE } from "@/constants/site";
import { localBusinessJsonLd } from "@/lib/structured-data";

import "./globals.css";

// Poppins — the only typeface in the Lorius brand guideline (docs/Lorius_
// Brand_Guideline_2026.pdf §3): Bold/SemiBold for headings, Medium for
// nav/subheadings, Regular for body/caption. Fallback: Plus Jakarta Sans,
// Inter, sans-serif (the guideline's own "Alternatif Digital" pick is Plus
// Jakarta Sans).
const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["Plus Jakarta Sans", "Inter", "sans-serif"],
});

// Blueprint §45 "SEO" — sitewide defaults every page inherits (OpenGraph/
// Twitter card, canonical base). Pages that need their own title/
// description/OG image override these via their own `metadata` export
// (Next merges shallowly, deep-merges `openGraph`/`twitter`) — see
// app/page.tsx and app/booking/*/page.tsx.
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Lorius Photography",
    template: "%s | Lorius Photography",
  },
  description: SITE.description,
  icons: {
    icon: "/logo/Icon.png",
    shortcut: "/logo/Icon.png",
    apple: "/logo/Icon.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE.url,
    siteName: "Lorius Photography",
    title: "Lorius Photography",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Lorius Photography",
    description: SITE.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* LocalBusiness/ProfessionalService (blueprint §45) applies
            sitewide, not to one specific page, so it's emitted here once
            rather than duplicated per route. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <SkipLink />
        <Navbar />
        {children}
        <Footer />
        <FloatingActionButton />
        <AnalyticsScript />
      </body>
    </html>
  );
}
