import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

/**
 * Booking schedule constants. The website stores no bookings, so there is
 * no real availability to compute: customers request a date and time, and
 * the admin confirms the actual schedule over WhatsApp.
 */

/** Minimum lead time before a date can be requested — blueprint §24 default. */
export const LEAD_TIME_DAYS = 3;

/** Blueprint §24 "Slot" example times. */
export const TIME_SLOTS = [
  "08:00–10:00",
  "10:00–12:00",
  "13:00–15:00",
  "15:00–17:00",
  "17:00–19:00",
] as const;

/** "1 jam kerja" — the fixed shoot length of packages that define one (Graduation). */
export const formatWorkDuration = (hours: number) => `${hours} jam kerja`;

/** "Senin, 12 Januari 2026" for the booking summary and WhatsApp message. */
export function formatBookingDate(date: Date): string {
  return format(date, "EEEE, d MMMM yyyy", { locale: idLocale });
}
