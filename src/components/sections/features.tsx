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
import { features, type FeatureIcon } from "@/lib/site-config";

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
    <Section id="features">
      <SectionHeading
        eyebrow="Features"
        title="Everything guests need, beautifully organized"
        description="Thoughtful details that make your invitation clear for guests and effortless for you."
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = iconMap[feature.icon];
          return (
            <MotionReveal as="li" key={feature.title} delay={(index % 4) * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-navy/5 text-navy">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-navy">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </MotionReveal>
          );
        })}
      </ul>
    </Section>
  );
}
