import { Section, SectionHeading } from "@/components/layout";
import { FAQ_ITEMS } from "@/data/faq";
import { faqPageJsonLd } from "@/lib/structured-data";

import { FAQAccordion } from "./faq-accordion";

/** Blueprint §17 "FAQ", plus its §45 FAQPage structured data. */
export function FaqSection() {
  return (
    <Section background="surface" waveFrom="white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(FAQ_ITEMS)) }}
      />
      <SectionHeading align="center" title="Pertanyaan yang Sering Ditanyakan" />

      <div className="mt-12">
        <FAQAccordion items={FAQ_ITEMS} />
      </div>
    </Section>
  );
}
