import {
  Award,
  CalendarCheck,
  ShieldCheck,
  Smile,
  SlidersHorizontal,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

import { Section, SectionHeading } from "@/components/layout";
import { RevealGroup, RevealItem } from "@/components/motion";
import { WHY_LORIUS_BENEFITS } from "@/data/why-lorius";

// Keyed by id rather than array index so it stays correct if the list is reordered.
const BENEFIT_ICONS: Record<string, LucideIcon> = {
  "personal-approach": UserCheck,
  "tim-profesional": Award,
  "natural-direction": Smile,
  "consistent-editing": SlidersHorizontal,
  "easy-booking": CalendarCheck,
  "safe-organized": ShieldCheck,
};

/**
 * Blueprint §13 "Why Lorius" — sitemap position 6 (between Portfolio and
 * Packages). `id="tentang"` is the footer's "Tentang" link's scroll
 * target (TASK 20) — this is the closest thing the site has to an "about
 * us" section, since a dedicated `/tentang` page was never built (see
 * `constants/navigation.ts`'s doc comment).
 */
export function WhySection() {
  return (
    <Section id="tentang" background="white" waveFrom="soft-teal" className="overflow-hidden">
      <SectionHeading
        align="center"
        title="Bukan Sekadar Foto. Kami Menjaga Ceritamu."
      />

      <RevealGroup className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {WHY_LORIUS_BENEFITS.map((benefit) => {
          const Icon = BENEFIT_ICONS[benefit.id] ?? Award;
          return (
            <RevealItem key={benefit.id} className="flex flex-col gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-brand text-brand-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="text-h3 text-brand">{benefit.title}</h3>
              <p className="text-body text-brand-gray">
                {benefit.description}
              </p>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
