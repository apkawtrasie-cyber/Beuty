"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { NavLink } from "./NavLink";

export function DesktopNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isBooking = pathname === "/rezerwacja";

  const links = [
    { href: isBooking ? "/" : "#o-nas",   label: t("about"),    highlight: false },
    { href: isBooking ? "/" : "#uslugi",  label: t("services"), highlight: false },
    { href: isBooking ? "/" : "#kontakt", label: t("contact"),  highlight: false },
    { href: "/rezerwacja",                 label: t("booking"),  highlight: true  },
  ];

  return (
    <nav className="hidden md:flex items-center gap-10">
      {links.map((link) => (
        <NavLink key={link.label} link={link} />
      ))}
    </nav>
  );
}
