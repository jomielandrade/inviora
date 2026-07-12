import { Section, SectionHeading } from "@/components/section";
import { MotionReveal } from "@/components/motion-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { templates, type Template } from "@/lib/site-config";

export function Templates() {
  return (
    <Section id="templates" className="bg-white/60">
      <SectionHeading
        eyebrow="Templates"
        title="Wedding invitations made to feel like yours"
        description="A growing collection of refined designs. Each one is crafted to feel personal, not generic."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template, index) => (
          <MotionReveal key={template.name} delay={index * 0.08}>
            <TemplateCard template={template} />
          </MotionReveal>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        More wedding designs are being prepared.
      </p>
    </Section>
  );
}

function TemplateCard({ template }: { template: Template }) {
  const { palette } = template;
  return (
    <article className="group/template flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
      {/* Designed placeholder art rendered from the brand palette. */}
      <div
        aria-hidden="true"
        className="relative aspect-[4/5] w-full p-5"
        style={{ backgroundColor: palette.surface }}
      >
        <div
          className="flex h-full w-full flex-col items-center justify-center rounded-xl border px-6 text-center"
          style={{ borderColor: `${palette.ink}22` }}
        >
          <span
            className="mb-4 h-px w-8"
            style={{ backgroundColor: palette.accent }}
          />
          <p
            className="text-[0.6rem] font-semibold uppercase tracking-[0.3em]"
            style={{ color: palette.accent }}
          >
            The Wedding of
          </p>
          <p
            className="mt-3 font-heading text-2xl font-semibold leading-tight"
            style={{ color: palette.ink }}
          >
            A &amp; J
          </p>
          <p
            className="mt-3 text-[0.65rem] tracking-widest"
            style={{ color: `${palette.ink}99` }}
          >
            SAVE THE DATE
          </p>
          <span
            className="mt-4 h-px w-8"
            style={{ backgroundColor: palette.accent }}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-heading text-xl font-semibold text-navy">
              {template.name}
            </h3>
            <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-blue">
              {template.mood}
            </p>
          </div>
          <Badge variant="muted">Preview coming soon</Badge>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {template.description}
        </p>
        <Button
          type="button"
          variant="outline"
          size="lg"
          disabled
          aria-disabled="true"
          className="mt-5 h-11 w-full rounded-full"
        >
          Preview coming soon
        </Button>
      </div>
    </article>
  );
}
