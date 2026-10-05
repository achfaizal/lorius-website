"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { GALLERY_CATEGORY_LABEL, type GalleryItem } from "@/data/gallery";

interface PortfolioLightboxProps {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/** Blueprint §12 — click-to-open lightbox with keyboard (←/→) navigation. */
export function PortfolioLightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: PortfolioLightboxProps) {
  const open = activeIndex !== null;
  const item = open ? items[activeIndex] : null;

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex - 1 + items.length) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex + 1) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, goPrev, goNext]);

  if (!item) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <DialogContent className="max-w-2xl gap-3 rounded-2xl bg-surface-white p-3 sm:max-w-2xl">
        <DialogTitle className="sr-only">{item.title}</DialogTitle>
        <DialogDescription className="sr-only">
          Foto {GALLERY_CATEGORY_LABEL[item.category]}: {item.title}
        </DialogDescription>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Image
            src={item.imageUrl}
            alt={item.imageAlt}
            fill
            sizes="(min-width: 640px) 640px, 100vw"
            className="object-cover"
            priority
          />

          {items.length > 1 ? (
            <>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={goPrev}
                aria-label="Foto sebelumnya"
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-surface-white/80 hover:bg-surface-white"
              >
                <ChevronLeft aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={goNext}
                aria-label="Foto berikutnya"
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-surface-white/80 hover:bg-surface-white"
              >
                <ChevronRight aria-hidden="true" />
              </Button>
            </>
          ) : null}
        </div>

        <div className="flex items-center justify-between px-1 pb-1">
          <div>
            {/* text-brand-gray, not text-brand-cyan — same WCAG AA text-
                contrast fix as SectionHeading's eyebrow (TASK 20). */}
            <p className="text-caption font-medium text-brand-gray uppercase tracking-wide">
              {GALLERY_CATEGORY_LABEL[item.category]}
            </p>
            <p className="text-body font-medium text-brand">{item.title}</p>
          </div>
          {items.length > 1 ? (
            <p className="text-caption text-brand-gray">
              {(activeIndex ?? 0) + 1} / {items.length}
            </p>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
