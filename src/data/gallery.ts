export type GalleryCategory =
  | "engagement"
  | "prewedding"
  | "wedding"
  | "graduation"
  | "event";

export const GALLERY_CATEGORY_LABEL: Record<GalleryCategory, string> = {
  engagement: "Engagement",
  prewedding: "Prewedding",
  wedding: "Wedding",
  graduation: "Graduation",
  event: "Event",
};

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  title: string;
  /** Placeholder photo until a real photo (DB model's `Gallery.imageUrl`, §35) exists. */
  imageUrl: string;
  imageAlt: string;
  /** Drives the card's aspect ratio — gives the grid its "mixed"/asymmetric feel (§44). */
  ratio: "portrait" | "square" | "landscape" | "tall";
}

/**
 * Image URL for an Instagram post of the Lorius account: the local copy at
 * `public/photos/instagram/<code>.jpg` (saved from the public post, so the
 * site never depends on a live Instagram fetch). To add one, save the image
 * under that name and use its code here.
 */
function instagramImage(code: string) {
  return `/photos/instagram/${code}.jpg`;
}

/** Selected portfolio for the homepage gallery section — blueprint §12. */
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "eng-01",
    category: "engagement",
    title: "Janji yang Dijaga",
    imageUrl: "/photos/service-engagement.jpg",
    imageAlt: "Pasangan berbagi momen hangat saat engagement",
    ratio: "portrait",
  },
  {
    id: "eng-02",
    category: "engagement",
    title: "Dua Hati, Satu Arah",
    imageUrl: "/photos/gallery-engagement-02.jpg",
    imageAlt: "Pasangan engagement tersenyum bersama",
    ratio: "square",
  },
  {
    id: "pre-01",
    category: "prewedding",
    title: "Cerita Sebelum Hari Itu",
    imageUrl: "/photos/gallery-prewedding-01.jpg",
    imageAlt: "Fotografer memotret calon pengantin di alam terbuka",
    ratio: "landscape",
  },
  {
    id: "pre-02",
    category: "prewedding",
    title: "Langkah Menuju Selamanya",
    imageUrl: "/photos/gallery-prewedding-02.jpg",
    imageAlt: "Sesi foto prewedding romantis",
    ratio: "tall",
  },
  {
    id: "wed-01",
    category: "wedding",
    title: "Anggun di Hari Bahagia",
    imageUrl: instagramImage("Dd_OGdEoPH3"),
    imageAlt: "Pengantin bergaun putih dengan veil yang tertiup angin",
    ratio: "portrait",
  },
  {
    id: "wed-02",
    category: "wedding",
    title: "Adat yang Dirayakan",
    imageUrl: instagramImage("DcVj7PHoO84"),
    imageAlt: "Pengantin wanita berkebaya tradisional dengan mahkota emas",
    ratio: "portrait",
  },
  {
    id: "gra-01",
    category: "graduation",
    title: "Selempang Kebanggaan",
    imageUrl: instagramImage("DZW0E8wIKCl"),
    imageAlt: "Wisudawati berselempang merah tersenyum di depan gedung",
    ratio: "portrait",
  },
  {
    id: "gra-02",
    category: "graduation",
    title: "Perayaan Kelulusan",
    imageUrl: instagramImage("DTKz3u1iW16"),
    imageAlt: "Potret hitam putih wisudawati berkebaya",
    ratio: "square",
  },
  {
    id: "gra-03",
    category: "graduation",
    title: "Graduation Moment",
    imageUrl: instagramImage("DReLFnlCTs7"),
    imageAlt: "Wisudawati berselempang biru di taman hijau",
    ratio: "portrait",
  },
  {
    id: "gra-04",
    category: "graduation",
    title: "Bunga di Hari Wisuda",
    imageUrl: instagramImage("DRYmXdTCbL5"),
    imageAlt: "Wisudawati berkebaya merah muda di ladang bunga",
    ratio: "portrait",
  },
  {
    id: "gra-05",
    category: "graduation",
    title: "Toga di Kampus",
    imageUrl: instagramImage("DQtazWMCfyd"),
    imageAlt: "Wisudawan bertoga di depan gedung kampus",
    ratio: "portrait",
  },
  {
    id: "gra-06",
    category: "graduation",
    title: "Senyum Sang Lulusan",
    imageUrl: instagramImage("DQphsFvCNQO"),
    imageAlt: "Wisudawati bertoga di area kampus",
    ratio: "portrait",
  },
  {
    id: "evt-01",
    category: "event",
    title: "Tawa yang Terekam",
    imageUrl: "/photos/gallery-event-01.jpg",
    imageAlt: "Confetti beterbangan di tengah perayaan",
    ratio: "square",
  },
  {
    id: "evt-02",
    category: "event",
    title: "Momen Bersama Bermakna",
    imageUrl: "/photos/gallery-event-02.jpg",
    imageAlt: "Suasana meriah sebuah acara",
    ratio: "tall",
  },
];
