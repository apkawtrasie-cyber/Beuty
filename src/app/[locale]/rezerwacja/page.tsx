import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Navigation from "@/components/navigation/index";
import Footer from "@/components/footer/index";
import BookingPage from "@/components/BookingPage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("bookingTitle"),
    description: t("bookingDescription"),
  };
}

export default function Rezerwacja() {
  return (
    <>
      <Navigation />
      <main>
        <BookingPage />
      </main>
      <Footer />
    </>
  );
}
