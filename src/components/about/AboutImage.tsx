"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  src: string;
  inView: boolean;
}

export function AboutImage({ src, inView }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1.1, ease: "easeOut" }}
      className="relative flex justify-center lg:justify-start"
    >
      <div className="relative w-full max-w-[520px] aspect-[3/4] overflow-hidden" style={{ borderRadius: 2 }}>
        <Image
          src={src}
          alt="Założycielka RAW RITUAL — portret"
          fill
          sizes="(max-width: 768px) 90vw, 50vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ border: "1px solid rgba(142,115,91,0.18)" }}
        />
      </div>
      <div
        className="absolute -bottom-6 -left-6 w-48 h-48 border border-[var(--color-dirty-pink)] pointer-events-none hidden lg:block"
        style={{ zIndex: -1 }}
      />
    </motion.div>
  );
}
