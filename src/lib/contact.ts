import { siteConfig } from "@/data/site-config";

// Config values starting with ADD_ are unfilled placeholders and must never reach visitors.
export function isConfigured(value: string | undefined): value is string {
  return !!value && value.trim() !== "" && !value.startsWith("ADD_");
}

export interface ContactItem {
  kind: "phone" | "email" | "address";
  label: string;
  value: string;
  href?: string;
}

export function getContactItems(): ContactItem[] {
  const { phone, email, address } = siteConfig.contact;
  const items: ContactItem[] = [];
  if (isConfigured(phone)) items.push({ kind: "phone", label: "Phone", value: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}` });
  if (isConfigured(email)) items.push({ kind: "email", label: "Email", value: email, href: `mailto:${email}` });
  if (isConfigured(address)) items.push({ kind: "address", label: "Address", value: address });
  return items;
}
