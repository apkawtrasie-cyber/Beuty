"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const t = useTranslations("nav");
  const links = [
    { href: "#o-nas",      label: t("about")    },
    { href: "#uslugi",     label: t("services") },
    { href: "#kontakt",    label: t("contact")  },
    { href: "/rezerwacja", label: t("booking")  },
  ];

  return (
    <motion.div
      key="drawer"
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-40 bg-[var(--color-alabaster)] flex flex-col items-center justify-center gap-10"
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-[var(--color-charcoal)]"
        aria-label="Zamknij"
      >
        <X size={24} />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-2"
      >
        <LanguageSwitcher />
      </motion.div>

      {links.map((link, i) => (
        <motion.div
          key={link.href}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={link.href}
            onClick={onClose}
            className="font-serif text-3xl font-medium text-[var(--color-charcoal)] hover:text-[var(--color-taupe)] transition-colors"
          >
            {link.label}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
