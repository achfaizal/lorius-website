import type { Metadata } from "next";

import { AnalyticsPageView } from "@/components/analytics";
import {
  BookingStepsSection,
  CtaSection,
  FaqSection,
  GallerySection,
  HeroSection,
  PackageGrid,
  PhotoMosaic,
  TestimonialSection,
  WhySection,
} from "@/components/marketing";

// Blueprint §45 "SEO" homepage example, adapted to the real brand name
// ("Lorius", not the blueprint's "Lori(us)") and city.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "Lorius Photography Bandung | Wedding, Prewedding & Graduation",
  description:
    "Abadikan momen terbaik bersama Lorius. Fotografi wedding, prewedding, engagement, dan graduation di Bandung dengan pengalaman booking yang mudah.",
};

// Homepage — full sitemap order per blueprint §8. Trust/Quick Benefit
// (§8 item 3) lives inside HeroSection as its TrustPoints; the rest of the
// sections below complete the remaining sitemap items (TASK 08).
export default function Home() {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <AnalyticsPageView event="view_home" />
      <HeroSection />
      <PhotoMosaic />
      <GallerySection />
      <WhySection />
      <BookingStepsSection />
      <PackageGrid />
      <TestimonialSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
