/** Small canvas helpers shared by the photobooth frame designs. */

export interface TextStyle {
  size: number;
  weight?: number;
  color: string;
  align?: CanvasTextAlign;
  /** Extra space between letters, in canvas units. */
  tracking?: number;
}

export function roundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

/** Draws text with manual letter-spacing (ctx.letterSpacing isn't everywhere). */
export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  style: TextStyle,
  family: string,
) {
  const { size, weight = 400, color, align = "left", tracking = 0 } = style;
  ctx.save();
  ctx.font = `${weight} ${size}px ${family}`;
  ctx.fillStyle = color;
  ctx.textBaseline = "alphabetic";

  if (tracking === 0) {
    ctx.textAlign = align;
    ctx.fillText(text, x, y);
  } else {
    const total =
      ctx.measureText(text).width + tracking * Math.max(text.length - 1, 0);
    let cursor = align === "center" ? x - total / 2 : align === "right" ? x - total : x;
    ctx.textAlign = "left";
    for (const ch of text) {
      ctx.fillText(ch, cursor, y);
      cursor += ctx.measureText(ch).width + tracking;
    }
  }
  ctx.restore();
}

/** Draws an image scaled to fit inside a box, centered in it (never stretched). */
export function drawContain(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  maxW: number,
  maxH: number,
) {
  if (!img.naturalWidth || !img.naturalHeight) return;
  const scale = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight);
  const w = img.naturalWidth * scale;
  const h = img.naturalHeight * scale;
  ctx.drawImage(img, x + (maxW - w) / 2, y + (maxH - h) / 2, w, h);
}

export interface TintOptions {
  /** Left-to-right gradient stops; a single color tints the logo flat. */
  colors: string[];
  /** Optional glow behind the logo (neon look). */
  glow?: { color: string; blur: number };
}

/**
 * Draws the wordmark recolored with a gradient. The logo's own pixels act as
 * a stencil (`source-in`), so its soft edges and transparency are kept.
 */
export function drawTintedContain(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  maxW: number,
  maxH: number,
  { colors, glow }: TintOptions,
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (!iw || !ih) return;

  const stencil = document.createElement("canvas");
  stencil.width = iw;
  stencil.height = ih;
  const sctx = stencil.getContext("2d");
  if (!sctx) return drawContain(ctx, img, x, y, maxW, maxH);

  sctx.drawImage(img, 0, 0);
  sctx.globalCompositeOperation = "source-in";
  if (colors.length === 1) {
    sctx.fillStyle = colors[0];
  } else {
    const gradient = sctx.createLinearGradient(0, 0, iw, 0);
    colors.forEach((color, i) => gradient.addColorStop(i / (colors.length - 1), color));
    sctx.fillStyle = gradient;
  }
  sctx.fillRect(0, 0, iw, ih);

  const scale = Math.min(maxW / iw, maxH / ih);
  const w = iw * scale;
  const h = ih * scale;
  ctx.save();
  if (glow) {
    ctx.shadowColor = glow.color;
    ctx.shadowBlur = glow.blur;
  }
  ctx.drawImage(stencil, x + (maxW - w) / 2, y + (maxH - h) / 2, w, h);
  ctx.restore();
}

/** Small deterministic PRNG so decorative scatter looks identical on every render. */
export function seeded(seed: number) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export type SlotShape = "rect" | "ellipse" | "arch" | "heart" | "scallop";

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Builds the outline of a photo area (used both for clipping and for borders). */
export function slotPath(
  ctx: CanvasRenderingContext2D,
  box: Box,
  shape: SlotShape = "rect",
  radius = 0,
) {
  const { x, y, w, h } = box;
  const cx = x + w / 2;
  const cy = y + h / 2;

  if (shape === "ellipse") {
    ctx.beginPath();
    ctx.ellipse(cx, cy, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.closePath();
  } else if (shape === "arch") {
    const r = w / 2;
    const b = Math.min(radius, r);
    ctx.beginPath();
    ctx.moveTo(x, y + r);
    ctx.arc(cx, y + r, r, Math.PI, 0);
    ctx.lineTo(x + w, y + h - b);
    ctx.arcTo(x + w, y + h, x + w - b, y + h, b);
    ctx.lineTo(x + b, y + h);
    ctx.arcTo(x, y + h, x, y + h - b, b);
    ctx.closePath();
  } else if (shape === "heart") {
    const p = (u: number, v: number): [number, number] => [x + u * w, y + v * h];
    ctx.beginPath();
    ctx.moveTo(...p(0.5, 0.3));
    ctx.bezierCurveTo(...p(0.5, 0.12), ...p(0.38, 0), ...p(0.25, 0));
    ctx.bezierCurveTo(...p(0.1, 0), ...p(0, 0.12), ...p(0, 0.3));
    ctx.bezierCurveTo(...p(0, 0.55), ...p(0.3, 0.75), ...p(0.5, 1));
    ctx.bezierCurveTo(...p(0.7, 0.75), ...p(1, 0.55), ...p(1, 0.3));
    ctx.bezierCurveTo(...p(1, 0.12), ...p(0.9, 0), ...p(0.75, 0));
    ctx.bezierCurveTo(...p(0.62, 0), ...p(0.5, 0.12), ...p(0.5, 0.3));
    ctx.closePath();
  } else if (shape === "scallop") {
    const bumps = 16;
    const steps = 256;
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const k = 0.955 + 0.045 * Math.cos(bumps * t);
      const px = cx + Math.cos(t) * (w / 2) * k;
      const py = cy + Math.sin(t) * (h / 2) * k;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  } else {
    roundedRectPath(ctx, x, y, w, h, radius);
  }
}

export function strokeSlot(
  ctx: CanvasRenderingContext2D,
  slot: Box & { shape?: SlotShape },
  radius: number,
  width: number,
  color: string,
) {
  ctx.save();
  slotPath(ctx, slot, slot.shape, radius);
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.lineJoin = "round";
  ctx.stroke();
  ctx.restore();
}

/** Four-point sparkle, used as a decoration. */
export function sparkle(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  color: string,
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy - r);
  ctx.quadraticCurveTo(cx, cy, cx + r, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy + r);
  ctx.quadraticCurveTo(cx, cy, cx - r, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy - r);
  ctx.fill();
  ctx.restore();
}
