"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

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
 * Uses `useInView` + `animate` so elements already in the viewport on mount
 * still reveal reliably. Reduced-motion visibility is also enforced in CSS.
 */
export function MotionReveal({
  children,
  className,
  delay = 0,
  as = "div",
}: MotionRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const visible = prefersReducedMotion === true || isInView;

  const animate = visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 };
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: "easeOut" as const, delay: visible ? delay : 0 };

  if (as === "li") {
    return (
      <motion.li
        ref={ref as unknown as React.Ref<HTMLLIElement>}
        data-reveal
        className={className}
        initial={false}
        animate={animate}
        transition={transition}
      >
        {children}
      </motion.li>
    );
  }

  if (as === "section") {
    return (
      <motion.section
        ref={ref}
        data-reveal
        className={className}
        initial={false}
        animate={animate}
        transition={transition}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <motion.div
      ref={ref}
      data-reveal
      className={className}
      initial={false}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
