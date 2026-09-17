import { uses } from "@/data/uses";
import { Reveal } from "@/components/reveal";
import { InfoSection } from "./info-section";

export function Uses() {
  return (
    <InfoSection id="uses" label="Uses" index="04" statement="One seed, a wide table of applications.">
      <ul className="grid grid-cols-1 border-t border-border sm:grid-cols-2 xl:grid-cols-4">
        {uses.map((use, i) => (
          <Reveal as="li" key={use.id} delay={i * 40} className="border-b border-border py-6 sm:pr-8">
            <h3 className="text-ui font-bold uppercase">{use.title}</h3>
            <p className="mt-2 text-body text-muted-foreground">{use.description}</p>
            <p className="mt-4 text-label uppercase leading-relaxed text-muted-foreground">
              <span className="sr-only">Dishes: </span>
              {use.dishes.join(" / ")}
            </p>
          </Reveal>
        ))}
      </ul>
    </InfoSection>
  );
}
