"use client";

import { motion, MotionValue } from "framer-motion";

interface Props {
  rawX: MotionValue<string>;
  ritualX: MotionValue<string>;
}

export function ScrollingBackground({ rawX, ritualX }: Props) {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden px-4 pointer-events-none">
      <motion.span
        style={{ x: rawX, fontSize: "clamp(4.5rem, 15vw, 12rem)", color: "var(--color-taupe)" }}
        className="font-serif font-bold leading-none whitespace-nowrap select-none"
      >
        RAW
      </motion.span>
      <motion.span
        style={{ x: ritualX, fontSize: "clamp(4.5rem, 15vw, 12rem)", color: "var(--color-alabaster)" }}
        className="font-serif font-bold leading-[0.8] whitespace-nowrap select-none -mt-4 md:-mt-8 lg:-mt-12"
      >
        RITUAL
      </motion.span>
    </div>
  );
}
