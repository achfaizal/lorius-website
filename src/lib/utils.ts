import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// The brand typography utilities in globals.css (`text-h2`, `text-body`, …)
// are font-size classes, but tailwind-merge doesn't know that and would
// treat them as text *colors* — silently dropping them whenever a real text
// color (e.g. `text-brand`) appears later in the same `cn()` call.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h1",
            "h2",
            "h3",
            "body",
            "caption",
            "section-title",
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
