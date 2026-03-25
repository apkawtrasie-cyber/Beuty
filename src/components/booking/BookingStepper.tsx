"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function BookingStepper({ currentStep, onStepClick }: Props) {
  const t = useTranslations("booking");
  const steps = [t("stepService"), t("stepSpecialist"), t("stepDate"), t("stepConfirmation")];
  return (
    <div className="flex items-center gap-0 overflow-x-auto">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center">
          <button
            onClick={() => i < currentStep && onStepClick(i)}
            className="flex items-center gap-2.5"
            aria-label={`${i + 1}: ${label}`}
          >
            <div
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${
                i === currentStep ? "scale-110" : ""
              }`}
              style={{
                backgroundColor:
                  i < currentStep
                    ? "var(--color-taupe)"
                    : i === currentStep
                    ? "var(--color-charcoal)"
                    : "transparent",
                color:
                  i <= currentStep
                    ? "#ffffff"
                    : "rgba(142,115,91,0.5)",
                borderColor: i > currentStep ? "rgba(142,115,91,0.3)" : "transparent",
              }}
            >
              {i < currentStep ? <Check size={12} /> : i + 1}
            </div>
            <span
              className={`hidden sm:block transition-colors ${i === currentStep ? "font-semibold" : ""}`}
              style={{
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color:
                  i === currentStep
                    ? "var(--color-charcoal)"
                    : "rgba(142,115,91,0.4)",
              }}
            >
              {label}
            </span>
          </button>

          {i < steps.length - 1 && (
            <div className="w-8 sm:w-14 h-px mx-3 bg-[var(--color-dirty-pink)]/40 shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
}
