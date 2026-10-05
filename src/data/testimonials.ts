/**
 * Placeholder testimonials — mirrors the `Testimonial` DB model (§35), but
 * the names and quotes are illustrative copy, NOT real customers. Replace
 * every entry here with real, consented customer testimonials before launch.
 */
export interface Testimonial {
  id: string;
  customerName: string;
  /** A photography service, or "Photobooth" for the virtual photobooth. */
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
    customerName: "Rina & Dimas",
    sessionType: "Photobooth",
    quote:
      "Photobooth virtualnya jadi hiburan favorit tamu di resepsi kami. Semua antre pegang HP, nggak ada yang bosan, dan hasilnya langsung dibagikan ke story.",
    rating: 5,
    featured: true,
  },
  {
    id: "tst-05",
    customerName: "Clara & Fajar",
    sessionType: "Engagement",
    quote:
      "Sukanya karena semua bisa diatur online, dari pilih paket sampai jadwal. Pas hari-H tinggal datang, semuanya sudah jelas.",
    rating: 5,
    featured: true,
  },
  {
    id: "tst-06",
    customerName: "Tama",
    sessionType: "Graduation",
    quote:
      "Sesi wisuda kami berjalan lancar dan seru. Fotografernya sabar mengarahkan gaya, dan hasil fotonya jauh di atas ekspektasi.",
    rating: 4,
    featured: true,
  },
  {
    id: "tst-07",
    customerName: "Sari Wulandari",
    sessionType: "Photobooth",
    quote:
      "Pesta ulang tahun anak kami jadi makin meriah. Tamu tinggal scan QR, pilih bingkai, dan semua pulang bawa strip foto sendiri. Praktis banget!",
    rating: 5,
    featured: true,
  },
  {
    id: "tst-08",
    customerName: "Nadia & Reza",
    sessionType: "Prewedding",
    quote:
      "Lokasi dan konsepnya dibantu dari awal, jadi kami tinggal menikmati. Foto prewedding kami terasa hangat dan tidak kaku sama sekali.",
    rating: 5,
    featured: true,
  },
  {
    id: "tst-09",
    customerName: "Bayu & Lestari",
    sessionType: "Wedding",
    quote:
      "Dari akad sampai resepsi, tidak ada momen penting yang terlewat. Keluarga besar kami sampai minta kontak Lorius untuk acara mereka.",
    rating: 5,
    featured: true,
  },
  {
    id: "tst-10",
    customerName: "PT Cipta Karya",
    sessionType: "Photobooth",
    quote:
      "Kami pakai photobooth virtual di gathering kantor. Tanpa alat besar, tanpa operator, tapi suasananya langsung cair. Pesan suara dari tim jadi kenang-kenangan.",
    rating: 5,
    featured: true,
  },
  {
    id: "tst-11",
    customerName: "Tiara & Gilang",
    sessionType: "Engagement",
    quote:
      "Sesi lamaran kami singkat tapi hasilnya manis sekali. Editing warnanya lembut, sesuai banget dengan yang kami bayangkan.",
    rating: 5,
    featured: true,
  },
  {
    id: "tst-12",
    customerName: "Putri Maharani",
    sessionType: "Graduation",
    quote:
      "Foto wisuda bareng keluarga dan sahabat semuanya bagus. Prosesnya cepat, harganya jelas, dan hasilnya langsung bisa dipajang.",
    rating: 5,
    featured: true,
  },
];
