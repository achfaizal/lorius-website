"use client";

import type { QuickInfoValues } from "@/lib/validations/quick-info";

import { QuickInfoStep } from "./quick-info-step";
import { ScheduleStep } from "./schedule-step";

interface ScheduleInfoStepProps {
  date: Date | null;
  slot: string | null;
  durationHours: number | null;
  onDateChange: (date: Date | null) => void;
  onSlotChange: (slot: string | null) => void;
  info: Partial<QuickInfoValues>;
  onInfoChange: (values: Partial<QuickInfoValues>, isValid: boolean) => void;
}

/** Second (last) booking screen: date & time inputs, then the short contact form — one page. */
export function ScheduleInfoStep({
  date,
  slot,
  durationHours,
  onDateChange,
  onSlotChange,
  info,
  onInfoChange,
}: ScheduleInfoStepProps) {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h2 className="text-h3 text-brand">Pilih Tanggal &amp; Jam</h2>
        <ScheduleStep
          date={date}
          slot={slot}
          durationHours={durationHours}
          onDateChange={onDateChange}
          onSlotChange={onSlotChange}
        />
      </section>

      <QuickInfoStep defaultValues={info} onChange={onInfoChange} />
    </div>
  );
}
