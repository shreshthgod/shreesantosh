"use client";

import { createContext, useContext, useMemo, useState } from "react";

interface EnquirySelection {
  grade: string;
  packing: string;
  setGrade: (grade: string) => void;
  setPacking: (packing: string) => void;
}

const EnquiryContext = createContext<EnquirySelection | null>(null);

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [grade, setGrade] = useState("");
  const [packing, setPacking] = useState("");

  const value = useMemo(() => ({ grade, packing, setGrade, setPacking }), [grade, packing]);

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquirySelection() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquirySelection must be used within EnquiryProvider");
  return ctx;
}
