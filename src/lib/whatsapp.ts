import { siteConfig } from "@/data/site-config";

export interface EnquiryFormData {
  name: string;
  company?: string;
  phone: string;
  email?: string;
  grade: string;
  quantity: string;
  packing: string;
  message?: string;
}

export function buildWhatsAppMessage(formData: EnquiryFormData): string {
  const { name, company, phone, email, grade, quantity, packing, message } = formData;

  let msg = `*New Enquiry - ${siteConfig.name}*\n\n`;
  msg += `*Name:* ${name}\n`;
  if (company) msg += `*Company:* ${company}\n`;
  msg += `*Phone:* ${phone}\n`;
  if (email) msg += `*Email:* ${email}\n`;
  msg += `\n*Requirements:*\n`;
  msg += `- Grade: ${grade}\n`;
  msg += `- Quantity: ${quantity}\n`;
  msg += `- Packing: ${packing}\n`;
  if (message) msg += `\n*Message:* ${message}\n`;

  return encodeURIComponent(msg);
}

export function isWhatsAppAvailable(): boolean {
  const raw = siteConfig.contact.whatsapp || "";
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 10 && !raw.includes("ADD_");
}

export function openWhatsApp(message: string): boolean {
  const raw = siteConfig.contact.whatsapp || "";
  const digits = raw.replace(/\D/g, "");
  if (!digits || digits.length < 10 || raw.includes("ADD_")) {
    console.warn("[WhatsApp] Contact number not configured. Message ready but link unavailable.");
    return false;
  }
  const url = `https://wa.me/${digits}?text=${message}`;
  window.open(url, "_blank", "noopener,noreferrer");
  return true;
}

export function submitEnquiry(formData: EnquiryFormData): boolean {
  const message = buildWhatsAppMessage(formData);
  return openWhatsApp(message);
}

export type EnquiryFormErrors = Partial<Record<keyof EnquiryFormData, string>>;

export function validateEnquiryForm(formData: EnquiryFormData): {
  isValid: boolean;
  errors: EnquiryFormErrors;
} {
  const errors: EnquiryFormErrors = {};

  if (!formData.name?.trim()) {
    errors.name = "Enter your name so we know who to reply to.";
  }

  if (!formData.phone?.trim()) {
    errors.phone = "Enter a phone number so we can reach you.";
  } else if (formData.phone.replace(/\D/g, "").length < 10 || !/^[\d\s\-+()]+$/.test(formData.phone)) {
    errors.phone = "Use at least 10 digits, e.g. +91 98765 43210.";
  }

  if (!formData.grade) {
    errors.grade = "Choose a grade, or pick “Not sure”.";
  }

  if (!formData.quantity) {
    errors.quantity = "Choose a quantity, or pick “Custom quantity”.";
  }

  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Enter a full email address, e.g. name@company.com.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
