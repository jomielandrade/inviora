import { Check } from "lucide-react";

import { Section, SectionHeading } from "@/components/section";
import { MotionReveal } from "@/components/motion-reveal";
import { Badge } from "@/components/ui/badge";
import { MessengerButton } from "@/components/messenger-button";
import { cn } from "@/lib/utils";
import { packages, pricingNote, type Package } from "@/lib/site-config";
import { Comparison } from "@/components/sections/comparison";

export function Packages() {
  return (
    <Section id="packages">
      <SectionHeading
        eyebrow="Packages"
        title="Choose the experience that fits your celebration"
        description="Transparent packages with room to personalize. Start a conversation whenever you're ready."
      />

      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
        {packages.map((pkg, index) => (
          <MotionReveal key={pkg.id} delay={index * 0.08} className="flex">
            <PackageCard pkg={pkg} />
          </MotionReveal>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        {pricingNote}
      </p>

      <Comparison />
    </Section>
  );
}

function PackageCard({ pkg }: { pkg: Package }) {
  const featured = pkg.featured;
  return (
    <div
      className={cn(
        "relative flex w-full flex-col rounded-3xl border p-7 sm:p-8",
        featured
          ? "border-navy bg-navy text-ivory shadow-[0_30px_60px_-30px_rgba(14,27,61,0.6)]"
          : "border-border bg-card text-navy"
      )}
    >
      {pkg.badge ? (
        <Badge
          variant="gold"
          size="md"
          className="absolute -top-3 left-1/2 -translate-x-1/2 shadow-sm"
        >
          {pkg.badge}
        </Badge>
      ) : null}

      <h3 className="font-heading text-2xl font-semibold">{pkg.name}</h3>
      <p
        className={cn(
          "mt-2 min-h-[2.75rem] text-sm leading-relaxed",
          featured ? "text-ivory/75" : "text-muted-foreground"
        )}
      >
        {pkg.positioning}
      </p>

      <div className="mt-5 flex items-baseline gap-1">
        <span className="font-heading text-4xl font-semibold tracking-tight">
          {pkg.price}
        </span>
      </div>

      <div className="mt-6 border-t border-current/10 pt-6">
        {pkg.includesLabel ? (
          <p
            className={cn(
              "mb-3 text-sm font-semibold",
              featured ? "text-ivory" : "text-navy"
            )}
          >
            {pkg.includesLabel}
          </p>
        ) : null}
        <ul className="flex flex-col gap-3">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm">
              <span
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                  featured ? "bg-gold/20 text-gold" : "bg-gold/15 text-navy"
                )}
              >
                <Check aria-hidden="true" className="size-3" />
              </span>
              <span
                className={cn(
                  "leading-relaxed",
                  featured ? "text-ivory/85" : "text-navy/90"
                )}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 pt-2">
        <MessengerButton
          reference={`package-${pkg.id}`}
          variant={featured ? "default" : "outline"}
          className={cn(
            "w-full",
            featured &&
              "bg-gold text-navy hover:bg-gold/90 focus-visible:ring-gold/50"
          )}
        >
          {pkg.cta}
        </MessengerButton>
      </div>
    </div>
  );
}
