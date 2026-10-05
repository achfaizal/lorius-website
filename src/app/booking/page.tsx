import type { Metadata } from "next";
import { Suspense } from "react";

import { BookingFlow } from "@/components/booking";
import { SiteContainer } from "@/components/layout";

export const metadata: Metadata = {
  title: "Booking",
  alternates: { canonical: "/booking" },
  description: "Booking sesi fotografi bersama Lorius dalam beberapa langkah mudah.",
};

export default function BookingPage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col bg-surface">
      <SiteContainer className="flex flex-col gap-2 pt-10">
        <h1 className="text-h1 text-brand">Booking Sesi Fotografi</h1>
        <p className="text-body text-brand-gray">
          2 langkah singkat untuk mengamankan jadwalmu bersama Lorius.
        </p>
      </SiteContainer>

      {/* BookingFlow reads ?service=/?package= via useSearchParams, which
          requires a Suspense boundary in the App Router. */}
      <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
        <BookingFlow />
      </Suspense>
    </main>
  );
}
