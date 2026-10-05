import { drawContain, drawText, roundedRectPath } from "./draw";

/**
 * Photobooth frame designs. Each frame is drawn in code (brand colors, the
 * Lorius wordmark, the date) — no PNG overlays to maintain, and the date is
 * filled in when the picture is composed. All coordinates are in the frame's
 * own pixel units; the compositor scales them for preview vs. export.
 */

export interface Slot {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DrawEnv {
  assets: Record<string, HTMLImageElement>;
  /** Canvas font-family string for Poppins (read from the page's CSS). */
  family: string;
  /** e.g. "6 Oktober 2026" */
  dateText: string;
}

export interface BoothTemplate {
  id: string;
  name: string;
  blurb: string;
  width: number;
  height: number;
  slots: Slot[];
  slotRadius: number;
  /** Base paper color, painted first. */
  paper: string;
  /** name -> public path of images the design needs (loaded before drawing). */
  assets: Record<string, string>;
  drawForeground: (ctx: CanvasRenderingContext2D, env: DrawEnv) => void;
}

const TEAL = "#0e363c";
const CYAN = "#27c6d1";
const CREAM = "#f6f1e8";
const ASSETS = {
  logoDark: "/logo/Wordmark.png",
  logoLight: "/logo/Wordmark_bg.png",
} as const;

/** n slots stacked vertically inside a column. */
function stack(
  n: number,
  x: number,
  y: number,
  w: number,
  totalH: number,
  gap: number,
): Slot[] {
  const h = (totalH - gap * (n - 1)) / n;
  return Array.from({ length: n }, (_, i) => ({ x, y: y + i * (h + gap), w, h }));
}

const STRIP_W = 800;
const STRIP_H = 2400;

const strip: BoothTemplate = {
  id: "strip",
  name: "Strip Klasik",
  blurb: "4 foto berurutan, seperti photobooth klasik.",
  width: STRIP_W,
  height: STRIP_H,
  slots: stack(4, 60, 210, 680, 1980, 36),
  slotRadius: 26,
  paper: TEAL,
  assets: ASSETS,
  drawForeground(ctx, { assets, family, dateText }) {
    drawContain(ctx, assets.logoLight, 200, 55, 400, 110);
    drawText(
      ctx,
      "MOMENTS WORTH KEEPING",
      STRIP_W / 2,
      STRIP_H - 118,
      { size: 26, weight: 500, color: CYAN, align: "center", tracking: 5 },
      family,
    );
    drawText(
      ctx,
      dateText,
      STRIP_W / 2,
      STRIP_H - 68,
      { size: 24, weight: 400, color: "rgba(255,255,255,0.72)", align: "center" },
      family,
    );
  },
};

const POLAROID_W = 1000;
const POLAROID_H = 1250;
const POLAROID_SLOT: Slot = { x: 60, y: 60, w: 880, h: 880 };

const polaroid: BoothTemplate = {
  id: "polaroid",
  name: "Polaroid",
  blurb: "1 foto besar dengan bingkai putih.",
  width: POLAROID_W,
  height: POLAROID_H,
  slots: [POLAROID_SLOT],
  slotRadius: 6,
  paper: "#ffffff",
  assets: ASSETS,
  drawForeground(ctx, { assets, family, dateText }) {
    // Hairline around the photo, like the edge of real instant film.
    ctx.save();
    roundedRectPath(ctx, POLAROID_SLOT.x, POLAROID_SLOT.y, POLAROID_SLOT.w, POLAROID_SLOT.h, 6);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#e7ecec";
    ctx.stroke();
    ctx.restore();

    drawContain(ctx, assets.logoDark, 300, 985, 400, 120);
    drawText(
      ctx,
      "MOMENTS WORTH KEEPING",
      POLAROID_W / 2,
      1165,
      { size: 22, weight: 500, color: "#6e6e6e", align: "center", tracking: 5 },
      family,
    );
    drawText(
      ctx,
      dateText,
      POLAROID_W / 2,
      1208,
      { size: 20, weight: 400, color: "#9aa5a6", align: "center" },
      family,
    );
  },
};

const DUO_W = 1080;
const DUO_H = 1180;

const duo: BoothTemplate = {
  id: "duo",
  name: "Kartu Duo",
  blurb: "2 foto potret berdampingan di kartu krem.",
  width: DUO_W,
  height: DUO_H,
  slots: [
    { x: 60, y: 200, w: 450, h: 700 },
    { x: 570, y: 200, w: 450, h: 700 },
  ],
  slotRadius: 28,
  paper: CREAM,
  assets: ASSETS,
  drawForeground(ctx, { assets, family, dateText }) {
    drawContain(ctx, assets.logoDark, 340, 50, 400, 110);
    drawText(
      ctx,
      "MOMENTS WORTH KEEPING",
      DUO_W / 2,
      990,
      { size: 28, weight: 600, color: TEAL, align: "center", tracking: 7 },
      family,
    );
    // Small cyan accent bar between tagline and date.
    ctx.save();
    ctx.fillStyle = CYAN;
    roundedRectPath(ctx, DUO_W / 2 - 40, 1018, 80, 6, 3);
    ctx.fill();
    ctx.restore();
    drawText(
      ctx,
      dateText,
      DUO_W / 2,
      1076,
      { size: 26, weight: 400, color: "#6e6e6e", align: "center" },
      family,
    );
  },
};

export const BOOTH_TEMPLATES: BoothTemplate[] = [strip, polaroid, duo];
