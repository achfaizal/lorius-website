import { Camera, Star } from "lucide-react";

import type { Testimonial } from "@/data/testimonials";
import { cn } from "@/lib/utils";

const initials = (name: string) =>
  name
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

function TestimonialCard({ item }: { item: Testimonial }) {
  const booth = item.sessionType === "Photobooth";

  return (
    <article
      className={cn(
        "relative flex h-auto w-[84vw] max-w-[22rem] mr-5 shrink-0 flex-col gap-4 rounded-3xl p-6 sm:w-[22rem]",
        booth
          ? "bg-brand text-brand-foreground shadow-lg"
          : "border border-border bg-surface-white text-brand shadow-sm",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div
          className="flex items-center gap-0.5"
          role="img"
          aria-label={`${item.rating} dari 5 bintang`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-4",
                i < item.rating
                  ? "fill-brand-cyan text-brand-cyan"
                  : booth
                    ? "text-white/25"
                    : "text-border",
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <span
          className={cn(
            "flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase",
            booth
              ? "bg-brand-cyan text-brand"
              : "bg-surface-soft-teal text-brand",
          )}
        >
          {booth ? <Camera className="size-3" aria-hidden="true" /> : null}
          {item.sessionType}
        </span>
      </div>

      <p className="text-body flex-1">“{item.quote}”</p>

      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
            booth
              ? "bg-brand-cyan text-brand"
              : "bg-brand text-brand-foreground",
          )}
          aria-hidden="true"
        >
          {initials(item.customerName)}
        </span>
        <span className="text-body font-semibold">{item.customerName}</span>
      </div>
    </article>
  );
}

/**
 * Endlessly drifting row of testimonial cards (about three on screen on
 * desktop). The list is rendered twice so the CSS loop is seamless; the
 * copy is `aria-hidden`. Hovering pauses it. Visitors who prefer reduced
 * motion get a normal swipeable row instead.
 */
export function TestimonialMarquee({ items }: { items: Testimonial[] }) {
  return (
    <div
      className="group relative overflow-x-auto [scrollbar-width:none] motion-safe:overflow-hidden [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      aria-label="Testimoni klien"
      role="region"
    >
      <div
        className="animate-marquee flex w-max items-stretch py-2 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${items.length * 8}s` } as React.CSSProperties}
      >
        {items.map((item) => (
          <TestimonialCard key={item.id} item={item} />
        ))}
        <div className="contents motion-reduce:hidden" aria-hidden="true">
          {items.map((item) => (
            <TestimonialCard key={`${item.id}-copy`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
