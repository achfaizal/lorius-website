"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Package,
  type LucideIcon,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";

import { Section, SectionHeading } from "@/components/layout";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { BOOKING_STEPS } from "@/data/booking-steps";
import { getPackagesByService } from "@/data/packages";
import { SERVICES } from "@/data/services";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const STEP_ICONS: LucideIcon[] = [Package, MessageCircle];

/** `?step=` values of the booking flow's two screens, one per teaser step (the second opens only once service + package are known). */
const STEP_LINK_IDS = ["paket", "jadwal"] as const;

/** Tiny skeleton input used by the decorative step previews. */
function FieldMock({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-medium text-brand-gray">{label}</span>
      <span
        className={cn(
          "flex h-9 items-center rounded-lg border border-border px-3 text-sm",
          value ? "text-brand" : "bg-surface-soft-teal",
        )}
      >
        {value ?? <span className="h-2 w-2/5 rounded-full bg-brand/15" />}
      </span>
    </div>
  );
}

/** "Rp1,299 jt" — compact so three price cards always fit side by side. */
function formatShortPrice(price: number) {
  return `Rp${(price / 1_000_000).toLocaleString("id-ID")} jt`;
}

const PREVIEW_SERVICES = SERVICES.slice(0, 5);
const PREVIEW_PACKAGES = getPackagesByService("wedding");

/**
 * Decorative mini-UI of what the visitor sees on each of the two booking
 * screens — purely illustrative (`aria-hidden` by the caller), driven by real
 * service and package data where it shows any, so it can't drift from the
 * catalog.
 */
function StepPreview({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-brand-gray">Layanan</span>
          <div className="flex flex-wrap gap-2">
            {PREVIEW_SERVICES.map((service) => (
              <span
                key={service.slug}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm font-medium",
                  service.slug === "wedding"
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-border text-brand",
                )}
              >
                {service.name}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-brand-gray">Paket</span>
          <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-3">
            {PREVIEW_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={cn(
                  "flex min-w-0 items-center justify-between gap-2 rounded-xl border p-3 min-[480px]:flex-col min-[480px]:items-start min-[480px]:justify-start min-[480px]:gap-1",
                  pkg.isPopular
                    ? "border-brand bg-surface-soft-teal"
                    : "border-border",
                )}
              >
                <span className="text-xs font-semibold">{pkg.name}</span>
                <span className="flex flex-col items-end min-[480px]:items-start">
                  <span className="text-[10px] leading-tight text-brand-gray line-through">
                    {formatShortPrice(pkg.originalPrice)}
                  </span>
                  <span className="text-sm font-bold whitespace-nowrap">
                    {formatShortPrice(pkg.price)}
                  </span>
                </span>
                <span className="mt-1 hidden h-1.5 w-full rounded-full bg-brand/10 min-[480px]:block" />
                <span className="hidden h-1.5 w-3/4 rounded-full bg-brand/10 min-[480px]:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <FieldMock label="Tanggal sesi" value="15 Nov 2026" />
        <FieldMock label="Jam sesi" value="08:00–10:00" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <FieldMock label="Nama lengkap" />
        <FieldMock label="Nomor WhatsApp" />
      </div>
      <FieldMock label="Lokasi / area sesi" />
      <span className="mt-1 flex h-10 items-center justify-center gap-2 rounded-lg bg-brand text-sm font-medium text-brand-foreground">
        <MessageCircle className="size-4" />
        Kirim Booking ke WhatsApp
      </span>
    </div>
  );
}

/** Outline arrows restyled for the dark section background. */
const ARROW_CLASS =
  "border-brand-foreground/30 bg-transparent text-brand-foreground hover:bg-brand-foreground/10 hover:text-brand-foreground disabled:opacity-30";

const AUTOPLAY_MS = 3500;
const LAST = BOOKING_STEPS.length - 1;

/**
 * Blueprint §15 "Booking Process Section" — a swipeable, step-by-step
 * carousel. Each slide is one step with an illustrative mini-UI; swipe,
 * use the arrows, or tap a dot. It advances on its own until the visitor
 * interacts (and never autoplays for `prefers-reduced-motion`).
 */
export function BookingStepsSection() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const slide = track?.children[index] as HTMLElement | undefined;
      if (!track || !slide) return;
      track.scrollTo({
        left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [reduceMotion],
  );

  // Keep `active` in sync with whichever slide is closest to the track's center.
  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let best = Infinity;
    Array.from(track.children).forEach((child, index) => {
      const el = child as HTMLElement;
      const distance = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
      if (distance < best) {
        best = distance;
        closest = index;
      }
    });
    setActive(closest);
  };

  useEffect(() => {
    if (!autoplay || reduceMotion) return;
    const timer = setTimeout(
      () => goTo(active >= LAST ? 0 : active + 1),
      AUTOPLAY_MS,
    );
    return () => clearTimeout(timer);
  }, [autoplay, reduceMotion, active, goTo]);

  const manual = (index: number) => {
    setAutoplay(false);
    goTo(Math.min(Math.max(index, 0), LAST));
  };

  return (
    <Section background="brand" waveFrom="white" className="overflow-hidden">
      <SectionHeading
        align="center"
        tone="light"
        title="Booking sesimu hanya dalam 2 langkah."
        description="Geser untuk melihat apa yang akan kamu lakukan di tiap langkah."
      />

      <Reveal className="mt-10 sm:mt-12">
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Langkah booking"
          className="w-full"
        >
          <div
            ref={trackRef}
            onScroll={onScroll}
            onPointerDown={() => setAutoplay(false)}
            onWheel={() => setAutoplay(false)}
            className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {BOOKING_STEPS.map((step, index) => {
              const ActiveIcon = STEP_ICONS[index];
              const isActive = index === active;
              return (
                <div
                  key={step.number}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Langkah ${index + 1} dari ${BOOKING_STEPS.length}`}
                  className={cn(
                    "relative w-[88%] shrink-0 snap-center overflow-hidden p-2 text-brand-foreground transition-[opacity,transform] duration-500 sm:p-6 md:w-full lg:px-10 lg:py-12",
                    !isActive && "scale-[0.96] opacity-50",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-10 -left-2 text-[16rem] leading-none font-bold text-white/[0.05] select-none sm:-bottom-12 sm:text-[20rem] lg:-bottom-14 lg:text-[26rem]"
                  >
                    {step.number}
                  </span>

                  <div className="relative grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
                    <div className="flex flex-col items-start gap-4 text-left">
                      <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-cyan text-brand shadow-[0_8px_24px_rgba(39,198,209,0.35)]">
                        <ActiveIcon className="size-7" aria-hidden="true" />
                      </span>
                      <div className="flex flex-col gap-2">
                        <span className="text-caption font-semibold tracking-[0.18em] text-brand-cyan uppercase">
                          Langkah {step.number} dari {BOOKING_STEPS.length}
                        </span>
                        <h3 className="text-h2 text-brand-foreground">
                          {step.label}
                        </h3>
                        <p className="text-body text-brand-foreground/75">
                          {step.description}
                        </p>
                      </div>
                      {index < STEP_LINK_IDS.length ? (
                        <Link
                          href={`/booking?step=${STEP_LINK_IDS[index]}`}
                          onClick={() =>
                            trackEvent("click_booking", {
                              source: "booking_steps_card",
                              step: STEP_LINK_IDS[index],
                            })
                          }
                          className="text-body group/link inline-flex items-center gap-2 rounded-full bg-brand-cyan px-5 py-2.5 font-medium text-brand transition-colors hover:bg-brand-cyan/90"
                        >
                          Mulai dari langkah ini
                          <ArrowRight
                            className="size-4 transition-transform group-hover/link:translate-x-1"
                            aria-hidden="true"
                          />
                        </Link>
                      ) : null}
                    </div>

                    <div
                      aria-hidden="true"
                      className="rounded-2xl bg-surface-white p-4 text-brand shadow-[0_16px_40px_rgba(0,0,0,0.25)] sm:p-5 lg:[zoom:1.3]"
                    >
                      <StepPreview index={index} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className={ARROW_CLASS}
              onClick={() => manual(active - 1)}
              disabled={active === 0}
              aria-label="Langkah sebelumnya"
            >
              <ChevronLeft aria-hidden="true" />
            </Button>

            <div className="flex items-center gap-2">
              {BOOKING_STEPS.map((step, index) => (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => manual(index)}
                  aria-label={`Ke langkah ${index + 1}: ${step.label}`}
                  aria-current={index === active ? "true" : undefined}
                  className="flex size-6 items-center justify-center"
                >
                  <span
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      index === active
                        ? "w-7 bg-brand-cyan"
                        : index < active
                          ? "w-2 bg-brand-foreground/70"
                          : "w-2 bg-brand-foreground/25",
                    )}
                  />
                </button>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className={ARROW_CLASS}
              onClick={() => manual(active + 1)}
              disabled={active === LAST}
              aria-label="Langkah berikutnya"
            >
              <ChevronRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Reveal>

      <div className="mt-10 flex justify-center">
        <Button asChild size="lg" className="bg-brand-cyan text-brand hover:bg-brand-cyan/90">
          <Link
            href="/booking"
            onClick={() => trackEvent("click_booking", { source: "booking_steps" })}
          >
            Mulai Booking
          </Link>
        </Button>
      </div>
    </Section>
  );
}
