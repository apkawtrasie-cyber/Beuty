"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SERVICES } from "./constants";

interface Props {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function ServiceStep({ selectedId, onSelect }: Props) {
  const t = useTranslations("booking");
  const ts = useTranslations("services");
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-serif text-[var(--color-charcoal)] mb-8 mt-4" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>{t("serviceTitle")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SERVICES.map((s) => {
          const isSelected = selectedId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              className="relative border transition-all duration-400 cursor-pointer group text-left"
              style={{
                padding: "20px 24px",
                borderColor: isSelected ? "var(--color-taupe)" : "rgba(142,115,91,0.1)",
                backgroundColor: isSelected ? "rgba(142,115,91,0.03)" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(142,115,91,0.3)";
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(253,248,245,0.8)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(142,115,91,0.1)";
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                }
              }}
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-serif text-[var(--color-charcoal)] text-xl leading-tight">
                    {ts(`items.${s.id}.title`)}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] tracking-[0.12em] uppercase text-[var(--color-charcoal)]/50">
                    <span>{s.duration} MIN</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--color-taupe)]/30" />
                    <span className="font-medium text-[var(--color-taupe)]">{s.price} ZŁ</span>
                  </div>
                </div>

                <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                  <div
                    className={`absolute inset-0 rounded-full border transition-all duration-300 ${
                      isSelected ? "scale-110" : "group-hover:scale-110"
                    }`}
                    style={{
                      borderColor: isSelected ? "var(--color-taupe)" : "rgba(142,115,91,0.2)",
                    }}
                  />
                  {isSelected && (
                    <motion.div
                      layoutId="activeDot"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-2.5 h-2.5 rounded-full bg-[var(--color-taupe)]"
                    />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
