"use client";

import { products } from "@/data/products";
import { packaging } from "@/data/packaging";
import { processSteps } from "@/data/process";
import { useEnquirySelection } from "@/components/enquiry-context";
import { SceneCanvas, scenes, type SceneName } from "@/components/three/scene-canvas";
import { RollingText } from "@/components/rolling-text";
import { SectionLink } from "@/components/section-link";
import { CrossIcon } from "@/components/tonalli-icons";
import { cn } from "@/lib/utils";

interface Panel {
  id: string;
  title: string;
  descriptor: string;
  detail: string;
  scene: SceneName;
  action: { label: string; href: `#${string}`; description: string; grade?: string };
}

const gradeScenes: Record<string, SceneName> = {
  king: "seeds-cool",
  "shubh-laxmi": "seeds-warm",
  shri: "seeds-pile",
  "white-tinopal": "seeds-white",
};

const gradeDescriptors: Record<string, string> = {
  king: "Premium selected grade",
  "shubh-laxmi": "Commercial grade",
  shri: "Standard grade",
  "white-tinopal": "Specialty white variety",
};

const panels: Panel[] = [
  ...products.map((p) => ({
    id: `grade-${p.id}`,
    title: p.name,
    descriptor: `${p.category} — ${gradeDescriptors[p.id]}`,
    detail: `Standard packs ${p.availablePacks.join(" · ")}`,
    scene: gradeScenes[p.id],
    action: { label: "Enquire", href: "#contact" as const, description: `Enquire about ${p.name} grade`, grade: p.name },
  })),
  {
    id: "bulk-packaging",
    title: "Bulk packaging",
    descriptor: `${packaging.standard.map((s) => s.size).join(" and ")} sacks — retail packs on demand`,
    detail: `${packaging.onDemand[0].size} – ${packaging.onDemand[packaging.onDemand.length - 1].size}`,
    scene: "sacks",
    action: { label: "View", href: "#packaging", description: "View packaging options" },
  },
  {
    id: "farm-to-export",
    title: "Farm to export",
    descriptor: "Sourced, cleaned, sorted, graded",
    detail: `${processSteps.length} controlled stages`,
    scene: "stream",
    action: { label: "View", href: "#process", description: "View the supply process" },
  },
];

export function Showcase() {
  const { setGrade } = useEnquirySelection();

  return (
    <section id="grades" aria-label="Grades and supply">
      {panels.map((panel) => {
        const light = scenes[panel.scene].tone === "light";
        return (
          <article
            key={panel.id}
            id={panel.id}
            aria-labelledby={`${panel.id}-title`}
            className="relative h-[107svh] min-h-[37.5rem] [clip-path:inset(0)]"
          >
            <SceneCanvas name={panel.scene} />

            {/* A tall sticky track keeps the label centred while its panel is on screen; clip-path hands it off at the panel edge. */}
            <div className={cn("pointer-events-none absolute inset-x-0 -top-[100svh] -bottom-[100svh] z-[2]", light ? "text-black" : "text-white")}>
              <div className="sticky top-0 flex h-svh items-center">
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 top-1/2 h-72 -translate-y-1/2 [mask-image:linear-gradient(to_bottom,transparent,black_40%,black_60%,transparent)]",
                    light
                      ? "bg-gradient-to-r from-white/80 via-white/35 to-white/60"
                      : "bg-gradient-to-r from-black/70 via-black/25 to-black/55"
                  )}
                />
                <div className="relative flex w-full items-center justify-between gap-6 px-(--gutter)">
                  <div className="uppercase">
                    <h2 id={`${panel.id}-title`} className="text-ui font-bold">
                      {panel.title}
                    </h2>
                    <p className="mt-1 text-ui">{panel.descriptor}</p>
                    <p className="mt-0.5 text-ui">{panel.detail}</p>
                  </div>

                  <SectionLink
                    href={panel.action.href}
                    aria-label={panel.action.description}
                    onNavigate={() => panel.action.grade && setGrade(panel.action.grade)}
                    className="group/roll pointer-events-auto flex h-11 shrink-0 items-center gap-2.5 text-ui font-medium uppercase"
                  >
                    <RollingText text={panel.action.label} />
                    <span className="flex w-2.5 justify-center transition-transform duration-300 ease-tonalli group-hover/roll:rotate-90 group-focus-visible/roll:rotate-90">
                      <CrossIcon />
                    </span>
                  </SectionLink>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
