"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/data/process";
import { processIcons } from "@/components/icons";
import { cn } from "@/lib/utils";

// One controlled tint per stage; the final stage lands on deep forest green.
const themes = [
  { bg: "#dde7d9", fg: "#172019", muted: "#3f4a41", accent: "#4e6b4a", line: "rgba(23,32,25,0.16)", dark: false },
  { bg: "#e6e4cb", fg: "#172019", muted: "#454733", accent: "#5b6630", line: "rgba(23,32,25,0.16)", dark: false },
  { bg: "#c9d8c4", fg: "#172019", muted: "#34413a", accent: "#12372a", line: "rgba(23,32,25,0.18)", dark: false },
  { bg: "#f2e4c3", fg: "#172019", muted: "#4d4632", accent: "#8a6420", line: "rgba(23,32,25,0.16)", dark: false },
  { bg: "#f2d5c5", fg: "#172019", muted: "#52402f", accent: "#9a4a2f", line: "rgba(23,32,25,0.16)", dark: false },
  { bg: "#12372a", fg: "#f6f0e4", muted: "#cfc8b6", accent: "#c49a45", line: "rgba(246,240,228,0.2)", dark: true },
];

function summary(text: string) {
  const index = text.indexOf(". ");
  return index === -1 ? text : text.slice(0, index + 1);
}

export function Process() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const sentinelBoxRef = useRef<HTMLDivElement>(null);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileRefs = useRef<(HTMLLIElement | null)[]>([]);
  const theme = themes[active];
  const step = processSteps[active];
  const StepIcon = processIcons[step.icon];

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    let observer: IntersectionObserver | null = null;

    const connect = () => {
      observer?.disconnect();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        },
        { rootMargin: "-50% 0px -50% 0px" }
      );
      const targets = desktop.matches ? sentinelRefs.current : mobileRefs.current;
      targets.forEach((el) => el && observer?.observe(el));
    };

    connect();
    desktop.addEventListener("change", connect);
    return () => {
      desktop.removeEventListener("change", connect);
      observer?.disconnect();
    };
  }, []);

  const goToStep = (index: number) => {
    setActive(index);
    const box = sentinelBoxRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    const target = window.scrollY + rect.top + ((index + 0.5) / processSteps.length) * rect.height - window.innerHeight / 2;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className={cn("relative transition-colors duration-(--dur-premium) ease-(--ease-premium)", theme.dark && "on-dark")}
      style={{ backgroundColor: theme.bg, color: theme.fg }}
    >
      <div ref={trackRef} className="relative lg:[@media(min-height:44rem)]:h-[260svh]">
        {/* Sentinels span only the pinned range (half a viewport in from each end), so stage 1 is live as pinning starts and stage 6 before it ends. */}
        <div ref={sentinelBoxRef} aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 top-0 hidden lg:block lg:[@media(min-height:44rem)]:bottom-[50svh] lg:[@media(min-height:44rem)]:top-[50svh]">
          {processSteps.map((s, i) => (
            <div
              key={s.id}
              ref={(el) => {
                sentinelRefs.current[i] = el;
              }}
              data-index={i}
              className="absolute inset-x-0"
              style={{ top: `${(i / processSteps.length) * 100}%`, height: `${100 / processSteps.length}%` }}
            />
          ))}
        </div>

        <div className="lg:[@media(min-height:44rem)]:sticky lg:[@media(min-height:44rem)]:top-0 lg:[@media(min-height:44rem)]:flex lg:[@media(min-height:44rem)]:h-svh lg:[@media(min-height:44rem)]:items-center">
          <div className="container-page section-space w-full lg:[@media(min-height:44rem)]:pb-8 lg:[@media(min-height:44rem)]:pt-[calc(var(--header-h)+1.5rem)]">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-6">
                <p className="micro-label flex items-center gap-3 transition-colors duration-(--dur-premium)" style={{ color: theme.muted }}>
                  <span aria-hidden="true" className="h-px w-10" style={{ backgroundColor: theme.accent }} />
                  Process
                </p>
                <h2 id="process-title" className="mt-5 font-serif text-display font-medium">
                  From farmer <em className="font-medium italic" style={{ color: theme.accent }}>to final grade.</em>
                </h2>
                <p className="mt-5 max-w-md text-lead" style={{ color: theme.muted }}>
                  Every batch moves through the same six controlled stages before it reaches you.
                </p>
              </div>

              <div key={step.id} className="hidden animate-panel-in lg:col-span-6 lg:block">
                <div className="flex items-end gap-6">
                  <span aria-hidden="true" className="font-serif text-[8rem] font-medium leading-[0.8]" style={{ color: theme.accent }}>
                    {step.number}
                  </span>
                  <div className="pb-2">
                    <StepIcon aria-hidden="true" className="size-7" strokeWidth={1.5} style={{ color: theme.accent }} />
                    <p className="mt-3 font-serif text-title font-medium">{step.title}</p>
                  </div>
                </div>
                <p className="mt-5 max-w-lg" style={{ color: theme.muted }}>
                  {step.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {step.details.map((detail) => (
                    <li key={detail} className="rounded-sm border px-3 py-1.5 text-sm font-medium" style={{ borderColor: theme.line }}>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Desktop: horizontal timeline */}
            <div className="mt-14 hidden lg:block">
              <div className="relative h-px" style={{ backgroundColor: theme.line }}>
                <div
                  className="absolute inset-y-0 left-0 w-full origin-left transition-transform duration-(--dur-premium) ease-(--ease-premium)"
                  style={{ transform: `scaleX(${(active + 1) / processSteps.length})`, backgroundColor: theme.accent, height: 2, top: -0.5 }}
                />
              </div>
              <ol className="mt-6 grid grid-cols-6 gap-5">
                {processSteps.map((s, i) => {
                  const Icon = processIcons[s.icon];
                  const current = i === active;
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => goToStep(i)}
                        aria-current={current ? "step" : undefined}
                        className="group/step flex w-full flex-col items-start text-left"
                      >
                        <span className="flex w-full items-center justify-between">
                          <span
                            className={cn("font-serif text-3xl font-medium transition-transform duration-(--dur-premium) ease-(--ease-premium)", current ? "scale-110" : "scale-100")}
                            style={{ color: current ? theme.accent : theme.muted, transformOrigin: "left bottom" }}
                          >
                            {s.number}
                          </span>
                          <Icon
                            aria-hidden="true"
                            strokeWidth={1.5}
                            className={cn("size-5 transition-[opacity,transform] duration-(--dur-premium)", current ? "translate-y-0 opacity-100" : "translate-y-1 opacity-40 group-hover/step:opacity-80")}
                            style={{ color: theme.accent }}
                          />
                        </span>
                        <span className={cn("mt-3 text-sm font-semibold uppercase tracking-[0.1em] transition-opacity", current ? "opacity-100" : "opacity-80 group-hover/step:opacity-100")}>
                          {s.title}
                        </span>
                        <span className="mt-2 text-sm leading-relaxed" style={{ color: theme.muted }}>
                          {summary(s.description)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Mobile and tablet: vertical timeline */}
            <ol className="relative mt-12 lg:hidden">
              <span aria-hidden="true" className="absolute bottom-6 left-[1.375rem] top-6 w-px" style={{ backgroundColor: theme.line }} />
              {processSteps.map((s, i) => {
                const Icon = processIcons[s.icon];
                const current = i === active;
                return (
                  <li
                    key={s.id}
                    ref={(el) => {
                      mobileRefs.current[i] = el;
                    }}
                    data-index={i}
                    aria-current={current ? "step" : undefined}
                    className="relative grid grid-cols-[2.75rem_1fr] gap-5 pb-10 last:pb-0"
                  >
                    <span
                      className="relative z-10 flex size-11 items-center justify-center rounded-full border transition-[background-color,border-color,color] duration-(--dur-premium)"
                      style={{
                        backgroundColor: current ? theme.accent : theme.bg,
                        borderColor: current ? theme.accent : theme.line,
                        color: current ? theme.bg : theme.accent,
                      }}
                    >
                      <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <p className="micro-label" style={{ color: theme.muted }}>
                        Stage {s.number}
                      </p>
                      <h3 className="mt-1 font-serif text-2xl font-medium">{s.title}</h3>
                      <p className="mt-2 leading-relaxed" style={{ color: theme.muted }}>
                        {s.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
