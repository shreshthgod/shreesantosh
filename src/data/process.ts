import type { ProcessStep } from "@/types/business";

export const processSteps: ProcessStep[] = [
  {
    id: "purchase",
    number: "01",
    title: "Purchase",
    description:
      "Procurement from farmers and trusted sourcing network. Direct relationships ensure traceability and fair valuation at origin.",
    icon: "hand",
    details: [
      "Farmer-level procurement",
      "Transparent pricing",
      "Origin traceability",
      "Quality assessment at source",
    ],
    order: 1,
  },
  {
    id: "transport",
    number: "02",
    title: "Transport to factory",
    description:
      "Material transported to processing facility under controlled conditions to maintain integrity from farm to factory gate.",
    icon: "truck",
    details: ["Covered vehicles", "Moisture protection", "Timely transit", "Documentation chain"],
    order: 2,
  },
  {
    id: "cleaning",
    number: "03",
    title: "Cleaning",
    description:
      "Multi-stage cleaning removes foreign matter, dust, and impurities. Product passes through aspiration, screening, and density separation.",
    icon: "sparkles",
    details: ["Aspiration cleaning", "Screening & grading", "Density separation", "Metal detection"],
    order: 3,
  },
  {
    id: "sorting",
    number: "04",
    title: "Sorting",
    description:
      "Optical and mechanical sorting separates seeds by size, colour, and weight. Ensures uniformity within each quality grade.",
    icon: "filter",
    details: ["Optical sorting", "Size classification", "Colour separation", "Weight uniformity"],
    order: 4,
  },
  {
    id: "grading",
    number: "05",
    title: "Quality grading",
    description:
      "Final categorisation into applicable quality grades (King, Shubh Laxmi, Shri, White Tinopal) based on defined specifications.",
    icon: "check-circle",
    details: ["Grade classification", "Specification compliance", "Batch documentation", "Quality review"],
    order: 5,
  },
  {
    id: "export",
    number: "06",
    title: "Export",
    description:
      "Prepared product packed and supplied for domestic or export requirements as applicable. Compliant documentation and phytosanitary readiness.",
    icon: "globe",
    details: ["Export documentation", "Phytosanitary compliance", "Custom packing", "Global logistics"],
    order: 6,
  },
];

export default processSteps;
