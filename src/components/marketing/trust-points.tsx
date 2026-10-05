import { Camera, HeartHandshake, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { TrustPoint } from "@/data/hero";
import { cn } from "@/lib/utils";

interface TrustPointsProps {
  items: TrustPoint[];
  className?: string;
}

// Icons are mapped here (not stored in the data file) so `TrustPoint` stays
// plain, serializable content — safe to eventually swap for CMS-fetched data.
const ICONS: LucideIcon[] = [Camera, Sparkles, HeartHandshake];

/** Blueprint §10 — three short trust signals under the hero copy. */
export function TrustPoints({ items, className }: TrustPointsProps) {
  return (
    <ul className={cn("flex list-none flex-wrap gap-x-6 gap-y-3", className)}>
      {items.map((item, index) => {
        const Icon = ICONS[index % ICONS.length];
        return (
          <li
            key={item.label}
            className="flex items-center gap-2.5 text-brand"
          >
            <Icon
              className="size-4 shrink-0 text-brand-cyan"
              aria-hidden="true"
            />
            <span className="text-caption font-medium">{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
