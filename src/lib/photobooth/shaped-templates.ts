import {
  drawText,
  drawTintedContain,
  seeded,
  slotPath,
  sparkle,
  strokeSlot,
} from "./draw";
import type { BoothTemplate, Slot } from "./templates";

/**
 * Frames whose photo areas are not plain rectangles — circles, arches,
 * hearts, scalloped badges — each with its own palette and a recolored
 * Lorius wordmark.
 */

const ASSETS = {
  logoDark: "/logo/Wordmark.png",
  logoLight: "/logo/Wordmark_bg.png",
} as const;

const TAGLINE = "MOMENTS WORTH KEEPING";

/** A petal: an ellipse whose long axis points away from (cx, cy). */
function petal(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  angle: number,
  dist: number,
  rx: number,
  ry: number,
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.ellipse(dist, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function heart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
) {
  ctx.save();
  ctx.fillStyle = color;
  slotPath(ctx, { x, y, w: size, h: size * 0.92 }, "heart");
  ctx.fill();
  ctx.restore();
}

// ---------------------------------------------------------------------------
// Bunga Taman — one big round photo inside a blooming flower.

const GARDEN_W = 1100;
const GARDEN_H = 1400;
const GARDEN_CENTER = { x: 550, y: 700 };
const GARDEN_SLOT: Slot = { shape: "ellipse", x: 215, y: 365, w: 670, h: 670 };

export const garden: BoothTemplate = {
  id: "garden",
  name: "Bunga Taman",
  blurb: "1 foto bulat di tengah bunga yang sedang mekar.",
  width: GARDEN_W,
  height: GARDEN_H,
  slots: [GARDEN_SLOT],
  slotRadius: 0,
  paper: "#ffe9ef",
  assets: ASSETS,
  drawBackground(ctx) {
    const { x, y } = GARDEN_CENTER;
    const wash = ctx.createLinearGradient(0, 0, 0, GARDEN_H);
    wash.addColorStop(0, "#fff1f5");
    wash.addColorStop(1, "#ffd9e4");
    ctx.fillStyle = wash;
    ctx.fillRect(0, 0, GARDEN_W, GARDEN_H);

    // Leaves in the corners.
    ctx.fillStyle = "#86cf8c";
    for (const [lx, ly, a] of [
      [70, 1330, -0.7],
      [1030, 1330, 0.7 + Math.PI],
      [60, 200, 0.6],
      [1040, 200, Math.PI - 0.6],
    ]) {
      petal(ctx, lx, ly, a, 0, 120, 44);
    }

    // Two layers of petals around the photo.
    const count = 12;
    ctx.fillStyle = "#ff8fb3";
    for (let i = 0; i < count; i++) {
      petal(ctx, x, y, (i / count) * Math.PI * 2, 430, 125, 72);
    }
    ctx.fillStyle = "#ffc2d6";
    for (let i = 0; i < count; i++) {
      petal(ctx, x, y, ((i + 0.5) / count) * Math.PI * 2, 410, 105, 58);
    }
    ctx.fillStyle = "#ffe08a";
    ctx.beginPath();
    ctx.arc(x, y, 372, 0, Math.PI * 2);
    ctx.fill();
  },
  drawForeground(ctx, { assets, family, dateText }) {
    strokeSlot(ctx, GARDEN_SLOT, 0, 18, "#ffffff");

    drawTintedContain(ctx, assets.logoDark, 300, 22, 500, 120, {
      colors: ["#ff5c8a", "#ff8a65"],
    });
    drawText(
      ctx,
      TAGLINE,
      GARDEN_W / 2,
      1318,
      { size: 28, weight: 700, color: "#d6457a", align: "center", tracking: 6 },
      family,
    );
    drawText(
      ctx,
      dateText,
      GARDEN_W / 2,
      1362,
      { size: 24, weight: 500, color: "#a8607c", align: "center" },
      family,
    );
  },
};

// ---------------------------------------------------------------------------
// Pelangi — two arched "windows" under a rainbow.

const RAINBOW_W = 1200;
const RAINBOW_H = 1500;
const RAINBOW_SLOTS: Slot[] = [
  { shape: "arch", x: 110, y: 430, w: 460, h: 700 },
  { shape: "arch", x: 630, y: 430, w: 460, h: 700 },
];
const RAINBOW_BANDS = ["#ff6b6b", "#ffa94d", "#ffe066", "#69db7c", "#4dabf7", "#9775fa"];

function cloud(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  ctx.beginPath();
  for (const [dx, dy, r] of [
    [0, 0, 46],
    [50, -26, 58],
    [112, -4, 48],
    [160, 8, 34],
    [-40, 10, 32],
  ]) {
    ctx.moveTo(x + dx * s + r * s, y + dy * s);
    ctx.arc(x + dx * s, y + dy * s, r * s, 0, Math.PI * 2);
  }
  ctx.fill();
}

export const rainbow: BoothTemplate = {
  id: "rainbow",
  name: "Pelangi",
  blurb: "2 foto jendela lengkung di bawah pelangi.",
  width: RAINBOW_W,
  height: RAINBOW_H,
  slots: RAINBOW_SLOTS,
  slotRadius: 44,
  paper: "#dff2ff",
  assets: ASSETS,
  drawBackground(ctx) {
    const sky = ctx.createLinearGradient(0, 0, 0, RAINBOW_H);
    sky.addColorStop(0, "#c8e9ff");
    sky.addColorStop(1, "#f1f9ff");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, RAINBOW_W, RAINBOW_H);

    // Rainbow: concentric half-rings, outermost red.
    const cx = RAINBOW_W / 2;
    const cy = 700;
    ctx.save();
    ctx.lineWidth = 30;
    RAINBOW_BANDS.forEach((color, i) => {
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.arc(cx, cy, 520 - i * 30, Math.PI, 0);
      ctx.stroke();
    });
    ctx.restore();

    ctx.fillStyle = "rgba(255,255,255,0.95)";
    cloud(ctx, 70, 760, 1.1);
    cloud(ctx, 920, 770, 1.1);
    cloud(ctx, 100, 1290, 1);
    cloud(ctx, 900, 1300, 1);
    cloud(ctx, 520, 1330, 0.7);
  },
  drawForeground(ctx, { assets, family, dateText }) {
    RAINBOW_SLOTS.forEach((slot) => strokeSlot(ctx, slot, 44, 16, "#ffffff"));

    drawTintedContain(ctx, assets.logoDark, 350, 30, 500, 120, {
      colors: ["#4dabf7", "#9775fa", "#ff6b9d"],
    });
    drawText(
      ctx,
      TAGLINE,
      RAINBOW_W / 2,
      1395,
      { size: 28, weight: 700, color: "#5f6fd6", align: "center", tracking: 6 },
      family,
    );
    drawText(
      ctx,
      dateText,
      RAINBOW_W / 2,
      1442,
      { size: 24, weight: 500, color: "#7d8bb3", align: "center" },
      family,
    );
  },
};

// ---------------------------------------------------------------------------
// Love — three heart-shaped photos on a rosy gradient.

const LOVE_W = 1100;
const LOVE_H = 1600;
const LOVE_SLOTS: Slot[] = [
  { shape: "heart", x: 190, y: 250, w: 720, h: 660 },
  { shape: "heart", x: 110, y: 980, w: 440, h: 410 },
  { shape: "heart", x: 550, y: 980, w: 440, h: 410 },
];

export const love: BoothTemplate = {
  id: "love",
  name: "Love Hearts",
  blurb: "3 foto berbentuk hati di latar merah muda.",
  width: LOVE_W,
  height: LOVE_H,
  slots: LOVE_SLOTS,
  slotRadius: 0,
  paper: "#d6336c",
  assets: ASSETS,
  drawBackground(ctx) {
    const rose = ctx.createLinearGradient(0, 0, 0, LOVE_H);
    rose.addColorStop(0, "#ff7eb3");
    rose.addColorStop(0.55, "#e64980");
    rose.addColorStop(1, "#a61e4d");
    ctx.fillStyle = rose;
    ctx.fillRect(0, 0, LOVE_W, LOVE_H);

    const rand = seeded(11);
    for (let i = 0; i < 34; i++) {
      const x = rand() * LOVE_W;
      const y = rand() * LOVE_H;
      const size = 26 + rand() * 54;
      const gold = i % 5 === 0;
      if (y > 230 && y < 1420 && x > 100 && x < 1000) continue;
      heart(ctx, x, y, size, gold ? "rgba(255,224,130,0.8)" : "rgba(255,255,255,0.28)");
    }
  },
  drawForeground(ctx, { assets, family, dateText }) {
    for (const slot of LOVE_SLOTS) strokeSlot(ctx, slot, 0, 14, "#ffffff");

    drawTintedContain(ctx, assets.logoLight, 300, 55, 500, 140, {
      colors: ["#fff3b0", "#ffffff", "#ffd6e7"],
      glow: { color: "rgba(120,10,50,0.55)", blur: 14 },
    });
    drawText(
      ctx,
      TAGLINE,
      LOVE_W / 2,
      1500,
      { size: 28, weight: 700, color: "#ffffff", align: "center", tracking: 6 },
      family,
    );
    drawText(
      ctx,
      dateText,
      LOVE_W / 2,
      1546,
      { size: 24, weight: 500, color: "rgba(255,255,255,0.85)", align: "center" },
      family,
    );
  },
};

// ---------------------------------------------------------------------------
// Bubble — three round photos of different sizes floating in the sea.

const BUBBLE_W = 1100;
const BUBBLE_H = 1600;
const BUBBLE_SLOTS: Slot[] = [
  { shape: "ellipse", x: 80, y: 210, w: 620, h: 620 },
  { shape: "ellipse", x: 680, y: 450, w: 380, h: 380 },
  { shape: "ellipse", x: 230, y: 900, w: 520, h: 520 },
];

export const bubble: BoothTemplate = {
  id: "bubble",
  name: "Bubble Laut",
  blurb: "3 foto bulat berbeda ukuran, melayang seperti gelembung.",
  width: BUBBLE_W,
  height: BUBBLE_H,
  slots: BUBBLE_SLOTS,
  slotRadius: 0,
  paper: "#1098ad",
  assets: ASSETS,
  drawBackground(ctx) {
    const sea = ctx.createLinearGradient(0, 0, 0, BUBBLE_H);
    sea.addColorStop(0, "#8be9fd");
    sea.addColorStop(0.5, "#1fb6cf");
    sea.addColorStop(1, "#0b5f86");
    ctx.fillStyle = sea;
    ctx.fillRect(0, 0, BUBBLE_W, BUBBLE_H);

    const rand = seeded(5);
    for (let i = 0; i < 46; i++) {
      const x = rand() * BUBBLE_W;
      const y = rand() * BUBBLE_H;
      const r = 8 + rand() * 38;
      ctx.save();
      ctx.fillStyle = "rgba(255,255,255,0.14)";
      ctx.strokeStyle = "rgba(255,255,255,0.55)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  },
  drawForeground(ctx, { assets, family, dateText }) {
    for (const slot of BUBBLE_SLOTS) {
      strokeSlot(ctx, slot, 0, 16, "#ffffff");
      // Glossy highlight on the upper-left of each bubble.
      const cx = slot.x + slot.w / 2;
      const cy = slot.y + slot.h / 2;
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineWidth = 12;
      ctx.strokeStyle = "rgba(255,255,255,0.85)";
      ctx.beginPath();
      ctx.arc(cx, cy, slot.w / 2 - 34, Math.PI * 1.08, Math.PI * 1.38);
      ctx.stroke();
      ctx.restore();
    }

    drawTintedContain(ctx, assets.logoLight, 560, 30, 480, 140, {
      colors: ["#fff3a3", "#ffffff", "#9ef0ff"],
      glow: { color: "rgba(0,60,90,0.55)", blur: 14 },
    });
    drawText(
      ctx,
      TAGLINE,
      BUBBLE_W / 2,
      1510,
      { size: 28, weight: 700, color: "#ffffff", align: "center", tracking: 6 },
      family,
    );
    drawText(
      ctx,
      dateText,
      BUBBLE_W / 2,
      1556,
      { size: 24, weight: 500, color: "rgba(255,255,255,0.85)", align: "center" },
      family,
    );
  },
};

// ---------------------------------------------------------------------------
// Daisy — four round photos zig-zagging down a strip, each in a daisy.

const DAISY_W = 900;
const DAISY_H = 2550;
const DAISY_CENTERS: [number, number][] = [
  [330, 420],
  [570, 960],
  [330, 1500],
  [570, 2040],
];
const DAISY_SLOTS: Slot[] = DAISY_CENTERS.map(([cx, cy]) => ({
  shape: "ellipse",
  x: cx - 210,
  y: cy - 210,
  w: 420,
  h: 420,
}));

export const daisy: BoothTemplate = {
  id: "daisy",
  name: "Daisy Strip",
  blurb: "4 foto bulat zig-zag, masing-masing di tengah bunga daisy.",
  width: DAISY_W,
  height: DAISY_H,
  slots: DAISY_SLOTS,
  slotRadius: 0,
  paper: "#d9f6e4",
  assets: ASSETS,
  drawBackground(ctx) {
    const meadow = ctx.createLinearGradient(0, 0, 0, DAISY_H);
    meadow.addColorStop(0, "#e9fbf0");
    meadow.addColorStop(1, "#bdeccf");
    ctx.fillStyle = meadow;
    ctx.fillRect(0, 0, DAISY_W, DAISY_H);

    // Zig-zag stem linking the daisies.
    ctx.save();
    ctx.strokeStyle = "#5cbf7d";
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.beginPath();
    DAISY_CENTERS.forEach(([cx, cy], i) => {
      if (i === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    });
    ctx.stroke();
    ctx.restore();

    const petals = 16;
    DAISY_CENTERS.forEach(([cx, cy]) => {
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < petals; i++) {
        petal(ctx, cx, cy, (i / petals) * Math.PI * 2, 258, 54, 28);
      }
      ctx.fillStyle = "#ffd43b";
      ctx.beginPath();
      ctx.arc(cx, cy, 228, 0, Math.PI * 2);
      ctx.fill();
    });
  },
  drawForeground(ctx, { assets, family, dateText }) {
    for (const slot of DAISY_SLOTS) strokeSlot(ctx, slot, 0, 10, "#ffffff");

    drawTintedContain(ctx, assets.logoDark, 150, 40, 600, 130, {
      colors: ["#2f9e44", "#12b886", "#fab005"],
    });
    drawText(
      ctx,
      TAGLINE,
      DAISY_W / 2,
      2455,
      { size: 28, weight: 700, color: "#2b8a57", align: "center", tracking: 6 },
      family,
    );
    drawText(
      ctx,
      dateText,
      DAISY_W / 2,
      2500,
      { size: 24, weight: 500, color: "#5b9b78", align: "center" },
      family,
    );
  },
};

// ---------------------------------------------------------------------------
// Sunburst — pop-art rays with scalloped badge photos.

const SUN_W = 1100;
const SUN_H = 1600;
const SUN_SLOTS: Slot[] = [
  { shape: "scallop", x: 190, y: 250, w: 720, h: 720 },
  { shape: "scallop", x: 100, y: 1020, w: 430, h: 430 },
  { shape: "scallop", x: 570, y: 1020, w: 430, h: 430 },
];

export const sunburst: BoothTemplate = {
  id: "sunburst",
  name: "Sunburst Pop",
  blurb: "3 foto lencana bergerigi di atas sinar matahari pop-art.",
  width: SUN_W,
  height: SUN_H,
  slots: SUN_SLOTS,
  slotRadius: 0,
  paper: "#ffd43b",
  assets: ASSETS,
  drawBackground(ctx) {
    const cx = SUN_W / 2;
    const cy = 700;
    const rays = 28;
    const far = 1800;
    for (let i = 0; i < rays; i++) {
      const a0 = (i / rays) * Math.PI * 2;
      const a1 = ((i + 1) / rays) * Math.PI * 2;
      ctx.fillStyle = i % 2 === 0 ? "#ffd43b" : "#ffa94d";
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a0) * far, cy + Math.sin(a0) * far);
      ctx.lineTo(cx + Math.cos(a1) * far, cy + Math.sin(a1) * far);
      ctx.closePath();
      ctx.fill();
    }
    const glow = ctx.createRadialGradient(cx, cy, 80, cx, cy, 900);
    glow.addColorStop(0, "rgba(255,255,255,0.55)");
    glow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, SUN_W, SUN_H);

    for (const [x, y, r] of [
      [70, 1530, 22],
      [1030, 1500, 26],
      [1040, 250, 24],
      [60, 270, 20],
    ]) {
      sparkle(ctx, x, y, r, "#ffffff");
    }
  },
  drawForeground(ctx, { assets, family, dateText }) {
    for (const slot of SUN_SLOTS) {
      strokeSlot(ctx, slot, 0, 22, "#ffffff");
      strokeSlot(ctx, slot, 0, 8, "#ff3d81");
    }

    drawTintedContain(ctx, assets.logoDark, 300, 50, 500, 140, {
      colors: ["#ff3d81", "#7048e8", "#1c7ed6"],
    });
    drawText(
      ctx,
      TAGLINE,
      SUN_W / 2,
      1530,
      { size: 28, weight: 700, color: "#5f3dc4", align: "center", tracking: 6 },
      family,
    );
    drawText(
      ctx,
      dateText,
      SUN_W / 2,
      1574,
      { size: 24, weight: 600, color: "#7048e8", align: "center" },
      family,
    );
  },
};
