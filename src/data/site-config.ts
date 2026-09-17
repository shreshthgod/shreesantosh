import type { SiteConfig } from "@/types/business";

export const siteConfig: SiteConfig = {
  name: "Shrisantosh Traders",
  shortName: "Shrisantosh",
  tagline: "Quality selected. Carefully processed. Reliably supplied.",
  description:
    "Shrisantosh Traders supplies quality-graded poppy seeds for customers seeking consistent selection, professional processing and dependable bulk supply.",
  product: "Poppy Seeds",
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
    { label: "About", href: "#about" },
    { label: "Grades", href: "#grades" },
    { label: "Packaging", href: "#packaging" },
    { label: "Process", href: "#process" },
    { label: "Uses", href: "#uses" },
    { label: "Contact", href: "#contact" },
  ],
};

export default siteConfig;
