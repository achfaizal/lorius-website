import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/data/faq";

interface FAQAccordionProps {
  items: FaqItem[];
}

/** Blueprint §17 — FAQ accordion. */
export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="mx-auto w-full max-w-2xl">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="text-body py-4 font-medium text-brand hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-body text-brand-gray">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
