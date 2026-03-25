import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Navigation from "@/components/navigation/index";
import HeroSection from "@/components/hero";
import AboutSection from "@/components/about";
import ServicesSection from "@/components/services";
import BookingCTA from "@/components/booking-cta";
import ContactSection from "@/components/contact";
import Footer from "@/components/footer/index";
import MobileStickyButton from "@/components/MobileStickyButton";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    manifest: "/manifest.json",
    appleWebApp: { capable: true, statusBarStyle: "default", title: "RAW RITUAL" },
  };
}

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <div style={{ marginTop: "100px" }}><AboutSection /></div>
        <div style={{ marginTop: "100px" }}><ServicesSection /></div>
        <div style={{ marginTop: "100px" }}><BookingCTA /></div>
        <ContactSection />
      </main>
      <Footer />
      <MobileStickyButton />
    </>
  );
}
