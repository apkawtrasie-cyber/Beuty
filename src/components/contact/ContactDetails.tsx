"use client";

import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ContactData } from "./contact.types";

export function ContactDetails({ data }: { data: ContactData }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const t = useTranslations("contact");
  const hours = [
    { label: t("weekdays"), value: "9:00 — 20:00" },
    { label: t("saturday"), value: "9:00 — 17:00" },
    { label: t("sunday"),   value: t("closed") },
  ];

  return (
    <div ref={ref} className="flex flex-col gap-10">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col gap-3"
      >
        <p className="tracking-luxury text-[var(--color-taupe)]">{t("label")}</p>
        <h2 className="text-[var(--color-charcoal)]">
          {t("title")}<br />
          <em className="text-[var(--color-taupe)]">{t("titleAccent")}</em>
        </h2>
      </motion.div>

      {/* Contact rows */}
      <div className="flex flex-col gap-6">

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
          className="font-serif text-2xl text-[var(--color-charcoal)]"
        >
          {data.salonName}
        </motion.p>

        <motion.a
          href={data.mapsDirect}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="flex items-start gap-4 group"
        >
          <MapPin size={18} strokeWidth={1.5} className="text-[var(--color-taupe)] mt-0.5 shrink-0" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[var(--color-charcoal)] group-hover:text-[var(--color-taupe)] transition-colors duration-300">
              {data.street}
            </span>
            <span className="text-[var(--color-charcoal)]/60 group-hover:text-[var(--color-taupe)]/80 transition-colors duration-300">
              {data.city}
            </span>
            <span className="tracking-luxury text-[var(--color-taupe)] text-xs mt-0.5">
              {t("directions")} →
            </span>
          </div>
        </motion.a>

        <motion.a
          href={`tel:${data.phone.replace(/\s/g, "")}`}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.28, ease: "easeOut" }}
          className="flex items-center gap-4 group"
        >
          <Phone size={18} strokeWidth={1.5} className="text-[var(--color-taupe)] shrink-0" />
          <span className="text-[var(--color-charcoal)] group-hover:text-[var(--color-taupe)] transition-colors duration-300">
            {data.phone}
          </span>
        </motion.a>

        <motion.a
          href={`mailto:${data.email}`}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.36, ease: "easeOut" }}
          className="flex items-center gap-4 group"
        >
          <Mail size={18} strokeWidth={1.5} className="text-[var(--color-taupe)] shrink-0" />
          <span className="text-[var(--color-charcoal)] group-hover:text-[var(--color-taupe)] transition-colors duration-300">
            {data.email}
          </span>
        </motion.a>
      </div>

      {/* Opening hours */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.48, ease: "easeOut" }}
        className="flex flex-col gap-4 pt-6 border-t border-[var(--color-dirty-pink)]"
      >
        <p className="tracking-luxury text-[var(--color-taupe)]">{t("hoursLabel")}</p>
        <div className="flex flex-col gap-2">
          {hours.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between gap-4">
              <span className="text-sm text-[var(--color-charcoal)]/55">{label}</span>
              <span className="text-sm text-[var(--color-charcoal)]">{value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
