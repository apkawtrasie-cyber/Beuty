"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CalendarDays, Clock, Phone } from "lucide-react";

export function PerksList({ isInView }: { isInView: boolean }) {
  const t = useTranslations("cta");
  const perks = [
    { icon: CalendarDays, text: t("perk1") },
    { icon: Clock,        text: t("perk2") },
    { icon: Phone,        text: t("perk3") },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
      className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12"
    >
      {perks.map(({ icon: Icon, text }) => (
        <div key={text} className="flex items-center gap-3">
          <Icon size={18} className="text-[var(--color-taupe)]" strokeWidth={1.5} aria-hidden />
          <span className="tracking-luxury text-[var(--color-dirty-pink)]/70 text-xs md:text-sm">
            {text}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
