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

/** Digits of the configured WhatsApp number, or null while it is still a placeholder. */
export function whatsAppDigits(): string | null {
  const raw = siteConfig.contact.whatsapp || "";
  if (raw.includes("ADD_")) return null;
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 10 ? digits : null;
}

export function isWhatsAppAvailable(): boolean {
  return whatsAppDigits() !== null;
}

/** Public profile link, used for the Organization `sameAs` entry. */
export function whatsAppProfileUrl(): string | null {
  const digits = whatsAppDigits();
  return digits ? `https://wa.me/${digits}` : null;
}

/**
 * Opens the WhatsApp hand-off. Must be called synchronously from the submit handler —
 * a window opened after an `await` is treated as a pop-up and blocked.
 */
export function openWhatsApp(message: string): boolean {
  const digits = whatsAppDigits();
  if (!digits) return false;
  window.open(`https://wa.me/${digits}?text=${message}`, "_blank", "noopener,noreferrer");
  return true;
}

export function submitEnquiry(formData: EnquiryFormData): boolean {
  return openWhatsApp(buildWhatsAppMessage(formData));
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
    errors.quantity = "Choose a quantity, “Not sure” or “Custom”.";
  }

  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Enter a full email address, e.g. name@company.com.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
