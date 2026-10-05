import {
  AudioLines,
  CalendarHeart,
  Images,
  QrCode,
  Repeat,
  Smartphone,
  Type,
} from "lucide-react";

import { Section, SectionHeading } from "@/components/layout";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";

import { PhotoboothEventCta } from "./photobooth-event-cta";

const STEPS = [
  {
    icon: QrCode,
    title: "Pasang QR di meja",
    text: "Kami siapkan QR dengan bingkai bertema acaramu. Taruh di meja tamu atau pelaminan.",
  },
  {
    icon: Smartphone,
    title: "Tamu scan & berfoto",
    text: "Langsung dari HP masing-masing. Tanpa install aplikasi, tanpa antre alat.",
  },
  {
    icon: Images,
    title: "Strip dibawa pulang",
    text: "Hasilnya diunduh sendiri oleh tamu, siap dibagikan ke story dan chat.",
  },
];

const PERKS = [
  { icon: Type, text: "Nama, tanggal, dan tagar acara tercetak di setiap bingkai" },
  { icon: Repeat, text: "Tamu bisa mengulang foto sampai puas" },
  { icon: AudioLines, text: "Pesan suara dari tamu, dijadikan video siap Reels" },
  { icon: Images, text: "Galeri momen untuk dikenang setelah acara" },
];

const EVENTS = [
  "Wedding",
  "Lamaran",
  "Ulang Tahun",
  "Graduation",
  "Gathering Kantor",
  "Reuni",
];

/**
 * Sales pitch that follows the playground: the booth visitors just tried can
 * run at their own event. No prices are shown — they depend on guest count,
 * so the CTA is a WhatsApp conversation.
 */
export function PhotoboothEventSection() {
  return (
    <Section id="photobooth-acara" background="brand" waveFrom="soft-teal" className="overflow-hidden">
      <SectionHeading
        align="center"
        tone="light"
        eyebrow="Photobooth untuk Acara"
        title="Seru tadi kan? Hadirkan di acaramu."
        description="Photobooth virtual yang sama bisa jadi hiburan di pernikahan, ulang tahun, dan acaramu yang lain. Tamu berfoto lewat HP, kamu dapat cerita dari sudut yang tak terduga."
      />

      <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
        {STEPS.map(({ icon: Icon, title, text }, index) => (
          <RevealItem
            key={title}
            className="relative flex flex-col gap-3 rounded-3xl bg-white/[0.07] p-6 ring-1 ring-white/15"
          >
            <span className="absolute top-4 right-5 text-5xl font-bold text-white/10" aria-hidden="true">
              {index + 1}
            </span>
            <span className="flex size-11 items-center justify-center rounded-full bg-brand-cyan text-brand">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="text-h3 text-brand-foreground">{title}</h3>
            <p className="text-body text-brand-foreground/75">{text}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2">
        {PERKS.map(({ icon: Icon, text }) => (
          <RevealItem key={text} className="flex items-start gap-3 text-brand-foreground">
            <Icon className="mt-1 size-5 shrink-0 text-brand-cyan" aria-hidden="true" />
            <span className="text-body">{text}</span>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-10 flex flex-col items-center gap-6 text-center">
        <ul className="flex flex-wrap justify-center gap-2" aria-label="Cocok untuk">
          {EVENTS.map((event) => (
            <li
              key={event}
              className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-brand-foreground"
            >
              <CalendarHeart className="size-4 text-brand-cyan" aria-hidden="true" />
              {event}
            </li>
          ))}
        </ul>
        <PhotoboothEventCta />
        <p className="text-caption max-w-md text-brand-foreground/65">
          Harga menyesuaikan jumlah strip dan jenis acara. Ceritakan acaramu, kami kirim penawarannya.
        </p>
      </Reveal>
    </Section>
  );
}
