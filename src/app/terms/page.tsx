import type { Metadata } from "next";

import { SiteContainer } from "@/components/layout";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  alternates: { canonical: "/terms" },
  description: `Syarat dan ketentuan booking sesi fotografi bersama ${SITE.name}.`,
};

/**
 * TASK 20 UI/UX audit follow-up (2026-08-28) — `BookingSummary`'s
 * required "Saya telah membaca syarat dan ketentuan booking" checkbox
 * linked nowhere, same class of gap `/privacy-policy` fixed earlier.
 * Content here mirrors the real policies already established elsewhere
 * in the app (`data/faq.ts`'s answers, the booking flow's own DP/lead-
 * time/transport logic) rather than generic boilerplate — keep them in
 * sync if either changes.
 */
export default function TermsPage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col bg-surface">
      <SiteContainer className="flex flex-col gap-8 py-16">
        <div className="flex flex-col gap-2">
          <h1 className="text-h1 text-brand">Syarat & Ketentuan</h1>
          <p className="text-body text-brand-gray">
            Terakhir diperbarui: Agustus 2026.
          </p>
        </div>

        <div className="flex max-w-2xl flex-col gap-8">
          <section className="flex flex-col gap-2">
            <h2 className="text-h3 text-brand">Proses Booking</h2>
            <p className="text-body text-brand-gray">
              Booking dilakukan lewat form singkat di situs ini: pilih layanan
              dan paket, tentukan tanggal & waktu, isi nama, nomor WhatsApp,
              dan lokasi, lalu kirim booking ke WhatsApp {SITE.name}. Situs
              ini tidak menyimpan bookingmu. Jadwal baru dianggap
              terkonfirmasi setelah tim {SITE.name} membalas dan menyetujuinya
              di WhatsApp dan uang muka (DP) diterima — mengirim form saja
              belum mengunci jadwal secara final.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-h3 text-brand">Uang Muka (DP) & Pelunasan</h2>
            <p className="text-body text-brand-gray">
              DP minimal 50% dari total biaya paket, dibayarkan langsung ke
              tim kami (bukan lewat situs) setelah dihubungi. Sisa pembayaran
              dilunasi sebelum atau pada hari sesi berlangsung. Angka DP yang
              muncul di ringkasan booking situs ini adalah estimasi, bukan
              tagihan resmi.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-h3 text-brand">Reschedule & Pembatalan</h2>
            <p className="text-body text-brand-gray">
              Perubahan tanggal (reschedule) dapat diajukan minimal 3 hari
              sebelum tanggal sesi, selama tanggal pengganti masih tersedia —
              hubungi kami via WhatsApp untuk memprosesnya. Untuk sesi
              outdoor yang terkendala cuaca (hujan, dsb.), kami akan
              berkoordinasi untuk reschedule atau memindahkan lokasi ke
              tempat indoor terdekat tanpa biaya tambahan.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-h3 text-brand">Lokasi & Transport</h2>
            <p className="text-body text-brand-gray">
              Sesi dapat dilakukan di Bandung, Jakarta, luar kota, atau
              lokasi custom sesuai kebutuhanmu. Biaya transport untuk area
              Bandung sudah termasuk dalam harga paket; untuk luar Bandung
              dikenakan biaya transport tambahan sesuai jarak, yang akan
              diinformasikan admin saat konfirmasi booking.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-h3 text-brand">Hasil Foto & Revisi</h2>
            <p className="text-body text-brand-gray">
              Hasil foto edit umumnya selesai dalam 7-14 hari kerja,
              tergantung jenis sesi dan paket (opsi Same Day Edit tersedia
              untuk kebutuhan lebih cepat, tanyakan ke admin). Jumlah foto yang diberikan sesuai
              yang tercantum di paket yang dipilih; file mentah (raw file)
              tidak termasuk secara default dan dapat didiskusikan terpisah.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-h3 text-brand">Pertanyaan?</h2>
            <p className="text-body text-brand-gray">
              Hubungi kami di{" "}
              <a href={`mailto:${SITE.email}`} className="text-brand underline">
                {SITE.email}
              </a>{" "}
              jika ada hal yang belum jelas soal syarat dan ketentuan ini.
            </p>
          </section>
        </div>
      </SiteContainer>
    </main>
  );
}
