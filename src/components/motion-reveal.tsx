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
 * Reduced-motion visibility is also enforced in CSS so core content never
 * depends on hydration or JavaScript animation to appear.
 */
export function MotionReveal({
  children,
  className,
  delay = 0,
  as = "div",
}: MotionRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      data-reveal
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={
        prefersReducedMotion
          ? undefined
          : { duration: 0.5, ease: "easeOut", delay }
      }
    >
      {children}
    </MotionTag>
  );
}
