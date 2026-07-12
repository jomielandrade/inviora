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
    <Section tier="supporting" surface="white">
      <SectionHeading
        eyebrow="What's next"
        title="Made for every celebration—soon"
        description="Weddings are available today. More celebrations are on the way."
        align="left"
      />

      <ul className="mt-10 grid grid-cols-2 border-t border-l border-border lg:grid-cols-3">
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
                  "flex h-full min-w-0 flex-col items-start gap-3 border-r border-b border-border p-4 sm:flex-row sm:items-center sm:p-5",
                  celebration.available
                    ? "bg-gold/10"
                    : "bg-white"
                )}
              >
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full",
                    celebration.available
                      ? "bg-navy text-gold"
                      : "bg-muted text-blue"
                  )}
                >
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-navy">
                    {celebration.name}
                  </p>
                  <div className="mt-1.5">
                    {celebration.available ? (
                      <Badge variant="gold">Available now</Badge>
                    ) : (
                      <Badge variant="muted">Coming soon</Badge>
                    )}
                  </div>
                </div>
              </div>
            </MotionReveal>
          );
        })}
      </ul>
    </Section>
  );
}
