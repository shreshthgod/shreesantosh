"use client";

import { useLenis } from "lenis/react";
import { products } from "@/data/products";
import { packaging } from "@/data/packaging";
import { processSteps } from "@/data/process";
import { useEnquirySelection } from "@/components/enquiry-context";
import { SceneCanvas, type SceneName } from "@/components/three/scene-canvas";
import { RollingText } from "@/components/rolling-text";
import { CrossIcon } from "@/components/tonalli-icons";

interface Panel {
  id: string;
  title: string;
  descriptor: string;
  detail: string;
  scene: SceneName;
  action: { label: string; href: string; grade?: string };
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
    detail: p.availablePacks.join(" · "),
    scene: gradeScenes[p.id],
    action: { label: "Enquire", href: "#contact", grade: p.name },
  })),
  {
    id: "bulk-packaging",
    title: "Bulk packaging",
    descriptor: `${packaging.standard.map((s) => s.size).join(" and ")} sacks — retail packs on demand`,
    detail: `${packaging.onDemand[0].size} – ${packaging.onDemand[packaging.onDemand.length - 1].size}`,
    scene: "sacks",
    action: { label: "View", href: "#packaging" },
  },
  {
    id: "farm-to-export",
    title: "Farm to export",
    descriptor: "Sourced, cleaned, sorted, graded",
    detail: `${processSteps.length} controlled stages`,
    scene: "stream",
    action: { label: "View", href: "#process" },
  },
];

export function Showcase() {
  const { setGrade } = useEnquirySelection();
  const lenis = useLenis();

  const handleAction = (e: React.MouseEvent<HTMLAnchorElement>, panel: Panel) => {
    if (panel.action.grade) setGrade(panel.action.grade);
    if (!lenis) return;
    e.preventDefault();
    lenis.scrollTo(panel.action.href, { offset: -80 });
  };

  return (
    <section id="grades" aria-label="Grades and supply">
      {panels.map((panel) => (
        <article
          key={panel.id}
          id={panel.id}
          className="relative h-[107svh] min-h-[600px] [clip-path:inset(0)]"
        >
          <SceneCanvas name={panel.scene} />

          <div className="pointer-events-none absolute inset-x-0 -top-[100svh] -bottom-[100svh] z-[2] text-white mix-blend-difference">
            <div className="sticky top-0 flex h-svh items-center justify-between px-5 lg:px-[30px]">
              <h2 className="text-xs uppercase leading-[14.4px]">
                <span className="block font-bold">{panel.title}</span>
                <span className="mt-[3px] block">{panel.descriptor}</span>
                <span className="mt-[2px] block">{panel.detail}</span>
              </h2>

              <a
                href={panel.action.href}
                onClick={(e) => handleAction(e, panel)}
                className="group/roll pointer-events-auto flex h-[50px] items-center gap-[10px] text-xs font-medium uppercase leading-[14.4px] lg:w-[70px] lg:justify-end"
              >
                <RollingText text={panel.action.label} />
                <span className="flex w-[10px] justify-center transition-transform duration-[450ms] ease-tonalli group-hover/roll:rotate-90">
                  <CrossIcon />
                </span>
              </a>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
