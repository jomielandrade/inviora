import { MessageCircle } from "lucide-react";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { messengerUrl } from "@/lib/site-config";

type MessengerButtonProps = {
  /** Optional Messenger ref used to identify which CTA started the inquiry. */
  reference?: string;
  children: React.ReactNode;
  showIcon?: boolean;
  className?: string;
} & Pick<VariantProps<typeof buttonVariants>, "variant">;

// Comfortable marketing CTA sizing that also satisfies the 44px touch target.
const ctaSizing =
  "h-12 gap-2 rounded-full px-6 text-sm font-semibold sm:text-[0.9375rem]";

/**
 * Anchor styled as a button that always points at the single, centrally
 * configured Facebook Messenger destination.
 */
export function MessengerButton({
  reference,
  children,
  showIcon = true,
  variant = "default",
  className,
}: MessengerButtonProps) {
  return (
    <a
      href={messengerUrl(reference)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants({ variant }), ctaSizing, className)}
    >
      {showIcon ? <MessageCircle aria-hidden="true" className="size-4" /> : null}
      {children}
    </a>
  );
}
