import { processSteps } from "@/data/process";
import { Reveal } from "@/components/reveal";
import { InfoSection } from "./info-section";

export function Process() {
  return (
    <InfoSection id="process" label="Farmers & process" index="03" statement="From farmer to final grade, in six controlled stages.">
      <ol className="border-t border-border">
        {processSteps.map((step, i) => (
          <Reveal
            as="li"
            key={step.id}
            delay={i * 40}
            className="grid grid-cols-[3rem_1fr] gap-y-3 border-b border-border py-6 md:grid-cols-[3rem_minmax(0,15rem)_minmax(0,1fr)_minmax(0,14rem)] md:gap-x-8"
          >
            <span className="text-ui tabular-nums text-muted-foreground" aria-hidden="true">
              {step.number}
            </span>
            <h3 className="text-ui font-bold uppercase">
              <span className="sr-only">Stage {step.order}: </span>
              {step.title}
            </h3>
            <p className="col-start-2 max-w-[60ch] text-body text-muted-foreground md:col-start-auto">{step.description}</p>
            <ul className="col-start-2 text-label uppercase leading-relaxed text-muted-foreground md:col-start-auto">
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
