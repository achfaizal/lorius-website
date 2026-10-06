import { slotPath } from "./draw";
import type { BoothTemplate, Slot } from "./templates";

/**
 * Compositing engine. Raw camera frames are kept at sensor size; crop and
 * text are computed here, at compose time, and rendering costs nothing on a
 * server (there is none).
 *
 * Paint order: paper → frame background → photos → frame foreground (borders, logo, text).
 */

export type PhotoSource = ImageBitmap | HTMLImageElement;

const sizeOf = (src: PhotoSource) =>
  src instanceof HTMLImageElement
    ? { w: src.naturalWidth, h: src.naturalHeight }
    : { w: src.width, h: src.height };

/** Center-crop rectangle so a source covers a slot without distortion. */
export function coverRect(srcW: number, srcH: number, slot: Slot) {
  const slotAspect = slot.w / slot.h;
  const srcAspect = srcW / srcH;
  if (srcAspect > slotAspect) {
    const sh = srcH;
    const sw = sh * slotAspect;
    return { sx: (srcW - sw) / 2, sy: 0, sw, sh };
  }
  const sw = srcW;
  const sh = sw / slotAspect;
  return { sx: 0, sy: (srcH - sh) / 2, sw, sh };
}

const imageCache = new Map<string, Promise<HTMLImageElement>>();

export function loadImage(src: string): Promise<HTMLImageElement> {
  let cached = imageCache.get(src);
  if (!cached) {
    cached = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => {
        imageCache.delete(src);
        reject(new Error(`Gambar tidak bisa dimuat: ${src}`));
      };
      img.src = src;
    });
    imageCache.set(src, cached);
  }
  return cached;
}

/** The page's Poppins family string (next/font exposes it as --font-sans). */
function canvasFontFamily(): string {
  if (typeof window === "undefined") return "sans-serif";
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-sans")
    .trim();
  return value ? `${value}, sans-serif` : "sans-serif";
}

export function formatBoothDate(date = new Date()): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export interface ComposeInput {
  template: BoothTemplate;
  /** One per slot; null/undefined slots are drawn as empty placeholders. */
  photos: (PhotoSource | null | undefined)[];
  /** True for the front camera: photos are flipped so they match the preview. */
  mirror: boolean;
  /** 1 = the template's own pixel size. Use ~0.3–0.5 for previews. */
  scale?: number;
  dateText?: string;
}

export async function composeBooth({
  template,
  photos,
  mirror,
  scale = 1,
  dateText = formatBoothDate(),
}: ComposeInput): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(template.width * scale);
  canvas.height = Math.round(template.height * scale);

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D tidak tersedia di perangkat ini.");

  // Fonts and design images first, so text/logo are never drawn too early.
  if (typeof document !== "undefined" && document.fonts?.ready) {
    await document.fonts.ready;
  }
  const assets: Record<string, HTMLImageElement> = {};
  await Promise.all(
    Object.entries(template.assets).map(async ([name, src]) => {
      try {
        assets[name] = await loadImage(src);
      } catch {
        // A missing logo must never cost the visitor their photo.
      }
    }),
  );

  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const env = { assets, family: canvasFontFamily(), dateText };

  ctx.fillStyle = template.paper;
  ctx.fillRect(0, 0, template.width, template.height);
  template.drawBackground?.(ctx, env);

  template.slots.forEach((slot, index) => {
    const photo = photos[index];
    ctx.save();
    slotPath(ctx, slot, slot.shape, template.slotRadius);
    ctx.clip();

    if (!photo) {
      ctx.fillStyle = "rgba(255,255,255,0.14)";
      ctx.fillRect(slot.x, slot.y, slot.w, slot.h);
    } else {
      const { w, h } = sizeOf(photo);
      const { sx, sy, sw, sh } = coverRect(w, h, slot);
      if (mirror) {
        ctx.translate(slot.x + slot.w, slot.y);
        ctx.scale(-1, 1);
        ctx.drawImage(photo, sx, sy, sw, sh, 0, 0, slot.w, slot.h);
      } else {
        ctx.drawImage(photo, sx, sy, sw, sh, slot.x, slot.y, slot.w, slot.h);
      }
    }
    ctx.restore();
  });

  template.drawForeground(ctx, env);
  return canvas;
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type = "image/png",
  quality = 0.95,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Ekspor gagal."))),
      type,
      quality,
    );
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
