import type { SiteConfig } from "@/types/business";

// The single source of truth for every brand string on the site. Nothing here may be
// duplicated in a component: the wordmark, preloader, footer, metadata, JSON-LD and the
// WhatsApp/email templates all read from this object.
export const siteConfig: SiteConfig = {
  name: "Shree Santosh Traders",
  legalName: "Shree Santosh Traders",
  shortName: "Shree Santosh",
  wordmark: { line1: "Shree Santosh", line2: "Traders" },
  monogram: "SS",
  // Placeholders — shown only once replaced with verified values (see lib/contact.ts).
  established: "ADD_YEAR",
  gstin: "ADD_GSTIN",
  tagline: "Quality selected. Carefully processed. Reliably supplied.",
  description:
    "Shree Santosh Traders supplies quality-graded poppy seeds for customers seeking consistent selection, professional processing and dependable bulk supply.",
  product: "Poppy Seeds",
  // Production origin, e.g. https://www.example.com — enables canonical and Open Graph image URLs.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  contact: {
    // Placeholder — replace with verified business contact before launch.
    phone: "ADD_PHONE_NUMBER",
    whatsapp: "ADD_WHATSAPP_NUMBER",
    email: "ADD_EMAIL",
    address: "ADD_ADDRESS",
  },
  cta: {
    primary: "Enquire Now",
    secondary: "Explore Our Grades",
    whatsapp: "WhatsApp Us",
  },
  nav: [
    { label: "Home", href: "#home" },
    { label: "Grades", href: "#grades" },
    { label: "About", href: "#about" },
    { label: "Packaging", href: "#packaging" },
    { label: "Process", href: "#process" },
    { label: "Uses", href: "#uses" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
};

export default siteConfig;
