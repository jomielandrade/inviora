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

export function Features() {
  return (
    <Section id="features" tier="supporting" surface="white">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Features"
            title="Everything guests need, beautifully organized"
            description="Thoughtful details that make your invitation clear for guests and effortless for you."
            align="left"
          />
          <div className="mt-8 border-l border-gold pl-5">
            <p className="max-w-md font-heading text-2xl font-semibold leading-snug text-navy">
              One elegant link, from the first detail to the final RSVP.
            </p>
          </div>
        </div>

        <MotionReveal>
          <ul className="divide-y divide-border border-y border-border lg:grid lg:grid-cols-2 lg:divide-y-0 lg:border-y-0">
            {features.map((feature, index) => (
              <FeatureRow
                key={feature.title}
                feature={feature}
                className={index >= 4 ? "hidden lg:grid" : "grid lg:grid"}
              />
            ))}
          </ul>

          <details className="group/features border-b border-border lg:hidden">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-sm font-semibold text-navy focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
              <span>Explore all features</span>
              <span
                aria-hidden="true"
                className="text-xl leading-none text-blue transition-transform duration-300 group-open/features:rotate-45"
              >
                +
              </span>
            </summary>
            <ul className="divide-y divide-border border-t border-border">
              {features.slice(4).map((feature) => (
                <FeatureRow key={feature.title} feature={feature} />
              ))}
            </ul>
          </details>
        </MotionReveal>
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
    <li
      className={[
        "grid grid-cols-[2.75rem_1fr] gap-4 py-5 lg:border-t lg:border-border lg:px-5 lg:py-6 lg:odd:border-r",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-navy/5 text-navy">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <div>
        <h3 className="font-heading text-lg font-semibold text-navy">
          {feature.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </div>
    </li>
  );
}
