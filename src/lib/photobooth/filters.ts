export interface BoothFilter {
  id: string;
  label: string;
  /**
   * One CSS `filter` string, used both for the live preview and for the
   * exported image (`ctx.filter`) — so the download always matches what the
   * visitor saw. "none" means no filter.
   */
  css: string;
}

export const BOOTH_FILTERS: BoothFilter[] = [
  { id: "natural", label: "Natural", css: "none" },
  {
    id: "hangat",
    label: "Hangat",
    css: "sepia(0.18) saturate(1.15) contrast(1.04) brightness(1.02)",
  },
  { id: "bw", label: "Hitam Putih", css: "grayscale(1) contrast(1.12)" },
  {
    id: "film",
    label: "Film",
    css: "contrast(1.1) saturate(0.88) brightness(1.04) sepia(0.12)",
  },
];

export const DEFAULT_FILTER_ID = "natural";

export function filterCssFor(id: string): string {
  return BOOTH_FILTERS.find((f) => f.id === id)?.css ?? "none";
}
