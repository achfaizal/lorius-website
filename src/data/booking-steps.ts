export interface BookingStep {
  number: string;
  label: string;
  /** One-line explanation shown when the step is selected on the homepage. */
  description: string;
}

/**
 * Blueprint §15 "Booking Process Section" — this homepage teaser is
 * deliberately a simplified summary, distinct from the real step-by-step
 * flow in `constants/booking.ts::BOOKING_FLOW_STEPS` (don't conflate the
 * two — see that file's doc comment).
 */
export const BOOKING_STEPS: BookingStep[] = [
  {
    number: "01",
    label: "Pilih Layanan & Paket",
    description:
      "Tentukan jenis acaramu, lalu pilih paket yang paling pas dengan kebutuhan dan budgetmu. Semuanya di satu layar.",
  },
  {
    number: "02",
    label: "Pilih Jadwal & Kirim ke WhatsApp",
    description:
      "Pilih tanggal dan jam, isi nama, nomor WhatsApp, dan lokasi, lalu kirim booking ke WhatsApp Lorius. Admin membalas untuk konfirmasi jadwal dan pembayaran.",
  },
];
