"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  GALLERY_CATEGORY_LABEL,
  GALLERY_ITEMS,
  type GalleryCategory,
  type GalleryItem,
} from "@/data/gallery";
import { cn } from "@/lib/utils";

import { GalleryFilter, type GalleryFilterValue } from "./gallery-filter";
import { PortfolioLightbox } from "./portfolio-lightbox";

/** Photos revealed at first, and each time "Tampilkan lebih banyak" is pressed. */
const PAGE_SIZE = 12;

const CATEGORY_ORDER = Object.keys(GALLERY_CATEGORY_LABEL) as GalleryCategory[];

/**
 * "Semua" view: take one photo from each category in turn, so the first page
 * is a mix of all four services instead of 12 photos of whichever category
 * has the most (Wedding has far more than the rest).
 */
function interleave(items: GalleryItem[]): GalleryItem[] {
  const queues = CATEGORY_ORDER.map((c) => items.filter((i) => i.category === c));
  const out: GalleryItem[] = [];
  const longest = Math.max(...queues.map((q) => q.length));
  for (let i = 0; i < longest; i++) {
    for (const q of queues) if (q[i]) out.push(q[i]);
  }
  return out;
}

/**
 * Blueprint §12 "Portfolio / Gallery Section" — a masonry gallery (CSS
 * columns, each card sized to its photo's real aspect ratio) with a sliding
 * category filter, staggered entrance, hover/tap reveal, "show more" paging
 * and a lightbox. On touch screens, where there is no hover, the caption is
 * always visible.
 */
export function PortfolioGrid() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<GalleryFilterValue>("all");
  // Paging is remembered per filter; switching filter starts at one page again.
  const [paging, setPaging] = useState<{ filter: GalleryFilterValue; count: number }>({
    filter: "all",
    count: PAGE_SIZE,
  });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items = useMemo(
    () =>
      filter === "all"
        ? interleave(GALLERY_ITEMS)
        : GALLERY_ITEMS.filter((item) => item.category === filter),
    [filter],
  );

  const shown = paging.filter === filter ? paging.count : PAGE_SIZE;
  const visible = items.slice(0, shown);
  const remaining = items.length - visible.length;

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
        style={{ "--cols": Math.min(visible.length, 4) } as React.CSSProperties}
        className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:mx-auto lg:[column-count:var(--cols)] lg:[width:calc(var(--cols)*25%)]"
      >
        {visible.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              // Stagger within the batch that just appeared.
              delay: reduceMotion ? 0 : Math.min((index % PAGE_SIZE) * 0.05, 0.5),
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => setActiveIndex(index)}
            // No `aria-label` override: the button's own visible content
            // (category chip + the image's `alt`) already gives it a
            // meaningful accessible name (TASK 20 Lighthouse
            // `label-content-name-mismatch`).
            style={{ aspectRatio: `${item.width} / ${item.height}` }}
            className={cn(
              "group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-brand/10 sm:mb-4",
              "shadow-[0_8px_24px_rgba(14,54,60,0.08)] transition-shadow duration-300 hover:shadow-[0_18px_44px_rgba(14,54,60,0.22)]",
            )}
          >
            <Image
              src={item.imageUrl}
              alt={item.imageAlt}
              fill
              // First page eager-ish via browser lazy defaults; later pages lazy.
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Category chip, always visible */}
            <span className="absolute top-3 left-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-brand uppercase backdrop-blur-sm">
              {GALLERY_CATEGORY_LABEL[item.category]}
            </span>

            {/* Hover/tap affordance: appears on hover, always shown on touch screens */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-0 bottom-0 flex items-end justify-end bg-gradient-to-t from-brand/70 via-brand/20 to-transparent px-4 pt-14 pb-4 transition-all duration-300",
                "[@media(hover:hover)]:translate-y-3 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:translate-y-0 [@media(hover:hover)]:group-focus-visible:opacity-100",
              )}
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-brand-cyan text-brand">
                <Expand className="size-4" />
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="text-body text-center text-brand-gray">
          Belum ada foto untuk kategori ini.
        </p>
      ) : null}

      {remaining > 0 ? (
        <div className="flex justify-center">
          <Button
            type="button"
            size="lg"
            onClick={() =>
              setPaging({ filter, count: Math.min(shown + PAGE_SIZE, items.length) })
            }
          >
            Tampilkan Lebih Banyak
          </Button>
        </div>
      ) : null}

      <PortfolioLightbox
        items={items}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </div>
  );
}
