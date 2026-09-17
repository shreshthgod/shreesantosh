"use client";

import { useRef, useState } from "react";
import { products } from "@/data/products";
import { packaging } from "@/data/packaging";
import { siteConfig } from "@/data/site-config";
import {
  type EnquiryFormData,
  type EnquiryFormErrors,
  submitEnquiry,
  validateEnquiryForm,
} from "@/lib/whatsapp";
import { useEnquirySelection } from "@/components/enquiry-context";
import { Reveal } from "@/components/reveal";
import { RollingText } from "@/components/rolling-text";
import { cn } from "@/lib/utils";

type FieldName = keyof EnquiryFormData;
type Status = "idle" | "submitting" | "success" | "prepared" | "error";

const emptyForm: EnquiryFormData = {
  name: "",
  company: "",
  phone: "",
  email: "",
  grade: "",
  quantity: "",
  packing: "",
  message: "",
};

const fieldLabels: Record<FieldName, string> = {
  name: "Name",
  company: "Company",
  phone: "Phone",
  email: "Email",
  grade: "Required grade",
  quantity: "Quantity",
  packing: "Packing",
  message: "Message",
};

// Visual order, used to focus the first invalid field.
const fieldOrder: FieldName[] = ["name", "company", "phone", "email", "grade", "quantity", "packing", "message"];

const NOT_SURE = "Not sure — need assistance";

const gradeOptions = [...products.map((p) => ({ value: p.name, label: `${p.name} (${p.category})` })), { value: NOT_SURE, label: NOT_SURE }];

const quantityOptions = [
  { value: "25 KG", label: "25 KG" },
  { value: "50 KG", label: "50 KG" },
  { value: "Custom quantity", label: "Custom quantity" },
];

const packingOptions = [
  ...packaging.standard.map((p) => ({ value: p.size, label: `${p.size} (Standard)` })),
  ...packaging.onDemand.map((p) => ({ value: p.size, label: `${p.size} (On demand)` })),
  { value: "Custom requirement", label: "Custom requirement" },
];

function Field({
  name,
  required,
  helper,
  error,
  className,
  children,
}: {
  name: FieldName;
  required?: boolean;
  helper?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-label font-bold uppercase">
        {fieldLabels[name]}
        {required ? <span aria-hidden="true"> *</span> : <span className="font-normal text-muted-foreground"> (optional)</span>}
      </label>
      {children}
      {helper && !error && (
        <p id={`${name}-helper`} className="mt-2 text-sm text-muted-foreground">
          {helper}
        </p>
      )}
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function Enquiry() {
  const { grade, packing } = useEnquirySelection();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<EnquiryFormData>(emptyForm);
  const [errors, setErrors] = useState<EnquiryFormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [summary, setSummary] = useState("");

  // Adjust form state during render when the shared selection changes,
  // rather than in an effect — avoids an extra cascading render.
  const [prevSelection, setPrevSelection] = useState({ grade, packing });
  if (prevSelection.grade !== grade || prevSelection.packing !== packing) {
    setPrevSelection({ grade, packing });
    setFormData((prev) => ({
      ...prev,
      grade: grade || prev.grade,
      packing: packing || prev.packing,
    }));
  }

  const helpers: Partial<Record<FieldName, string>> = {
    phone: "Include your country code. We reply on WhatsApp or by phone.",
    quantity: "Standard supply is in 25 KG and 50 KG sacks.",
  };

  const control = (field: FieldName, required = false) => {
    const error = errors[field];
    const describedBy = error ? `${field}-error` : helpers[field] ? `${field}-helper` : undefined;
    return {
      id: field,
      name: field,
      value: formData[field] ?? "",
      required,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": describedBy,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
          const next = validateEnquiryForm({ ...formData, [field]: value }).errors[field];
          setErrors((prev) => ({ ...prev, [field]: next }));
        }
      },
      onBlur: () => {
        const next = validateEnquiryForm(formData).errors[field];
        setErrors((prev) => ({ ...prev, [field]: next }));
      },
      className: cn(
        "mt-2 block min-h-12 w-full rounded-none border-0 border-b bg-transparent px-0 py-3 text-body text-foreground placeholder:text-muted-foreground",
        "focus:outline-none focus-visible:outline-none focus:shadow-[0_1px_0_0_var(--foreground)]",
        error ? "border-destructive focus:border-destructive" : "border-input focus:border-foreground"
      ),
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateEnquiryForm(formData);
    setErrors(validation.errors);

    if (!validation.isValid) {
      const invalid = fieldOrder.filter((f) => validation.errors[f]);
      setSummary(`${invalid.length} ${invalid.length === 1 ? "field needs" : "fields need"} attention: ${invalid.map((f) => fieldLabels[f]).join(", ")}.`);
      formRef.current?.querySelector<HTMLElement>(`#${invalid[0]}`)?.focus();
      return;
    }

    setSummary("");
    setStatus("submitting");
    try {
      if (submitEnquiry(formData)) {
        setStatus("success");
        setTimeout(() => {
          setFormData(emptyForm);
          setStatus("idle");
        }, 6000);
      } else {
        setStatus("prepared");
      }
    } catch {
      setStatus("error");
    }
  };

  const filledFields = fieldOrder.filter((f) => formData[f]);

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-border bg-background py-24 text-foreground lg:py-30">
      <div className="grid grid-cols-1 gap-8 px-(--gutter) lg:grid-cols-[var(--col-label)_1fr] lg:gap-0">
        <Reveal className="flex items-baseline justify-between lg:block lg:pr-8">
          <p className="text-ui font-medium uppercase">Enquiry</p>
          <p className="text-label tabular-nums text-muted-foreground lg:mt-3">05</p>
        </Reveal>

        <div>
          <Reveal delay={40}>
            <h2 id="contact-title" className="max-w-[20ch] text-display font-medium uppercase tracking-[-0.01em]">
              Tell us what you need.
            </h2>
            <p className="mt-6 max-w-[52ch] text-lead text-muted-foreground">
              Share your grade, quantity and packing preference. We&apos;ll come back with
              availability and pricing.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-16 lg:mt-16 xl:grid-cols-[1fr_16rem] xl:gap-20">
            <Reveal delay={60}>
              <form ref={formRef} onSubmit={handleSubmit} noValidate aria-describedby="form-required-note" className="space-y-12">
                <p id="form-required-note" className="text-label text-muted-foreground">
                  Fields marked * are required.
                </p>

                <fieldset className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
                  <legend className="mb-6 text-ui font-bold uppercase">Your details</legend>
                  <Field name="name" required error={errors.name}>
                    <input type="text" autoComplete="name" {...control("name", true)} />
                  </Field>
                  <Field name="company">
                    <input type="text" autoComplete="organization" {...control("company")} />
                  </Field>
                  <Field name="phone" required helper={helpers.phone} error={errors.phone}>
                    <input type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" {...control("phone", true)} />
                  </Field>
                  <Field name="email" error={errors.email}>
                    <input type="email" inputMode="email" autoComplete="email" placeholder="name@company.com" {...control("email")} />
                  </Field>
                </fieldset>

                <fieldset className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
                  <legend className="mb-6 text-ui font-bold uppercase">Your requirement</legend>
                  <Field name="grade" required error={errors.grade}>
                    <select {...control("grade", true)}>
                      <option value="">Select a grade</option>
                      {gradeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field name="quantity" required helper={helpers.quantity} error={errors.quantity}>
                    <select {...control("quantity", true)}>
                      <option value="">Select quantity</option>
                      {quantityOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field name="packing" className="sm:col-span-2">
                    <select {...control("packing")}>
                      <option value="">Select packing</option>
                      {packingOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                </fieldset>

                <fieldset>
                  <legend className="mb-6 text-ui font-bold uppercase">Anything else</legend>
                  <Field name="message">
                    <textarea rows={4} placeholder="Delivery location, timeline, or questions" {...control("message")} />
                  </Field>
                </fieldset>

                <div role="alert" className={cn("text-body font-medium text-destructive", !summary && "sr-only")}>
                  {summary}
                </div>

                <div role="status" aria-live="polite">
                  {status === "success" && (
                    <div className="border border-foreground p-5">
                      <p className="text-ui font-bold uppercase">WhatsApp is open with your enquiry</p>
                      <p className="mt-2 text-body text-muted-foreground">Review the message and press Send to complete it.</p>
                    </div>
                  )}
                  {status === "prepared" && (
                    <div className="border border-foreground p-5">
                      <p className="text-ui font-bold uppercase">Your enquiry is ready</p>
                      <p className="mt-2 text-body text-muted-foreground">
                        WhatsApp isn&apos;t connected yet. Share these details by phone or email using the contacts beside this form.
                      </p>
                      <dl className="mt-4 grid grid-cols-[7rem_1fr] gap-y-1 text-body">
                        {filledFields.map((key) => (
                          <div key={key} className="contents">
                            <dt className="text-muted-foreground">{fieldLabels[key]}</dt>
                            <dd>{formData[key]}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}
                  {status === "error" && (
                    <p className="border border-destructive p-5 text-body text-destructive">
                      WhatsApp couldn&apos;t open. Try again, or contact us by phone or email.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  aria-busy={status === "submitting"}
                  className="group/roll inline-flex min-h-14 w-full items-center justify-center gap-2 bg-foreground px-8 text-ui font-medium uppercase text-background transition-[opacity,transform] duration-150 active:scale-[0.98] disabled:opacity-50 sm:w-auto"
                >
                  <span aria-hidden="true" className="block size-[11px] bg-current transition-transform duration-300 ease-tonalli group-hover/roll:-translate-x-1" />
                  <RollingText text={status === "submitting" ? "Sending" : "Send enquiry"} />
                </button>
              </form>
            </Reveal>

            <Reveal delay={80}>
              <h3 className="text-ui font-bold uppercase">Contact directly</h3>
              <dl className="mt-6 space-y-6">
                {[
                  ["Phone", siteConfig.contact.phone],
                  ["E-mail", siteConfig.contact.email],
                  ["Address", siteConfig.contact.address],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-label font-bold uppercase">{label}</dt>
                    <dd className="mt-1 break-words text-body text-muted-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
