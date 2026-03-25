"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={scrolled ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: "rgba(253,248,245,0.94)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(142,115,91,0.12)",
        }}
      >
        <div className="section-padding flex items-center justify-between h-[72px]">
          <Link
            href="/"
            className="font-serif font-bold text-xl tracking-[0.08em] text-[var(--color-charcoal)] hover:text-[var(--color-taupe)] transition-colors duration-300"
          >
            RAW <span className="text-[var(--color-taupe)]">RITUAL</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <DesktopNav />
            <div style={{ width: "1px", height: "14px", background: "rgba(142,115,91,0.25)" }} />
            <LanguageSwitcher />
          </div>

          <button
            onClick={() => setOpen((p) => !p)}
            className="md:hidden text-[var(--color-charcoal)] p-1"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && <MobileMenu onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
