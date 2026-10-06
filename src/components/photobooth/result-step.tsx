"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Download, RotateCcw, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import {
  canvasToBlob,
  composeBooth,
  coverRect,
  downloadBlob,
} from "@/lib/photobooth/compose";
import type { BoothTemplate } from "@/lib/photobooth/templates";

/** Preview width in pixels; the exported file is rendered larger. */
const PREVIEW_WIDTH = 720;
const EXPORT_SCALE = 1.5;

function RetakeThumb({
  bitmap,
  mirror,
}: {
  bitmap: ImageBitmap;
  mirror: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const size = 128;
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

interface ResultStepProps {
  template: BoothTemplate;
  shots: (ImageBitmap | null)[];
  mirror: boolean;
  onRetake: (index: number) => void;
  onChangeFrame: () => void;
  onRestart: () => void;
}

/** Step 3: the finished frame — retakes, download and share. */
export function ResultStep({
  template,
  shots,
  mirror,
  onRetake,
  onChangeFrame,
  onRestart,
}: ResultStepProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState<"download" | "share" | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const canShare =
    typeof navigator !== "undefined" &&
    typeof navigator.share === "function" &&
    typeof navigator.canShare === "function";

  // Recompose whenever the frame or photos change (e.g. after a retake).
  useEffect(() => {
    let cancelled = false;
    composeBooth({
      template,
      photos: shots,
      mirror,
      scale: Math.min(1, PREVIEW_WIDTH / template.width),
    })
      .then((canvas) => {
        if (!cancelled) setPreview(canvas.toDataURL("image/jpeg", 0.92));
      })
      .catch(() => {
        if (!cancelled) setMessage("Hasil foto gagal disusun. Coba ulangi sesinya.");
      });
    return () => {
      cancelled = true;
    };
  }, [template, shots, mirror]);

  async function renderBlob() {
    const canvas = await composeBooth({
      template,
      photos: shots,
      mirror,
      scale: EXPORT_SCALE,
    });
    return canvasToBlob(canvas, "image/png");
  }

  const filename = `lorius-photobooth-${new Date().toISOString().slice(0, 10)}.png`;

  async function handleDownload() {
    setBusy("download");
    setMessage(null);
    try {
      downloadBlob(await renderBlob(), filename);
      trackEvent("photobooth_download", { template: template.id });
    } catch {
      setMessage("Gagal menyimpan foto. Coba lagi.");
    } finally {
      setBusy(null);
    }
  }

  async function handleShare() {
    setBusy("share");
    setMessage(null);
    try {
      const file = new File([await renderBlob()], filename, { type: "image/png" });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "Photobooth Lorius" });
        trackEvent("photobooth_share", { template: template.id });
      } else {
        downloadBlob(file, filename);
      }
    } catch (err) {
      // Closing the share sheet throws AbortError — that's not a failure.
      if (!(err instanceof Error && err.name === "AbortError")) {
        setMessage("Gagal membagikan foto. Coba unduh saja.");
      }
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-6 sm:py-10 md:grid-cols-[1fr_1fr] md:items-start">
      <div className="flex items-center justify-center rounded-3xl bg-black/20 p-4 ring-1 ring-white/10 md:sticky md:top-4">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Hasil photobooth kamu"
            className="max-h-[70dvh] w-auto max-w-full rounded-lg object-contain shadow-[0_16px_44px_rgba(0,0,0,0.4)]"
          />
        ) : (
          <div className="grid aspect-[3/4] w-full max-w-xs place-items-center">
            <span className="size-8 animate-pulse rounded-full bg-white/20" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-h2 text-brand-foreground">Hasilmu sudah jadi!</h2>
          <p className="text-body text-brand-foreground/75">
            Ulang foto yang kurang pas, lalu simpan.
          </p>
        </div>

        <section className="flex flex-col gap-2" aria-label="Ulang foto">
          <h3 className="text-caption font-semibold tracking-wider text-brand-foreground/65 uppercase">
            Ulang foto
          </h3>
          <ul className="flex flex-wrap gap-3">
            {shots.map((bitmap, index) =>
              bitmap ? (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => onRetake(index)}
                    aria-label={`Ulang foto ke-${index + 1}`}
                    className="group relative block size-16 overflow-hidden rounded-xl ring-1 ring-white/20 transition hover:ring-brand-cyan focus-visible:ring-2 focus-visible:ring-brand-cyan active:scale-95"
                  >
                    <RetakeThumb bitmap={bitmap} mirror={mirror} />
                    <span className="absolute inset-0 grid place-items-center bg-brand/60 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <RotateCcw className="size-5 text-white" aria-hidden="true" />
                    </span>
                  </button>
                </li>
              ) : null,
            )}
          </ul>
        </section>

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            size="lg"
            disabled={!preview || busy !== null}
            className="bg-brand-cyan text-brand hover:bg-brand-cyan/90"
            onClick={handleDownload}
          >
            <Download aria-hidden="true" />
            {busy === "download" ? "Menyiapkan…" : "Unduh Foto"}
          </Button>
          {canShare ? (
            <Button
              type="button"
              size="lg"
              variant="outline"
              disabled={!preview || busy !== null}
              className="border-white/30 bg-transparent text-brand-foreground hover:bg-white/10 hover:text-brand-foreground"
              onClick={handleShare}
            >
              <Share2 aria-hidden="true" />
              {busy === "share" ? "Menyiapkan…" : "Bagikan"}
            </Button>
          ) : null}
        </div>

        {message ? (
          <p role="alert" className="text-body text-brand-cyan">
            {message}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <button
            type="button"
            onClick={onChangeFrame}
            className="text-brand-foreground/80 underline underline-offset-4 hover:text-brand-cyan"
          >
            Ganti bingkai
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="text-brand-foreground/80 underline underline-offset-4 hover:text-brand-cyan"
          >
            Mulai lagi dari awal
          </button>
        </div>

        <div className="mt-2 flex flex-col gap-3 rounded-2xl bg-white/[0.07] p-5 ring-1 ring-white/10">
          <p className="text-body text-brand-foreground">
            Suka hasilnya? Abadikan momen aslinya bersama Lorius.
          </p>
          <Button
            asChild
            className="w-fit bg-white text-brand hover:bg-white/90"
            onClick={() => trackEvent("click_booking", { source: "photobooth" })}
          >
            <Link href="/booking">Booking Sesi Foto</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
