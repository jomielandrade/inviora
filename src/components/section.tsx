import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  /** Constrains inner content width and centers it with responsive padding. */
  container?: boolean;
  /** Editorial spacing role for this part of the conversion journey. */
  tier?: "flagship" | "primary" | "supporting";
  /** Brand-derived surface used to separate adjacent compositions. */
  surface?: "ivory" | "tint" | "white" | "navy";
};

const tierClasses = {
  flagship: "py-20 sm:py-24 lg:py-32",
  primary: "py-16 sm:py-20 lg:py-28",
  supporting: "py-14 sm:py-16 lg:py-20",
} as const;

const surfaceClasses = {
  ivory: "bg-ivory",
  tint: "bg-surface-tint",
  white: "bg-white",
  navy: "bg-navy text-ivory",
} as const;

/**
 * Section landmark with role-based editorial rhythm and branded surfaces.
 */
export function Section({
  className,
  container = true,
  tier = "primary",
  surface = "ivory",
  id,
  children,
  ...props
}: SectionProps) {
  // Zero-height anchor at the start of section content so hash navigation
  // lands on the heading, not above the section's top padding.
  const anchor = id ? (
    <span
      id={id}
      aria-hidden="true"
      className="block h-0 w-full scroll-mt-[calc(var(--header-height)+0.75rem)]"
    />
  ) : null;

  return (
    <section
      className={cn(tierClasses[tier], surfaceClasses[surface], className)}
      {...props}
    >
      {container ? (
        <Container>
          {anchor}
          {children}
        </Container>
      ) : (
        <>
          {anchor}
          {children}
        </>
      )}
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
  scale?: "standard" | "display";
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
  scale = "standard",
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
          "font-heading font-semibold leading-tight tracking-tight text-balance",
          scale === "display"
            ? "text-4xl sm:text-5xl lg:text-[3.5rem]"
            : "text-3xl sm:text-4xl lg:text-[2.75rem]",
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
