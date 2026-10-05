import Image from "next/image";

import { cn } from "@/lib/utils";

export type LoriusLogoVariant = "primary" | "reverse";

interface LoriusLogoProps {
  /** "primary" = teal wordmark for light backgrounds, "reverse" = white wordmark for dark backgrounds. */
  variant?: LoriusLogoVariant;
  className?: string;
  priority?: boolean;
}

// The Lorius wordmark is a custom handwritten asset — never recreate it
// with a font. Official exports from docs/Lorius_Brand_Guideline_2026.pdf.
const LOGO_SRC: Record<LoriusLogoVariant, string> = {
  primary: "/logo/Logo.png",
  reverse: "/logo/Logo_bg.png",
};

/**
 * Full Lorius wordmark, including the tagline "moments worth keeping".
 * Use in the navbar and footer. For compact placements (favicon, floating
 * button, avatars) use `LoriusMark` instead.
 */
export function LoriusLogo({
  variant = "primary",
  className,
  priority,
}: LoriusLogoProps) {
  return (
    <Image
      src={LOGO_SRC[variant]}
      alt="Lorius — moments worth keeping"
      // The source PNG is 2956×1245 (a print-resolution export from the
      // brand guideline), but this never renders larger than ~85×36px
      // (`h-8`/`sm:h-9` below). Passing the raw intrinsic size here made
      // Next.js generate a 3840w responsive variant for what's really a
      // ~36px-tall logo — ~99.9% wasted bytes, and the #1 Lighthouse
      // "properly size images" finding on this site (TASK 19 audit).
      // 512×216 keeps the exact same aspect ratio with headroom for
      // high-DPI screens, without dragging along print-size payload.
      width={512}
      height={216}
      priority={priority}
      className={cn("h-8 w-auto sm:h-9", className)}
    />
  );
}
