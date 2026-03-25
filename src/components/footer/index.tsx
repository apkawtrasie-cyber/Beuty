"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { FooterBrand } from "./FooterBrand";
import { FooterNav } from "./FooterNav";
import { FooterContact } from "./FooterContact";

export default function Footer() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const t = useTranslations("footer");

  return (
    <footer className="bg-[var(--color-alabaster)]" style={{ paddingTop: "100px", paddingBottom: "50px", borderTop: "1px solid rgba(217,197,178,0.5)" }}>
      <div ref={ref} className="section-padding max-w-[1400px] mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-16 lg:gap-24 pb-16 border-b border-[var(--color-dirty-pink)]/20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <FooterBrand />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            <FooterNav />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <FooterContact />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-[var(--color-charcoal)]/35 tracking-wide">
            © {new Date().getFullYear()} RAW RITUAL Beauty Studio. {t("copyright")}
          </p>
          <p className="text-xs text-[var(--color-charcoal)]/35 tracking-wide">
            Polityka prywatności · Regulamin
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
