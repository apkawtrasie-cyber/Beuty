"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ContactData } from "./contact.types";

export function ContactMap({ data }: { data: ContactData }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.18, ease: "easeOut" }}
      className="relative w-full overflow-hidden"
      style={{
        height: "clamp(340px, 50vw, 540px)",
        border: "1px solid var(--color-dirty-pink)",
      }}
    >
      <iframe
        src={data.mapsEmbed}
        width="100%"
        height="100%"
        style={{ border: 0, pointerEvents: "none", display: "block" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="RAW RITUAL — lokalizacja salonu"
      />
      <a
        href={data.mapsDirect}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Otwórz trasę do RAW RITUAL w Google Maps"
        className="absolute inset-0 z-10 flex items-end justify-end p-5 group"
        style={{
          background: "linear-gradient(to top, rgba(45,45,45,0.55) 0%, transparent 45%)",
        }}
      >
        <span className="flex items-center gap-2 tracking-luxury text-[var(--color-alabaster)] text-xs border border-[var(--color-alabaster)]/50 px-5 py-2.5 bg-[var(--color-charcoal)]/60 backdrop-blur-sm group-hover:bg-[var(--color-taupe)] group-hover:border-[var(--color-taupe)] transition-all duration-300">
          Zaplanuj trasę →
        </span>
      </a>
    </motion.div>
  );
}
