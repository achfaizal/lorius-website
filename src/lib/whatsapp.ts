const DEFAULT_COUNTRY_CODE = "62";

/** Normalizes a phone number (leading 0, +62, spaces, dashes...) into the digits-only, country-code-prefixed format wa.me expects. */
function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith(DEFAULT_COUNTRY_CODE)) return digits;
  if (digits.startsWith("0")) return `${DEFAULT_COUNTRY_CODE}${digits.slice(1)}`;
  return digits;
}

/** Builds a `wa.me` link with an optional prefilled message (blueprint §34). */
export function buildWhatsAppUrl(phone: string, message?: string): string {
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${normalizePhone(phone)}${query}`;
}
