import { Check, Heart } from "lucide-react";

import { Container } from "@/components/section";
import { MotionReveal } from "@/components/motion-reveal";
import { MessengerButton } from "@/components/messenger-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-28">
      {/* Subtle folded-paper guide line, purely decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="flex flex-col items-start">
            <MotionReveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-navy">
                <Heart aria-hidden="true" className="size-3.5 text-gold" />
                Digital invitations, thoughtfully made
              </span>
            </MotionReveal>

            <MotionReveal delay={0.05}>
              <h1 className="mt-6 font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-navy sm:text-5xl lg:text-6xl">
                A beautiful invitation. A simpler way to celebrate.
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Share your story, collect RSVPs, and keep every wedding detail in
                one elegant digital experience.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <MessengerButton reference="hero">
                  Message us on Facebook
                </MessengerButton>
                <a
                  href="#templates"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-12 gap-2 rounded-full px-6 text-sm font-semibold sm:text-[0.9375rem]"
                  )}
                >
                  Explore templates
                </a>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <p className="mt-6 text-sm text-muted-foreground">
                Made for modern Filipino couples · Mobile-friendly · Easy for every
                guest
              </p>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.15} className="flex justify-center lg:justify-end">
            <HeroMockup />
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}

/**
 * Believable, native product mockup built from CSS/SVG shapes. It shows an
 * invitation on a phone surface plus a small RSVP confirmation state. It is
 * decorative supporting content, so it is hidden from assistive tech.
 */
function HeroMockup() {
  return (
    <div aria-hidden="true" className="relative w-full max-w-[22rem]">
      {/* Soft backdrop panel */}
      <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-white/50" />

      {/* Phone frame */}
      <div className="relative mx-auto w-full rounded-[2.25rem] border border-navy/10 bg-navy p-2.5 shadow-[0_30px_60px_-25px_rgba(14,27,61,0.55)]">
        <div className="overflow-hidden rounded-[1.75rem] bg-ivory">
          {/* Invitation content */}
          <div className="relative px-6 pb-8 pt-9 text-center">
            <div className="mx-auto mb-5 h-px w-10 bg-gold" />
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Together with their families
            </p>
            <h3 className="mt-4 font-heading text-3xl font-semibold leading-tight text-navy">
              Maria
              <span className="mx-2 align-middle text-gold">&amp;</span>
              Joseph
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              request the pleasure of your company as they celebrate their wedding
            </p>

            <div className="mx-auto mt-6 flex max-w-[13rem] items-center justify-center gap-4 text-navy">
              <div className="flex-1 text-right">
                <p className="font-heading text-lg font-semibold leading-none">
                  Feb
                </p>
                <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                  Month
                </p>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/60 font-heading text-xl font-semibold">
                14
              </div>
              <div className="flex-1 text-left">
                <p className="font-heading text-lg font-semibold leading-none">
                  2027
                </p>
                <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                  Year
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-border bg-white p-3 text-left">
              <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground">
                Will you attend?
              </p>
              <div className="mt-2 flex gap-2">
                <span className="flex-1 rounded-lg bg-navy py-2 text-center text-[0.7rem] font-semibold text-ivory">
                  Joyfully accepts
                </span>
                <span className="rounded-lg border border-border px-3 py-2 text-center text-[0.7rem] font-medium text-muted-foreground">
                  Regrets
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating RSVP confirmation chip */}
      <div className="absolute -bottom-4 -left-3 flex items-center gap-2.5 rounded-2xl border border-border bg-white px-3.5 py-2.5 shadow-[0_16px_30px_-18px_rgba(14,27,61,0.5)] sm:-left-6">
        <span className="flex size-8 items-center justify-center rounded-full bg-navy">
          <Check className="size-4 text-gold" />
        </span>
        <div className="text-left">
          <p className="text-xs font-semibold text-navy">RSVP confirmed</p>
          <p className="text-[0.7rem] text-muted-foreground">
            2 guests · with love
          </p>
        </div>
      </div>
    </div>
  );
}
