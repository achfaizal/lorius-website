/**
 * FAQ — the 10 questions are verbatim from blueprint §17. The answers are
 * drafted to match the policies stated elsewhere in the blueprint (DP 50%
 * in §28, 3-day lead time in §24, location options in §25, Extra Hour /
 * Same Day Edit add-ons in §26) since the blueprint doesn't provide answer
 * copy. Review these against the real Lorius policies before launch.
 *
 * faq-01 was updated after [[lorius-price-list-and-no-payment]]'s pivot —
 * it used to say booking finishes with "menyelesaikan pembayaran DP"
 * on-site, which is no longer true (no payment step; admin follows up
 * manually). Also embedded verbatim in FAQPage JSON-LD (structured-
 * data.ts) so stale policy copy here would leak into search results too.
 */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-01",
    question: "Bagaimana cara booking?",
    answer:
      "Pilih layanan dan paket yang sesuai kebutuhanmu, tentukan tanggal & waktu, isi nama, nomor WhatsApp, dan lokasi, lalu kirim booking ke WhatsApp Lorius (pesannya sudah terisi otomatis). Admin kami akan membalas untuk konfirmasi jadwal, total biaya, dan pembayaran DP.",
  },
  {
    id: "faq-02",
    question: "Berapa DP yang harus dibayar?",
    answer:
      "DP minimal 50% dari total biaya paket. Sisanya bisa dilunasi sebelum atau pada hari sesi berlangsung.",
  },
  {
    id: "faq-03",
    question: "Apakah tanggal dapat di-reschedule?",
    answer:
      "Bisa, selama diajukan minimal 3 hari sebelum tanggal sesi dan tanggal baru masih tersedia. Hubungi tim kami via WhatsApp untuk proses reschedule.",
  },
  {
    id: "faq-04",
    question: "Apakah bisa request lokasi?",
    answer:
      "Tentu. Kamu bisa memilih lokasi di Bandung, Jakarta, luar kota, atau lokasi custom sesuai keinginanmu saat mengisi detail sesi booking.",
  },
  {
    id: "faq-05",
    question: "Berapa lama hasil foto selesai?",
    answer:
      "Umumnya 7-14 hari kerja tergantung jenis sesi dan paket yang dipilih. Untuk kebutuhan lebih cepat, tersedia opsi Same Day Edit — tanyakan ke admin saat booking.",
  },
  {
    id: "faq-06",
    question: "Apakah mendapatkan semua raw file?",
    answer:
      "Kamu akan menerima foto hasil edit sesuai jumlah yang tercantum di paket. Raw file dapat didiskusikan terpisah dan biasanya dikenakan biaya tambahan.",
  },
  {
    id: "faq-07",
    question: "Apakah bisa tambah jam?",
    answer:
      "Bisa, lewat opsi Extra Hour yang bisa kamu tanyakan ke admin saat booking atau langsung di hari sesi (tergantung ketersediaan fotografer).",
  },
  {
    id: "faq-08",
    question: "Bagaimana jika hujan?",
    answer:
      "Untuk sesi outdoor, tim kami akan berkoordinasi denganmu untuk reschedule atau memindahkan lokasi ke tempat indoor terdekat tanpa biaya tambahan.",
  },
  {
    id: "faq-09",
    question: "Apakah tersedia jasa di luar Bandung?",
    answer:
      "Tersedia. Untuk lokasi di luar Bandung akan dikenakan biaya transport tambahan yang disesuaikan dengan jarak lokasi.",
  },
  {
    id: "faq-10",
    question: "Apakah biaya transport sudah termasuk?",
    answer:
      "Biaya transport untuk area Bandung sudah termasuk dalam harga paket. Untuk luar kota, biaya transport dihitung terpisah dan diinformasikan admin saat konfirmasi booking.",
  },
];
