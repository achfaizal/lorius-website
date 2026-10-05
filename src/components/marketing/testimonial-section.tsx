import { Section, SectionHeading } from "@/components/layout";
import { Reveal } from "@/components/motion";
import { TESTIMONIALS } from "@/data/testimonials";

import { TestimonialCarousel } from "./testimonial-carousel";

/**
 * Blueprint §16 "Testimonials". `id="testimoni"` is the navbar's
 * "Testimoni" link's scroll target (TASK 20 — see `constants/
 * navigation.ts`'s doc comment for why it's an anchor, not a page).
 */
export function TestimonialSection() {
  return (
    <Section id="testimoni" background="white" waveFrom="cream">
      <SectionHeading
        align="center"
        title="Apa Kata Mereka"
        description="Cerita dari klien yang telah mempercayakan momennya kepada Lorius."
      />

      <Reveal className="mt-12">
        <TestimonialCarousel items={TESTIMONIALS} />
      </Reveal>
    </Section>
  );
}
