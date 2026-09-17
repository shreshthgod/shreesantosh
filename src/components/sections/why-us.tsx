import { features } from "@/data/features";
import { siteConfig } from "@/data/site-config";
import { Reveal } from "@/components/reveal";
import { InfoSection } from "./info-section";

export function WhyUs() {
  return (
    <InfoSection id="about" label="Who we are" index="01" statement="A supply process built for buyers who cannot afford surprises.">
      <Reveal>
        <p className="max-w-[60ch] text-pretty text-lead text-muted-foreground">{siteConfig.description}</p>
      </Reveal>
      <ul className="mt-12 grid grid-cols-1 border-t border-border sm:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, i) => (
          <Reveal as="li" key={feature.id} delay={i * 40} className="border-b border-border py-6 sm:pr-8">
            <h3 className="text-ui font-bold uppercase">{feature.title}</h3>
            <p className="mt-2 max-w-[42ch] text-body text-muted-foreground">{feature.description}</p>
          </Reveal>
        ))}
      </ul>
    </InfoSection>
  );
}
