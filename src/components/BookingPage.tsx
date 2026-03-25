"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { INITIAL_BOOKING_STATE, type BookingState, type BookingFormData } from "./booking/constants";
import BookingStepper   from "./booking/BookingStepper";
import ServiceStep      from "./booking/ServiceStep";
import SpecialistStep   from "./booking/SpecialistStep";
import DateTimeStep     from "./booking/DateTimeStep";
import SummaryStep      from "./booking/SummaryStep";
import SuccessState     from "./booking/SuccessState";

// ─── Step-level validation ───────────────────────────────────

function canGoNext(step: number, state: BookingState): boolean {
  if (step === 0) return !!state.serviceId;
  if (step === 1) return !!state.specialistId;
  if (step === 2) return !!(state.date && state.time);
  return true;
}

// ─── Orchestrator ────────────────────────────────────────────

export default function BookingPage() {
  const [step, setStep]         = useState(0);
  const [booking, setBooking]   = useState<BookingState>(INITIAL_BOOKING_STATE);
  const [submitted, setSubmitted] = useState(false);
  const t = useTranslations("booking");

  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const proceed  = () => setStep((s) => s + 1);
  const goBack   = () => setStep((s) => s - 1);
  const isReady  = canGoNext(step, booking);

  function updateBooking(patch: Partial<BookingState>) {
    setBooking((prev) => ({ ...prev, ...patch }));
  }

  function updateForm(field: keyof BookingFormData, value: string) {
    setBooking((prev) => ({ ...prev, form: { ...prev.form, [field]: value } }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
    <section className="min-h-screen bg-[var(--color-alabaster)]" style={{ paddingTop: "96px", paddingBottom: "128px" }}>
      <div className="section-padding max-w-[1050px] mx-auto" ref={ref}>

        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/"
            className="tracking-luxury text-sm transition-opacity"
            style={{ color: "var(--color-taupe)", opacity: 0.75 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.75"; }}
          >
            {t("backLink")}
          </Link>
        </div>

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 flex flex-col gap-4"
        >
          <p className="tracking-luxury text-[var(--color-taupe)]">{t("label")}</p>
          <h1 className="text-[var(--color-charcoal)]">
            {t("title")}<br />
            <em className="text-[var(--color-taupe)]">{t("titleAccent")}</em>
          </h1>
        </motion.div>

        {/* Description — own breathing room before stepper */}
        <div className="mb-12 max-w-md" style={{ opacity: 0.7 }}>
          <p className="text-sm leading-relaxed text-[var(--color-charcoal)]">
            {t("description")}
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-10">
          <div style={{ marginTop: "48px", paddingBottom: "32px", marginBottom: "48px", borderBottom: "1px solid rgba(142,115,91,0.12)" }}>
            <BookingStepper currentStep={step} onStepClick={setStep} />
          </div>
        </div>

        {/* Step screens */}
        {submitted ? (
          <SuccessState state={booking} />
        ) : (
          <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {step === 0 && (
              <ServiceStep
                selectedId={booking.serviceId}
                onSelect={(id) => updateBooking({ serviceId: id })}
              />
            )}
            {step === 1 && (
              <SpecialistStep
                selectedId={booking.specialistId}
                onSelect={(id) => updateBooking({ specialistId: id })}
              />
            )}
            {step === 2 && (
              <DateTimeStep
                selectedDate={booking.date}
                selectedTime={booking.time}
                onDateSelect={(date) => updateBooking({ date, time: null })}
                onTimeSelect={(time) => updateBooking({ time })}
              />
            )}
            {step === 3 && (
              <SummaryStep
                state={booking}
                onFormChange={updateForm}
                onSubmit={handleSubmit}
              />
            )}

            {/* Back / Next navigation */}
            {step < 3 && (
              <div
                className="mt-16 flex items-center justify-between"
                style={{ borderTop: "1px solid rgba(142,115,91,0.12)", paddingTop: "40px" }}
              >
                <button
                  onClick={goBack}
                  className="tracking-[0.12em] text-xs uppercase transition-opacity flex items-center gap-2"
                  style={{
                    opacity: step === 0 ? 0 : 0.6,
                    pointerEvents: step === 0 ? "none" : "auto",
                    color: "var(--color-charcoal)",
                  }}
                  onMouseEnter={(e) => { if (step > 0) (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
                  onMouseLeave={(e) => { if (step > 0) (e.currentTarget as HTMLButtonElement).style.opacity = "0.6"; }}
                >
                  ← {t("back")}
                </button>
                <button
                  onClick={() => isReady && proceed()}
                  disabled={!isReady}
                  className="flex items-center gap-2 tracking-[0.12em] text-xs uppercase transition-all duration-300 group"
                  style={{
                    backgroundColor: isReady ? "var(--color-charcoal)" : "transparent",
                    color: isReady ? "#ffffff" : "rgba(142,115,91,0.5)",
                    border: `1px solid ${isReady ? "var(--color-charcoal)" : "rgba(142,115,91,0.2)"}`,
                    cursor: isReady ? "pointer" : "not-allowed",
                    padding: "16px 40px",
                  }}
                >
                  {t("next")} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>

    {/* Sticky Mobile CTA - only visible on mobile, respects safe area */}
    {!submitted && step < 3 && (
      <div
        className="fixed bottom-0 left-0 right-0 md:hidden z-40 transition-all duration-300"
        style={{
          paddingBottom: "calc(16px + env(safe-area-inset-bottom))",
          paddingTop: "16px",
          paddingLeft: "20px",
          paddingRight: "20px",
          background: "linear-gradient(to top, rgba(253,248,245,1) 0%, rgba(253,248,245,1) 70%, rgba(253,248,245,0) 100%)",
        }}
      >
        <button
          onClick={() => isReady && proceed()}
          disabled={!isReady}
          className="w-full tracking-[0.12em] text-sm uppercase font-medium transition-all duration-300"
          style={{
            backgroundColor: isReady ? "var(--color-charcoal)" : "rgba(142,115,91,0.3)",
            color: isReady ? "#ffffff" : "rgba(45,45,45,0.4)",
            padding: "18px 24px",
            border: "none",
            cursor: isReady ? "pointer" : "not-allowed",
          }}
          onMouseDown={(e) => {
            if (isReady) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#ffffff";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--color-charcoal)";
              (e.currentTarget as HTMLButtonElement).style.border = "1px solid var(--color-charcoal)";
            }
          }}
          onMouseUp={(e) => {
            if (isReady) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-charcoal)";
              (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
              (e.currentTarget as HTMLButtonElement).style.border = "none";
            }
          }}
          onTouchStart={(e) => {
            if (isReady) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#ffffff";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--color-charcoal)";
              (e.currentTarget as HTMLButtonElement).style.border = "1px solid var(--color-charcoal)";
            }
          }}
          onTouchEnd={(e) => {
            if (isReady) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-charcoal)";
              (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
              (e.currentTarget as HTMLButtonElement).style.border = "none";
            }
          }}
        >
          {t("next")}
        </button>
      </div>
    )}
    </>
  );
}
