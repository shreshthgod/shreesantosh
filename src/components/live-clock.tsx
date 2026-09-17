"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Kolkata",
});

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}

export function LiveClock({ className }: { className?: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () => formatter.format(new Date()),
    () => "--:--"
  );

  return (
    <time className={className} suppressHydrationWarning>
      {time}
    </time>
  );
}
