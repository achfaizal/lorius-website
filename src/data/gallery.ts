export type GalleryCategory =
  | "prewedding"
  | "wedding"
  | "graduation"
  | "engagement";

// Same order as the package tabs and booking chips (Prewedding, Wedding,
// Graduation first) — this object's key order drives the filter chips.
export const GALLERY_CATEGORY_LABEL: Record<GalleryCategory, string> = {
  prewedding: "Prewedding",
  wedding: "Wedding",
  graduation: "Graduation",
  engagement: "Engagement",
};

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  imageUrl: string;
  imageAlt: string;
  /** Pixel size of the stored image — gives each masonry card its exact aspect ratio. */
  width: number;
  height: number;
}

const ALT: Record<GalleryCategory, string> = {
  prewedding: "Foto prewedding hasil karya Lorius",
  wedding: "Foto wedding hasil karya Lorius",
  graduation: "Foto graduation hasil karya Lorius",
  engagement: "Foto engagement hasil karya Lorius",
};

/**
 * One portfolio photo. Files live at `public/photos/gallery/<category>-<nn>.jpg`
 * (resized from Lorius' own selected shots, longest side 1500px) — to add one,
 * save it under the next number for its category and add a line below with
 * its pixel size.
 */
function photo(
  category: GalleryCategory,
  number: number,
  width: number,
  height: number,
): GalleryItem {
  const id = `${category}-${String(number).padStart(2, "0")}`;
  return {
    id,
    category,
    imageUrl: `/photos/gallery/${id}.jpg`,
    imageAlt: ALT[category],
    width,
    height,
  };
}

/** Portfolio for the homepage gallery section — blueprint §12. */
export const GALLERY_ITEMS: GalleryItem[] = [
  // --- prewedding (7) ---
  photo("prewedding", 1, 1500, 1000),
  photo("prewedding", 2, 1000, 1500),
  photo("prewedding", 3, 1000, 1500),
  photo("prewedding", 4, 1000, 1500),
  photo("prewedding", 5, 1000, 1500),
  photo("prewedding", 6, 1000, 1500),
  photo("prewedding", 7, 1000, 1500),
  // --- wedding (54) ---
  photo("wedding", 1, 1000, 1500),
  photo("wedding", 2, 1000, 1500),
  photo("wedding", 3, 1000, 1500),
  photo("wedding", 4, 1000, 1500),
  photo("wedding", 5, 1000, 1500),
  photo("wedding", 6, 1000, 1500),
  photo("wedding", 7, 1000, 1500),
  photo("wedding", 8, 1000, 1500),
  photo("wedding", 9, 1000, 1500),
  photo("wedding", 10, 1000, 1500),
  photo("wedding", 11, 1000, 1500),
  photo("wedding", 12, 1000, 1500),
  photo("wedding", 13, 1000, 1500),
  photo("wedding", 14, 1000, 1500),
  photo("wedding", 15, 1000, 1500),
  photo("wedding", 16, 1000, 1500),
  photo("wedding", 17, 1500, 1000),
  photo("wedding", 18, 1500, 1000),
  photo("wedding", 19, 1000, 1500),
  photo("wedding", 20, 1000, 1500),
  photo("wedding", 21, 1000, 1500),
  photo("wedding", 22, 1000, 1500),
  photo("wedding", 23, 1000, 1500),
  photo("wedding", 24, 1000, 1500),
  photo("wedding", 25, 1000, 1500),
  photo("wedding", 26, 1000, 1500),
  photo("wedding", 27, 1000, 1500),
  photo("wedding", 28, 1000, 1500),
  photo("wedding", 29, 1000, 1500),
  photo("wedding", 30, 1000, 1500),
  photo("wedding", 31, 1000, 1500),
  photo("wedding", 32, 1000, 1500),
  photo("wedding", 33, 1000, 1500),
  photo("wedding", 34, 1000, 1500),
  photo("wedding", 35, 1000, 1500),
  photo("wedding", 36, 1000, 1500),
  photo("wedding", 37, 1000, 1500),
  photo("wedding", 38, 1000, 1500),
  photo("wedding", 39, 1000, 1500),
  photo("wedding", 40, 1000, 1500),
  photo("wedding", 41, 1000, 1500),
  photo("wedding", 42, 1000, 1500),
  photo("wedding", 43, 1500, 1000),
  photo("wedding", 44, 1000, 1500),
  photo("wedding", 45, 1000, 1500),
  photo("wedding", 46, 1000, 1500),
  photo("wedding", 47, 1000, 1500),
  photo("wedding", 48, 1000, 1500),
  photo("wedding", 49, 1000, 1500),
  photo("wedding", 50, 1000, 1500),
  photo("wedding", 51, 1000, 1500),
  photo("wedding", 52, 1125, 1500),
  photo("wedding", 53, 1000, 1500),
  photo("wedding", 54, 1000, 1500),
  // --- graduation (12) ---
  photo("graduation", 1, 1000, 1500),
  photo("graduation", 2, 1000, 1500),
  photo("graduation", 3, 1000, 1500),
  photo("graduation", 4, 1000, 1500),
  photo("graduation", 5, 1500, 1000),
  photo("graduation", 6, 1000, 1500),
  photo("graduation", 7, 1000, 1500),
  photo("graduation", 8, 1000, 1500),
  photo("graduation", 9, 1000, 1500),
  photo("graduation", 10, 1000, 1500),
  photo("graduation", 11, 1000, 1500),
  photo("graduation", 12, 1000, 1500),
  // --- engagement (9) ---
  photo("engagement", 1, 1000, 1500),
  photo("engagement", 2, 1000, 1500),
  photo("engagement", 3, 1000, 1500),
  photo("engagement", 4, 1000, 1500),
  photo("engagement", 5, 1000, 1500),
  photo("engagement", 6, 1000, 1500),
  photo("engagement", 7, 1000, 1500),
  photo("engagement", 8, 999, 1500),
  photo("engagement", 9, 1000, 1500),
];
