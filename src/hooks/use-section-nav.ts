"use client";

import { useCallback } from "react";
import { useLenis } from "lenis/react";
import { useReducedMotion } from "./use-reduced-motion";

const HEADER_OFFSET = -80;

// Scrolls to an in-page section, moves keyboard focus there, and keeps the URL shareable.
export function useSectionNav() {
  const lenis = useLenis();
  const reduced = useReducedMotion();

  const goTo = useCallback(
    (href: string) => {
      const target = href === "#home" || href === "#top" ? document.getElementById("home") : document.querySelector<HTMLElement>(href);
      if (!target) return;

      const focusTarget = () => {
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      };

      if (lenis) {
        lenis.scrollTo(target, { offset: HEADER_OFFSET, immediate: reduced, onComplete: focusTarget });
        if (reduced) focusTarget();
      } else {
        target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
        focusTarget();
      }
      history.replaceState(null, "", href);
    },
    [lenis, reduced]
  );

  const onNavClick = useCallback(
    (href: string, before?: () => void) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      before?.();
      goTo(href);
    },
    [goTo]
  );

  return { goTo, onNavClick };
}
