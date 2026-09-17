"use client";

import { useState } from "react";
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

const gradeOptions = products.map((p) => ({ value: p.name, label: `${p.name} (${p.category})` }));

const quantityOptions = [
  { value: "25 KG", label: "25 KG" },
  { value: "50 KG", label: "50 KG" },
  { value: "Custom", label: "Custom quantity" },
];

const packingOptions = [
  ...packaging.standard.map((p) => ({ value: p.size, label: `${p.size} (Standard)` })),
  ...packaging.onDemand.map((p) => ({ value: p.size, label: `${p.size} (On demand)` })),
  { value: "Custom", label: "Custom requirement" },
];

type Status = "idle" | "submitting" | "success" | "prepared" | "error";
type FieldName = keyof EnquiryFormData;

function Field({
  name,
  label,
  required,
  error,
  className,
  children,
}: {
  name: FieldName;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-xs font-bold uppercase leading-[14.4px]">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-[6px] text-xs uppercase leading-[14.4px] text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function Enquiry() {
  const { grade, packing } = useEnquirySelection();
  const [formData, setFormData] = useState<EnquiryFormData>(emptyForm);
  const [errors, setErrors] = useState<EnquiryFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");

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

  const visibleError = (field: FieldName) => (touched[field] ? errors[field] : undefined);

  const control = (field: FieldName) => ({
    id: field,
    name: field,
    value: formData[field] ?? "",
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { value } = e.target;
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (touched[field] && errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    onBlur: () => setTouched((prev) => ({ ...prev, [field]: true })),
    "aria-invalid": !!visibleError(field),
    "aria-describedby": visibleError(field) ? `${field}-error` : undefined,
    className: cn(
      "mt-3 w-full rounded-none border-0 border-b bg-transparent px-0 py-3 text-sm text-black placeholder:text-black/35 focus:outline-none focus:ring-0",
      visibleError(field) ? "border-destructive" : "border-black/25 focus:border-black"
    ),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateEnquiryForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setTouched(Object.keys(validation.errors).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      return;
    }

    setStatus("submitting");
    try {
      if (submitEnquiry(formData)) {
        setStatus("success");
        setStatusMessage("Your enquiry is ready. Open WhatsApp, review the details, and press Send to complete it.");
        setTimeout(() => {
          setFormData(emptyForm);
          setTouched({});
          setStatus("idle");
        }, 5000);
      } else {
        setStatus("prepared");
        setStatusMessage("WhatsApp is not configured yet. Your enquiry is prepared below — please contact us directly.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Something went wrong opening WhatsApp. Please try again or contact us directly.");
    }
  };

  return (
    <section id="contact" className="border-t border-black/12 bg-white py-[120px] text-black">
      <div className="grid grid-cols-1 gap-10 px-5 lg:grid-cols-[348px_1fr] lg:gap-0 lg:px-[30px]">
        <Reveal className="flex items-start justify-between pr-[30px] lg:block">
          <p className="text-sm font-medium uppercase leading-[14px]">Enquiry</p>
          <p className="text-xs leading-[14.4px] text-black/50 lg:mt-[15px]">05</p>
        </Reveal>

        <div>
          <Reveal delay={60}>
            <h2 className="max-w-[20ch] text-[clamp(28px,3.4vw,48px)] font-medium uppercase leading-[1.05] tracking-[-0.01em]">
              Tell us what you need.
            </h2>
            <p className="mt-6 max-w-[420px] text-sm leading-[19.6px] text-black/70">
              Share your required grade, quantity and packing preference. We&apos;ll respond with
              availability and pricing.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-16 xl:grid-cols-[1fr_260px] xl:gap-20">
            <Reveal delay={100}>
              <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
                <Field name="name" label="Name" required error={visibleError("name")}>
                  <input type="text" autoComplete="name" {...control("name")} />
                </Field>
                <Field name="company" label="Company">
                  <input type="text" autoComplete="organization" {...control("company")} />
                </Field>
                <Field name="phone" label="Phone" required error={visibleError("phone")}>
                  <input type="tel" autoComplete="tel" placeholder="+91 XXXXX XXXXX" {...control("phone")} />
                </Field>
                <Field name="email" label="Email" error={visibleError("email")}>
                  <input type="email" autoComplete="email" placeholder="you@example.com" {...control("email")} />
                </Field>
                <Field name="grade" label="Required grade" required error={visibleError("grade")}>
                  <select {...control("grade")}>
                    <option value="">Select a grade</option>
                    {gradeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                    <option value="not-sure">Not sure / need assistance</option>
                  </select>
                </Field>
                <Field name="quantity" label="Quantity" required error={visibleError("quantity")}>
                  <select {...control("quantity")}>
                    <option value="">Select quantity</option>
                    {quantityOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field name="packing" label="Packing requirement" className="sm:col-span-2">
                  <select {...control("packing")}>
                    <option value="">Select packing (optional)</option>
                    {packingOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field name="message" label="Message" className="sm:col-span-2">
                  <textarea rows={3} placeholder="Specific requirements, delivery timeline, or questions…" {...control("message")} />
                </Field>

                {(status === "success" || status === "prepared") && (
                  <div role="status" aria-live="polite" className="border border-black p-5 text-xs leading-[16.8px] sm:col-span-2">
                    <p className="font-bold uppercase">{statusMessage}</p>
                    {status === "prepared" && (
                      <dl className="mt-4 grid grid-cols-[110px_1fr] gap-y-1 uppercase">
                        {(Object.keys(formData) as FieldName[])
                          .filter((key) => formData[key])
                          .map((key) => (
                            <div key={key} className="contents">
                              <dt className="text-black/50">{key}</dt>
                              <dd>{formData[key]}</dd>
                            </div>
                          ))}
                      </dl>
                    )}
                  </div>
                )}

                {status === "error" && (
                  <p role="alert" className="border border-destructive p-5 text-xs uppercase leading-[16.8px] text-destructive sm:col-span-2">
                    {statusMessage}
                  </p>
                )}

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    aria-busy={status === "submitting"}
                    className="group/roll inline-flex items-center gap-[6px] bg-black px-8 py-5 text-sm font-medium uppercase leading-[16.8px] text-white transition-opacity disabled:opacity-50"
                  >
                    <span className="block h-[11px] w-[11px] bg-current transition-transform duration-[450ms] ease-tonalli group-hover/roll:-translate-x-1" />
                    <RollingText text={status === "submitting" ? "Submitting" : "Submit enquiry"} />
                  </button>
                </div>
              </form>
            </Reveal>

            <Reveal delay={140}>
              <dl className="space-y-6 text-xs uppercase leading-[14.4px]">
                {[
                  ["Phone", siteConfig.contact.phone],
                  ["E-mail", siteConfig.contact.email],
                  ["Address", siteConfig.contact.address],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="font-bold">{label}</dt>
                    <dd className="mt-[3px] text-black/60">{value}</dd>
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
