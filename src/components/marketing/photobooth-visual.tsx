"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const RESULT_PHOTO = "/photos/gallery/engagement-06.jpg";
const STRIP_PHOTOS = [
  "/photos/gallery/wedding-13.jpg",
  "/photos/gallery/graduation-09.jpg",
  "/photos/gallery/prewedding-04.jpg",
];

// 0-2 countdown 3/2/1, 3 flash, 4-5 the "developed" photo, then loop.
const PHASES = 6;
const TICK_MS = 900;

function Silhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 260" className={className} aria-hidden="true">
      <circle cx="100" cy="86" r="42" fill="currentColor" />
      <path d="M20 260c0-62 36-102 80-102s80 40 80 102z" fill="currentColor" />
    </svg>
  );
}

/**
 * Looping demo of the booth: a viewfinder with a posing silhouette counts
 * down 3-2-1, flashes, and "develops" a real portfolio photo — beside the
 * strip and polaroid it would print. Decorative only; motion stops entirely
 * for visitors who prefer reduced motion (they see the finished photo).
 */
export function PhotoboothVisual() {
  // Starts on the finished-photo phase so reduced-motion users (and the
  // server render) get a meaningful static picture.
  const [phase, setPhase] = useState(4);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setPhase((p) => (p + 1) % PHASES), TICK_MS);
    return () => clearInterval(id);
  }, []);

  const counting = phase <= 2;
  const showPhoto = phase >= 3;

  return (
    <div className="relative mx-auto h-[30rem] w-full max-w-md" aria-hidden="true">
      {/* Photo strip, floating behind */}
      <div
        className="animate-float absolute top-2 left-0 w-32 rounded-md bg-brand p-1.5 shadow-xl sm:w-36"
        style={{ "--tilt": "-8deg" } as React.CSSProperties}
      >
        <div className="flex flex-col gap-1">
          {STRIP_PHOTOS.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-sm object-cover" />
          ))}
        </div>
      </div>

      {/* Phone showing the booth */}
      <div
        className="animate-float absolute top-0 right-0 w-52 sm:w-60"
        style={{ "--delay": "-2s" } as React.CSSProperties}
      >
        <div className="relative rounded-[2.4rem] bg-neutral-900 p-2 shadow-2xl ring-1 ring-black/40">
          {/* side buttons */}
          <span className="absolute top-20 -left-[3px] h-8 w-[3px] rounded-l bg-neutral-700" />
          <span className="absolute top-32 -left-[3px] h-12 w-[3px] rounded-l bg-neutral-700" />
          <span className="absolute top-28 -right-[3px] h-16 w-[3px] rounded-r bg-neutral-700" />

          <div className="relative aspect-[9/18] overflow-hidden rounded-[2rem] bg-brand">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-cyan/25 via-brand to-brand" />

            {/* Camera view */}
            <div className="absolute inset-x-0 top-9 bottom-24 overflow-hidden">
              <Silhouette
                className={cn(
                  "absolute bottom-0 left-1/2 w-[80%] -translate-x-1/2 text-white/20 transition-all duration-500",
                  counting ? "scale-100 opacity-100" : "scale-95 opacity-0",
                )}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={RESULT_PHOTO}
                alt=""
                className={cn(
                  "absolute inset-0 size-full object-cover transition-all duration-500",
                  showPhoto ? "scale-100 opacity-100" : "scale-105 opacity-0",
                )}
              />
              {["top-3 left-3 border-t-2 border-l-2", "top-3 right-3 border-t-2 border-r-2", "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-b-2 border-r-2"].map((pos) => (
                <span key={pos} className={cn("absolute size-5 rounded-sm border-white/80", pos)} />
              ))}
              {counting ? (
                <span key={phase} className="animate-pop absolute inset-0 grid place-items-center text-7xl font-bold text-white drop-shadow-lg">
                  {3 - phase}
                </span>
              ) : null}
            </div>

            {/* Dynamic island */}
            <span className="absolute top-2.5 left-1/2 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />

            {/* Booth controls */}
            <div className="absolute inset-x-0 bottom-0 flex h-24 flex-col items-center justify-center gap-2">
              <span className="text-[9px] font-semibold tracking-widest text-white/60">PHOTOBOOTH LORIUS</span>
              <span className="grid size-12 place-items-center rounded-full ring-2 ring-white">
                <span className={cn("size-9 rounded-full bg-white transition-transform duration-150", phase === 3 && "scale-75")} />
              </span>
            </div>

            {/* Flash */}
            <span
              className={cn(
                "pointer-events-none absolute inset-0 bg-white transition-opacity",
                phase === 3 ? "opacity-90 duration-75" : "opacity-0 duration-700",
              )}
            />
          </div>
        </div>
      </div>

      {/* Polaroid, floating in front */}
      <div
        className="animate-float absolute bottom-0 left-2 w-36 rounded-md bg-white p-2 pb-7 shadow-xl sm:left-4 sm:w-40"
        style={{ "--tilt": "6deg", "--delay": "-1s" } as React.CSSProperties}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={STRIP_PHOTOS[1]} alt="" loading="lazy" className="aspect-square w-full rounded-sm object-cover" />
      </div>
    </div>
  );
}
