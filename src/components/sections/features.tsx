import {
  BookHeart,
  CalendarClock,
  ClipboardCheck,
  Images,
  LayoutPanelLeft,
  ListChecks,
  Share2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { Section, SectionHeading } from "@/components/section";
import { MotionReveal } from "@/components/motion-reveal";
import { cn } from "@/lib/utils";
import { features, type Feature, type FeatureIcon } from "@/lib/site-config";

const iconMap: Record<FeatureIcon, LucideIcon> = {
  sparkles: Sparkles,
  clipboardCheck: ClipboardCheck,
  bookHeart: BookHeart,
  calendarClock: CalendarClock,
  images: Images,
  share: Share2,
  listChecks: ListChecks,
  layoutPanelLeft: LayoutPanelLeft,
};

const primaryFeatures = features.slice(0, 4);
const secondaryFeatures = features.slice(4);

/**
 * Product-supporting features: left editorial lead + open feature list.
 * Soft row rules only — no vertical divider, so it reads less like a table.
 */
export function Features() {
  return (
    <Section id="features" tier="supporting" surface="white">
      <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 xl:gap-20">
        <div>
          <SectionHeading
            eyebrow="Features"
            title="Everything guests need, beautifully organized"
            description="Thoughtful details that make your invitation clear for guests and effortless for you."
            align="left"
          />
          <MotionReveal className="mt-8">
            <div className="max-w-md border-l-2 border-gold pl-5">
              <p className="font-heading text-2xl font-semibold leading-snug tracking-tight text-navy">
                One elegant link, from the first detail to the final RSVP.
              </p>
            </div>
          </MotionReveal>
        </div>

        <div>
          {/* Desktop: two-column grid with row/column rules, no top rule */}
          <ul className="hidden lg:grid lg:grid-cols-2">
            {features.map((feature, index) => (
              <MotionReveal
                as="li"
                key={feature.title}
                delay={0.04 + (index % 4) * 0.05}
                className="border-border lg:border-t lg:px-5 lg:py-6 lg:odd:border-r lg:[&:nth-child(-n+2)]:border-t-0"
              >
                <FeatureRow feature={feature} />
              </MotionReveal>
            ))}
          </ul>

          {/* Mobile: concise list + accessible disclosure */}
          <div className="lg:hidden">
            <ul className="divide-y divide-border/80 border-y border-border/80">
              {primaryFeatures.map((feature, index) => (
                <MotionReveal
                  as="li"
                  key={feature.title}
                  delay={0.04 + index * 0.05}
                >
                  <FeatureRow feature={feature} className="py-5" />
                </MotionReveal>
              ))}
            </ul>

            <details className="group/features border-b border-border/80">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3.5 text-sm font-semibold text-navy focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
                <span>Explore all features</span>
                <span
                  aria-hidden="true"
                  className="text-xl leading-none text-blue transition-transform duration-300 group-open/features:rotate-45"
                >
                  +
                </span>
              </summary>
              <ul className="divide-y divide-border/80 border-t border-border/80">
                {secondaryFeatures.map((feature) => (
                  <li key={feature.title}>
                    <FeatureRow feature={feature} className="py-5" />
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      </div>
    </Section>
  );
}

function FeatureRow({
  feature,
  className,
}: {
  feature: Feature;
  className?: string;
}) {
  const Icon = iconMap[feature.icon];

  return (
    <div
      className={cn("grid grid-cols-[2.75rem_1fr] gap-4", className)}
    >
      <span className="flex size-11 items-center justify-center rounded-full border border-gold/40 bg-ivory text-navy">
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.6} />
      </span>
      <div className="min-w-0 pt-0.5">
        <h3 className="font-heading text-lg font-semibold tracking-tight text-navy">
          {feature.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </div>
    </div>
  );
}
