"use client";

import { useTranslations } from "next-intl";
import { SERVICES, SPECIALISTS, MONTH_NAMES, type BookingFormData, type BookingState } from "./constants";

// ─── Shared UI atoms ─────────────────────────────────────────

export function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="tracking-luxury text-[var(--color-taupe)] shrink-0">{label}</span>
      <span className="text-sm text-[var(--color-charcoal)] text-right">{value}</span>
    </div>
  );
}

function Field({
  label,
  type,
  required,
  value,
  onChange,
}: {
  label: string;
  type: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="tracking-luxury text-[var(--color-taupe)]">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-[var(--color-dirty-pink)] bg-transparent px-4 py-3 text-sm text-[var(--color-charcoal)] outline-none focus:border-[var(--color-taupe)] transition-colors"
      />
    </div>
  );
}

// ─── Props ───────────────────────────────────────────────────

interface Props {
  state: BookingState;
  onFormChange: (field: keyof BookingFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

// ─── Component ───────────────────────────────────────────────

export default function SummaryStep({ state, onFormChange, onSubmit }: Props) {
  const t = useTranslations("booking");
  const service    = SERVICES.find((s) => s.id === state.serviceId);
  const specialist = SPECIALISTS.find((s) => s.id === state.specialistId);
  const dateLabel  =
    state.date && state.time
      ? `${state.date.getDate()} ${MONTH_NAMES[state.date.getMonth()]}. ${state.date.getFullYear()}, ${state.time}`
      : "";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      {/* Booking summary box */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[var(--color-charcoal)] mb-1">{t("summaryTitle")}</h3>
        <div
          className="p-6 border flex flex-col gap-3"
          style={{ borderColor: "var(--color-dirty-pink)" }}
        >
          <SummaryRow
            label={t("stepService")}
            value={service ? `${service.label} — ${service.duration} · ${service.price}` : ""}
          />
          <SummaryRow label={t("stepSpecialist")} value={specialist?.name ?? ""} />
          <SummaryRow label={t("stepDate")}       value={dateLabel} />
        </div>
      </div>

      {/* Contact fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label={`${t("formName")} *`}
          type="text"
          required
          value={state.form.name}
          onChange={(v) => onFormChange("name", v)}
        />
        <Field
          label={`${t("formPhone")} *`}
          type="tel"
          required
          value={state.form.phone}
          onChange={(v) => onFormChange("phone", v)}
        />
        <div className="sm:col-span-2">
          <Field
            label={`${t("formEmail")} *`}
            type="email"
            required
            value={state.form.email}
            onChange={(v) => onFormChange("email", v)}
          />
        </div>
        <div className="sm:col-span-2 flex flex-col gap-2">
          <label className="tracking-luxury text-[var(--color-taupe)]">
            {t("formNote")}
          </label>
          <textarea
            rows={3}
            value={state.form.note}
            onChange={(e) => onFormChange("note", e.target.value)}
            className="w-full border border-[var(--color-dirty-pink)] bg-transparent px-4 py-3 text-sm text-[var(--color-charcoal)] outline-none focus:border-[var(--color-taupe)] transition-colors resize-none"
            placeholder="Np. alergie, preferencje dotyczące zabiegu…"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-start pt-2">
        <button
          type="submit"
          className="tracking-luxury text-[var(--color-alabaster)] bg-[var(--color-charcoal)] px-10 py-4 hover:bg-[var(--color-taupe)] transition-colors duration-300"
        >
          {t("submit")}
        </button>
      </div>
    </form>
  );
}
