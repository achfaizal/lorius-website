"use client";

import { useEffect, useRef, useState } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { X } from "lucide-react";

import { LoriusMark } from "@/components/brand";
import { trackEvent } from "@/lib/analytics";
import type { Facing } from "@/lib/photobooth/camera";
import { DEFAULT_FILTER_ID } from "@/lib/photobooth/filters";
import type { BoothTemplate } from "@/lib/photobooth/templates";

import { FrameStep } from "./frame-step";
import { ResultStep } from "./result-step";
import { ShootStep } from "./shoot-step";

type Step = "frame" | "shoot" | "result";

const closeAll = (shots: (ImageBitmap | null)[]) =>
  shots.forEach((shot) => shot?.close());

/**
 * Full-screen virtual photobooth. Loaded on demand (the section's button
 * imports it dynamically), so none of this ships to visitors who never open
 * it. Everything — camera frames, compositing, download — stays in the
 * browser; nothing is uploaded or stored.
 */
export default function PhotoboothDialog({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>("frame");
  const [template, setTemplate] = useState<BoothTemplate | null>(null);
  const [shots, setShots] = useState<(ImageBitmap | null)[]>([]);
  const [filterId, setFilterId] = useState(DEFAULT_FILTER_ID);
  const [facing, setFacing] = useState<Facing>("user");
  const [countdownFrom, setCountdownFrom] = useState(3);
  const [retakeIndex, setRetakeIndex] = useState<number | null>(null);
  // Bumped to reopen the camera (retry) — ShootStep is keyed on it.
  const [cameraKey, setCameraKey] = useState(0);

  // Release the captured bitmaps when the booth closes.
  const shotsRef = useRef(shots);
  useEffect(() => {
    shotsRef.current = shots;
  }, [shots]);
  useEffect(() => () => closeAll(shotsRef.current), []);

  const mirror = facing === "user";

  function chooseTemplate(next: BoothTemplate) {
    closeAll(shots);
    setTemplate(next);
    setShots(Array.from({ length: next.slots.length }, () => null));
    setRetakeIndex(null);
    setStep("shoot");
    trackEvent("photobooth_start", { template: next.id });
  }

  function handleShot(index: number, bitmap: ImageBitmap) {
    setShots((current) => {
      current[index]?.close();
      const next = [...current];
      next[index] = bitmap;
      return next;
    });
  }

  function handleComplete() {
    setRetakeIndex(null);
    setStep("result");
    trackEvent("photobooth_complete", { template: template?.id });
  }

  function restart() {
    closeAll(shots);
    setShots([]);
    setTemplate(null);
    setRetakeIndex(null);
    setStep("frame");
  }

  return (
    <DialogPrimitive.Root open onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content
          className="fixed inset-0 z-[70] flex flex-col bg-brand text-brand-foreground outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-200"
          aria-describedby="photobooth-desc"
        >
          <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <LoriusMark variant="reverse" size={28} />
              <DialogPrimitive.Title className="text-body font-semibold text-brand-foreground">
                Photobooth Lorius
              </DialogPrimitive.Title>
            </div>
            <DialogPrimitive.Close
              aria-label="Tutup photobooth"
              className="flex size-10 items-center justify-center rounded-full bg-white/10 text-brand-foreground transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-brand-cyan"
            >
              <X className="size-5" aria-hidden="true" />
            </DialogPrimitive.Close>
          </header>

          <DialogPrimitive.Description id="photobooth-desc" className="sr-only">
            Photobooth virtual: pilih bingkai, ambil foto dengan kamera, lalu
            unduh hasilnya. Foto tidak diunggah.
          </DialogPrimitive.Description>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {step === "frame" || !template ? (
              <FrameStep onChoose={chooseTemplate} />
            ) : step === "shoot" ? (
              <ShootStep
                key={`${facing}-${cameraKey}`}
                template={template}
                shots={shots}
                facing={facing}
                onFacingChange={setFacing}
                onRetryCamera={() => setCameraKey((key) => key + 1)}
                countdownFrom={countdownFrom}
                onCountdownChange={setCountdownFrom}
                retakeIndex={retakeIndex}
                onShot={handleShot}
                onComplete={handleComplete}
                onBack={() => (retakeIndex !== null ? (setRetakeIndex(null), setStep("result")) : restart())}
              />
            ) : (
              <ResultStep
                template={template}
                shots={shots}
                mirror={mirror}
                filterId={filterId}
                onFilterChange={setFilterId}
                onRetake={(index) => {
                  setRetakeIndex(index);
                  setStep("shoot");
                }}
                onChangeFrame={restart}
                onRestart={restart}
              />
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
