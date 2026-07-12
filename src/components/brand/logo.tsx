import Image from "next/image";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

// Intrinsic aspect ratio of the supplied brand assets (~1.716:1).
const LOGO_ASPECT = 1.716;

type LogoProps = {
  /** Use "light" on ivory/white surfaces and "dark" on Midnight Navy. */
  variant?: "light" | "dark";
  /** Rendered logo height in pixels; width is derived from the aspect ratio. */
  height?: number;
  priority?: boolean;
  className?: string;
};

export function Logo({
  variant = "light",
  height = 44,
  priority = false,
  className,
}: LogoProps) {
  const src =
    variant === "dark"
      ? "/brand/inviora-logo-dark.png"
      : "/brand/inviora-logo-light.png";
  const width = Math.round(height * LOGO_ASPECT);

  return (
    <Image
      src={src}
      alt={`${siteConfig.name} logo`}
      width={width}
      height={height}
      priority={priority}
      className={cn("object-contain", className)}
    />
  );
}
