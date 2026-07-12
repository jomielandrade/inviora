import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        gold: "border-gold/40 bg-gold/15 text-navy",
        navy: "border-navy/15 bg-navy text-ivory",
        outline: "border-navy/15 bg-transparent text-navy",
        muted: "border-border bg-muted text-muted-foreground",
      },
      size: {
        sm: "px-2.5 py-0.5 text-xs",
        md: "px-3 py-1 text-[0.8125rem]",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "sm",
    },
  }
);

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
