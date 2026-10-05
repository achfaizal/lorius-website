"use client";

import Link from "next/link";

import { LoriusWordmark } from "@/components/brand";
import { Section } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { DEFAULT_WHATSAPP_MESSAGE, SITE } from "@/constants/site";
import { HERO_CONTENT, TRUST_POINTS } from "@/data/hero";
import { trackEvent } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

import { HeroPhotoCollage } from "./hero-photo-collage";
import { TrustPoints } from "./trust-points";

/**
 * Hero — blueprint §10. Desktop: 45% copy / 55% visual collage via explicit
 * grid placement (see column/row classes below); mobile stacks in document
 * order (copy → CTA → photo collage → trust points) simply because that's
 * the JSX order and the grid collapses to one column under `lg`.
 */
export function HeroSection() {
  const whatsappHref = buildWhatsAppUrl(
    SITE.whatsappNumber,
    DEFAULT_WHATSAPP_MESSAGE,
  );

  return (
    <Section
      background="surface"
      className="overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[45fr_55fr] lg:grid-rows-[1fr_auto_1fr] lg:gap-x-16 lg:gap-y-8">
        <div className="animate-rise flex flex-col gap-5 lg:col-start-1 lg:row-start-1 lg:self-end">
          {/* Brand cyan (#27c6d1) fails WCAG AA as text on this light
              background (~2:1, needs 4.5:1) — TASK 20 accessibility pass,
              confirmed with the user to keep cyan itself untouched for
              non-text accents and move small label text like this to a
              passing color instead. */}
          <span className="text-caption font-semibold text-brand-gray uppercase tracking-[0.18em]">
            {HERO_CONTENT.eyebrow}
          </span>
          <h1 className="text-display text-brand">
            {HERO_CONTENT.headlineLines.map((line, index) => (
              <span key={line} className="block">
                {line}
                {index === HERO_CONTENT.headlineLines.length - 1 ? (
                  <>
                    {" "}
                    <LoriusWordmark />
                  </>
                ) : null}
              </span>
            ))}
          </h1>
          <p className="text-body max-w-md text-brand-gray">
            {HERO_CONTENT.description}
          </p>
        </div>

        <div
          style={{ "--delay": "0.1s" } as React.CSSProperties}
          className="animate-rise flex flex-wrap items-center gap-3 lg:col-start-1 lg:row-start-2 lg:self-center"
        >
          <Button asChild>
            <Link href={HERO_CONTENT.ctaPrimary.href}>
              {HERO_CONTENT.ctaPrimary.label}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("click_whatsapp", { source: "hero" })}
            >
              {HERO_CONTENT.ctaSecondary.label}
            </a>
          </Button>
        </div>

        <div className="lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:self-center">
          <HeroPhotoCollage />
        </div>

        <div
          style={{ "--delay": "0.2s" } as React.CSSProperties}
          className="animate-rise lg:col-start-1 lg:row-start-3 lg:self-start"
        >
          <TrustPoints items={TRUST_POINTS} />
        </div>
      </div>
    </Section>
  );
}
