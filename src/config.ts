/**
 * -------------------------------------------------------------------
 *  SITE CONFIG — edit these values to make the site yours.
 * -------------------------------------------------------------------
 *  brand:   the wordmark shown in the navbar / footer.
 *  email / phone / whatsapp / socials: used in the contact section.
 *  Everything else (copy) lives in src/i18n/translations.ts
 * -------------------------------------------------------------------
 */
export const siteConfig = {
  brand: "Meir Dahan",
  email: "meir558d@gmail.com",
  phone: "+972 54-382-1419",
  // WhatsApp number in international format, digits only:
  whatsapp: "972543821419",
  socials: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    behance: "https://behance.net",
  },
};

/** Initials for the logo badge, e.g. "Meir Dahan" -> "MD". */
export const brandInitials =
  siteConfig.brand
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "M";

export type Lang = "he" | "en";
