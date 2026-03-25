"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface Props {
  inView: boolean;
}

export function AboutContent({ inView }: Props) {
  const t = useTranslations("about");
  const lines: string[] = t.raw("lines");

  return (
    <div className="flex flex-col gap-8">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className="tracking-luxury text-[var(--color-taupe)]"
      >
        {t("label")}
      </motion.p>

      <div className="flex flex-col gap-1 overflow-hidden">
        {lines.map((line, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.2 + i * 0.1, ease: "easeOut" }}
            className="block font-serif text-[var(--color-charcoal)]"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", lineHeight: 1.25, fontWeight: 600 }}
          >
            {line}
          </motion.span>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, delay: 0.75, ease: "easeOut" }}
        className="text-[var(--color-charcoal)]/70 max-w-sm"
        style={{ lineHeight: 1.8 }}
      >
        {t("description")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, delay: 0.9, ease: "easeOut" }}
        className="flex items-center gap-6 pt-2"
      >
        <div className="h-px flex-1 max-w-[60px] bg-[var(--color-taupe)]" />
        <p className="tracking-luxury text-[var(--color-taupe)]">{t("footer")}</p>
      </motion.div>
    </div>
  );
}
