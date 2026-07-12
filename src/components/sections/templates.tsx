import { Section, SectionHeading } from "@/components/section";
import { MotionReveal } from "@/components/motion-reveal";
import { SampleDate } from "@/components/sample-date";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { sampleCouple, templates, type Template } from "@/lib/site-config";

export function Templates() {
  return (
    <Section id="templates" tier="flagship" surface="tint">
      <SectionHeading
        eyebrow="Templates"
        title="Wedding invitations made to feel like yours"
        description="A growing collection of refined designs. Each one is crafted to feel personal, not generic."
        align="left"
        scale="display"
        className="max-w-3xl"
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {templates.map((template, index) => (
          <MotionReveal
            key={template.name}
            delay={index * 0.08}
            className={cn(
              index === templates.length - 1 &&
                "md:col-span-2 md:mx-auto md:w-[calc(50%-0.75rem)] lg:col-span-1 lg:mx-0 lg:w-auto"
            )}
          >
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
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_60px_-48px_rgba(14,27,61,0.55)]">
      <div
        aria-hidden="true"
        className="relative aspect-[5/4] w-full p-4 sm:aspect-[4/5] sm:p-5"
        style={{ backgroundColor: palette.surface }}
      >
        <TemplateArtwork template={template} />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-heading text-xl font-semibold text-navy">
              {template.name}
            </h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              {template.mood}
            </p>
          </div>
          <Badge variant="muted">Preview coming soon</Badge>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {template.description}
        </p>
      </div>
    </article>
  );
}

function TemplateArtwork({ template }: { template: Template }) {
  const { palette } = template;

  if (template.layout === "editorial") {
    return (
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-xl border p-5 text-left sm:p-7"
        style={{ borderColor: `${palette.ink}33`, color: palette.ink }}
      >
        <span
          className="absolute top-0 bottom-0 left-[38%] w-px opacity-50"
          style={{ backgroundColor: palette.accent }}
        />
        <p className="relative text-xs font-semibold uppercase tracking-[0.16em] opacity-80">
          A modern celebration
        </p>
        <div className="relative mt-auto">
          <p className="font-heading text-5xl font-semibold leading-[0.78] sm:text-7xl">
            {sampleCouple.firstName.charAt(0)}
            <span className="ml-2 align-top text-2xl" style={{ color: palette.accent }}>
              /
            </span>
          </p>
          <p className="mt-3 max-w-[10rem] font-heading text-2xl font-semibold leading-none sm:text-3xl">
            {sampleCouple.firstName} &amp; {sampleCouple.secondName}
          </p>
        </div>
        <div className="relative mt-5 flex items-end justify-between gap-4 border-t border-current/20 pt-3 text-xs font-semibold uppercase tracking-[0.12em]">
          <SampleDate format="numeric" />
          <span className="text-right opacity-75">Manila</span>
        </div>
      </div>
    );
  }

  if (template.layout === "garden") {
    return (
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-xl border p-5 sm:p-7"
        style={{ borderColor: `${palette.ink}26`, color: palette.ink }}
      >
        <span
          className="absolute -top-8 -right-6 size-28 rounded-full border sm:size-40"
          style={{ borderColor: `${palette.accent}80` }}
        />
        <span
          className="absolute top-8 right-10 size-14 rounded-full border sm:size-20"
          style={{ borderColor: `${palette.accent}66` }}
        />
        <span
          className="absolute right-5 bottom-5 h-24 w-12 rounded-[100%_0] border-l opacity-70"
          style={{ borderColor: palette.accent }}
        />
        <p className="relative text-xs font-semibold uppercase tracking-[0.16em] opacity-75">
          In quiet celebration
        </p>
        <div className="relative my-auto max-w-[12rem]">
          <p className="font-heading text-3xl font-semibold leading-[0.92] sm:text-5xl">
            {sampleCouple.firstName}
            <span className="block pl-8 italic">
              &amp; {sampleCouple.secondName}
            </span>
          </p>
          <p className="mt-4 text-sm leading-relaxed opacity-75">
            beneath the trees, surrounded by love
          </p>
        </div>
        <p className="relative text-xs font-semibold uppercase tracking-[0.14em]">
          <SampleDate format="long" />
        </p>
      </div>
    );
  }

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center rounded-xl border px-6 text-center"
      style={{ borderColor: `${palette.ink}26`, color: palette.ink }}
    >
      <span className="mb-4 h-px w-10" style={{ backgroundColor: palette.accent }} />
      <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-75">
        Together with their families
      </p>
      <p className="mt-4 font-heading text-3xl font-semibold leading-[0.9] sm:text-5xl">
        {sampleCouple.firstName}
        <span className="my-1 block text-2xl italic" style={{ color: palette.accent }}>
          &amp;
        </span>
        {sampleCouple.secondName}
      </p>
      <div className="mt-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] opacity-80">
        <SampleDate format="month" />
        <span
          className="flex size-10 items-center justify-center rounded-full border font-heading text-lg"
          style={{ borderColor: palette.accent }}
        >
          <SampleDate format="day" />
        </span>
        <SampleDate format="year" />
      </div>
    </div>
  );
}
