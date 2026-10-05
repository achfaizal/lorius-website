import { cn } from "@/lib/utils";

/**
 * Soft curved edge at the top of a section, filled with the *previous*
 * section's color so the two blend with a gentle wave instead of a flat cut.
 * Pass the previous section's text-color utility (e.g. "text-surface-white").
 */
export function SectionWave({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 block h-5 w-full fill-current sm:h-8 lg:h-10",
        className,
      )}
    >
      <path d="M0 0H1440V26C1230 50 990 6 720 26C450 46 220 8 0 28Z" />
    </svg>
  );
}
