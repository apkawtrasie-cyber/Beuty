"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { SPECIALISTS } from "./constants";

interface Props {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function SpecialistStep({ selectedId, onSelect }: Props) {
  const t = useTranslations("booking");
  const roles: Record<string, string> = {
    anna:  t("specialistRoles.anna"),
    marta: t("specialistRoles.marta"),
    julia: t("specialistRoles.julia"),
  };
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[var(--color-charcoal)] mb-2">{t("specialistTitle")}</h3>

      <div className="flex flex-col gap-3">
        {SPECIALISTS.map((sp) => {
          const isSelected = selectedId === sp.id;
          return (
            <button
              key={sp.id}
              onClick={() => onSelect(sp.id)}
              className="flex items-center justify-between p-5 border transition-all duration-300 text-left"
              style={{
                borderColor: isSelected ? "var(--color-taupe)" : "var(--color-dirty-pink)",
                backgroundColor: isSelected ? "var(--color-cream)" : "transparent",
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-serif text-lg shrink-0"
                  style={{
                    backgroundColor: "var(--color-dirty-pink)",
                    color: "var(--color-charcoal)",
                  }}
                >
                  {sp.initial}
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="font-serif text-[var(--color-charcoal)] text-lg">
                    {sp.name}
                  </span>
                  <span className="tracking-luxury text-[var(--color-taupe)]">
                    {roles[sp.id] ?? sp.role}
                  </span>
                </div>
              </div>

              <div
                className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-300"
                style={{
                  borderColor: isSelected ? "var(--color-taupe)" : "var(--color-dirty-pink)",
                  backgroundColor: isSelected ? "var(--color-taupe)" : "transparent",
                }}
              >
                {isSelected && <Check size={10} color="var(--color-alabaster)" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
