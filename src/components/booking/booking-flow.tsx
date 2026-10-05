"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { SiteContainer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKING_FLOW_STEPS } from "@/constants/booking";
import { SITE } from "@/constants/site";
import { BOOKING_SERVICES } from "@/data/booking-services";
import { PACKAGES } from "@/data/packages";
import { trackEvent } from "@/lib/analytics";
import { generateBookingCode } from "@/lib/booking-code";
import { buildBookingWhatsAppMessage } from "@/lib/booking-whatsapp";
import { formatBookingDate, formatWorkDuration } from "@/lib/schedule";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { QuickInfoValues } from "@/lib/validations/quick-info";

import { BookingStepper } from "./booking-stepper";
import { BookingSummary } from "./booking-summary";
import { ScheduleInfoStep } from "./schedule-info-step";
import { ServicePackageStep } from "./service-package-step";

/**
 * Blueprint §21 "Halaman Booking" — a 2-screen flow: service + package,
 * then date/time + a short contact form. The website stores nothing: the last
 * step opens WhatsApp with the booking summary prefilled and sends this tab
 * back to the homepage, and the admin curates the rest (final schedule,
 * transport/extras, payment) in that chat.
 *
 * Analytics (§46): `booking_started` on mount, `select_service`/
 * `select_package`/`select_date`, `booking_step_completed` each time
 * "Lanjutkan" advances, `booking_completed` when the WhatsApp hand-off
 * happens, and a best-effort `booking_abandoned` via `pagehide` (see the
 * ref-tracked `completedRef` below).
 */
export function BookingFlow() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  // Deep links skip the steps they already answer: a valid service+package
  // opens at "Tanggal & Waktu", a service alone opens at "Pilih Paket".
  const [currentIndex, setCurrentIndex] = useState(() => {
    const service = BOOKING_SERVICES.find(
      (s) => s.slug === searchParams.get("service"),
    );
    const pkg = PACKAGES.find((p) => p.slug === searchParams.get("package"));
    // A valid service+package already answers screen 1, so open screen 2.
    const reachable = service && pkg?.serviceId === service.slug ? 1 : 0;
    // `?step=layanan|paket` (screen 1) or `?step=jadwal` (screen 2) opens
    // that screen, but never past what the link has already answered.
    const stepParam = searchParams.get("step");
    const requested =
      stepParam === "layanan" || stepParam === "paket"
        ? 0
        : stepParam === "jadwal" || stepParam === "data"
          ? 1
          : -1;
    return requested >= 0 ? Math.min(requested, reachable) : reachable;
  });
  // Tracks whether `booking_completed` already fired, so the abandonment
  // listener below doesn't also fire for a booking that actually finished.
  const completedRef = useRef(false);

  // Pre-fill from links like the homepage's "Lihat Paket" (?service=slug)
  // and "Pilih Paket" (?package=slug) CTAs — computed once as the initial
  // state (not in an effect) so there's no extra render, and it never
  // fights the user's own subsequent selections.
  const [serviceSlug, setServiceSlug] = useState<string | null>(() => {
    const param = searchParams.get("service");
    return param && BOOKING_SERVICES.some((s) => s.slug === param)
      ? param
      : null;
  });
  const [packageId, setPackageId] = useState<string | null>(() => {
    const param = searchParams.get("package");
    return PACKAGES.find((p) => p.slug === param)?.id ?? null;
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [info, setInfo] = useState<Partial<QuickInfoValues>>({});
  const [infoValid, setInfoValid] = useState(false);

  const step = BOOKING_FLOW_STEPS[currentIndex];
  const isLastStep = currentIndex === BOOKING_FLOW_STEPS.length - 1;
  const selectedService = BOOKING_SERVICES.find((s) => s.slug === serviceSlug);
  const selectedPackage = PACKAGES.find((p) => p.id === packageId);
  // Fixed-length packages (Graduation) have no time to pick: the time field is
  // the package's own duration, and the start time is agreed over WhatsApp.
  const durationHours = selectedPackage?.durationHours ?? null;
  const timeLabel =
    durationHours != null ? formatWorkDuration(durationHours) : selectedSlot;

  // `booking_started` once per visit to /booking (no synchronous setState
  // here — see the react-hooks/set-state-in-effect gotcha documented in
  // memory — this only ever calls trackEvent). `pagehide` is more
  // reliable than `beforeunload` for a "did they actually leave" signal;
  // best-effort like all client-side unload tracking (won't catch a
  // crashed tab, etc.), same trade-off already accepted for the mock
  // availability/file-storage layer elsewhere in this app.
  useEffect(() => {
    trackEvent("booking_started");

    const onPageHide = () => {
      if (!completedRef.current) trackEvent("booking_abandoned");
    };
    window.addEventListener("pagehide", onPageHide);
    return () => window.removeEventListener("pagehide", onPageHide);
  }, []);

  const goTo = (index: number) => {
    // New step = new content; start it from the top (mobile otherwise
    // keeps the previous step's scroll position).
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentIndex(
      Math.min(Math.max(index, 0), BOOKING_FLOW_STEPS.length - 1),
    );
  };

  /** Advances a step and reports it as completed (blueprint §46) — distinct from `goTo`, which is also used for the stepper's free "jump back" navigation. */
  const advanceStep = () => {
    trackEvent("booking_step_completed", { step: step.id });
    goTo(currentIndex + 1);
  };

  const advanceDisabled =
    (step.id === "paket" && (!serviceSlug || !packageId)) ||
    (step.id === "jadwal" &&
      (!selectedDate || !timeLabel || !infoValid));

  /**
   * Final step: the website stores nothing — the booking *is* the WhatsApp
   * message. Opens WhatsApp with the summary prefilled (still inside the
   * click handler, so popup blockers allow it) and sends this tab back to
   * the homepage.
   */
  function handleSendToWhatsApp() {
    if (
      !serviceSlug ||
      !selectedPackage ||
      !selectedDate ||
      !timeLabel ||
      !infoValid
    ) {
      return;
    }

    const message = buildBookingWhatsAppMessage({
      bookingCode: generateBookingCode(),
      serviceSlug,
      packageId: selectedPackage.id,
      date: format(selectedDate, "yyyy-MM-dd"),
      slot: timeLabel,
      durationHours: selectedPackage.durationHours,
      info: info as QuickInfoValues,
    });
    const url = buildWhatsAppUrl(SITE.whatsappNumber, message);

    completedRef.current = true;
    trackEvent("booking_completed", {
      service: serviceSlug,
      package: selectedPackage.id,
    });
    trackEvent("click_whatsapp", { source: "booking_submit" });

    // A blocked popup returns null — fall back to navigating this tab.
    if (!window.open(url, "_blank")) {
      window.location.assign(url);
      return;
    }
    router.push("/");
  }

  return (
    <SiteContainer className="flex flex-col gap-8 pt-8 pb-28 lg:pb-16">
      <BookingStepper currentIndex={currentIndex} onStepClick={goTo} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-6">
          <motion.div
            key={step.id}
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
          {step.id === "paket" ? (
            <ServicePackageStep
              serviceSlug={serviceSlug}
              packageId={packageId}
              onServiceChange={(slug) => {
                setServiceSlug(slug);
                // The time format depends on the package (start time vs. standard block).
                setSelectedSlot(null);
                trackEvent("select_service", { service: slug });
                // A package chosen under a previous service is no longer
                // valid once the service changes (packages are per-service).
                setPackageId((current) => {
                  const stillValid =
                    PACKAGES.find((p) => p.id === current)?.serviceId === slug;
                  return stillValid ? current : null;
                });
              }}
              onPackageChange={(id) => {
                setPackageId(id);
                setSelectedSlot(null);
                trackEvent("select_package", { package: id });
              }}
            />
          ) : (
            <ScheduleInfoStep
              date={selectedDate}
              slot={selectedSlot}
              durationHours={durationHours}
              onDateChange={(date) => {
                setSelectedDate(date);
                if (date) {
                  trackEvent("select_date", { date: format(date, "yyyy-MM-dd") });
                }
              }}
              onSlotChange={setSelectedSlot}
              info={info}
              onInfoChange={(values, isValid) => {
                setInfo(values);
                setInfoValid(isValid);
              }}
            />
          )}
          </motion.div>

          {currentIndex > 0 ? (
            <Button
              type="button"
              variant="ghost"
              className="w-fit"
              onClick={() => goTo(currentIndex - 1)}
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Kembali
            </Button>
          ) : null}
        </div>

        <BookingSummary
          isLastStep={isLastStep}
          onAdvance={isLastStep ? handleSendToWhatsApp : advanceStep}
          advanceDisabled={advanceDisabled}
          serviceName={selectedService?.name}
          packageName={selectedPackage?.name}
          packagePrice={selectedPackage?.price}
          packageOriginalPrice={selectedPackage?.originalPrice}
          date={selectedDate ? formatBookingDate(selectedDate) : null}
          slot={timeLabel}
          location={info.location}
        />
      </div>
    </SiteContainer>
  );
}
