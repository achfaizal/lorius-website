"use client";

import { useEffect, useRef } from "react";
import { Check } from "lucide-react";

import { BOOKING_FLOW_STEPS } from "@/constants/booking";
import { cn } from "@/lib/utils";

interface BookingStepperProps {
  currentIndex: number;
  onStepClick: (index: number) => void;
}

/**
 * Blueprint §21 booking stepper. Horizontal on all breakpoints — scrollable
 * on mobile ("stepper horizontal scroll" per spec) rather than the vertical
 * stack used by the homepage's teaser (§15's `BookingStepsSection`), since
 * this one is the real flow, not a marketing preview.
 */
export function BookingStepper({
  currentIndex,
  onStepClick,
}: BookingStepperProps) {
  const listRef = useRef<HTMLOListElement>(null);

  // On narrow screens the list scrolls sideways — keep the active step
  // visible (e.g. when a deep link starts the flow at step 2 or 3).
  useEffect(() => {
    const list = listRef.current;
    const current = list?.querySelector<HTMLElement>('[aria-current="step"]');
    if (!list || !current) return;
    list.scrollTo({ left: current.offsetLeft - 16, behavior: "smooth" });
  }, [currentIndex]);

  return (
    <nav aria-label="Langkah booking">
      <ol ref={listRef} className="relative flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {BOOKING_FLOW_STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <li key={step.id} className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => onStepClick(index)}
                aria-current={isCurrent ? "step" : undefined}
                className="group flex items-center gap-2"
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                    isCurrent && "bg-brand text-brand-foreground",
                    isCompleted &&
                      !isCurrent &&
                      "bg-brand-cyan text-brand",
                    !isCurrent &&
                      !isCompleted &&
                      "bg-surface-soft-teal text-brand-gray group-hover:bg-brand/10",
                  )}
                >
                  {isCompleted && !isCurrent ? (
                    <Check className="size-4" aria-hidden="true" />
                  ) : (
                    index + 1
                  )}
                </span>
                <span
                  className={cn(
                    "text-caption font-medium whitespace-nowrap",
                    isCurrent ? "text-brand" : "text-brand-gray",
                  )}
                >
                  {step.label}
                </span>
              </button>

              {index < BOOKING_FLOW_STEPS.length - 1 ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-px w-4 shrink-0",
                    isCompleted ? "bg-brand-cyan" : "bg-border",
                  )}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
