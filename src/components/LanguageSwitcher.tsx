"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
  de: "DE",
  pl: "PL",
  fr: "FR",
  it: "IT",
  en: "EN",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  function handleChange(nextLocale: string) {
    if (nextLocale === locale) return;
    
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    
    // Construct new URL with new locale
    const newUrl = `/${nextLocale}${pathWithoutLocale}`;
    
    // Navigate to new URL
    window.location.href = newUrl;
  }

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          <button
            onClick={() => handleChange(loc)}
            disabled={loc === locale}
            className="tracking-[0.1em] transition-colors duration-200"
            style={{
              fontSize: "10px",
              fontWeight: loc === locale ? 600 : 400,
              color: loc === locale ? "var(--color-charcoal)" : "rgba(142,115,91,0.55)",
              padding: "2px 3px",
              background: "none",
              border: "none",
              cursor: loc === locale ? "default" : "pointer",
            }}
            aria-label={loc.toUpperCase()}
            aria-current={loc === locale ? "true" : undefined}
          >
            {LOCALE_LABELS[loc]}
          </button>
          {i < routing.locales.length - 1 && (
            <span style={{ fontSize: "9px", color: "rgba(142,115,91,0.25)" }}>·</span>
          )}
        </span>
      ))}
    </div>
  );
}
