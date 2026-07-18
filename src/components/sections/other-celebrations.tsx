import {
  ArrowRight,
  Baby,
  Briefcase,
  Cake,
  Heart,
  type LucideIcon,
} from "lucide-react";

import { Section } from "@/components/section";
import { MotionReveal } from "@/components/motion-reveal";
import { SampleDate } from "@/components/sample-date";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  celebrations,
  sampleCouple,
  type Celebration,
  type CelebrationIcon,
} from "@/lib/site-config";

const iconByKey: Record<CelebrationIcon, LucideIcon> = {
  weddings: Heart,
  birthdaysDebuts: Cake,
  baptisms: Baby,
  corporate: Briefcase,
};

const availableCelebrations = celebrations.filter(
  (celebration) => celebration.available,
);
const upcomingCelebrations = celebrations.filter(
  (celebration) => !celebration.available,
);

/**
 * Product roadmap showcase — Weddings featured today, more celebrations planned.
 */
export function OtherCelebrations() {
  return (
    <Section tier="supporting" surface="white">
      <div className="flex max-w-2xl flex-col gap-4">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          What&apos;s next
        </span>
        <h2 className="max-w-xl font-heading text-3xl font-semibold leading-[1.08] tracking-tight text-balance text-navy sm:text-4xl lg:text-[2.75rem]">
          Made for every
          <span className="block sm:inline"> celebration</span>
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Weddings are available today. Birthdays, milestones, and meaningful
          gatherings are coming next.
        </p>
      </div>

      <div className="mt-10 sm:mt-12 lg:mt-14">
        {availableCelebrations.map((celebration, index) => (
          <MotionReveal key={celebration.name} delay={index * 0.06}>
            <FeaturedCelebrationCard celebration={celebration} />
          </MotionReveal>
        ))}
      </div>

      <div className="mt-14 lg:mt-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Coming soon
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              The same refined invitation experience, tailored to more ways of
              celebrating.
            </p>
          </div>
          <span
            aria-hidden="true"
            className="hidden h-px flex-1 bg-gradient-to-r from-border via-border/60 to-transparent sm:block sm:max-w-xs lg:max-w-sm"
          />
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-3 lg:gap-6">
          {upcomingCelebrations.map((celebration, index) => (
            <MotionReveal
              as="li"
              key={celebration.name}
              delay={0.04 + index * 0.05}
              className="min-w-0"
            >
              <UpcomingCelebrationCard celebration={celebration} />
            </MotionReveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function FeaturedCelebrationCard({
  celebration,
}: {
  celebration: Celebration;
}) {
  const Icon = iconByKey[celebration.icon];

  return (
    <article className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-ivory via-white to-surface-tint shadow-[0_28px_64px_-40px_rgba(14,27,61,0.45)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent"
      />

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-10 lg:p-10">
        <div className="flex min-w-0 flex-col">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-navy text-gold">
              <Icon aria-hidden="true" className="size-5" strokeWidth={1.6} />
            </span>
            {celebration.statusLabel ? (
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-blue">
                {celebration.statusLabel}
              </span>
            ) : null}
          </div>

          <h3 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-navy sm:text-[2rem]">
            {celebration.name}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            {celebration.description}
          </p>

          {celebration.cta ? (
            <div className="mt-7">
              <a
                href={celebration.cta.href}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "group/cta h-12 gap-2 rounded-full px-6 text-sm font-semibold motion-safe:transition-transform motion-safe:hover:-translate-y-px sm:text-[0.9375rem]",
                )}
              >
                {celebration.cta.label}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 motion-safe:transition-transform motion-safe:group-hover/cta:translate-x-0.5"
                />
              </a>
            </div>
          ) : null}
        </div>

        <WeddingCelebrationPreview />
      </div>
    </article>
  );
}

function UpcomingCelebrationCard({
  celebration,
}: {
  celebration: Celebration;
}) {
  const Icon = iconByKey[celebration.icon];

  return (
    <article className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border/90 bg-gradient-to-b from-ivory via-white to-white shadow-[0_18px_44px_-36px_rgba(14,27,61,0.4)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-3 left-3 h-3 w-px bg-gold/30"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-3 left-3 h-px w-3 bg-gold/30"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 bottom-3 h-3 w-px bg-gold/25"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 bottom-3 h-px w-3 bg-gold/25"
      />

      <div
        aria-hidden="true"
        className="relative border-b border-border/70 bg-surface-tint/55 px-5 pt-5 pb-4 sm:px-6"
      >
        <UpcomingInvitationHeader
          headline={celebration.previewHeadline ?? celebration.name}
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="flex size-10 items-center justify-center rounded-full border border-gold/30 bg-ivory text-navy">
          <Icon aria-hidden="true" className="size-4" strokeWidth={1.6} />
        </span>

        <h3 className="mt-4 font-heading text-xl font-semibold tracking-tight text-navy">
          {celebration.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {celebration.description}
        </p>

        <div className="mt-5 flex items-center gap-2 border-t border-border/70 pt-4">
          <span
            aria-hidden="true"
            className="size-1.5 shrink-0 rounded-full bg-gold/55"
          />
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Coming soon
          </p>
        </div>
      </div>
    </article>
  );
}

/**
 * Invitation-style preview header for upcoming cards — decorative only.
 */
function UpcomingInvitationHeader({ headline }: { headline: string }) {
  return (
    <div className="relative flex h-16 items-center justify-center overflow-hidden rounded-xl border border-border/80 bg-gradient-to-br from-white via-ivory to-surface-tint px-4">
      <span className="absolute top-2.5 left-3 h-2.5 w-px bg-gold/35" />
      <span className="absolute top-2.5 left-3 h-px w-2.5 bg-gold/35" />
      <span className="absolute right-3 bottom-2.5 h-2.5 w-px bg-gold/30" />
      <span className="absolute right-3 bottom-2.5 h-px w-2.5 bg-gold/30" />
      <span className="absolute inset-x-8 top-3 h-px bg-border/80" />
      <span className="absolute inset-x-10 bottom-3 h-px bg-border/70" />
      <p className="relative text-center font-heading text-lg font-semibold leading-none tracking-tight text-navy sm:text-xl">
        {headline}
      </p>
    </div>
  );
}

/**
 * Layered invitation preview for the featured Weddings panel. Decorative only.
 */
function WeddingCelebrationPreview() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[22rem] justify-self-center lg:max-w-none lg:justify-self-end"
    >
      <span className="absolute -top-5 -left-5 h-5 w-px bg-gold/35" />
      <span className="absolute -top-5 -left-5 h-px w-5 bg-gold/35" />
      <span className="absolute -right-5 -bottom-5 h-5 w-px bg-gold/35" />
      <span className="absolute -right-5 -bottom-5 h-px w-5 bg-gold/35" />

      <div className="absolute inset-x-6 top-6 bottom-10 rounded-2xl border border-border/70 bg-white/70 shadow-[0_18px_40px_-32px_rgba(14,27,61,0.35)] motion-safe:-rotate-[5deg]" />

      <div className="absolute inset-x-3 top-3 bottom-16 rounded-2xl border border-navy/10 bg-navy p-4 shadow-[0_20px_48px_-28px_rgba(14,27,61,0.55)] motion-safe:rotate-[3deg]">
        <div className="flex h-full min-h-[9.5rem] flex-col rounded-xl border border-ivory/15 p-4 text-ivory sm:min-h-[10.5rem] sm:p-5">
          <p className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-ivory/70">
            A modern celebration
          </p>
          <div className="mt-auto">
            <p className="font-heading text-4xl font-semibold leading-[0.82]">
              {sampleCouple.firstName.charAt(0)}
              <span className="ml-1 align-top text-lg text-gold">/</span>
            </p>
            <p className="mt-2 max-w-[11rem] font-heading text-xl font-semibold leading-tight">
              {sampleCouple.firstName} &amp; {sampleCouple.secondName}
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-16 rounded-2xl border border-border bg-ivory p-4 shadow-[0_24px_56px_-36px_rgba(14,27,61,0.45)] sm:p-5">
        <div className="rounded-xl border border-navy/10 bg-white px-4 py-5 text-navy sm:px-5 sm:py-6">
          <span className="mx-auto mb-4 block h-px w-8 bg-gold" />
          <p className="text-center text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Together with their families
          </p>
          <p className="mt-3 text-center font-heading text-2xl font-semibold leading-tight">
            {sampleCouple.firstName}
            <span className="my-0.5 block text-lg italic text-gold">&amp;</span>
            {sampleCouple.secondName}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <SampleDate format="month" />
            <span className="flex size-8 items-center justify-center rounded-full border border-gold/50 font-heading text-sm text-navy">
              <SampleDate format="day" />
            </span>
            <SampleDate format="year" />
          </div>
        </div>
      </div>
    </div>
  );
}
