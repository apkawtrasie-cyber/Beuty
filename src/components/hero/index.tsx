"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { HERO_CONTENT } from "./hero.constants";
import { HeroImage } from "./HeroImage";
import { HeroTitle } from "./HeroTitle";
import { HeroExplore } from "./HeroExplore";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("hero");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale       = useTransform(scrollYProgress, [0, 0.5],  [1, 1.08]);
  const imageWidth  = useTransform(scrollYProgress, [0, 0.45], ["min(340px,72vw)", "100vw"]);
  const imageHeight = useTransform(scrollYProgress, [0, 0.45], ["min(490px,82vh)", "100vh"]);
  const radius      = useTransform(scrollYProgress, [0, 0.45], [8, 0]);
  const titleY      = useTransform(scrollYProgress, [0, 0.25], [0, -40]);
  const titleOpacity   = useTransform(scrollYProgress, [0, 0.2],  [1, 0]);
  const exploreOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const exploreY       = useTransform(scrollYProgress, [0.3, 0.5], [20, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100vh-100px)] flex items-center justify-center overflow-hidden bg-[var(--color-alabaster)] py-[50px]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-[var(--color-alabaster)]">
        <HeroImage
          width={imageWidth}
          height={imageHeight}
          radius={radius}
          scale={scale}
          src={HERO_CONTENT.image}
        />
        <HeroTitle
          opacity={titleOpacity}
          titleY={titleY}
          content={{
            label: t("label"),
            titlePart1: HERO_CONTENT.titlePart1,
            titlePart2: HERO_CONTENT.titlePart2,
            description: t("description"),
          }}
        />
        <HeroExplore
          opacity={exploreOpacity}
          exploreY={exploreY}
          label={t("button")}
        />
      </div>
    </section>
  );
}
