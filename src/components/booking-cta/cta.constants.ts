import { CalendarDays, Clock, Phone } from "lucide-react";

export const BOOKING_PERKS = [
  { icon: CalendarDays, text: "Rezerwacja 24/7 online" },
  { icon: Clock,        text: "Wizyty od pon. do sob." },
  { icon: Phone,        text: "Potwierdzenie SMS" },
];

export const CTA_CONFIG = {
  label:      "Rezerwacja online",
  subLabel:   "Zarezerwuj swój rytuał",
  buttonText: "Zarezerwuj wizytę",
  href:       "/rezerwacja",
};
