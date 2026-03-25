"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { ABOUT_DATA } from "./about.constants";
import { AboutImage } from "./AboutImage";
import { AboutContent } from "./AboutContent";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="o-nas" className="bg-[var(--color-alabaster)] overflow-hidden py-[50px]">
      <div
        ref={sectionRef}
        className="section-padding max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-16 lg:gap-0 items-center"
      >
        <AboutImage src={ABOUT_DATA.image} inView={inView} />
        <div className="lg:pl-20 xl:pl-28">
          <AboutContent inView={inView} />
        </div>
      </div>
    </section>
  );
}
