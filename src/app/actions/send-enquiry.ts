"use server";

import { siteConfig } from "@/data/site-config";
import { type EnquiryFormData, validateEnquiryForm } from "@/lib/whatsapp";

/**
 * Second delivery path for enquiries.
 *
 * The WhatsApp hand-off is fast but lossy: if the buyer abandons the tab before pressing
 * Send, the lead is gone and we never knew it existed. This action emails every valid
 * enquiry to the owner so the lead survives regardless of what happens in WhatsApp.
 *
 * Runs server-side only, so the API key and the email template never reach the browser.
 */

export type SendEnquiryResult =
  /** Delivered to the owner's inbox. */
  | { status: "sent" }
  /** No email provider configured yet — the caller falls back to WhatsApp or copy-details. */
  | { status: "unconfigured" }
  /** Configured but the send failed. `message` is safe to show a visitor. */
  | { status: "error"; message: string };

const MAX_FIELD_LENGTH = 2000;
const REQUEST_TIMEOUT_MS = 10_000;

const FIELDS: { key: keyof EnquiryFormData; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "company", label: "Company" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "grade", label: "Required grade" },
  { key: "quantity", label: "Quantity" },
  { key: "packing", label: "Packing requirement" },
  { key: "message", label: "Message" },
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Trim, clamp, and strip the CR/LF that would let a value break out of a header. */
function clean(value: string | undefined): string {
  return (value ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, MAX_FIELD_LENGTH);
}

function buildEmail(data: EnquiryFormData) {
  const rows = FIELDS.map(({ key, label }) => ({ label, value: clean(data[key]) })).filter((row) => row.value);

  const subject = `New enquiry — ${clean(data.name)} · ${clean(data.grade)}`;
  const text = [`New enquiry from the ${siteConfig.name} website.`, "", ...rows.map((r) => `${r.label}: ${r.value}`)].join("\n");
  const html = [
    `<h2 style="font-family:Georgia,serif;color:#12372a">New enquiry — ${escapeHtml(siteConfig.name)}</h2>`,
    `<table style="font-family:system-ui,sans-serif;font-size:15px;border-collapse:collapse">`,
    ...rows.map(
      (r) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#4a554c;vertical-align:top">${escapeHtml(r.label)}</td>` +
        `<td style="padding:6px 0;color:#172019"><strong>${escapeHtml(r.value)}</strong></td></tr>`,
    ),
    `</table>`,
  ].join("");

  return { subject, text, html, replyTo: clean(data.email) || undefined };
}

export async function sendEnquiry(data: EnquiryFormData): Promise<SendEnquiryResult> {
  // Never trust the client: the same rules that gate the button gate the send.
  if (!validateEnquiryForm(data).isValid) {
    return { status: "error", message: "Some details were missing. Please check the form and try again." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  if (!apiKey || !to) return { status: "unconfigured" };

  const from = process.env.ENQUIRY_FROM_EMAIL || "onboarding@resend.dev";
  const { subject, text, html, replyTo } = buildEmail(data);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject, text, html, ...(replyTo && { reply_to: replyTo }) }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      // Log the provider's reason for us; show the visitor something they can act on.
      console.error("[enquiry] Resend rejected the send:", response.status, await response.text().catch(() => ""));
      return { status: "error", message: "We could not send your enquiry just now." };
    }

    return { status: "sent" };
  } catch (error) {
    console.error("[enquiry] Email delivery failed:", error);
    return { status: "error", message: "We could not send your enquiry just now." };
  }
}
