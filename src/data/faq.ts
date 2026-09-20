export interface Faq {
  id: string;
  question: string;
  // Plain text only — reused verbatim in FAQPage structured data.
  answer: string;
  link: { label: string; href: string };
}

// Answers state only verified facts from products/packaging/process data.
// No pricing, MOQ, timelines or certifications are claimed (unverified).
export const faqs: Faq[] = [
  {
    id: "grades",
    question: "What grades of poppy seeds do you supply?",
    answer:
      "Four Super Fine grades: King, Shubh Laxmi, Shri and White Tinopal. Each is selected, cleaned and sorted to its own specification — King for the highest uniformity, Shubh Laxmi for commercial production, Shri for reliable everyday use, and White Tinopal for buyers seeking the distinctive white variety.",
    link: { label: "Compare grades", href: "#grades" },
  },
  {
    id: "pack-sizes",
    question: "What pack sizes are available?",
    answer:
      "Standard supply is in 25 kg and 50 kg bulk sacks. Smaller packs — 50 g, 100 g, 200 g, 500 g, 1 kg and 2 kg — are packed to order on demand, and specific packing can be arranged as per buyer requirement.",
    link: { label: "See packaging", href: "#packaging" },
  },
  {
    id: "retail-packs",
    question: "Can I order small retail packs?",
    answer:
      "Yes. Retail pouches from 50 g to 2 kg are available on demand and packed to order. Choose your preferred packing in the enquiry form and the team will confirm availability.",
    link: { label: "Send an enquiry", href: "#contact" },
  },
  {
    id: "custom-packing",
    question: "Do you offer custom packing?",
    answer:
      "Yes. Beyond the standard 25 kg and 50 kg sacks and the on-demand retail range, specific packing is arranged as per buyer requirement. Describe what you need in the enquiry form.",
    link: { label: "Ask about packaging", href: "#contact" },
  },
  {
    id: "bulk-export",
    question: "Do you handle bulk and export orders?",
    answer:
      "Yes. Supply is structured for larger quantity requirements with consistent batch-to-batch availability, and the process supports export-oriented supply with compliant documentation where applicable.",
    link: { label: "See the process", href: "#process" },
  },
  {
    id: "quality",
    question: "How is quality ensured?",
    answer:
      "Every batch moves through the same six controlled stages: farmer-level purchase, transport to the processing facility, multi-stage cleaning, optical and mechanical sorting, final quality grading, and export-ready packing with documentation.",
    link: { label: "See the process", href: "#process" },
  },
  {
    id: "how-to-enquire",
    question: "How do I request availability and pricing?",
    answer:
      "Share your required grade, quantity and packing preference through the enquiry form. Your details open directly in WhatsApp for one-tap sending — or copy them to share through any channel you prefer.",
    link: { label: "Start an enquiry", href: "#contact" },
  },
];

export default faqs;
