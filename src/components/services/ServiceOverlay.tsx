"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Service } from "./services.types";

interface ServiceOverlayProps {
  service: Service;
  isHovered: boolean;
}

export const ServiceOverlay = ({ service, isHovered }: ServiceOverlayProps) => {
  const t = useTranslations("nav");
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: isHovered ? "0%" : "100%" }}
      transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-20 bg-[#111111] flex flex-col justify-end"
      style={{ padding: "28px 20px 20px 20px", gap: "16px" }}
    >
      <div className="flex flex-col gap-2" style={{ zIndex: 10, position: "relative" }}>
        <p className="tracking-luxury" style={{ color: "#FFFFFF", fontSize: "clamp(0.8rem,1.2vw,1rem)" }}>
          {service.id}. {service.category}
        </p>
        <h4 className="font-serif" style={{ fontSize: "clamp(1.6rem,2.4vw,2rem)", color: "#FFFFFF" }}>
          {service.title}
        </h4>
      </div>

      <p className="leading-relaxed font-sans" style={{ color: "#FFFFFF", position: "relative", zIndex: 10, fontSize: "clamp(0.85rem,1.1vw,1rem)" }}>
        {service.description}
      </p>

      <div className="w-full flex justify-center" style={{ position: "relative", zIndex: 10 }}>
        <Link
          href="/rezerwacja"
          className="inline-block tracking-luxury bg-transparent hover:bg-white hover:text-black transition-colors duration-300"
          style={{ color: "#FFFFFF", border: "1px solid #FFFFFF", padding: "12px 20px", fontSize: "clamp(0.8rem,1.1vw,0.95rem)", letterSpacing: "0.15em" }}
          onClick={(e) => e.stopPropagation()}
        >
          {t("booking")}
        </Link>
      </div>
    </motion.div>
  );
};
