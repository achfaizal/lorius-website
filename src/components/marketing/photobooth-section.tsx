import { Camera, Download, ShieldCheck, Sparkles } from "lucide-react";

import { Section } from "@/components/layout";
import { Reveal } from "@/components/motion";

import { PhotoboothLauncher } from "./photobooth-launcher";
import { PhotoboothVisual } from "./photobooth-visual";

const POINTS = [
  { icon: Sparkles, text: "12 bingkai bermerek Lorius: bulat, lengkung, hati, bunga, dan lainnya." },
  { icon: Camera, text: "Hitung mundur otomatis, dan bisa ulang tiap foto." },
  { icon: Download, text: "Unduh atau bagikan hasilnya langsung dari browser." },
];

/** Homepage "playground": opens the virtual photobooth as a full-screen overlay. */
export function PhotoboothSection() {
  return (
    <Section id="photobooth" background="soft-teal" waveFrom="cream">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal className="flex flex-col gap-6">
          <span className="text-caption font-semibold tracking-wider text-brand uppercase">
            Playground
          </span>
          <h2 className="text-section-title text-foreground">
            Coba Photobooth Virtual Kami
          </h2>
          <p className="text-body text-foreground/75">
            Iseng-iseng sambil lihat-lihat? Berpose di depan kamera, pilih
            bingkai, lalu bawa pulang hasilnya.
          </p>
          <ul className="flex flex-col gap-3">
            {POINTS.map(({ icon: Icon, text }) => (
              <li key={text} className="text-body flex items-start gap-3 text-foreground/85">
                <Icon className="mt-1 size-5 shrink-0 text-brand" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <PhotoboothLauncher />
            <a href="#photobooth-acara" className="text-body font-medium text-brand underline underline-offset-4 hover:text-brand-cyan">
              Mau di acaramu? Lihat caranya
            </a>
          </div>
          <p className="text-caption flex items-start gap-2 text-foreground/60">
            <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            Fotomu hanya diproses di perangkatmu dan tidak diunggah ke mana pun.
          </p>
        </Reveal>

        <Reveal className="flex justify-center">
          <PhotoboothVisual />
        </Reveal>
      </div>
    </Section>
  );
}
