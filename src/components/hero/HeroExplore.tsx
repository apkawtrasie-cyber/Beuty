"use client";

import Link from "next/link";
import { motion, MotionValue } from "framer-motion";

interface Props {
  opacity: MotionValue<number>;
  exploreY: MotionValue<number>;
  label: string;
}

export function HeroExplore({ opacity, exploreY, label }: Props) {
  return (
    <motion.div
      style={{ opacity, y: exploreY }}
      className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none"
    >
      <Link
        href="#o-nas"
        className="pointer-events-auto tracking-luxury transition-colors duration-300"
        style={{
          color: "var(--color-charcoal)",
          border: "1px solid var(--color-charcoal)",
          padding: "12px 32px",
          background: "transparent",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-charcoal)";
          (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
          (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-charcoal)";
        }}
      >
        {label}
      </Link>
    </motion.div>
  );
}
