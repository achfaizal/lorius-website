"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AtSign, CalendarCheck, MessageCircle, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { LoriusMark } from "@/components/brand";
import { DEFAULT_WHATSAPP_MESSAGE, SITE } from "@/constants/site";
import { trackEvent } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const MINI_ACTIONS = [
  {
    key: "whatsapp",
    label: "Chat WhatsApp",
    icon: MessageCircle,
    href: buildWhatsAppUrl(SITE.whatsappNumber, DEFAULT_WHATSAPP_MESSAGE),
    external: true,
  },
  {
    key: "booking",
    label: "Booking Sekarang",
    icon: CalendarCheck,
    href: "/booking",
    external: false,
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: AtSign,
    href: SITE.instagram.url,
    external: true,
  },
] as const;

/**
 * Blueprint §20 "Floating Action Button" — monogram `l.`, fixed
 * bottom-right, opens WhatsApp/Booking/Instagram mini actions. Toggled by
 * click (works on touch and mouse alike) rather than hover-only, so it's
 * usable on mobile.
 *
 * Hidden on `/booking` — that flow already has its own sticky bottom
 * summary/CTA bar on mobile (§21), and blueprint §20 explicitly says the
 * FAB must not cover a CTA or navigation.
 */
export function FloatingActionButton() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (pathname?.startsWith("/booking")) return null;

  return (
    <div
      ref={containerRef}
      className="fixed right-5 bottom-5 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6"
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col items-end gap-3"
          >
            {MINI_ACTIONS.map((action) => {
              const Icon = action.icon;
              const content = (
                <>
                  <span className="text-caption rounded-full bg-brand px-3 py-1.5 font-medium text-brand-foreground shadow-[0_8px_20px_rgba(14,54,60,0.16)]">
                    {action.label}
                  </span>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-white text-brand shadow-[0_8px_20px_rgba(14,54,60,0.16)]">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                </>
              );
              const itemClass =
                "flex items-center gap-2 focus-visible:outline-none";

              const onActionClick = () => {
                setOpen(false);
                if (action.key === "whatsapp") {
                  trackEvent("click_whatsapp", { source: "fab" });
                } else if (action.key === "booking") {
                  trackEvent("click_booking", { source: "fab" });
                }
              };

              return action.external ? (
                <a
                  key={action.key}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={itemClass}
                  onClick={onActionClick}
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={action.key}
                  href={action.href}
                  className={itemClass}
                  onClick={onActionClick}
                >
                  {content}
                </Link>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Tutup menu cepat" : "Buka menu cepat"}
        className="flex size-13 items-center justify-center rounded-full bg-brand ring-2 ring-white/70 shadow-[0_12px_32px_rgba(14,54,60,0.24)] transition-transform duration-200 hover:scale-105 sm:size-14"
      >
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {open ? (
            <Plus className="size-6 text-brand-foreground" aria-hidden="true" />
          ) : (
            <LoriusMark variant="reverse" size={22} />
          )}
        </motion.span>
      </button>
    </div>
  );
}
