import {
  Baby,
  Briefcase,
  Cake,
  GlassWater,
  Heart,
  Sparkle,
  type LucideIcon,
} from "lucide-react";

import { Section, SectionHeading } from "@/components/section";
import { MotionReveal } from "@/components/motion-reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { celebrations } from "@/lib/site-config";

const iconByName: Record<string, LucideIcon> = {
  Weddings: Heart,
  Birthdays: Cake,
  Baptisms: Baby,
  Debuts: Sparkle,
  Anniversaries: GlassWater,
  "Corporate events": Briefcase,
};

export function OtherCelebrations() {
  return (
    <Section className="bg-white/60">
      <SectionHeading
        eyebrow="What's next"
        title="Made for every celebration—soon"
        description="Weddings are available today. More celebrations are on the way."
      />

      <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {celebrations.map((celebration, index) => {
          const Icon = iconByName[celebration.name] ?? Sparkle;
          return (
            <MotionReveal
              as="li"
              key={celebration.name}
              delay={(index % 6) * 0.05}
            >
              <div
                className={cn(
                  "flex h-full flex-col items-center gap-3 rounded-2xl border p-5 text-center",
                  celebration.available
                    ? "border-gold/40 bg-gold/10"
                    : "border-border bg-card"
                )}
              >
                <span
                  className={cn(
                    "flex size-11 items-center justify-center rounded-full",
                    celebration.available
                      ? "bg-navy text-gold"
                      : "bg-muted text-blue"
                  )}
                >
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <p className="text-sm font-semibold text-navy">
                  {celebration.name}
                </p>
                {celebration.available ? (
                  <Badge variant="gold">Available now</Badge>
                ) : (
                  <Badge variant="muted">Coming soon</Badge>
                )}
              </div>
            </MotionReveal>
          );
        })}
      </ul>
    </Section>
  );
}
