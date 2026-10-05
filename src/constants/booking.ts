export type BookingStepId = "paket" | "jadwal";

export interface BookingStepDef {
  id: BookingStepId;
  label: string;
}

/**
 * The actual `/booking` flow: just two screens. 1) service + package,
 * 2) date/time + a short contact form with the send button. The website
 * stores nothing and no payment is taken here — the last screen hands a
 * prefilled summary to WhatsApp, and the admin sorts out the rest (final
 * schedule, transport/extras, payment) with the customer in that chat.
 * Distinct from `src/data/booking-steps.ts`, the homepage teaser (§15) —
 * don't conflate the two.
 */
export const BOOKING_FLOW_STEPS: BookingStepDef[] = [
  { id: "paket", label: "Layanan & Paket" },
  { id: "jadwal", label: "Jadwal & Data" },
];
