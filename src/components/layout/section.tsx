import { SectionWave } from "@/components/ornaments/section-wave";
import { cn } from "@/lib/utils";

import { SiteContainer } from "./site-container";

export type SectionBackground =
  | "white"
  | "surface"
  | "soft-teal"
  | "cream"
  | "brand";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Section background tint. Defaults to the base off-white surface. */
  background?: SectionBackground;
  /** Wrap children in `SiteContainer`. Disable when a section needs full-bleed content (e.g. edge-to-edge photography). */
  container?: boolean;
  /** Background of the section above — renders a soft wave edge in that color. */
  waveFrom?: SectionBackground;
}

const WAVE_CLASS: Record<SectionBackground, string> = {
  white: "text-surface-white",
  surface: "text-surface",
  "soft-teal": "text-surface-soft-teal",
  cream: "text-surface-cream",
  brand: "text-brand",
};

const BACKGROUND_CLASS: Record<SectionBackground, string> = {
  white: "bg-surface-white text-foreground",
  surface: "bg-surface text-foreground",
  "soft-teal": "bg-surface-soft-teal text-foreground",
  cream: "bg-surface-cream text-foreground",
  brand: "bg-brand text-brand-foreground",
};

/**
 * Generic `<section>` wrapper carrying consistent vertical rhythm and
 * background tinting. Composition point for every landing-page section.
 */
export function Section({
  background = "surface",
  container = true,
  waveFrom,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-x-clip py-16 sm:py-20 lg:py-24",
        BACKGROUND_CLASS[background],
        className,
      )}
      {...props}
    >
      {waveFrom ? <SectionWave className={WAVE_CLASS[waveFrom]} /> : null}
      {container ? <SiteContainer className="relative z-10">{children}</SiteContainer> : children}
    </section>
  );
}
