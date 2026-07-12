"use client";

import { motion, useReducedMotion } from "motion/react";

type MotionRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds for small related groups. */
  delay?: number;
  as?: "div" | "li" | "section";
};

/**
 * Gentle fade + small vertical reveal on scroll into view.
 *
 * Motion is skipped entirely when the user prefers reduced motion. A `noscript`
 * fallback in the root layout forces `[data-reveal]` elements visible so core
 * content never depends on JavaScript to appear.
 */
export function MotionReveal({
  children,
  className,
  delay = 0,
  as = "div",
}: MotionRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    const Tag = as;
    return (
      <Tag data-reveal className={className}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </MotionTag>
  );
}
