"use client";

import { useCallback, useId, useRef, useState } from "react";

// WAI-ARIA tabs with automatic activation: arrow keys, Home and End move and select.
export function useTabs(count: number, initial = 0) {
  const [active, setActive] = useState(initial);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const select = useCallback(
    (index: number, focus = false) => {
      const next = (index + count) % count;
      setActive(next);
      if (focus) tabRefs.current[next]?.focus();
    },
    [count]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: count - 1,
    };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key], true);
    }
  };

  const tabProps = (index: number) => ({
    ref: (el: HTMLButtonElement | null) => {
      tabRefs.current[index] = el;
    },
    id: `${baseId}-tab-${index}`,
    role: "tab" as const,
    type: "button" as const,
    "aria-selected": active === index,
    "aria-controls": `${baseId}-panel`,
    tabIndex: active === index ? 0 : -1,
    onClick: () => select(index),
    onKeyDown,
  });

  const panelProps = () => ({
    id: `${baseId}-panel`,
    role: "tabpanel" as const,
    "aria-labelledby": `${baseId}-tab-${active}`,
    tabIndex: 0,
  });

  return { active, select, tabProps, panelProps };
}
