"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Testimonial } from "@/data/testimonials";
import { cn } from "@/lib/utils";

interface TestimonialCarouselProps {
  items: Testimonial[];
}

function getInitials(name: string): string {
  return name
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

/**
 * Blueprint §16 — horizontal, swipeable/scrollable card carousel (native
 * CSS scroll-snap, so it works by touch on mobile and via the arrow
 * buttons everywhere, without a carousel library dependency).
 */
export function TestimonialCarousel({ items }: TestimonialCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-testimonial-card]");
    const amount = (card?.offsetWidth ?? 320) + 16; // card width + gap-4
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-6">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <article
            key={item.id}
            data-testimonial-card
            className="flex w-[82%] shrink-0 snap-start flex-col gap-4 rounded-2xl border border-border bg-surface-white p-6 sm:w-[60%] lg:w-[calc(33.333%-11px)]"
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={cn(
                    "size-4",
                    index < item.rating
                      ? "fill-brand-cyan text-brand-cyan"
                      : "text-border",
                  )}
                  aria-hidden="true"
                />
              ))}
              <span className="sr-only">{item.rating} dari 5 bintang</span>
            </div>

            <p className="text-body flex-1 text-brand">“{item.quote}”</p>

            <div className="flex items-center gap-3">
              <span
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-brand-foreground"
                aria-hidden="true"
              >
                {getInitials(item.customerName)}
              </span>
              <div>
                <p className="text-body font-medium text-brand">
                  {item.customerName}
                </p>
                <p className="text-caption text-brand-gray">
                  {item.sessionType}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => scrollByCard(-1)}
          aria-label="Testimoni sebelumnya"
        >
          <ChevronLeft aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => scrollByCard(1)}
          aria-label="Testimoni berikutnya"
        >
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
