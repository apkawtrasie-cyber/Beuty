"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { SERVICES } from "./services.data";
import { ServiceCard } from "./ServiceCard";

export default function ServicesSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-60px" });
  const t = useTranslations("services");

  return (
    <section id="uslugi" className="bg-[var(--color-alabaster)] py-[50px]">
      <div className="section-padding max-w-[1400px] mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-20 flex flex-col gap-4 max-w-2xl overflow-hidden">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="tracking-luxury text-[var(--color-taupe)]"
          >
            {t("label")}
          </motion.p>

          <h2 className="text-[var(--color-charcoal)] flex flex-col gap-2">
            <motion.span
              initial={{ x: "-50vw", opacity: 0 }}
              animate={isHeadingInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {t("titleLine1")}
            </motion.span>
            <motion.em
              initial={{ x: "50vw", opacity: 0 }}
              animate={isHeadingInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[var(--color-taupe)] block"
            >
              {t("titleLine2")}
            </motion.em>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.22, ease: "easeOut" }}
            className="text-[var(--color-charcoal)]/60"
          >
            {t("hint")}
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} priority={i < 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
