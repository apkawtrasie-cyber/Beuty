export interface HoursEntry {
  label: string;
  value: string;
}

export interface ContactData {
  salonName: string;
  street: string;
  city: string;
  phone: string;
  email: string;
  hours: HoursEntry[];
  mapsQuery: string;
  mapsEmbed: string;
  mapsDirect: string;
}
