"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AtSign, Expand } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { SITE } from "@/constants/site";
import {
  GALLERY_CATEGORY_LABEL,
  GALLERY_ITEMS,
  type GalleryItem,
} from "@/data/gallery";
import { cn } from "@/lib/utils";

import { GalleryFilter, type GalleryFilterValue } from "./gallery-filter";
import { PortfolioLightbox } from "./portfolio-lightbox";

// Mixed aspect ratios give the masonry columns their rhythm.
const RATIO_CLASS: Record<GalleryItem["ratio"], string> = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  tall: "aspect-[3/4]",
};

/**
 * Blueprint §12 "Portfolio / Gallery Section" — a masonry gallery (CSS
 * columns, so photos keep their natural rhythm) with a sliding category
 * filter, staggered entrance, hover/tap reveal of the caption, and a
 * lightbox. On touch screens, where there is no hover, the caption is
 * always visible.
 */
export function PortfolioGrid() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<GalleryFilterValue>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items = useMemo(
    () =>
      filter === "all"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === filter),
    [filter],
  );

  return (
    <div className="flex w-full flex-col gap-10">
      <GalleryFilter
        active={filter}
        onChange={(value) => {
          setFilter(value);
          setActiveIndex(null);
        }}
      />

      {/* Re-keyed per filter so the whole set re-enters with a stagger. */}
      <div
        key={filter}
        // On desktop the column count follows the photo count (max 4) and the
        // block is centered, so a filter with only 2 photos doesn't leave the
        // right half of the page empty.
        style={{ "--cols": Math.min(items.length, 4) } as React.CSSProperties}
        className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:mx-auto lg:[column-count:var(--cols)] lg:[width:calc(var(--cols)*25%)]"
      >
        <AnimatePresence initial={false}>
          {items.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: reduceMotion ? 0 : Math.min(index * 0.05, 0.5),
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => setActiveIndex(index)}
              // No `aria-label` override: the button's own visible content
              // (category + title spans below, plus the image's `alt`)
              // already gives it a meaningful accessible name (TASK 20
              // Lighthouse `label-content-name-mismatch`).
              className={cn(
                "group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-brand/10 sm:mb-4",
                "shadow-[0_8px_24px_rgba(14,54,60,0.08)] transition-shadow duration-300 hover:shadow-[0_18px_44px_rgba(14,54,60,0.22)]",
                RATIO_CLASS[item.ratio],
              )}
            >
              <Image
                src={item.imageUrl}
                alt={item.imageAlt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Category chip, always visible */}
              <span className="absolute top-3 left-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-brand uppercase backdrop-blur-sm">
                {GALLERY_CATEGORY_LABEL[item.category]}
              </span>

              {/* Caption: slides up on hover; always shown on touch screens */}
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-brand/90 via-brand/50 to-transparent px-4 pt-14 pb-4 text-left transition-all duration-300",
                  "[@media(hover:hover)]:translate-y-3 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:translate-y-0 [@media(hover:hover)]:group-focus-visible:opacity-100",
                )}
              >
                <span className="text-sm leading-snug font-semibold text-white">
                  {item.title}
                </span>
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-cyan text-brand"
                >
                  <Expand className="size-4" />
                </span>
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {items.length === 0 ? (
        <p className="text-body text-center text-brand-gray">
          Belum ada foto untuk kategori ini.
        </p>
      ) : null}

      <div className="flex justify-center">
        <Button asChild variant="outline" size="lg">
          <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer">
            <AtSign aria-hidden="true" />
            Lihat Lebih Banyak di {SITE.instagram.handle}
          </a>
        </Button>
      </div>

      <PortfolioLightbox
        items={items}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </div>
  );
}
