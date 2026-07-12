import { Section, SectionHeading } from "@/components/section";
import { MotionReveal } from "@/components/motion-reveal";
import { howItWorksSteps } from "@/lib/site-config";

export function HowItWorks() {
  return (
    <Section tier="supporting">
      <SectionHeading
        eyebrow="How it works"
        title="From your story to their screen"
        description="A calm, guided process. We handle the craft so you can focus on the celebration."
        align="left"
      />

      <div className="relative mt-10 lg:mt-14">
        <span
          aria-hidden="true"
          className="absolute top-6 right-[16.666%] left-[16.666%] hidden h-px bg-border md:block"
        />
        <ol className="relative grid md:grid-cols-3 md:gap-8">
          {howItWorksSteps.map((step, index) => (
            <MotionReveal as="li" key={step.number} delay={index * 0.1}>
              <div className="relative grid grid-cols-[3rem_1fr] gap-4 pb-9 last:pb-0 md:block md:pb-0 md:text-center">
                {index < howItWorksSteps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute top-12 bottom-0 left-6 w-px bg-border md:hidden"
                  />
                ) : null}
                <span className="relative z-10 flex size-12 items-center justify-center rounded-full border border-gold/50 bg-ivory font-heading text-2xl font-semibold text-navy md:mx-auto">
                  {step.number}
                </span>
                <div className="pt-1 md:pt-6">
                  <h3 className="font-heading text-xl font-semibold text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-muted-foreground md:mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            </MotionReveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
