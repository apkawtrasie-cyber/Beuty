"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { FOOTER_CONTENT } from "./footer.constants";

export function FooterContact() {
  const t = useTranslations("contact");
  const { address, contact } = FOOTER_CONTENT;
  return (
    <div className="flex flex-col gap-6">
      <p className="tracking-luxury text-[var(--color-taupe)]">{t("label")}</p>
      <address className="not-italic flex flex-col gap-4">

        <a
          href={address.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 text-sm text-[var(--color-charcoal)]/60 hover:text-[var(--color-taupe)] transition-colors duration-300 group"
        >
          <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 group-hover:text-[var(--color-taupe)] transition-colors" />
          <span>
            {address.name}<br />
            {address.street}<br />
            {address.city}
          </span>
        </a>

        <a
          href={contact.phoneHref}
          className="flex items-center gap-3 text-sm text-[var(--color-charcoal)]/60 hover:text-[var(--color-taupe)] transition-colors duration-300 group"
        >
          <Phone size={16} strokeWidth={1.5} className="shrink-0 group-hover:text-[var(--color-taupe)] transition-colors" />
          <span>{contact.phone}</span>
        </a>

        <a
          href={`mailto:${contact.email}`}
          className="flex items-center gap-3 text-sm text-[var(--color-charcoal)]/60 hover:text-[var(--color-taupe)] transition-colors duration-300 group"
        >
          <Mail size={16} strokeWidth={1.5} className="shrink-0 group-hover:text-[var(--color-taupe)] transition-colors" />
          <span>{contact.email}</span>
        </a>
      </address>
    </div>
  );
}
