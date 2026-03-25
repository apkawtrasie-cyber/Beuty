"use client";

import { CONTACT_DATA } from "./contact.data";
import { ContactDetails } from "./ContactDetails";
import { ContactMap } from "./ContactMap";

export default function ContactSection() {
  return (
    <section id="kontakt" className="bg-[var(--color-cream)]" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
      <div className="section-padding max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <ContactDetails data={CONTACT_DATA} />
        <ContactMap data={CONTACT_DATA} />
      </div>
    </section>
  );
}
