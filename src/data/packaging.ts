import type { PackagingData } from "@/types/business";

export const packaging: PackagingData = {
  standard: [
    { size: "25 KG", label: "25 KG", description: "Standard bulk sack", available: true },
    { size: "50 KG", label: "50 KG", description: "Standard bulk sack", available: true },
  ],
  onDemand: [
    { size: "50 GM", label: "50 GM", description: "Retail pouch", available: true, onDemand: true },
    { size: "100 GM", label: "100 GM", description: "Retail pouch", available: true, onDemand: true },
    { size: "200 GM", label: "200 GM", description: "Retail pouch", available: true, onDemand: true },
    { size: "500 GM", label: "500 GM", description: "Retail pack", available: true, onDemand: true },
    { size: "1 KG", label: "1 KG", description: "Retail pack", available: true, onDemand: true },
    { size: "2 KG", label: "2 KG", description: "Retail pack", available: true, onDemand: true },
  ],
  custom: {
    label: "Custom requirement",
    description: "Specific packing as per buyer requirement",
    available: true,
  },
  note: "Smaller pack sizes (50g–2kg) are available on demand only. Standard supply is in 25kg and 50kg sacks.",
};

export default packaging;
