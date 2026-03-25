"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { FOOTER_CONTENT } from "./footer.constants";

export function FooterBrand() {
  const t = useTranslations("footer");
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/"
        className="font-serif font-bold text-2xl tracking-[0.06em] text-[var(--color-charcoal)]"
      >
        RAW <span className="text-[var(--color-taupe)]">RITUAL</span>
      </Link>

      <p className="text-[var(--color-charcoal)]/60 text-sm leading-relaxed max-w-[220px]">
        {t("description")}
      </p>

      <div className="flex items-center gap-4 pt-2">
        <a
          href={FOOTER_CONTENT.socials[0].href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram RAW RITUAL"
          className="text-[var(--color-charcoal)]/40 hover:text-[var(--color-taupe)] transition-colors duration-300"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
          </svg>
        </a>
        <a
          href={FOOTER_CONTENT.socials[1].href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook RAW RITUAL"
          className="text-[var(--color-charcoal)]/40 hover:text-[var(--color-taupe)] transition-colors duration-300"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
