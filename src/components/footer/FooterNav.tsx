"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export function FooterNav() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const links = [
    { href: "#o-nas",      label: t("about")    },
    { href: "#uslugi",     label: t("services") },
    { href: "/rezerwacja", label: t("booking")  },
    { href: "#kontakt",    label: t("contact")  },
  ];
  return (
    <div className="flex flex-col gap-6">
      <p className="tracking-luxury text-[var(--color-taupe)]">{tf("navTitle")}</p>
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-[var(--color-charcoal)]/60 hover:text-[var(--color-taupe)] transition-colors duration-300"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
