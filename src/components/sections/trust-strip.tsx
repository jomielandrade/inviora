import { LinkIcon, Smartphone, UsersRound } from "lucide-react";

import { Container } from "@/components/section";
import { MotionReveal } from "@/components/motion-reveal";
import { trustBenefits } from "@/lib/site-config";

const icons = [LinkIcon, UsersRound, Smartphone];

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-white/60">
      <Container className="py-10 sm:py-12">
        <ul className="grid gap-8 sm:grid-cols-3 sm:gap-6">
          {trustBenefits.map((benefit, index) => {
            const Icon = icons[index];
            return (
              <MotionReveal as="li" key={benefit.title} delay={index * 0.08}>
                <div className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-navy">
                    <Icon aria-hidden="true" className="size-[1.15rem]" />
                  </span>
                  <div>
                    <p className="font-heading text-lg font-semibold text-navy">
                      {benefit.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
