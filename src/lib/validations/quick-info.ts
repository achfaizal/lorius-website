import { z } from "zod";

/** Indonesian mobile numbers: 08xxxxxxxxxx / +628xxxxxxxxxx / 628xxxxxxxxxx. */
const PHONE_REGEX = /^(\+?62|0)8[1-9][0-9]{6,10}$/;

/**
 * The short "Data Singkat" form — the last booking step. Everything else
 * (concept, number of people, extras, transport) is sorted out with the
 * admin over WhatsApp, so only what's needed to start that chat is required.
 */
export const quickInfoSchema = z.object({
  fullName: z.string().trim().min(2, "Nama minimal 2 karakter."),
  whatsapp: z
    .string()
    .trim()
    .transform((value) => value.replace(/[\s-]/g, ""))
    .pipe(
      z
        .string()
        .regex(PHONE_REGEX, "Nomor WhatsApp tidak valid. Contoh: 08123456789"),
    ),
  location: z.string().trim().min(3, "Isi lokasi atau area sesi."),
  notes: z.string().trim().max(500, "Catatan maksimal 500 karakter.").optional(),
});

export type QuickInfoValues = z.infer<typeof quickInfoSchema>;
