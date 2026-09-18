"use client";

import { createContext, useContext, useMemo, useState } from "react";

interface EnquirySelection {
  grade: string;
  setGrade: (grade: string) => void;
}

const EnquiryContext = createContext<EnquirySelection | null>(null);

// Lets a product card preselect its grade in the enquiry form.
export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [grade, setGrade] = useState("");
  const value = useMemo(() => ({ grade, setGrade }), [grade]);
  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquirySelection() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquirySelection must be used within EnquiryProvider");
  return ctx;
}
