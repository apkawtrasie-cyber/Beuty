"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Service } from "./services.types";
import { ServiceOverlay } from "./ServiceOverlay";

interface ServiceCardProps {
  service: Service;
  index: number;
  priority?: boolean;
}

export function ServiceCard({ service, index, priority = false }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations("services");
  const translatedTitle = t(`items.${service.id}.title`);
  const translatedCategory = t(`items.${service.id}.category`);
  const translatedDescription = t(`items.${service.id}.description`);

  // First row (0,1,2): from right - reverse order delays
  // Second row (3,4,5): from left - normal order delays
  const getDelay = (idx: number) => {
    const posInRow = idx % 3;
    const isFirstRow = idx < 3;
    
    if (isFirstRow) {
      // First row: right to left (2->1->0)
      return 0.5 + (2 - posInRow) * 0.15;
    } else {
      // Second row: left to right (0->1->2)
      return 0.5 + posInRow * 0.15;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: getDelay(index), ease: "easeOut" }}
      className="relative overflow-hidden bg-[var(--color-cream)] cursor-pointer group"
      style={{ aspectRatio: "3/4" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 90vw, 33vw"
          priority={priority}
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Strong gradient for base text readability */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 z-0 pointer-events-none"
        style={{ 
          background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 40%, transparent 100%)" 
        }}
      />

      {/* Base label — fades out on hover */}
      <motion.div
        animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? 12 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 z-10 flex flex-col gap-2 pointer-events-none"
        style={{ padding: "0 20px 20px 20px" }}
      >
        <p className="tracking-luxury" style={{ color: "#FFFFFF", fontSize: "clamp(0.8rem,1.2vw,1rem)" }}>
          {service.id}. {translatedCategory}
        </p>
        <h4 className="font-serif" style={{ fontSize: "clamp(1.6rem,2.4vw,2rem)", color: "#FFFFFF" }}>
          {translatedTitle}
        </h4>
      </motion.div>

      {/* Dark overlay — slides up from bottom on hover */}
      <ServiceOverlay
        service={{ ...service, title: translatedTitle, category: translatedCategory, description: translatedDescription }}
        isHovered={isHovered}
      />
    </motion.div>
  );
}
