import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "pl", "fr", "it", "en"],
  defaultLocale: "de",
});
