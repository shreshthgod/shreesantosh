import type { UseCase } from "@/types/business";

export const uses: UseCase[] = [
  {
    id: "gravies-curries",
    title: "Gravies & curries",
    description:
      "Ground white poppy seed paste is used as a thickening ingredient and contributes a nutty character to dishes such as North Indian kormas, South Indian kurmas and kootu.",
    icon: "bowl-rice",
    dishes: ["Korma", "Kurma", "Kootu", "Rich gravies"],
  },
  {
    id: "bengali-posto",
    title: "Bengali posto",
    description:
      "Poppy seeds, known as posto in Bengali cuisine, are central to dishes such as aloo posto and other regional preparations.",
    icon: "leaf",
    dishes: ["Aloo Posto", "Posto Bora", "Chingri Posto", "Dim Posto"],
  },
  {
    id: "sweets-desserts",
    title: "Sweets & desserts",
    description:
      "Poppy seeds can be used in preparations including kheer, halwa, milk sweets, and festive preparations such as anarasa.",
    icon: "cookie",
    dishes: ["Kheer", "Halwa", "Milk sweets", "Anarasa"],
  },
  {
    id: "regional-snacks",
    title: "Regional snacks",
    description:
      "Poppy seeds are also used in regional Indian preparations and stuffed or savoury snacks across various culinary traditions.",
    icon: "utensils",
    dishes: ["Stuffed parathas", "Savoury snacks", "Regional specialties", "Baked preparations"],
  },
];

export default uses;
