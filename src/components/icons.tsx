import {
  Award,
  CheckCircle2,
  Cookie,
  Filter,
  Globe,
  Handshake,
  Leaf,
  Package,
  Soup,
  Sparkles,
  Truck,
  UtensilsCrossed,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { FeatureIcon, ProcessIcon, UseIcon } from "@/types/business";

export const featureIcons: Record<FeatureIcon, LucideIcon> = {
  award: Award,
  package: Package,
  users: Users,
  filter: Filter,
  truck: Truck,
  globe: Globe,
};

export const processIcons: Record<ProcessIcon, LucideIcon> = {
  hand: Handshake,
  truck: Truck,
  sparkles: Sparkles,
  filter: Filter,
  "check-circle": CheckCircle2,
  globe: Globe,
};

export const useIcons: Record<UseIcon, LucideIcon> = {
  "bowl-rice": Soup,
  leaf: Leaf,
  cookie: Cookie,
  utensils: UtensilsCrossed,
};
