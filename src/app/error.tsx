"use client";

import { ButtonLink } from "@/components/ui/button";
import { PodMark } from "@/components/decor";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
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
          Something went wrong
        </p>
        <h1 className="mt-6 max-w-3xl font-serif text-display font-medium">
          Let&apos;s get you back on <em className="font-medium italic text-gold">track.</em>
        </h1>
        <p className="mt-6 max-w-md text-lead text-cream-muted">
          An unexpected error interrupted this page. Try again, or head straight to the enquiry form.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/#contact" variant="gold" size="lg" arrow>
            Go to enquiry
          </ButtonLink>
          <button
            type="button"
            onClick={reset}
            className="group/btn inline-flex h-14 shrink-0 items-center justify-center gap-3 rounded-md border border-cream/45 px-7 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-cream transition-[background-color,color,border-color,transform] duration-(--dur-normal) ease-(--ease-premium) hover:-translate-y-0.5 hover:border-cream hover:bg-cream/10 motion-reduce:hover:translate-y-0"
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  );
}
