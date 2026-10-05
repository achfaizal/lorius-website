"use client";

import Link from "next/link";

import { Section } from "@/components/layout";
import { LoriusMark } from "@/components/brand";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { DEFAULT_WHATSAPP_MESSAGE, SITE } from "@/constants/site";
import { trackEvent } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/** Blueprint §18 "CTA Closing" — dark teal, final push before the footer. */
export function CtaSection() {
  const whatsappHref = buildWhatsAppUrl(
    SITE.whatsappNumber,
    DEFAULT_WHATSAPP_MESSAGE,
  );

  return (
    <Section background="brand" waveFrom="surface" className="overflow-hidden">
      <LoriusMark
        variant="reverse"
        size={220}
        className="pointer-events-none absolute -bottom-10 left-4 hidden opacity-[0.07] md:block"
      />
      <Reveal className="flex flex-col items-center gap-6 text-center">
        <h2 className="text-h1 max-w-2xl text-brand-foreground">
          Momenmu tidak datang dua kali.
        </h2>
        <p className="text-body max-w-xl text-brand-foreground/75">
          Ceritakan kebutuhanmu dan biarkan Lorius membantu mengabadikannya.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="bg-brand-cyan text-brand hover:bg-brand-cyan/90">
            <Link
              href="/booking"
              onClick={() => trackEvent("click_booking", { source: "cta_section" })}
            >
              Booking Sekarang
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-brand-foreground/40 bg-transparent text-brand-foreground hover:bg-brand-foreground/10"
          >
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("click_whatsapp", { source: "cta_section" })}
            >
              Chat WhatsApp
            </a>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
