import { ButtonLink } from "@/components/ui/button";
import { PodMark } from "@/components/decor";
import { siteConfig } from "@/data/site-config";

export default function NotFound() {
  return (
    <main id="main" className="on-dark grain relative isolate flex min-h-svh items-center overflow-hidden bg-forest text-cream">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_78%_40%,#1e4d3b_0%,#12372a_50%,#0b2419_100%)]"
      />
      <div className="container-page py-28">
        <PodMark className="h-12 text-gold" />
        <p className="micro-label mt-10 flex items-center gap-3 text-gold">
          <span aria-hidden="true" className="h-px w-10 bg-gold" />
          Page not found
        </p>
        <h1 className="mt-6 max-w-3xl font-serif text-display font-medium">
          This page isn&apos;t on the <em className="font-medium italic text-gold">shelf.</em>
        </h1>
        <p className="mt-6 max-w-md text-lead text-cream-muted">
          The link may be mistyped. Explore {siteConfig.name}&apos;s grades or send an enquiry — you&apos;ll get there in one step.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/#grades" variant="gold" size="lg" arrow>
            Explore grades
          </ButtonLink>
          <ButtonLink href="/#contact" variant="outlineCream" size="lg">
            Send enquiry
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
