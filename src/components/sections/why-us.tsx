import { features } from "@/data/features";
import { siteConfig } from "@/data/site-config";
import { Reveal } from "@/components/reveal";
import { InfoSection } from "./info-section";

export function WhyUs() {
  return (
    <InfoSection id="about" label="Who we are" index="01" statement="A supply process built for buyers who cannot afford surprises.">
      <Reveal className="max-w-[520px] text-sm leading-[19.6px] text-black/70">
        <p>{siteConfig.description}</p>
      </Reveal>
      <ul className="mt-14 grid grid-cols-1 border-t border-black/12 sm:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, i) => (
          <Reveal as="li" key={feature.id} delay={i * 60} className="border-b border-black/12 py-6 sm:pr-8">
            <p className="text-xs font-bold uppercase leading-[14.4px]">{feature.title}</p>
            <p className="mt-[6px] max-w-[320px] text-xs leading-[16.8px] text-black/60">{feature.description}</p>
          </Reveal>
        ))}
      </ul>
    </InfoSection>
  );
}
