import { ContactData } from "./contact.types";

const SALON_NAME   = "RAW RITUAL";
const SALON_STREET = "ul. Złota 59";
const SALON_CITY   = "00-120 Warszawa";
const SALON_PHONE  = "+48 22 000 00 00";
const SALON_EMAIL  = "kontakt@rawritual.pl";

const MAPS_QUERY  = encodeURIComponent(`${SALON_STREET}, ${SALON_CITY}`);

export const CONTACT_DATA: ContactData = {
  salonName: SALON_NAME,
  street:    SALON_STREET,
  city:      SALON_CITY,
  phone:     SALON_PHONE,
  email:     SALON_EMAIL,
  hours: [
    { label: "Poniedziałek — Piątek", value: "9:00 — 20:00" },
    { label: "Sobota",                value: "9:00 — 17:00" },
    { label: "Niedziela",             value: "Zamknięte"    },
  ],
  mapsQuery:  MAPS_QUERY,
  mapsEmbed:  `https://maps.google.com/maps?q=${MAPS_QUERY}&output=embed&hl=pl&zoom=16`,
  mapsDirect: `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`,
};
