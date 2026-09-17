import type { ProductGrade } from "@/types/business";

export const products: ProductGrade[] = [
  {
    id: "king",
    name: "King",
    category: "Super Fine",
    description:
      "Premium selected grade with superior uniformity and purity. Ideal for applications requiring the highest visual and sensory quality.",
    availablePacks: ["25 KG", "50 KG"],
    demandPacks: ["50 GM", "100 GM", "200 GM", "500 GM", "1 KG", "2 KG"],
    features: ["Highest uniformity", "Premium selection", "Export grade"],
    order: 1,
  },
  {
    id: "shubh-laxmi",
    name: "Shubh Laxmi",
    category: "Super Fine",
    description:
      "High-quality grade with excellent consistency. Well-suited for commercial food production and premium retail packing.",
    availablePacks: ["25 KG", "50 KG"],
    demandPacks: ["50 GM", "100 GM", "200 GM", "500 GM", "1 KG", "2 KG"],
    features: ["Excellent consistency", "Commercial grade", "Versatile application"],
    order: 2,
  },
  {
    id: "shri",
    name: "Shri",
    category: "Super Fine",
    description:
      "Quality grade offering reliable performance for standard culinary and industrial applications. Consistent sizing and cleanliness.",
    availablePacks: ["25 KG", "50 KG"],
    demandPacks: ["50 GM", "100 GM", "200 GM", "500 GM", "1 KG", "2 KG"],
    features: ["Reliable quality", "Standard grade", "Cost effective"],
    order: 3,
  },
  {
    id: "white-tinopal",
    name: "White Tinopal",
    category: "Super Fine",
    description:
      "Distinctive white variety with characteristic appearance. Selected for specific regional preferences and specialty applications.",
    availablePacks: ["25 KG", "50 KG"],
    demandPacks: ["50 GM", "100 GM", "200 GM", "500 GM", "1 KG", "2 KG"],
    features: ["White variety", "Specialty grade", "Regional preference"],
    order: 4,
  },
];

export const productCategories = ["Super Fine"];

export default products;
