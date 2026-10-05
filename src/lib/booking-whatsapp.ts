import { BOOKING_SERVICES } from "@/data/booking-services";
import { PACKAGES } from "@/data/packages";
import { formatRupiah } from "@/lib/format";
import { formatBookingDate } from "@/lib/schedule";
import type { QuickInfoValues } from "@/lib/validations/quick-info";

/** Everything the WhatsApp booking message is built from (all picked in the browser). */
export interface BookingMessageData {
  bookingCode: string;
  serviceSlug: string;
  packageId: string;
  /** YYYY-MM-DD */
  date: string;
  slot: string;
  info: QuickInfoValues;
}

/**
 * Turns a finished booking form into the ready-to-send WhatsApp message for
 * the Lorius admin (opened via a `wa.me` link, so the customer just taps
 * Send). The website itself stores nothing — this message *is* the booking.
 * Uses WhatsApp's own `*bold*` markup, one fact per line, so the admin can
 * read it at a glance.
 */
export function buildBookingWhatsAppMessage(booking: BookingMessageData): string {
  const service = BOOKING_SERVICES.find((s) => s.slug === booking.serviceSlug);
  const pkg = PACKAGES.find((p) => p.id === booking.packageId);
  const { info } = booking;

  // Package breakdown: one bullet per inclusion, straight from the catalog.
  // Plain "-" bullets on purpose, and no emoji anywhere in this message:
  // some WhatsApp clients (notably the Windows desktop app) mangle emoji
  // that arrive through a prefilled-text link and show them as "�".
  const packageLines = pkg
    ? [
        `   - ${pkg.photographerCount} Fotografer`,
        ...pkg.features.map((feature) => `   - ${feature}`),
      ]
    : [];

  // "08:00–10:00" -> "08:00 – 10:00 WIB"
  const time = `${booking.slot.replace("–", " – ")} WIB`;

  const lines = [
    "Halo admin Lorius, saya mau booking jadwal pemotretan.",
    "",
    "*DETAIL BOOKING*",
    `- *Kode Booking:* ${booking.bookingCode}`,
    `- *Nama:* ${info.fullName}`,
    // Same cleanup the form validation applies ("0812-3456 7890" -> "081234567890").
    `- *WhatsApp:* ${info.whatsapp.replace(/[\s-]/g, "")}`,
    "",
    "*RINCIAN LAYANAN*",
    `- *Layanan:* ${service?.name ?? booking.serviceSlug}`,
    `- *Paket:* ${pkg?.name ?? booking.packageId}${pkg ? ` (${formatRupiah(pkg.price)})` : ""}`,
    ...packageLines,
    `- *Tanggal:* ${formatBookingDate(new Date(`${booking.date}T00:00:00`))}`,
    `- *Waktu:* ${time}`,
    `- *Lokasi:* ${info.location}`,
    `- *Catatan Tambahan:* ${info.notes || "-"}`,
    "",
    "Mohon bantuannya untuk konfirmasi ketersediaan jadwal, rincian pembayaran (DP/Lunas), serta instruksi selanjutnya. Terima kasih!",
  ];

  return lines.join("\n");
}
