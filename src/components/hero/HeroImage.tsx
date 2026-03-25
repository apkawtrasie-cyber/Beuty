"use client";

import Image from "next/image";
import { motion, MotionValue } from "framer-motion";

interface Props {
  width: MotionValue<string>;
  height: MotionValue<string>;
  radius: MotionValue<number>;
  scale: MotionValue<number>;
  src: string;
}

export function HeroImage({ width, height, radius, scale, src }: Props) {
  return (
    <motion.div
      style={{
        width,
        height,
        borderRadius: radius,
        overflow: "hidden",
        position: "relative",
        border: "1px solid var(--color-taupe)",
      }}
    >
      <motion.div style={{ scale, width: "100%", height: "100%", position: "relative" }}>
        <Image
          src={src}
          alt="RAW RITUAL — Luksusowy salon beauty"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </motion.div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(26,26,26,0.7) 0%, rgba(26,26,26,0.35) 40%, rgba(26,26,26,0.15) 70%, transparent 100%)" }}
      />
    </motion.div>
  );
}
