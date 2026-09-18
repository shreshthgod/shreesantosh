import type { Feature } from "@/types/business";

export const features: Feature[] = [
  {
    id: "quality-selection",
    title: "Quality-based selection",
    description: "Different grades available according to your specific quality requirement and application.",
    icon: "award",
  },
  {
    id: "pack-options",
    title: "Multiple pack options",
    description: "25 kg and 50 kg standard availability, with smaller packs (50g–2kg) available on demand.",
    icon: "package",
  },
  {
    id: "farmer-sourcing",
    title: "Farmer sourcing",
    description: "Procurement begins with farmers and sourcing relationships that form the foundation of our supply chain.",
    icon: "users",
  },
  {
    id: "cleaning-sorting",
    title: "Cleaning & sorting",
    description: "Product goes through multi-stage cleaning and precision sorting before final grading.",
    icon: "filter",
  },
  {
    id: "bulk-supply",
    title: "Bulk supply",
    description: "Structured for customers with larger quantity requirements. Consistent batch-to-batch supply.",
    icon: "truck",
  },
  {
    id: "export-supply",
    title: "Export supply",
    description: "Process supports export-oriented supply where applicable, with compliant documentation.",
    icon: "globe",
  },
];

// Condensed for the About section: related features above are combined into four buyer benefits.
export const benefits: Feature[] = [
  {
    id: "quality-selection",
    title: "Quality-based selection",
    description: "Different grades available according to your specific quality requirement and application.",
    icon: "award",
  },
  {
    id: "pack-options",
    title: "Multiple pack options",
    description: "25 kg and 50 kg standard availability, with smaller packs (50g–2kg) available on demand.",
    icon: "package",
  },
  {
    id: "controlled-process",
    title: "Controlled process",
    description: "Farmer sourcing, multi-stage cleaning and precision sorting before final grading.",
    icon: "filter",
  },
  {
    id: "bulk-export-supply",
    title: "Bulk & export supply",
    description: "Consistent batch-to-batch supply for larger requirements, with export-oriented supply where applicable.",
    icon: "globe",
  },
];

export default features;
