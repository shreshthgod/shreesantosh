import { processSteps } from "@/data/process";
import { Reveal } from "@/components/reveal";
import { ArrowIcon } from "@/components/tonalli-icons";
import { InfoSection } from "./info-section";

export function Process() {
  return (
    <InfoSection id="process" label="Farmers & process" index="03" statement="From farmer to final grade, in six controlled stages.">
      <ol className="border-t border-black/12">
        {processSteps.map((step, i) => (
          <Reveal
            as="li"
            key={step.id}
            delay={i * 60}
            className="group/arrow grid grid-cols-[48px_1fr] gap-y-3 border-b border-black/12 py-6 md:grid-cols-[48px_minmax(0,240px)_minmax(0,1fr)_minmax(0,220px)] md:gap-x-8"
          >
            <span className="text-xs leading-[14.4px] text-black/50">{step.number}</span>
            <span className="flex items-center gap-1 text-xs font-bold uppercase leading-[14.4px]">
              <span className="flex -translate-x-[17px] items-center gap-1 transition-transform duration-[400ms] ease-tonalli group-hover/arrow:translate-x-0">
                <ArrowIcon className="opacity-0 transition-opacity duration-[400ms] ease-tonalli group-hover/arrow:opacity-100" />
                {step.title}
              </span>
            </span>
            <p className="col-start-2 text-xs leading-[16.8px] text-black/70 md:col-start-auto">{step.description}</p>
            <ul className="col-start-2 text-xs uppercase leading-[16.8px] text-black/50 md:col-start-auto">
              {step.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </InfoSection>
  );
}
