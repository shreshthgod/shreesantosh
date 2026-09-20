"use client";

import { useRef, useState } from "react";
import { Check, Copy, Info, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { products } from "@/data/products";
import { packaging } from "@/data/packaging";
import { buildWhatsAppMessage, type EnquiryFormData, type EnquiryFormErrors, openWhatsApp, validateEnquiryForm } from "@/lib/whatsapp";
import { getContactItems, type ContactItem } from "@/lib/contact";
import { sendEnquiry } from "@/app/actions/send-enquiry";
import { useEnquirySelection } from "@/components/enquiry-context";
import { Eyebrow } from "@/components/section-heading";
import { FormField, controlClass } from "@/components/form-field";
import { Button, ButtonLink } from "@/components/ui/button";
import { BotanicalStem, RingOutline } from "@/components/decor";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

type FieldName = keyof EnquiryFormData;
type Status = "idle" | "submitting" | "sent" | "prepared" | "error";
/** Which of the two delivery paths actually worked, so the confirmation can tell the truth. */
type Delivery = { email: boolean; whatsapp: boolean };

const emptyForm: EnquiryFormData = { name: "", company: "", phone: "", email: "", grade: "", quantity: "", packing: "", message: "" };

const labels: Record<FieldName, string> = {
  name: "Name",
  company: "Company",
  phone: "Phone",
  email: "Email",
  grade: "Required grade",
  quantity: "Quantity",
  packing: "Packing requirement",
  message: "Message",
};

const fieldOrder: FieldName[] = ["name", "company", "phone", "email", "grade", "quantity", "packing", "message"];

const NOT_SURE = "Not sure — need assistance";
const gradeOptions = [...products.map((p) => p.name), NOT_SURE];
const quantityOptions = [...packaging.standard.map((p) => p.size), NOT_SURE, "Custom"];
const packingOptions = [...packaging.onDemand.map((p) => p.size), "Custom"];

const contactIcons: Record<ContactItem["kind"], typeof Phone> = { phone: Phone, email: Mail, address: MapPin };

function SuccessMark() {
  return (
    <span aria-hidden="true" className="flex size-12 shrink-0 animate-pop items-center justify-center rounded-full bg-forest text-gold">
      <svg viewBox="0 0 24 24" className="size-6" fill="none">
        <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="30" className="animate-draw" />
      </svg>
    </span>
  );
}

export function Enquiry() {
  const contacts = getContactItems();
  const phone = contacts.find((c) => c.kind === "phone");
  const { grade } = useEnquirySelection();

  const formRef = useRef<HTMLFormElement>(null);
  const submitting = useRef(false);
  const [data, setData] = useState<EnquiryFormData>(emptyForm);
  const [errors, setErrors] = useState<EnquiryFormErrors>({});
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [delivery, setDelivery] = useState<Delivery>({ email: false, whatsapp: false });
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  // A grade's "Enquire" button preselects it here (adjusted during render, not in an effect).
  const [prevGrade, setPrevGrade] = useState(grade);
  if (grade !== prevGrade) {
    setPrevGrade(grade);
    if (grade) setData((prev) => ({ ...prev, grade }));
  }

  const bind = (field: FieldName, { required = false, helper = false } = {}) => ({
    id: field,
    name: field,
    value: data[field] ?? "",
    required,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : helper ? `${field}-helper` : undefined,
    className: controlClass,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const next = { ...data, [field]: e.target.value };
      setData(next);
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: validateEnquiryForm(next).errors[field] }));
    },
    onBlur: () => setErrors((prev) => ({ ...prev, [field]: validateEnquiryForm(data).errors[field] })),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting.current) return;

    const validation = validateEnquiryForm(data);
    setErrors(validation.errors);
    if (!validation.isValid) {
      const invalid = fieldOrder.filter((f) => validation.errors[f]);
      setSummary(`Please check ${invalid.length === 1 ? "1 field" : `${invalid.length} fields`}: ${invalid.map((f) => labels[f]).join(", ")}.`);
      formRef.current?.querySelector<HTMLElement>(`#${invalid[0]}`)?.focus();
      return;
    }

    setSummary("");
    setCopied(false);
    setErrorMessage("");
    submitting.current = true;
    setStatus("submitting");

    // WhatsApp first and synchronously: a window opened after an `await` is blocked as a pop-up.
    let whatsapp = false;
    try {
      whatsapp = openWhatsApp(buildWhatsAppMessage(data));
    } catch {
      whatsapp = false;
    }

    // Then email, so the lead survives even if the buyer never presses Send in WhatsApp.
    let result: Awaited<ReturnType<typeof sendEnquiry>>;
    try {
      result = await sendEnquiry(data);
    } catch {
      result = { status: "error", message: "We could not send your enquiry just now." };
    }

    const email = result.status === "sent";
    setDelivery({ email, whatsapp });
    if (email || whatsapp) {
      setStatus("sent");
    } else if (result.status === "error") {
      setErrorMessage(result.message);
      setStatus("error");
    } else {
      setStatus("prepared");
    }
    submitting.current = false;
  };

  const copyDetails = async () => {
    const text = fieldOrder
      .filter((f) => data[f])
      .map((f) => `${labels[f]}: ${data[f]}`)
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="on-dark grain section-space relative isolate overflow-hidden bg-forest text-cream">
      <RingOutline className="-left-24 top-24 size-72 border-gold/15" />
      <BotanicalStem className="absolute -right-4 bottom-0 -z-10 hidden h-[30rem] text-gold/15 lg:block" />

      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow tone="dark">Enquiry</Eyebrow>
          <h2 id="contact-title" className="mt-6 font-serif text-statement font-medium">
            Let&apos;s talk <em className="font-medium italic text-gold">supply.</em>
          </h2>
          <span aria-hidden="true" className="mt-8 block h-px w-24 bg-gold" />
          <p className="mt-8 max-w-md text-lead text-cream-muted">
            Share your required grade, quantity and packing preference, and we&apos;ll come back with availability and pricing.
          </p>

          {contacts.length > 0 && (
            <div className="mt-10">
              <ul className="space-y-3">
                {contacts.map((item) => {
                  const Icon = contactIcons[item.kind];
                  return (
                    <li key={item.kind} className="flex gap-3">
                      <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold" />
                      <span>
                        <span className="sr-only">{item.label}: </span>
                        {item.href ? (
                          <a href={item.href} className="underline decoration-gold/50 underline-offset-4 hover:decoration-gold">
                            {item.value}
                          </a>
                        ) : (
                          item.value
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
              {phone && (
                <ButtonLink href={phone.href} variant="outlineCream" arrow className="mt-6">
                  Call us
                </ButtonLink>
              )}
            </div>
          )}

          <dl className="mt-12 grid gap-6 border-t border-cream/15 pt-8 sm:grid-cols-3 lg:grid-cols-1">
            <div>
              <dt className="micro-label text-gold">Grades</dt>
              <dd className="mt-2 font-serif text-xl">{products.map((p) => p.name).join(" · ")}</dd>
            </div>
            <div>
              <dt className="micro-label text-gold">Standard packs</dt>
              <dd className="mt-2 font-serif text-xl">{packaging.standard.map((p) => p.size).join(" · ")}</dd>
            </div>
            <div>
              <dt className="micro-label text-gold">Retail packs</dt>
              <dd className="mt-2 font-serif text-xl">
                {packaging.onDemand[0].size} – {packaging.onDemand[packaging.onDemand.length - 1].size}
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="lg:col-span-7">
          <div className="rounded-xl bg-cream p-6 text-charcoal shadow-[0_50px_100px_-40px_rgb(0_0_0/0.55)] sm:p-10">
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-forest/15 pb-5">
                <p className="font-serif text-2xl font-semibold text-forest">Enquiry details</p>
                <p className="text-sm text-ink-muted">
                  <span className="text-terracotta-deep">*</span> Required
                </p>
              </div>

              <div className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                <FormField id="name" label={labels.name} required error={errors.name}>
                  <input type="text" autoComplete="name" {...bind("name", { required: true })} />
                </FormField>
                <FormField id="company" label={labels.company}>
                  <input type="text" autoComplete="organization" {...bind("company")} />
                </FormField>
                <FormField id="phone" label={labels.phone} required helper="Include country code, e.g. +91" error={errors.phone}>
                  <input type="tel" inputMode="tel" autoComplete="tel" {...bind("phone", { required: true, helper: true })} />
                </FormField>
                <FormField id="email" label={labels.email} error={errors.email}>
                  <input type="email" inputMode="email" autoComplete="email" {...bind("email")} />
                </FormField>
                <FormField id="grade" label={labels.grade} required error={errors.grade}>
                  <select {...bind("grade", { required: true })}>
                    <option value="">Select a grade</option>
                    {gradeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField id="quantity" label={labels.quantity} required error={errors.quantity}>
                  <select {...bind("quantity", { required: true })}>
                    <option value="">Select quantity</option>
                    {quantityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField id="packing" label={labels.packing} className="sm:col-span-2">
                  <select {...bind("packing")}>
                    <option value="">Select packing</option>
                    {packingOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField id="message" label={labels.message} className="sm:col-span-2">
                  <textarea rows={4} {...bind("message")} className={cn(controlClass, "h-auto min-h-28 py-3")} />
                </FormField>
              </div>

              <p role="alert" className="mt-5 text-sm font-semibold text-terracotta-deep empty:hidden">
                {summary}
              </p>

              <div role="status" aria-live="polite" className="empty:hidden">
                {status === "sent" && (
                  <div className="mt-6 flex animate-panel-in items-start gap-4 rounded-lg border border-forest/15 bg-warm-white p-5">
                    <SuccessMark />
                    <div>
                      <p className="font-serif text-2xl font-semibold text-forest">
                        {delivery.email ? "Enquiry sent" : "Enquiry ready in WhatsApp"}
                      </p>
                      <p className="mt-1 text-ink-muted">
                        {delivery.email
                          ? "We’ll reply within 1 working day."
                          : "Review the message in WhatsApp and press Send to complete your enquiry."}
                      </p>
                      {delivery.email && delivery.whatsapp && (
                        <p className="mt-1 text-ink-muted">
                          We&apos;ve also opened WhatsApp with your details — press Send there for the fastest reply.
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {status === "prepared" && (
                  <div className="mt-6 flex animate-panel-in items-start gap-4 rounded-lg border border-gold/40 bg-warm-white p-5">
                    <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-deep">
                      <Info className="size-6" />
                    </span>
                    <div>
                      <p className="font-serif text-2xl font-semibold text-forest">Your enquiry is ready to share</p>
                      <p className="mt-1 text-ink-muted">Online sending isn&apos;t connected yet. Copy your details to share them with our team directly.</p>
                      <Button variant="outlineForest" onClick={copyDetails} className="mt-4">
                        {copied ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
                        {copied ? "Copied" : "Copy details"}
                      </Button>
                    </div>
                  </div>
                )}
                {status === "error" && (
                  <div className="mt-6 flex animate-panel-in items-start gap-4 rounded-lg border border-terracotta-deep/40 bg-warm-white p-5">
                    <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-full bg-terracotta/20 text-terracotta-deep">
                      <Info className="size-6" />
                    </span>
                    <div>
                      <p className="font-serif text-2xl font-semibold text-terracotta-deep">{errorMessage || "We could not send your enquiry just now."}</p>
                      <p className="mt-1 text-ink-muted">
                        Your details are safe in the form. Try again{phone ? ", call us," : ","} or copy them to send another way.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <Button variant="outlineForest" onClick={copyDetails}>
                          {copied ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
                          {copied ? "Copied" : "Copy details"}
                        </Button>
                        {phone && (
                          <ButtonLink href={phone.href} variant="outlineForest">
                            Call {phone.value}
                          </ButtonLink>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button type="submit" size="lg" arrow={status !== "submitting"} disabled={status === "submitting"} className="mt-8 w-full sm:w-auto">
                {status === "submitting" && <Loader2 aria-hidden="true" className="size-4 animate-spin" />}
                {status === "submitting" ? "Sending…" : "Send enquiry"}
              </Button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
