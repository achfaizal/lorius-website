/**
 * Placeholder testimonials — mirrors the `Testimonial` DB model (§35) and
 * uses the example quote from §16, but the rest of the entries (names,
 * quotes) are illustrative copy, NOT real customers. Replace every entry
 * here with real, consented customer testimonials before launch.
 */
export interface Testimonial {
  id: string;
  customerName: string;
  sessionType: string;
  quote: string;
  rating: number;
  featured: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "tst-01",
    customerName: "Dinda & Raka",
    sessionType: "Wedding",
    quote:
      "Hasil fotonya luar biasa. Tim Lorius benar-benar membuat kami nyaman selama sesi dan hasil akhirnya terasa sangat personal.",
    rating: 5,
    featured: true,
  },
  {
    id: "tst-02",
    customerName: "Aisyah & Bimo",
    sessionType: "Prewedding",
    quote:
      "Awalnya canggung di depan kamera, tapi tim Lorius mengarahkan dengan santai jadi hasilnya natural banget. Nggak nyangka bisa senyaman itu.",
    rating: 5,
    featured: true,
  },
  {
    id: "tst-03",
    customerName: "Naila Putri",
    sessionType: "Graduation",
    quote:
      "Momen wisuda jadi terasa lebih berarti. Fotonya rapi, editingnya konsisten, dan prosesnya cepat banget dari booking sampai foto jadi.",
    rating: 5,
    featured: true,
  },
  {
    id: "tst-04",
    customerName: "Clara & Fajar",
    sessionType: "Engagement",
    quote:
      "Sukanya karena semua bisa diatur online, dari pilih paket sampai jadwal. Pas hari-H tinggal datang, semuanya sudah jelas.",
    rating: 5,
    featured: true,
  },
  {
    id: "tst-05",
    customerName: "Tama",
    sessionType: "Event",
    quote:
      "Dokumentasi acara komunitas kami digarap serius meski budgetnya nggak besar. Tim-nya profesional dan hasil fotonya jauh di atas ekspektasi.",
    rating: 4,
    featured: true,
  },
];
