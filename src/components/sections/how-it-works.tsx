import { Section, SectionHeading } from "@/components/section";
import { MotionReveal } from "@/components/motion-reveal";
import { howItWorksSteps } from "@/lib/site-config";

export function HowItWorks() {
  return (
    <Section>
      <SectionHeading
        eyebrow="How it works"
        title="From your story to their screen"
        description="A calm, guided process. We handle the craft so you can focus on the celebration."
      />

      <ol className="mt-14 grid gap-6 md:grid-cols-3">
        {howItWorksSteps.map((step, index) => (
          <MotionReveal as="li" key={step.number} delay={index * 0.1}>
            <div className="h-full rounded-2xl border border-border bg-card p-7">
              <span className="inline-flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-6 bg-gold"
                />
                <span className="font-heading text-4xl font-semibold text-navy">
                  {step.number}
                </span>
              </span>
              <h3 className="mt-4 font-heading text-xl font-semibold text-navy">
                {step.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </MotionReveal>
        ))}
      </ol>
    </Section>
  );
}
