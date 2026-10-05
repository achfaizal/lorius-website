import Image from "next/image";

import { cn } from "@/lib/utils";

export type LoriusMarkVariant = "primary" | "reverse";

interface LoriusMarkProps {
  /** "primary" = teal monogram for light backgrounds, "reverse" = white monogram for dark backgrounds. */
  variant?: LoriusMarkVariant;
  size?: number;
  className?: string;
  priority?: boolean;
}

// Official exports from docs/Lorius_Brand_Guideline_2026.pdf.
const MARK_SRC: Record<LoriusMarkVariant, string> = {
  primary: "/logo/Icon.png",
  reverse: "/logo/Icon2.png",
};

/**
 * Compact "l." monogram. Use for the favicon, the floating action button,
 * social avatars, and any other tight space where the full wordmark won't fit.
 */
export function LoriusMark({
  variant = "primary",
  size = 40,
  className,
  priority,
}: LoriusMarkProps) {
  return (
    <Image
      src={MARK_SRC[variant]}
      alt="Lorius"
      width={size}
      height={size}
      priority={priority}
      className={cn("h-auto w-auto", className)}
    />
  );
}
