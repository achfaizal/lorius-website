"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { LoriusMark } from "@/components/brand";
import { HERO_PHOTOS } from "@/data/photos";
import { cn } from "@/lib/utils";

interface CollageSlot {
  label: string;
  photo: { url: string; alt: string };
  position: string;
  delay: number;
  /** Only the largest/first slot should preload — see blueprint §48 LCP target. */
  priority?: boolean;
}

/**
 * Trimmed from the blueprint's 4 hero categories to 3 (wedding/engagement/
 * graduation) for a cleaner, less cluttered composition —
 * documented as a decision in the TASK 03 report. Photos are Unsplash
 * placeholders (src/data/photos.ts) until real Lorius photography exists.
 */
const SLOTS: CollageSlot[] = [
  {
    label: "Wedding",
    photo: HERO_PHOTOS.wedding,
    delay: 0,
    position: "left-0 top-0 h-[76%] w-[70%] rounded-[28px]",
    priority: true,
  },
  {
    label: "Engagement",
    photo: HERO_PHOTOS.engagement,
    delay: 0.15,
    position:
      "bottom-0 right-0 h-[56%] w-[52%] rounded-3xl ring-4 ring-surface",
  },
  {
    label: "Graduation",
    photo: HERO_PHOTOS.graduation,
    delay: 0.3,
    position:
      "right-2 top-0 hidden h-[32%] w-[36%] rounded-2xl ring-4 ring-surface sm:block",
  },
];

/** Blueprint §10 "Hero Visual" — overlapping rounded photo cards + monogram seal. */
export function HeroPhotoCollage() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
      {SLOTS.map((slot) => (
        <div
          key={slot.label}
          style={{ "--delay": `${slot.delay}s` } as React.CSSProperties}
          className={cn(
            "animate-pop absolute overflow-hidden shadow-[0_12px_32px_rgba(14,54,60,0.12)]",
            slot.position,
          )}
        >
          <motion.div
            className="relative h-full w-full"
            animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 5 + slot.delay * 6, repeat: Infinity, ease: "easeInOut", delay: slot.delay }}
          >
            <Image
              src={slot.photo.url}
              alt={slot.photo.alt}
              fill
              sizes="(min-width: 1024px) 30vw, 60vw"
              className="object-cover"
              priority={slot.priority}
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-black/25 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white uppercase backdrop-blur-sm">
              {slot.label}
            </span>
          </motion.div>
        </div>
      ))}

      <div
        style={{ "--delay": "0.45s" } as React.CSSProperties}
        className="animate-pop absolute bottom-[18%] left-[26%] flex size-16 items-center justify-center rounded-full bg-brand shadow-[0_12px_32px_rgba(14,54,60,0.2)]"
      >
        <LoriusMark variant="reverse" size={28} />
      </div>
    </div>
  );
}
