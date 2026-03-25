"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { SERVICES, SPECIALISTS, MONTH_NAMES, type BookingState } from "./constants";
import { SummaryRow } from "./SummaryStep";

interface Props {
  state: BookingState;
}

export default function SuccessState({ state }: Props) {
  const t = useTranslations("booking");
  const service    = SERVICES.find((s) => s.id === state.serviceId);
  const specialist = SPECIALISTS.find((s) => s.id === state.specialistId);
  const dateLabel  =
    state.date && state.time
      ? `${state.date.getDate()} ${MONTH_NAMES[state.date.getMonth()]}. ${state.date.getFullYear()}, ${state.time}`
      : "";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center text-center gap-6 py-20"
    >
      {/* Check icon */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "var(--color-taupe)" }}
      >
        <Check size={28} color="var(--color-alabaster)" />
      </div>

      <h2 className="text-[var(--color-charcoal)]">{t("successTitle")}</h2>

      <p className="text-[var(--color-charcoal)]/60 max-w-sm leading-relaxed">
        {t("successSubtitle")}
      </p>

      {/* Summary recap */}
      <div
        className="p-6 border text-left w-full max-w-sm flex flex-col gap-3"
        style={{ borderColor: "var(--color-dirty-pink)" }}
      >
        <SummaryRow label={t("stepService")}    value={service?.label ?? ""} />
        <SummaryRow label={t("stepSpecialist")}  value={specialist?.name ?? ""} />
        <SummaryRow label={t("stepDate")}        value={dateLabel} />
      </div>
    </motion.div>
  );
}
