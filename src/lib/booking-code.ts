import { format } from "date-fns";

// Excludes visually-ambiguous characters (0/O, 1/I) for a code humans need
// to read back over the phone/WhatsApp.
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/**
 * Blueprint §31 "Booking Code" — "LOR-YYYYMMDD-XXXX", unique, non-sequential.
 * The date segment is the booking's *creation* date (like an invoice
 * number), not the photo session date.
 */
export function generateBookingCode(createdAt: Date = new Date()): string {
  const datePart = format(createdAt, "yyyyMMdd");
  let suffix = "";
  for (let i = 0; i < 4; i++) {
    suffix += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return `LOR-${datePart}-${suffix}`;
}
