"use client";

import { useTranslations } from "next-intl";
import { TIME_SLOTS, getWorkingDays } from "./constants";

interface Props {
  selectedDate: Date | null;
  selectedTime: string | null;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
}

export default function DateTimeStep({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}: Props) {
  const t = useTranslations("booking");
  const dayNames: string[] = t.raw("dayNames");
  const monthNames: string[] = t.raw("monthNames");
  const days = getWorkingDays(7);

  return (
    <div className="flex flex-col gap-10">
      {/* Date picker */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[var(--color-charcoal)] mb-1">{t("dateTitle")}</h3>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {days.map((d) => {
            const isSelected = selectedDate?.toDateString() === d.toDateString();
            return (
              <button
                key={d.toISOString()}
                onClick={() => onDateSelect(d)}
                aria-pressed={isSelected}
                className="flex flex-col items-center gap-1 px-4 py-4 border shrink-0 transition-all duration-300"
                style={{
                  minWidth: "64px",
                  borderColor: isSelected ? "var(--color-taupe)" : "var(--color-dirty-pink)",
                  backgroundColor: isSelected ? "var(--color-charcoal)" : "transparent",
                }}
              >
                <span
                  className="tracking-luxury"
                  style={{
                    color: isSelected ? "var(--color-dirty-pink)" : "var(--color-taupe)",
                  }}
                >
                  {dayNames[d.getDay()]}
                </span>
                <span
                  className="font-serif text-xl"
                  style={{
                    color: isSelected ? "var(--color-alabaster)" : "var(--color-charcoal)",
                  }}
                >
                  {d.getDate()}
                </span>
                <span
                  className="tracking-luxury"
                  style={{
                    color: isSelected ? "var(--color-dirty-pink)" : "rgba(45,45,45,0.38)",
                    fontSize: "10px",
                  }}
                >
                  {monthNames[d.getMonth()]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time picker — shown only after date is chosen */}
      {selectedDate && (
        <div className="flex flex-col gap-4">
          <h3 className="text-[var(--color-charcoal)] mb-1">{t("timeTitle")}</h3>

          <div className="flex flex-wrap gap-3">
            {TIME_SLOTS.map((t) => {
              const isSelected = selectedTime === t;
              return (
                <button
                  key={t}
                  onClick={() => onTimeSelect(t)}
                  aria-pressed={isSelected}
                  className="px-5 py-2.5 border tracking-luxury transition-all duration-300"
                  style={{
                    borderColor: isSelected ? "var(--color-charcoal)" : "var(--color-dirty-pink)",
                    backgroundColor: isSelected ? "var(--color-charcoal)" : "transparent",
                    color: isSelected ? "var(--color-alabaster)" : "var(--color-charcoal)",
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
