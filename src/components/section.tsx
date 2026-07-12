import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  /** Constrains inner content width and centers it with responsive padding. */
  container?: boolean;
};

/**
 * Section landmark with consistent vertical rhythm and a centered container.
 */
export function Section({
  className,
  container = true,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("scroll-mt-24 py-16 sm:py-20 lg:py-28", className)}
      {...props}
    >
      {container ? <Container>{children}</Container> : children}
    </section>
  );
}

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Shared editorial heading block used across sections.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const isDark = tone === "dark";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.2em]",
            isDark ? "text-gold" : "text-muted-foreground"
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "font-heading text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]",
          isDark ? "text-ivory" : "text-navy"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            align === "center" ? "mx-auto" : "",
            isDark ? "text-ivory/75" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
