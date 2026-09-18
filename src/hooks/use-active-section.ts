"use client";

import { useEffect, useState } from "react";

// The active section is whichever one crosses the middle of the viewport; none while in the hero.
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    const sections = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const intersecting = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        }
        setActive(sections.find((s) => intersecting.has(s.id))?.id ?? null);
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
