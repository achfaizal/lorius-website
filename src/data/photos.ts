/**
 * Hero collage photos — from Lorius' own portfolio (`public/photos/gallery/`).
 */
export interface HeroPhoto {
  url: string;
  alt: string;
}

export const HERO_PHOTOS = {
  wedding: {
    url: "/photos/gallery/wedding-13.jpg",
    alt: "Pengantin berkebaya dengan siger berdiri anggun di aula berkubah putih",
  },
  engagement: {
    url: "/photos/gallery/engagement-06.jpg",
    alt: "Perempuan berhijab biru muda dengan latar bunga saat sesi engagement",
  },
  graduation: {
    url: "/photos/gallery/graduation-09.jpg",
    alt: "Wisudawati berselempang di antara bunga ungu",
  },
} satisfies Record<string, HeroPhoto>;
