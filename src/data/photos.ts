/**
 * Hero collage photos — placeholder stock photography vendored locally in
 * `public/photos/` (originally Unsplash, free Unsplash License) until real
 * Lorius photos replace them. See public/photos/README.md.
 */
export interface HeroPhoto {
  url: string;
  alt: string;
}

export const HERO_PHOTOS = {
  wedding: {
    url: "/photos/gallery-wedding-01.jpg",
    alt: "Pasangan pengantin memegang buket bunga saat golden hour",
  },
  prewedding: {
    url: "/photos/gallery-prewedding-01.jpg",
    alt: "Fotografer memotret calon pengantin di alam terbuka",
  },
  event: {
    url: "/photos/gallery-event-01.jpg",
    alt: "Confetti beterbangan di tengah perayaan",
  },
} satisfies Record<string, HeroPhoto>;
