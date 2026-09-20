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
  /** Registered trading name, for the footer legal line and Organization schema. */
  legalName: string;
  shortName: string;
  /** Two-line header/footer lockup. The only place the name is split for display. */
  wordmark: { line1: string; line2: string };
  /** Initials mark, for the favicon and the collapsed mobile header. */
  monogram: string;
  /** Optional trust signals. Rendered only when `isConfigured()` passes. */
  established: string;
  gstin: string;
  tagline: string;
  description: string;
  product: string;
  url: string;
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
