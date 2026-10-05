"use client";

import { useState } from "react";
import { addDays, addYears, format } from "date-fns";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LEAD_TIME_DAYS, TIME_SLOTS } from "@/lib/schedule";
import { cn } from "@/lib/utils";

interface ScheduleStepProps {
  date: Date | null;
  slot: string | null;
  onDateChange: (date: Date | null) => void;
  onSlotChange: (slot: string | null) => void;
}

const toInputValue = (date: Date) => format(date, "yyyy-MM-dd");

/**
 * Blueprint §24, simplified to two plain fields: a date input and a time
 * dropdown. Nothing is stored server-side, so there is no real availability
 * to show — any date at least `LEAD_TIME_DAYS` away can be requested and the
 * admin confirms the actual schedule over WhatsApp.
 */
export function ScheduleStep({
  date,
  slot,
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
      </div>

      <p className="text-caption text-brand-gray">
        Pilih tanggal dan jam yang kamu inginkan (minimal {LEAD_TIME_DAYS} hari
        dari sekarang). Jadwal finalnya dikonfirmasi admin lewat WhatsApp.
      </p>
    </div>
  );
}
