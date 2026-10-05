"use client";

import { useState } from "react";
import { addDays, addYears, format } from "date-fns";
import { Lock } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LEAD_TIME_DAYS,
  TIME_SLOTS,
  formatWorkDuration,
} from "@/lib/schedule";
import { cn } from "@/lib/utils";

interface ScheduleStepProps {
  date: Date | null;
  /** The chosen time block, e.g. "08:00–10:00" (ignored for fixed-duration packages). */
  slot: string | null;
  /** Shoot length in hours when the chosen package fixes it (Graduation); null otherwise. */
  durationHours: number | null;
  onDateChange: (date: Date | null) => void;
  onSlotChange: (slot: string | null) => void;
}

const toInputValue = (date: Date) => format(date, "yyyy-MM-dd");

/**
 * Blueprint §24, simplified to plain fields. Nothing is stored server-side,
 * so there is no real availability to show — any date at least
 * `LEAD_TIME_DAYS` away can be requested and the admin confirms the actual
 * schedule over WhatsApp.
 *
 * Time: packages that fix the shoot length (Graduation: 1 or 3 hours) get
 * that duration filled in automatically and locked — there is no time picker,
 * because graduation hours follow the ceremony and are agreed with the admin
 * over WhatsApp. Other packages pick one of the standard time blocks.
 */
export function ScheduleStep({
  date,
  slot,
  durationHours,
  onDateChange,
  onSlotChange,
}: ScheduleStepProps) {
  // Computed once per mount; `min`/`max` only need day precision.
  const [bounds] = useState(() => {
    const today = new Date();
    return {
      min: toInputValue(addDays(today, LEAD_TIME_DAYS)),
      max: toInputValue(addYears(today, 1)),
    };
  });
  const [dateError, setDateError] = useState<string | null>(null);

  const handleDate = (value: string) => {
    // Typing a date by hand can bypass the picker's min/max, so re-check it.
    if (!value) {
      setDateError(null);
      onDateChange(null);
      return;
    }
    if (value < bounds.min || value > bounds.max) {
      setDateError(
        `Pilih tanggal antara ${format(new Date(`${bounds.min}T00:00:00`), "d MMM yyyy")} dan ${format(new Date(`${bounds.max}T00:00:00`), "d MMM yyyy")}.`,
      );
      onDateChange(null);
      return;
    }
    setDateError(null);
    onDateChange(new Date(`${value}T00:00:00`));
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-white p-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="sessionDate">Tanggal Sesi *</Label>
          <Input
            id="sessionDate"
            type="date"
            min={bounds.min}
            max={bounds.max}
            value={date ? toInputValue(date) : ""}
            onChange={(event) => handleDate(event.target.value)}
            className="h-11"
            suppressHydrationWarning
          />
          {dateError ? (
            <p className="text-caption text-destructive">{dateError}</p>
          ) : null}
        </div>

        {durationHours != null ? (
          <div className="flex flex-col gap-2">
            <Label htmlFor="sessionDuration">Durasi Sesi</Label>
            <div className="relative">
              <Input
                id="sessionDuration"
                value={formatWorkDuration(durationHours)}
                readOnly
                aria-readonly="true"
                className="h-11 cursor-default bg-surface-soft-teal pr-10 font-medium text-brand"
              />
              <Lock
                className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-brand-gray"
                aria-hidden="true"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Label htmlFor="sessionSlot">Jam Sesi *</Label>
            <select
              id="sessionSlot"
              value={slot ?? ""}
              onChange={(event) => onSlotChange(event.target.value || null)}
              className={cn(
                "border-input bg-background h-11 w-full rounded-lg border px-3 text-sm outline-none",
                "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                slot ? "text-brand" : "text-brand-gray",
              )}
            >
              <option value="">Pilih jam</option>
              {TIME_SLOTS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {durationHours != null ? (
        <p
          className="text-body rounded-xl bg-surface-soft-teal px-4 py-3 text-brand"
          data-testid="auto-duration"
        >
          Durasi sudah termasuk di paketmu dan terisi otomatis. Jam mulai
          sesi kamu <strong>konsultasikan dengan admin lewat WhatsApp</strong>,
          menyesuaikan jadwal wisudamu.
        </p>
      ) : null}

      <p className="text-caption text-brand-gray">
        Pilih tanggal{durationHours != null ? "" : " dan jam"} yang kamu
        inginkan (minimal {LEAD_TIME_DAYS} hari dari sekarang). Jadwal finalnya
        dikonfirmasi admin lewat WhatsApp.
      </p>
    </div>
  );
}
