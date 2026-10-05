import type { ReactNode } from "react";

import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small uppercase label above the title, e.g. "PHOTOGRAPHY FOR YOUR STORIES". */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** "light" for headings on the dark brand background. */
  tone?: "default" | "light";
  className?: string;
}

/**
 * Consistent section intro: optional eyebrow, heading, and supporting copy.
 * Uses the `text-h2` / `text-body` typography utilities from the design system.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        // text-brand-gray, not text-brand-cyan: the brand cyan fails WCAG
        // AA as text on every light surface this renders on (~2:1, needs
        // 4.5:1) — TASK 20 accessibility pass. Cyan itself is untouched
        // everywhere it's used as a non-text accent (icons, badges, dots).
        <span
          className={cn(
            "text-caption font-semibold uppercase tracking-[0.18em]",
            tone === "light" ? "text-brand-foreground/70" : "text-brand-gray",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "text-section-title",
          tone === "light" ? "text-brand-foreground" : "text-brand",
        )}
      >
        {title}
      </h2>
      {/* Small brand accent: cyan bar + dot. */}
      <span aria-hidden="true" className="flex items-center gap-1.5">
        <span className="h-1 w-10 rounded-full bg-brand-cyan" />
        <span
          className={cn(
            "size-1.5 rounded-full",
            tone === "light" ? "bg-brand-foreground" : "bg-brand",
          )}
        />
      </span>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base sm:text-lg",
            tone === "light" ? "text-brand-foreground/75" : "text-brand-gray",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
