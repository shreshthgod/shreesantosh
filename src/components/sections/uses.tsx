"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { uses } from "@/data/uses";
import { SectionHeading } from "@/components/section-heading";
import { CurryBowl, ParathaSnack, PostoPlate, SweetsBowl } from "@/components/illustrations";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

type TileLook = {
  bg: string;
  fg: string;
  muted: string;
  overlay: string;
  span: string;
  dark?: boolean;
  art: React.ReactNode;
};

const looks: Record<string, TileLook> = {
  "gravies-curries": {
    bg: "#d98b3a",
    fg: "#172019",
    muted: "#3b2410",
    overlay: "from-[#d98b3a] via-[#d98b3a]/80",
    span: "lg:col-span-7",
    art: <CurryBowl base="#f6f0e4" line="#6b3a17" accent="#b85c3d" className="size-full" />,
  },
  "bengali-posto": {
    bg: "#c9d8c4",
    fg: "#12372a",
    muted: "#34413a",
    overlay: "from-[#c9d8c4] via-[#c9d8c4]/80",
    span: "lg:col-span-5",
    art: <PostoPlate base="#fcfaf5" line="#12372a" accent="#e3cf95" className="size-full" />,
  },
  "sweets-desserts": {
    bg: "#e8b99c",
    fg: "#172019",
    muted: "#4a3426",
    overlay: "from-[#e8b99c] via-[#e8b99c]/80",
    span: "lg:col-span-5",
    art: <SweetsBowl base="#fcfaf5" line="#7a3e24" accent="#c49a45" className="size-full" />,
  },
  "regional-snacks": {
    bg: "#12372a",
    fg: "#f6f0e4",
    muted: "#cfc8b6",
    overlay: "from-[#12372a] via-[#12372a]/80",
    span: "lg:col-span-7",
    dark: true,
    art: <ParathaSnack base="#d9b26a" line="#0b2419" accent="#6d8b68" className="size-full" />,
  },
};

function firstSentence(text: string) {
  const index = text.indexOf(". ");
  return index === -1 ? text : text.slice(0, index + 1);
}

// Tile "active" styling for hover, keyboard focus and tap-to-open. Written out in full so Tailwind can detect every class.
const active = {
  show: "group-hover/tile:opacity-100 group-focus-within/tile:opacity-100 group-data-[open=true]/tile:opacity-100",
  zoom: "group-hover/tile:scale-[1.04] group-focus-within/tile:scale-[1.04] group-data-[open=true]/tile:scale-[1.04]",
  lift: "group-hover/tile:-translate-y-1 group-focus-within/tile:-translate-y-1 group-data-[open=true]/tile:-translate-y-1",
  arrow:
    "group-hover/tile:translate-x-0 group-hover/tile:opacity-100 group-focus-within/tile:translate-x-0 group-focus-within/tile:opacity-100 group-data-[open=true]/tile:translate-x-0 group-data-[open=true]/tile:opacity-100",
  expand: "group-hover/tile:grid-rows-[1fr] group-focus-within/tile:grid-rows-[1fr] group-data-[open=true]/tile:grid-rows-[1fr]",
};

export function Uses() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="uses" aria-labelledby="uses-title" className="section-space relative overflow-hidden bg-cream">
      <div className="container-page">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="uses-title"
            eyebrow="Uses"
            title={
              <>
                From kitchens <em>to festive tables.</em>
              </>
            }
            className="lg:col-span-7"
          />
          <p className="max-w-md text-lead text-ink-muted lg:col-span-5 lg:justify-self-end">
            Poppy seeds bring texture and a gentle nutty richness to dishes across Indian cuisine.
          </p>
        </Reveal>

        <Reveal className="mt-12 lg:mt-16">
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
            {uses.map((use, i) => {
              const look = looks[use.id];
              const expanded = open === use.id;
              return (
                <li
                  key={use.id}
                  data-open={expanded}
                  className={cn("group/tile relative isolate overflow-hidden rounded-xl md:min-h-[24rem] lg:min-h-[26rem]", look.span, look.dark && "on-dark")}
                  style={{ backgroundColor: look.bg, color: look.fg }}
                >
                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-0 -z-10 hidden bg-gradient-to-r to-transparent opacity-0 transition-opacity duration-(--dur-premium) md:block",
                      look.overlay,
                      active.show
                    )}
                  />

                  <div className="pointer-events-none relative flex h-full flex-col p-6 sm:p-8">
                    <span className="micro-label" style={{ color: look.muted }}>
                      {String(i + 1).padStart(2, "0")} — Culinary use
                    </span>

                    <div
                      aria-hidden="true"
                      className={cn(
                        "relative -z-20 mx-auto my-2 aspect-square w-[64%] max-w-[15rem] transition-transform duration-(--dur-premium) ease-(--ease-premium) md:absolute md:-right-[4%] md:-top-[6%] md:m-0 md:w-[54%] md:max-w-[22rem] lg:w-[48%]",
                        active.zoom
                      )}
                    >
                      {look.art}
                    </div>

                    <div className="mt-auto md:max-w-[60%] md:pt-40">
                      <h3 className={cn("flex items-center gap-2 font-serif text-title font-medium transition-transform duration-(--dur-normal) ease-(--ease-premium)", active.lift)}>
                        {use.title}
                        <ArrowUpRight
                          aria-hidden="true"
                          className={cn("size-6 shrink-0 -translate-x-2 opacity-0 transition-[opacity,transform] duration-(--dur-normal) ease-(--ease-premium)", active.arrow)}
                        />
                      </h3>
                      <p className="micro-label mt-3" style={{ color: look.muted }}>
                        {use.dishes.slice(0, 3).join(" · ")}
                      </p>
                      <div className={cn("grid grid-rows-[0fr] transition-[grid-template-rows] duration-(--dur-premium) ease-(--ease-premium)", active.expand)}>
                        <p id={`${use.id}-desc`} className={cn("overflow-hidden opacity-0 transition-opacity duration-(--dur-premium)", active.show)}>
                          <span className="block pt-3 leading-relaxed">{firstSentence(use.description)}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`${use.id}-desc`}
                    onClick={() => setOpen(expanded ? null : use.id)}
                    className="absolute inset-0 z-10 rounded-xl"
                  >
                    <span className="sr-only">
                      {expanded ? "Hide" : "Show"} details about {use.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
