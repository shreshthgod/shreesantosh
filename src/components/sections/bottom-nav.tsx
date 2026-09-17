"use client";

import { useEffect, useState } from "react";
import { RollingText } from "@/components/rolling-text";
import { LiveClock } from "@/components/live-clock";
import { SectionLink } from "@/components/section-link";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
import { primaryNav } from "./site-header";

const sectionIds = primaryNav.map((item) => item.href.slice(1));

// Fixed overlays must not sit on top of form fields or footer content.
function useBottomCovered() {
  const [covered, setCovered] = useState(false);

  useEffect(() => {
    const targets = [document.getElementById("contact"), document.querySelector("footer")].filter((el): el is HTMLElement => el !== null);
    const intersecting = new Map<Element, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => intersecting.set(entry.target, entry.isIntersecting));
        setCovered([...intersecting.values()].some(Boolean));
      },
      { rootMargin: "-88% 0px 0px 0px" }
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return covered;
}

export function BottomNav() {
  const active = useActiveSection(sectionIds);
  const covered = useBottomCovered();

  return (
    <nav
      data-page-layer=""
      aria-label="Sections"
      inert={covered}
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 hidden items-end justify-between px-(--gutter) pb-3 text-ui font-medium uppercase text-white mix-blend-difference transition-opacity duration-200 lg:flex",
        covered ? "opacity-0" : "opacity-100"
      )}
    >
      <ul className="flex">
        {primaryNav.map((link) => {
          const current = active === link.href.slice(1);
          return (
            <li key={link.href} className="w-[9.5rem] xl:w-[11.125rem]">
              <SectionLink
                href={link.href}
                aria-current={current ? "true" : undefined}
                className="group/roll pointer-events-auto flex h-11 items-center gap-2"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "block size-1.5 bg-current transition-[opacity,transform] duration-300 ease-tonalli",
                    current ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  )}
                />
                <RollingText text={link.label} className={cn("transition-transform duration-300 ease-tonalli", !current && "-translate-x-3.5")} />
              </SectionLink>
            </li>
          );
        })}
      </ul>
      <p className="flex h-11 items-center gap-2.5 leading-none">
        <span>India</span>
        <LiveClock className="tabular-nums" />
      </p>
    </nav>
  );
}
