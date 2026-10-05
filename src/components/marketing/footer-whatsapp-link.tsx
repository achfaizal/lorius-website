"use client";

import { MessageCircle } from "lucide-react";

import { trackEvent } from "@/lib/analytics";

interface FooterWhatsAppLinkProps {
  href: string;
  className: string;
}

/**
 * Just the footer's WhatsApp link, split out so `Footer` itself can stay
 * a server component (TASK 20 — minimizing "use client" boundary size is
 * a real, if modest, perf win: less JS to hydrate for a footer that's
 * otherwise entirely static per-request content).
 */
export function FooterWhatsAppLink({ href, className }: FooterWhatsAppLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackEvent("click_whatsapp", { source: "footer" })}
    >
      <MessageCircle size={16} aria-hidden="true" />
      WhatsApp
    </a>
  );
}
