"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Camera, RefreshCw, Square } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  captureFrame,
  closeCamera,
  describeCameraError,
  hasMultipleCameras,
  openCamera,
  type Facing,
} from "@/lib/photobooth/camera";
import { coverRect } from "@/lib/photobooth/compose";
import type { BoothTemplate, Slot } from "@/lib/photobooth/templates";
import { cn } from "@/lib/utils";

const COUNTDOWN_CHOICES = [3, 5, 10] as const;

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** CSS corner radius that hints at the photo area's outline. */
function guideRadius(shape: Slot["shape"], width: number): string {
  if (shape === "ellipse" || shape === "scallop") return "50%";
  if (shape === "arch") return `${width / 2}px ${width / 2}px 24px 24px`;
  if (shape === "heart") return "38%";
  return "16px";
}

/** Largest box with the given aspect ratio that fits inside `container`. */
function useFittedBox(ratio: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const { clientWidth: cw, clientHeight: ch } = el;
      const maxW = cw * 0.92;
      const maxH = ch * 0.88;
      const w = Math.min(maxW, maxH * ratio);
      setBox({ w, h: w / ratio });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ratio]);

  return { ref, box };
}

function ShotThumb({ bitmap, mirror }: { bitmap: ImageBitmap; mirror: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const size = 120;
    canvas.width = size;
    canvas.height = size;
    const { sx, sy, sw, sh } = coverRect(bitmap.width, bitmap.height, { x: 0, y: 0, w: 1, h: 1 });
    if (mirror) {
      ctx.translate(size, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, size, size);
  }, [bitmap, mirror]);

  return <canvas ref={ref} className="size-full object-cover" />;
}

interface ShootStepProps {
  template: BoothTemplate;
  shots: (ImageBitmap | null)[];
  facing: Facing;
  onFacingChange: (facing: Facing) => void;
  /** Called when the camera must be reopened (retry after an error). */
  onRetryCamera: () => void;
  countdownFrom: number;
  onCountdownChange: (seconds: number) => void;
  /** When set, only that one slot is reshot, then the flow returns to the result. */
  retakeIndex: number | null;
  onShot: (index: number, bitmap: ImageBitmap) => void;
  onComplete: () => void;
  onBack: () => void;
}

/**
 * Step 2: live camera, countdown, auto-advancing shots. Remounted (via a
 * `key` from the parent) whenever the camera must be reopened, so its state
 * always starts clean.
 */
export function ShootStep({
  template,
  shots,
  facing,
  onFacingChange,
  onRetryCamera,
  countdownFrom,
  onCountdownChange,
  retakeIndex,
  onShot,
  onComplete,
  onBack,
}: ShootStepProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const runRef = useRef(0);

  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [canFlip, setCanFlip] = useState(false);
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const mirror = facing === "user";
  const guideSlot = template.slots[activeIndex ?? retakeIndex ?? shots.findIndex((s) => !s)] ?? template.slots[0];
  const { ref: stageRef, box } = useFittedBox(guideSlot.w / guideSlot.h);

  // Camera lifecycle: open on mount, always release on unmount.
  useEffect(() => {
    let cancelled = false;
    let stream: MediaStream | null = null;

    openCamera(facing)
      .then(async (opened) => {
        if (cancelled) {
          closeCamera(opened);
          return;
        }
        stream = opened;
        const video = videoRef.current;
        if (video) {
          video.srcObject = opened;
          try {
            await video.play();
          } catch {
            // Autoplay is allowed for muted inline video; ignore edge cases.
          }
        }
        setReady(true);
      })
      .catch((err: { message?: string }) => {
        if (!cancelled) setError(err?.message ?? describeCameraError("unknown"));
      });

    hasMultipleCameras().then((multiple) => {
      if (!cancelled) setCanFlip(multiple);
    });

    return () => {
      cancelled = true;
      closeCamera(stream);
    };
  }, [facing]);

  // Abort any running sequence when this step goes away.
  useEffect(
    () => () => {
      runRef.current += 1;
    },
    [],
  );

  const stop = useCallback(() => {
    runRef.current += 1;
    setRunning(false);
    setCount(null);
    setActiveIndex(null);
  }, []);

  const start = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !ready) return;

    const myRun = ++runRef.current;
    setRunning(true);

    const targets =
      retakeIndex !== null
        ? [retakeIndex]
        : template.slots.map((_, i) => i).filter((i) => !shots[i]);

    try {
      for (const index of targets) {
        if (runRef.current !== myRun) return;
        setActiveIndex(index);

        for (let n = countdownFrom; n > 0; n--) {
          setCount(n);
          await sleep(1000);
          if (runRef.current !== myRun) return;
        }
        setCount(null);

        const bitmap = await captureFrame(video);
        setFlash(true);
        onShot(index, bitmap);
        setTimeout(() => setFlash(false), 180);

        await sleep(900);
      }
      if (runRef.current === myRun) onComplete();
    } catch {
      if (runRef.current === myRun) setError(describeCameraError("unknown"));
    } finally {
      if (runRef.current === myRun) {
        setRunning(false);
        setCount(null);
        setActiveIndex(null);
      }
    }
  }, [ready, retakeIndex, template.slots, shots, countdownFrom, onShot, onComplete]);

  const filled = shots.filter(Boolean).length;
  const remaining = retakeIndex !== null ? 1 : template.slots.length - filled;

  if (error) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-5 px-6 py-16 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-white/10">
          <Camera className="size-7 text-brand-cyan" aria-hidden="true" />
        </span>
        <p role="alert" className="text-body text-brand-foreground/90">
          {error}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            type="button"
            className="bg-brand-cyan text-brand hover:bg-brand-cyan/90"
            onClick={onRetryCamera}
          >
            Coba Lagi
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-white/30 bg-transparent text-brand-foreground hover:bg-white/10 hover:text-brand-foreground"
            onClick={onBack}
          >
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-5 sm:py-8">
      <div
        ref={stageRef}
        className="relative mx-auto aspect-[3/4] max-h-[62dvh] w-full max-w-md overflow-hidden rounded-3xl bg-black ring-1 ring-white/15 sm:aspect-[4/3] sm:max-w-2xl"
      >
        <video
          ref={videoRef}
          playsInline
          muted
          autoPlay
          className="absolute inset-0 size-full object-cover"
          style={{ transform: mirror ? "scaleX(-1)" : undefined }}
        />

        {/* Framing guide: what falls outside the box is cropped from the final frame. */}
        {ready && box.w > 0 ? (
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div
              style={{ width: box.w, height: box.h, borderRadius: guideRadius(guideSlot.shape, box.w) }}
              className="border-2 border-white/85 shadow-[0_0_0_9999px_rgba(14,54,60,0.55)]"
            />
          </div>
        ) : null}

        {!ready ? (
          <div className="absolute inset-0 grid place-items-center text-brand-foreground/80">
            <span className="text-body">Membuka kamera…</span>
          </div>
        ) : null}

        <AnimatePresence>
          {count !== null ? (
            <motion.div
              key={count}
              initial={{ opacity: 0, scale: 1.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.35 }}
              className="pointer-events-none absolute inset-0 grid place-items-center"
              aria-live="assertive"
            >
              <span className="text-[9rem] leading-none font-bold text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                {count}
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 bg-white transition-opacity duration-200",
            flash ? "opacity-90" : "opacity-0",
          )}
        />

        {running && activeIndex !== null ? (
          <span className="absolute top-3 left-3 rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {retakeIndex !== null
              ? `Foto ulang ke-${activeIndex + 1}`
              : `Foto ${activeIndex + 1} dari ${template.slots.length}`}
          </span>
        ) : null}
      </div>

      {/* Progress: one box per slot of the chosen frame. */}
      <ol className="flex justify-center gap-2" aria-label="Foto yang sudah diambil">
        {template.slots.map((_, i) => (
          <li
            key={i}
            className={cn(
              "size-12 overflow-hidden rounded-xl border-2",
              shots[i] ? "border-transparent" : "border-dashed border-white/30",
              (activeIndex === i || (retakeIndex === i && !running)) && "border-brand-cyan",
            )}
          >
            {shots[i] ? <ShotThumb bitmap={shots[i]!} mirror={mirror} /> : null}
          </li>
        ))}
      </ol>

      <div className="flex flex-col items-center gap-4">
        {!running ? (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div
              role="group"
              aria-label="Hitung mundur"
              className="flex items-center gap-1 rounded-full bg-white/10 p-1"
            >
              {COUNTDOWN_CHOICES.map((seconds) => (
                <button
                  key={seconds}
                  type="button"
                  aria-pressed={countdownFrom === seconds}
                  onClick={() => onCountdownChange(seconds)}
                  className={cn(
                    "min-w-12 rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    countdownFrom === seconds
                      ? "bg-brand-cyan text-brand"
                      : "text-brand-foreground/80 hover:bg-white/10",
                  )}
                >
                  {seconds}d
                </button>
              ))}
            </div>
            {canFlip ? (
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Ganti kamera depan atau belakang"
                className="border-white/30 bg-transparent text-brand-foreground hover:bg-white/10 hover:text-brand-foreground"
                onClick={() => onFacingChange(facing === "user" ? "environment" : "user")}
              >
                <RefreshCw aria-hidden="true" />
              </Button>
            ) : null}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            type="button"
            variant="outline"
            className="border-white/30 bg-transparent text-brand-foreground hover:bg-white/10 hover:text-brand-foreground"
            onClick={() => {
              stop();
              onBack();
            }}
          >
            <ArrowLeft aria-hidden="true" />
            Kembali
          </Button>
          {running ? (
            <Button
              type="button"
              size="lg"
              className="bg-white text-brand hover:bg-white/90"
              onClick={stop}
            >
              <Square aria-hidden="true" className="fill-current" />
              Hentikan
            </Button>
          ) : (
            <Button
              type="button"
              size="lg"
              disabled={!ready || remaining === 0}
              className="bg-brand-cyan text-brand hover:bg-brand-cyan/90"
              onClick={start}
            >
              <Camera aria-hidden="true" />
              {retakeIndex !== null
                ? "Jepret Ulang"
                : filled > 0
                  ? `Lanjutkan (${remaining} foto lagi)`
                  : `Mulai Jepret (${template.slots.length} foto)`}
            </Button>
          )}
        </div>

        <p className="text-caption text-center text-brand-foreground/65">
          {running
            ? "Bersiap, senyum! Foto berikutnya diambil otomatis."
            : "Bidik di dalam kotak. Foto diambil otomatis setelah hitung mundur."}
        </p>
      </div>
    </div>
  );
}
