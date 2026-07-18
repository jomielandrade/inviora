import { ArrowRight } from "lucide-react";

import { MotionReveal } from "@/components/motion-reveal";
import { MessengerButton } from "@/components/messenger-button";

const secondaryLinkClass =
  "group/cta-secondary inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-on-navy-muted underline-offset-4 transition-colors hover:text-ivory hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-gold/50";

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-heading">
      <MotionReveal>
        <div className="rounded-xl border border-gold/25 bg-[color-mix(in_srgb,var(--inviora-navy)_88%,black)] px-8 py-9 md:px-10 md:py-10 lg:px-12 lg:py-11">
          <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-8">
            <div className="min-w-0 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                Your celebration
              </span>
              <h2
                id="final-cta-heading"
                className="mt-2.5 font-heading text-[1.625rem] font-semibold leading-[1.15] tracking-tight text-ivory sm:text-3xl lg:text-[2.25rem]"
              >
                <span className="sm:whitespace-nowrap">Ready to make inviting</span>{" "}
                <span className="whitespace-nowrap">feel simpler?</span>
              </h2>
              <p className="mt-2.5 max-w-lg text-base leading-relaxed text-on-navy-muted">
                Tell us about your celebration and we&apos;ll help you choose
                the right Inviora experience.
              </p>
            </div>

            <div className="flex w-full flex-col items-stretch gap-1.5 sm:w-auto sm:min-w-[13.5rem]">
              <MessengerButton
                reference="final-cta"
                variant="default"
                className="w-full justify-center !rounded-lg bg-gold px-7 text-navy hover:bg-gold/90 focus-visible:ring-gold/50 motion-safe:[&_svg]:transition-transform motion-safe:hover:[&_svg]:translate-x-0.5"
              >
                Message Inviora
              </MessengerButton>
              <a href="#packages" className={secondaryLinkClass}>
                View packages
                <ArrowRight
                  aria-hidden="true"
                  className="size-3.5 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover/cta-secondary:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
