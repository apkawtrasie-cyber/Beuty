// ============================================================
// RAW RITUAL — Booking module: single source of truth
// Aby zmienić dane (ceny, usługi, godziny) — edytuj TYLKO ten plik.
// ============================================================

// ─── Types ──────────────────────────────────────────────────

export interface Service {
  id: string;
  label: string;
  duration: string;
  price: string;
}

export interface Specialist {
  id: string;
  name: string;
  role: string;
  initial: string;
}

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  note: string;
}

export interface BookingState {
  serviceId: string | null;
  specialistId: string | null;
  date: Date | null;
  time: string | null;
  form: BookingFormData;
}

// ─── Step labels ────────────────────────────────────────────

export const STEPS = ["Usługa", "Specjalistka", "Termin", "Potwierdzenie"] as const;

// ─── Services ───────────────────────────────────────────────

export const SERVICES: Service[] = [
  { id: "01",  label: "Manicure",          duration: "60",  price: "150" },
  { id: "02",  label: "Pedicure",          duration: "75",  price: "180" },
  { id: "03",  label: "Pielęgnacja twarzy", duration: "90",  price: "280" },
  { id: "04",  label: "Masaż relaksacyjny", duration: "60",  price: "220" },
  { id: "05",  label: "Stylizacja brwi",    duration: "45",  price: "120" },
  { id: "06",  label: "Rytuał Prestige",    duration: "180", price: "650" },
];

// ─── Specialists ─────────────────────────────────────────────

export const SPECIALISTS: Specialist[] = [
  { id: "anna",  name: "Anna K.",  role: "Specjalistka SPA & Twarz",     initial: "A" },
  { id: "marta", name: "Marta W.", role: "Manicurzystka & Pedicurzystka", initial: "M" },
  { id: "julia", name: "Julia R.", role: "Masażystka & Rytuały ciała",    initial: "J" },
];

// ─── Time slots ──────────────────────────────────────────────

export const TIME_SLOTS: string[] = [
  "9:00", "9:45", "10:30", "11:15", "12:00",
  "12:45", "13:30", "14:15", "15:00", "15:45",
  "16:30", "17:15", "18:00", "18:45",
];

// ─── Date helpers ────────────────────────────────────────────

export const DAY_NAMES   = ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "So"] as const;
export const MONTH_NAMES = [
  "sty", "lut", "mar", "kwi", "maj", "cze",
  "lip", "sie", "wrz", "paź", "lis", "gru",
] as const;

/** Returns the next 7 working days (skips Sundays). */
export function getWorkingDays(count = 7): Date[] {
  const days: Date[] = [];
  const today = new Date();
  let offset = 0;
  while (days.length < count) {
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    if (d.getDay() !== 0) days.push(d);
    offset++;
  }
  return days;
}

/** Formats a Date + time string to a human-readable Polish string. */
export function formatAppointment(date: Date, time: string): string {
  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]}. ${date.getFullYear()}, ${time}`;
}

// ─── Empty state factory ─────────────────────────────────────

export const INITIAL_BOOKING_STATE: BookingState = {
  serviceId:    null,
  specialistId: null,
  date:         null,
  time:         null,
  form: { name: "", phone: "", email: "", note: "" },
};
