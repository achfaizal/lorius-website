"use client";

import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";

import { composeBooth, loadImage } from "@/lib/photobooth/compose";
import { BOOTH_TEMPLATES, type BoothTemplate } from "@/lib/photobooth/templates";

/** Portfolio photos used to show each frame with a believable picture in it. */
const SAMPLE_PHOTOS = [
  "/photos/gallery/wedding-13.jpg",
  "/photos/gallery/graduation-09.jpg",
  "/photos/gallery/engagement-06.jpg",
  "/photos/gallery/prewedding-04.jpg",
];

const PREVIEW_WIDTH = 420;

interface FrameStepProps {
  onChoose: (template: BoothTemplate) => void;
}

/** Step 1: pick a frame. Previews are the real compositor output. */
export function FrameStep({ onChoose }: FrameStepProps) {
  const [previews, setPreviews] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const samples = await Promise.all(SAMPLE_PHOTOS.map((src) => loadImage(src)));
      for (const template of BOOTH_TEMPLATES) {
        const canvas = await composeBooth({
          template,
          photos: template.slots.map((_, i) => samples[i % samples.length]),
          mirror: false,
          scale: PREVIEW_WIDTH / template.width,
        });
        if (cancelled) return;
        const url = canvas.toDataURL("image/jpeg", 0.85);
        setPreviews((current) => ({ ...current, [template.id]: url }));
      }
    })().catch(() => {
      // Previews are decoration; the frames still work without them.
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:py-12">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-h2 text-brand-foreground">Pilih bingkaimu</h2>
        <p className="text-body text-brand-foreground/75">
          Tiap bingkai punya jumlah foto yang berbeda. Kamera diminta setelah
          kamu memilih.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {BOOTH_TEMPLATES.map((template) => (
          <li key={template.id}>
            <button
              type="button"
              onClick={() => onChoose(template)}
              className="group flex h-full w-full flex-col gap-4 rounded-3xl bg-white/[0.07] p-4 text-left ring-1 ring-white/15 transition hover:bg-white/[0.12] hover:ring-brand-cyan focus-visible:ring-2 focus-visible:ring-brand-cyan active:scale-[0.98]"
            >
              <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl bg-black/20 p-2">
                {previews[template.id] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previews[template.id]}
                    alt={`Pratinjau bingkai ${template.name}`}
                    className="max-h-full max-w-full rounded-lg object-contain shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <span className="size-8 animate-pulse rounded-full bg-white/20" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                  <span className="text-h3 text-brand-foreground">{template.name}</span>
                  <span className="rounded-full bg-brand-cyan px-2.5 py-1 text-[11px] whitespace-nowrap font-semibold text-brand">
                    {template.slots.length} foto
                  </span>
                </span>
                <span className="text-caption text-brand-foreground/70">
                  {template.blurb}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <p className="text-caption mx-auto flex max-w-md items-start gap-2 text-center text-brand-foreground/65">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand-cyan" aria-hidden="true" />
        <span>
          Fotomu hanya diproses di perangkatmu dan tidak diunggah ke mana pun.
        </span>
      </p>
    </div>
  );
}
