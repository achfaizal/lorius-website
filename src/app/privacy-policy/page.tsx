import type { Metadata } from "next";

import { SiteContainer } from "@/components/layout";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  alternates: { canonical: "/privacy-policy" },
  description: `Kebijakan privasi ${SITE.name} — data apa yang kami kumpulkan lewat booking dan bagaimana data itu digunakan.`,
};

/**
 * TASK 20 (Production QA) — `customer-form.tsx`'s privacy-policy checkbox
 * links here ("Saya telah membaca dan menyetujui kebijakan privasi"), but
 * no page ever existed at this route (a Lighthouse audit caught the
 * resulting 404 as a prefetch request). Since that checkbox makes a real
 * claim to the customer, this describes what the app *actually* does
 * with their data — not boilerplate legal text — so it stays accurate as
 * the app changes. Update this alongside any change to what's collected
 * or how it's used (the booking flow's WhatsApp hand-off in
 * `booking-flow.tsx` / `booking-whatsapp.ts`, `analytics.ts`).
 */
export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col bg-surface">
      <SiteContainer className="flex flex-col gap-8 py-16">
        <div className="flex flex-col gap-2">
          <h1 className="text-h1 text-brand">Kebijakan Privasi</h1>
          <p className="text-body text-brand-gray">
            Terakhir diperbarui: Oktober 2026.
          </p>
        </div>

        <div className="flex max-w-2xl flex-col gap-8">
          <section className="flex flex-col gap-2">
            <h2 className="text-h3 text-brand">Data apa yang kami kumpulkan?</h2>
            <p className="text-body text-brand-gray">
              Saat kamu mengisi form booking di situs ini, kami mengumpulkan:
              nama lengkap, nomor WhatsApp, email, Instagram (opsional),
              domisili (opsional), serta detail sesi (lokasi, jumlah peserta,
              konsep, catatan tambahan) dan layanan/paket yang kamu pilih.
              Situs ini tidak menyimpan data booking-mu di server atau database
              kami, dan tidak meminta data pembayaran apa pun.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-h3 text-brand">Bagaimana data ini digunakan?</h2>
            <p className="text-body text-brand-gray">
              Setelah kamu menekan tombol kirim di akhir form, situs ini membuka
              WhatsApp dengan pesan yang sudah berisi detail booking-mu, yang
              kamu kirim sendiri ke tim {SITE.name}. Tim kami memakainya untuk
              menghubungimu, mengonfirmasi jadwal, dan mengatur pembayaran.
              Data yang kamu isi hanya ada di browsermu sampai kamu
              mengirimnya.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-h3 text-brand">Pihak ketiga</h2>
            <p className="text-body text-brand-gray">
              Pesan booking dikirim melalui WhatsApp (Meta), yang tunduk pada
              kebijakan privasi mereka sendiri. Kami juga dapat menggunakan Google Analytics
              untuk memahami cara pengunjung menggunakan situs ini secara
              agregat — bukan untuk mengidentifikasi kamu secara personal.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-h3 text-brand">Pertanyaan?</h2>
            <p className="text-body text-brand-gray">
              Hubungi kami di{" "}
              <a href={`mailto:${SITE.email}`} className="text-brand underline">
                {SITE.email}
              </a>{" "}
              jika kamu punya pertanyaan soal data kamu, atau ingin data
              booking-mu dihapus dari catatan kami.
            </p>
          </section>
        </div>
      </SiteContainer>
    </main>
  );
}
