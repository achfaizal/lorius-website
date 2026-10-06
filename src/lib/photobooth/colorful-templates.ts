import {
  drawText,
  drawTintedContain,
  roundedRectPath,
  seeded,
  sparkle,
  strokeSlot,
} from "./draw";
import type { BoothTemplate, Slot } from "./templates";

/**
 * Colorful frame designs. Each recolors the Lorius wordmark with its own
 * gradient (the logo's pixels are used as a stencil), so the brand stays
 * recognizable while every frame feels different.
 */

const ASSETS = {
  logoDark: "/logo/Wordmark.png",
  logoLight: "/logo/Wordmark_bg.png",
} as const;

// ---------------------------------------------------------------------------
// Sunset Pop — warm gradient, 2 x 2 grid, logo in a sunset gradient on a white pill.

const SUNSET_W = 1200;
const SUNSET_H = 1650;
const SUNSET_SLOTS: Slot[] = [
  { x: 80, y: 250, w: 500, h: 620 },
  { x: 620, y: 250, w: 500, h: 620 },
  { x: 80, y: 910, w: 500, h: 620 },
  { x: 620, y: 910, w: 500, h: 620 },
];

export const sunset: BoothTemplate = {
  id: "sunset",
  name: "Sunset Pop",
  blurb: "4 foto grid dengan gradasi senja yang hangat.",
  width: SUNSET_W,
  height: SUNSET_H,
  slots: SUNSET_SLOTS,
  slotRadius: 30,
  paper: "#ff4f7b",
  assets: ASSETS,
  drawBackground(ctx) {
    const sky = ctx.createLinearGradient(0, 0, 0, SUNSET_H);
    sky.addColorStop(0, "#ffb037");
    sky.addColorStop(0.45, "#ff4f7b");
    sky.addColorStop(1, "#7c3aed");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, SUNSET_W, SUNSET_H);

    const sun = ctx.createRadialGradient(600, 200, 20, 600, 200, 480);
    sun.addColorStop(0, "rgba(255,236,150,0.85)");
    sun.addColorStop(1, "rgba(255,236,150,0)");
    ctx.fillStyle = sun;
    ctx.fillRect(0, 0, SUNSET_W, 760);

    ctx.fillStyle = "rgba(255,255,255,0.09)";
    for (const [cx, cy, r] of [
      [110, 1580, 160],
      [1120, 1500, 210],
      [1150, 140, 120],
      [60, 120, 90],
    ]) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }
    for (const [cx, cy, r] of [
      [50, 860, 26],
      [1150, 890, 30],
      [320, 40, 20],
      [900, 30, 22],
      [600, 1565, 18],
    ]) {
      sparkle(ctx, cx, cy, r, "rgba(255,255,255,0.9)");
    }
  },
  drawForeground(ctx, { assets, family, dateText }) {
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.96)";
    roundedRectPath(ctx, 300, 60, 600, 150, 75);
    ctx.fill();
    ctx.restore();
    drawTintedContain(ctx, assets.logoDark, 340, 72, 520, 126, {
      colors: ["#ff8a00", "#ff2e7e", "#7c3aed"],
    });

    for (const slot of SUNSET_SLOTS) strokeSlot(ctx, slot, 30, 16, "#ffffff");

    drawText(
      ctx,
      "MOMENTS WORTH KEEPING",
      SUNSET_W / 2,
      1590,
      { size: 28, weight: 600, color: "#ffffff", align: "center", tracking: 7 },
      family,
    );
    drawText(
      ctx,
      dateText,
      SUNSET_W / 2,
      1630,
      { size: 24, weight: 400, color: "rgba(255,255,255,0.85)", align: "center" },
      family,
    );
  },
};

// ---------------------------------------------------------------------------
// Confetti Party — pastel paper, rainbow confetti, 3 stacked photos with colored borders.

const CONFETTI_W = 900;
const CONFETTI_H = 2250;
const CONFETTI_COLORS = ["#ff5e7e", "#ffb400", "#2ecc71", "#22b8f0", "#9b5cf6"];
const CONFETTI_SLOTS: Slot[] = [
  { x: 70, y: 280, w: 760, h: 560 },
  { x: 70, y: 880, w: 760, h: 560 },
  { x: 70, y: 1480, w: 760, h: 560 },
];

export const confetti: BoothTemplate = {
  id: "confetti",
  name: "Confetti Party",
  blurb: "3 foto bersusun dengan confetti warna-warni.",
  width: CONFETTI_W,
  height: CONFETTI_H,
  slots: CONFETTI_SLOTS,
  slotRadius: 36,
  paper: "#fff7ea",
  assets: ASSETS,
  drawBackground(ctx) {
    const rand = seeded(7);
    for (let i = 0; i < 130; i++) {
      const x = rand() * CONFETTI_W;
      const y = rand() * CONFETTI_H;
      const color = CONFETTI_COLORS[Math.floor(rand() * CONFETTI_COLORS.length)];
      const size = 10 + rand() * 22;
      const angle = rand() * Math.PI;
      const kind = Math.floor(rand() * 3);
      // Keep the logo and the footer text clear.
      if ((y < 270 && x > 110 && x < 790) || y > 2080) continue;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      if (kind === 0) {
        ctx.beginPath();
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (kind === 1) {
        ctx.fillRect(-size / 2, -size / 4, size, size / 2);
      } else {
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-size, 0);
        ctx.quadraticCurveTo(-size / 2, -size / 1.5, 0, 0);
        ctx.quadraticCurveTo(size / 2, size / 1.5, size, 0);
        ctx.stroke();
      }
      ctx.restore();
    }
  },
  drawForeground(ctx, { assets, family, dateText }) {
    drawTintedContain(ctx, assets.logoDark, 150, 70, 600, 170, {
      colors: CONFETTI_COLORS,
    });

    const borders = ["#ff5e7e", "#ffb400", "#22b8f0"];
    CONFETTI_SLOTS.forEach((slot, i) => strokeSlot(ctx, slot, 36, 20, borders[i]));

    drawText(
      ctx,
      "MOMENTS WORTH KEEPING",
      CONFETTI_W / 2,
      2150,
      { size: 28, weight: 700, color: "#9b5cf6", align: "center", tracking: 6 },
      family,
    );
    drawText(
      ctx,
      dateText,
      CONFETTI_W / 2,
      2198,
      { size: 24, weight: 500, color: "#8a7f9c", align: "center" },
      family,
    );
  },
};

// ---------------------------------------------------------------------------
// Neon Night — dark purple, retro grid, 1 big + 2 small photos with glowing borders.

const NEON_W = 1080;
const NEON_H = 1560;
const NEON_SLOTS: Slot[] = [
  { x: 70, y: 250, w: 940, h: 640 },
  { x: 70, y: 930, w: 450, h: 450 },
  { x: 560, y: 930, w: 450, h: 450 },
];
const NEONS = ["#27f0ff", "#ff4ff0", "#ffe14a"];

export const neon: BoothTemplate = {
  id: "neon",
  name: "Neon Night",
  blurb: "1 foto besar + 2 foto kecil, bingkai bercahaya neon.",
  width: NEON_W,
  height: NEON_H,
  slots: NEON_SLOTS,
  slotRadius: 26,
  paper: "#120a2b",
  assets: ASSETS,
  drawBackground(ctx) {
    const glow = ctx.createRadialGradient(NEON_W / 2, 760, 40, NEON_W / 2, 760, 900);
    glow.addColorStop(0, "#3d1a7a");
    glow.addColorStop(1, "#120a2b");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, NEON_W, NEON_H);

    ctx.save();
    ctx.strokeStyle = "rgba(39,240,255,0.10)";
    ctx.lineWidth = 2;
    for (let x = 0; x <= NEON_W; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, NEON_H);
      ctx.stroke();
    }
    for (let y = 0; y <= NEON_H; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(NEON_W, y);
      ctx.stroke();
    }
    ctx.restore();

    const rand = seeded(21);
    for (let i = 0; i < 40; i++) {
      const x = rand() * NEON_W;
      const y = rand() * NEON_H;
      const alpha = 0.4 + rand() * 0.5;
      const radius = 2 + rand() * 4;
      if (y > 230 && y < 1400) continue;
      ctx.save();
      ctx.fillStyle = NEONS[i % 3];
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  },
  drawForeground(ctx, { assets, family, dateText }) {
    drawTintedContain(ctx, assets.logoLight, 290, 55, 500, 150, {
      colors: ["#27f0ff", "#ff4ff0", "#ffe14a"],
      glow: { color: "#ff4ff0", blur: 26 },
    });

    NEON_SLOTS.forEach((slot, i) => {
      ctx.save();
      ctx.shadowColor = NEONS[i];
      ctx.shadowBlur = 30;
      strokeSlot(ctx, slot, 26, 10, NEONS[i]);
      ctx.restore();
      strokeSlot(ctx, slot, 26, 3, "rgba(255,255,255,0.9)");
    });

    ctx.save();
    ctx.shadowColor = "#27f0ff";
    ctx.shadowBlur = 18;
    drawText(
      ctx,
      "MOMENTS WORTH KEEPING",
      NEON_W / 2,
      1470,
      { size: 28, weight: 600, color: "#27f0ff", align: "center", tracking: 7 },
      family,
    );
    ctx.restore();
    drawText(
      ctx,
      dateText,
      NEON_W / 2,
      1518,
      { size: 24, weight: 400, color: "rgba(255,255,255,0.7)", align: "center" },
      family,
    );
  },
};
