"use client";

import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SITE } from "@/constants/site";
import { trackEvent } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const MESSAGE =
  "Halo Lorius, saya tertarik memakai Photobooth Virtual di acara saya.\n\nJenis acara: \nPerkiraan tanggal: \nPerkiraan jumlah tamu: ";

export function PhotoboothEventCta() {
  return (
    <Button
      asChild
      size="lg"
      className="bg-brand-cyan text-brand hover:bg-brand-cyan/90"
    >
      <a
        href={buildWhatsAppUrl(SITE.whatsappNumber, MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("click_whatsapp", { source: "photobooth_event" })}
      >
        <MessageCircle aria-hidden="true" />
        Tanya Photobooth untuk Acaramu
      </a>
    </Button>
  );
}
