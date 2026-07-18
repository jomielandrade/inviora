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
    <Section id="packages" tier="primary" surface="ivory">
      <SectionHeading
        eyebrow="Packages"
        title="Choose the experience that fits your celebration"
        description="Transparent packages with room to personalize. Start a conversation whenever you're ready."
        align="left"
        className="max-w-3xl"
      />

      {/*
        Pricing is the principal card-based decision point. Equal peers on
        desktop; at 768px the third card centers so it never orphans alone.
      */}
      <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-7">
        {packages.map((pkg, index) => (
          <MotionReveal
            key={pkg.id}
            delay={index * 0.08}
            className={cn(
              "flex h-full min-w-0",
              index === packages.length - 1 &&
                "md:col-span-2 md:mx-auto md:w-[calc(50%-0.75rem)] lg:col-span-1 lg:mx-0 lg:w-auto"
            )}
          >
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
        "relative flex h-full w-full min-w-0 max-w-full flex-col rounded-3xl border p-7 pt-9 transition-shadow duration-300 sm:p-8 sm:pt-10",
        featured
          ? "z-[1] border-navy bg-navy text-ivory shadow-[0_32px_64px_-28px_rgba(14,27,61,0.55)]"
          : "border-border bg-card text-navy shadow-[0_18px_40px_-36px_rgba(14,27,61,0.35)] motion-safe:hover:shadow-[0_24px_48px_-32px_rgba(14,27,61,0.4)]"
      )}
    >
      {pkg.badge ? (
        <Badge
          variant="gold"
          size="md"
          className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 border-gold bg-gold font-semibold text-navy shadow-md"
        >
          {pkg.badge}
        </Badge>
      ) : null}

      <h3 className="font-heading text-2xl font-semibold tracking-tight">
        {pkg.name}
      </h3>
      <p
        className={cn(
          "mt-2 min-h-[2.75rem] text-sm leading-relaxed",
          featured ? "text-ivory/75" : "text-muted-foreground"
        )}
      >
        {pkg.positioning}
      </p>

      <div className="mt-5 flex flex-col gap-1">
        <span className="text-3xl font-semibold tracking-tight tabular-nums sm:text-[2rem]">
          {pkg.price}
        </span>
        <span
          className={cn(
            "text-sm tabular-nums line-through",
            featured ? "text-ivory/50" : "text-muted-foreground"
          )}
        >
          {pkg.regularPrice}
        </span>
      </div>

      <div className="mt-6 flex-1 border-t border-current/10 pt-6">
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

      <div className="mt-auto pt-8">
        <MessengerButton
          reference={`package-${pkg.id}`}
          variant={featured ? "default" : "outline"}
          className={cn(
            "flex h-12 min-h-12 w-full min-w-0 items-center justify-center whitespace-normal text-center leading-tight",
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
