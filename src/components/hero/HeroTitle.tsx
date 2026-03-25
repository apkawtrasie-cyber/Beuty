"use client";

import { motion, MotionValue } from "framer-motion";

interface HeroTitleContent {
  label: string;
  titlePart1: string;
  titlePart2: string;
  description: string;
}

interface Props {
  opacity: MotionValue<number>;
  titleY: MotionValue<number>;
  content: HeroTitleContent;
}

const ease = "easeOut" as const;

const TEXT_SHADOW = "0 2px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)";

export function HeroTitle({ opacity, titleY, content }: Props) {
  return (
    <motion.div
      style={{ y: titleY, opacity }}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-6 px-6 text-center"
    >
      <motion.p
        style={{ textShadow: TEXT_SHADOW, color: "rgba(217,197,178,0.9)" }}
        className="tracking-luxury"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.9, ease }}
      >
        {content.label}
      </motion.p>

      <motion.h1
        style={{
          fontSize: "clamp(3.5rem, 10vw, 8rem)",
          fontWeight: 700,
          lineHeight: 1.05,
          color: "#ffffff",
          textShadow: TEXT_SHADOW,
          letterSpacing: "0.06em",
        }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.48, duration: 0.9, ease }}
      >
        {content.titlePart1}{" "}
        <em style={{ color: "rgba(217,197,178,0.95)", fontStyle: "italic" }}>
          {content.titlePart2}
        </em>
      </motion.h1>

      <motion.p
        style={{ textShadow: TEXT_SHADOW, color: "rgba(255,255,255,0.8)" }}
        className="max-w-md font-sans text-sm tracking-wide"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.64, duration: 0.9, ease }}
      >
        {content.description}
      </motion.p>
    </motion.div>
  );
}
