import { uses } from "@/data/uses";
import { Reveal } from "@/components/reveal";
import { InfoSection } from "./info-section";

export function Uses() {
  return (
    <InfoSection id="uses" label="Uses" index="04" statement="One seed, a wide table of applications.">
      <ul className="grid grid-cols-1 border-t border-black/12 sm:grid-cols-2 xl:grid-cols-4">
        {uses.map((use, i) => (
          <Reveal as="li" key={use.id} delay={i * 60} className="border-b border-black/12 py-6 sm:pr-8">
            <p className="text-xs font-bold uppercase leading-[14.4px]">{use.title}</p>
            <p className="mt-[6px] text-xs leading-[16.8px] text-black/60">{use.description}</p>
            <p className="mt-4 text-xs uppercase leading-[16.8px] text-black/45">{use.dishes.join(" / ")}</p>
          </Reveal>
        ))}
      </ul>
    </InfoSection>
  );
}
