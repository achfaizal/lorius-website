"use client";

import { motion, useReducedMotion } from "framer-motion";

import { GALLERY_CATEGORY_LABEL, type GalleryCategory } from "@/data/gallery";
import { cn } from "@/lib/utils";

export type GalleryFilterValue = GalleryCategory | "all";

interface GalleryFilterProps {
  active: GalleryFilterValue;
  onChange: (value: GalleryFilterValue) => void;
}

const OPTIONS: { value: GalleryFilterValue; label: string }[] = [
  { value: "all", label: "Semua" },
  ...(Object.entries(GALLERY_CATEGORY_LABEL) as [GalleryCategory, string][]).map(
    ([value, label]) => ({ value, label }),
  ),
];

/**
 * Category filter — blueprint §12. A pill-shaped segmented control: the dark
 * "active" pill slides between options (shared `layoutId`). Scrolls sideways
 * on narrow screens.
 */
export function GalleryFilter({ active, onChange }: GalleryFilterProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      role="group"
      aria-label="Filter galeri berdasarkan kategori"
      className="mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full bg-surface-white p-1.5 shadow-[0_8px_24px_rgba(14,54,60,0.08)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {OPTIONS.map((option) => {
        const isActive = option.value === active;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200",
              isActive ? "text-brand-foreground" : "text-brand hover:bg-brand/5",
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="gallery-filter-pill"
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-brand"
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 420, damping: 34 }
                }
              />
            ) : null}
            <span className="relative">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
