"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { ScrollingBackground } from "./ScrollingBackground";
import { PerksList } from "./PerksList";
import { CTA_CONFIG } from "./cta.constants";

export default function BookingCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const t = useTranslations("cta");
  const contentRef   = useRef<HTMLDivElement>(null);

  const isInView     = useInView(containerRef, { once: true, margin: "-60px" });
  const contentInView = useInView(contentRef,  { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rawX    = useTransform(scrollYProgress, [0, 0.4, 1], ["80vw",  "0vw", "-50vw"]);
  const ritualX = useTransform(scrollYProgress, [0, 0.4, 1], ["-80vw", "0vw",  "50vw"]);

  return (
    <section ref={containerRef} id="rezerwacja" className="relative bg-[var(--color-charcoal)] overflow-hidden py-[50px]">

      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="tracking-luxury text-[var(--color-taupe)] text-center mb-10"
      >
        {t("label")}
      </motion.p>

      {/* Scrolling headline */}
      <ScrollingBackground rawX={rawX} ritualX={ritualX} />

      {/* Sub-label */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.55, ease: "easeOut" }}
        className="tracking-luxury text-[var(--color-taupe)]/60 text-center mt-6"
      >
        {t("subLabel")}
      </motion.p>

      {/* Content block */}
      <div
        ref={contentRef}
        className="section-padding max-w-[1200px] mx-auto flex flex-col items-center text-center gap-12"
        style={{ marginTop: "50px" }}
      >
        <PerksList isInView={contentInView} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <Link
            href={CTA_CONFIG.href}
            className="inline-block tracking-luxury transition-all duration-300"
            style={{ color: "#FFFFFF", border: "1px solid #FFFFFF", padding: "12px 28px", fontSize: "clamp(0.8rem,1.1vw,0.95rem)", letterSpacing: "0.15em", background: "transparent" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.12)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
          >
            {t("button")}
          </Link>
        </motion.div>

        {/* Decorative divider */}
        <div className="flex items-center gap-6 w-full max-w-sm pt-2">
          <div className="h-px flex-1 bg-[var(--color-taupe)]/25" />
          <span className="tracking-luxury text-[var(--color-taupe)]/40 text-[10px]">RAW RITUAL</span>
          <div className="h-px flex-1 bg-[var(--color-taupe)]/25" />
        </div>
      </div>
    </section>
  );
}
