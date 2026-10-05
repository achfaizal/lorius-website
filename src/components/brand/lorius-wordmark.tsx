import Image from "next/image";

import { cn } from "@/lib/utils";

export type LoriusWordmarkVariant = "primary" | "reverse";

interface LoriusWordmarkProps {
  /** "primary" = teal wordmark for light backgrounds, "reverse" = white wordmark for dark backgrounds. */
  variant?: LoriusWordmarkVariant;
  className?: string;
}

// `Wordmark.png`/`Wordmark_bg.png` are `Logo.png`/`Logo_bg.png` (the
// official brand-guideline exports — see `lorius-logo.tsx`) with the
// "moments worth keeping" tagline cropped off, generated once via sharp
// (crop to the top 1050/1245px, then autotrim to content bounds — see
// git history for the exact commands if these ever need regenerating
// from a new guideline export). Only the cursive "lorius." mark remains,
// which is what makes this safe to drop inline into a sentence like
// "...bersama {LoriusWordmark}" — the full LoriusLogo would carry the
// tagline text along with it at a size where it'd actually be legible.
const WORDMARK_SRC: Record<LoriusWordmarkVariant, string> = {
  primary: "/logo/Wordmark.png",
  reverse: "/logo/Wordmark_bg.png",
};

/**
 * The "lorius." cursive mark alone, no tagline — for inline use within
 * running text/headings (e.g. hero copy) in place of the typed word
 * "Lorius". Sized via `em` so it tracks the surrounding text's font-size
 * automatically; for a standalone logo lockup (navbar, footer) use
 * `LoriusLogo` instead, which includes the tagline.
 */
export function LoriusWordmark({
  variant = "primary",
  className,
}: LoriusWordmarkProps) {
  return (
    <Image
      src={WORDMARK_SRC[variant]}
      alt="Lorius"
      width={2599}
      height={872}
      sizes="320px"
      className={cn("inline-block h-[0.85em] w-auto align-middle", className)}
    />
  );
}
