"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function MobileStickyButton() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations("booking");

  useEffect(() => {
    const about = document.getElementById("o-nas");
    if (!about) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting || entry.boundingClientRect.top < 0),
      { threshold: 0, rootMargin: "0px" }
    );
    observer.observe(about);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 md:hidden z-40"
      style={{
        paddingBottom: "calc(16px + env(safe-area-inset-bottom))",
        paddingTop: "16px",
        paddingLeft: "20px",
        paddingRight: "20px",
        background:
          "linear-gradient(to top, rgba(253,248,245,1) 0%, rgba(253,248,245,1) 70%, rgba(253,248,245,0) 100%)",
      }}
    >
      <Link
        href="/rezerwacja"
        className="block w-full text-center tracking-[0.12em] text-sm uppercase font-medium transition-all duration-150"
        style={{
          backgroundColor: "var(--color-charcoal)",
          color: "#ffffff",
          padding: "18px 24px",
          border: "1px solid var(--color-charcoal)",
          display: "block",
        }}
        onMouseDown={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#ffffff";
          (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-charcoal)";
        }}
        onMouseUp={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--color-charcoal)";
          (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
        }}
        onTouchStart={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#ffffff";
          (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-charcoal)";
        }}
        onTouchEnd={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--color-charcoal)";
          (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
        }}
      >
        {t("mobileButton")}
      </Link>
    </div>
  );
}
