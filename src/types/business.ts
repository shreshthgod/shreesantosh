export interface ProductGrade {
  id: string;
  name: string;
  category: string;
  description: string;
  availablePacks: string[];
  demandPacks: string[];
  features: string[];
  order: number;
}

export interface PackagingOption {
  size: string;
  label: string;
  description: string;
  available: boolean;
  onDemand?: boolean;
}

export interface PackagingData {
  standard: PackagingOption[];
  onDemand: PackagingOption[];
  custom: {
    label: string;
    description: string;
    available: boolean;
  };
  note: string;
}

export type ProcessIcon =
  | "hand"
  | "truck"
  | "sparkles"
  | "filter"
  | "check-circle"
  | "globe";

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: ProcessIcon;
  details: string[];
  order: number;
}

export type FeatureIcon =
  | "award"
  | "package"
  | "users"
  | "filter"
  | "truck"
  | "globe";

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: FeatureIcon;
}

export type UseIcon = "bowl-rice" | "leaf" | "cookie" | "utensils";

export interface UseCase {
  id: string;
  title: string;
  description: string;
  icon: UseIcon;
  dishes: string[];
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  product: string;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
  };
  cta: {
    primary: string;
    secondary: string;
    whatsapp: string;
  };
  nav: { label: string; href: string }[];
}
