"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  quickInfoSchema,
  type QuickInfoValues,
} from "@/lib/validations/quick-info";

interface QuickInfoStepProps {
  defaultValues?: Partial<QuickInfoValues>;
  onChange: (values: Partial<QuickInfoValues>, isValid: boolean) => void;
}

/** Last booking step: just enough to start the WhatsApp chat with the admin. */
export function QuickInfoStep({ defaultValues, onChange }: QuickInfoStepProps) {
  const { register, watch, formState } = useForm<QuickInfoValues>({
    resolver: zodResolver(quickInfoSchema),
    mode: "onChange",
    defaultValues: {
      fullName: defaultValues?.fullName ?? "",
      whatsapp: defaultValues?.whatsapp ?? "",
      location: defaultValues?.location ?? "",
      notes: defaultValues?.notes ?? "",
    },
  });

  // Report values up via a watch subscription, and compute validity straight
  // from the schema (`formState.isValid` lags one update behind because the
  // resolver validates asynchronously).
  useEffect(() => {
    const subscription = watch((values) => {
      onChange(values, quickInfoSchema.safeParse(values).success);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  const { errors } = formState;

  return (
    <form
      className="flex flex-col gap-5 rounded-2xl border border-border bg-surface-white p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-h3 text-brand">Data Singkat</h2>
        <p className="text-body text-brand-gray">
          Cukup ini saja — detail lainnya kamu bahas langsung dengan admin di
          WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="fullName">Nama Lengkap *</Label>
          <Input
            id="fullName"
            autoComplete="name"
            placeholder="Nama kamu"
            className="h-11"
            {...register("fullName")}
          />
          {errors.fullName ? (
            <p className="text-caption text-destructive">{errors.fullName.message}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="whatsapp">Nomor WhatsApp *</Label>
          <Input
            id="whatsapp"
            type="tel"
            autoComplete="tel"
            placeholder="08123456789"
            className="h-11"
            {...register("whatsapp")}
          />
          {errors.whatsapp ? (
            <p className="text-caption text-destructive">{errors.whatsapp.message}</p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="location">Lokasi / Area Sesi *</Label>
        <Input
          id="location"
          placeholder="Contoh: Gedung Sate, Bandung"
          className="h-11"
          {...register("location")}
        />
        {errors.location ? (
          <p className="text-caption text-destructive">{errors.location.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="notes">Catatan (opsional)</Label>
        <Textarea
          id="notes"
          rows={3}
          placeholder="Konsep, jumlah orang, tambahan yang dibutuhkan, atau hal lain"
          {...register("notes")}
        />
        {errors.notes ? (
          <p className="text-caption text-destructive">{errors.notes.message}</p>
        ) : null}
      </div>

      <p className="text-caption text-brand-gray">
        Dengan mengirim booking, kamu menyetujui{" "}
        <Link href="/terms" className="underline hover:text-brand-cyan">
          syarat dan ketentuan
        </Link>{" "}
        serta{" "}
        <Link href="/privacy-policy" className="underline hover:text-brand-cyan">
          kebijakan privasi
        </Link>{" "}
        Lorius.
      </p>
    </form>
  );
}
