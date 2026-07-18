"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useAnimationControls,
  useInView,
} from "motion/react";

type RevealAs = "div" | "li" | "section";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds for small related groups. */
  delay?: number;
  as?: RevealAs;
};

const IN_VIEW_AMOUNT = 0.15;

const hidden = { opacity: 0, y: 16 };
const shown = { opacity: 1, y: 0 };

const motionTags = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
} as const;

/** Visible area ratio of an element within the viewport (0–1). */
function getViewportIntersectionRatio(element: Element): number {
  const rect = element.getBoundingClientRect();
  const vh = window.innerHeight;
  const vw = window.innerWidth;

  const overlapWidth = Math.min(rect.right, vw) - Math.max(rect.left, 0);
  const overlapHeight = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
  if (overlapWidth <= 0 || overlapHeight <= 0) return 0;

  const area = rect.width * rect.height;
  if (area <= 0) return 1;

  return (overlapWidth * overlapHeight) / area;
}

function setElementInert(element: HTMLElement | null, inert: boolean) {
  if (!element) return;
  if (inert) {
    element.setAttribute("inert", "");
  } else {
    element.removeAttribute("inert");
  }
}

function getPrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    getPrefersReducedMotion
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(query.matches);

    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

/**
 * Gentle fade + small vertical reveal on scroll into view.
 *
 * SSR and the first client render stay visible so above-fold content does not
 * flash blank. After layout, above-fold items play a mount entrance; below-fold
 * items stay hidden (and inert) until scrolled into view. Reduced-motion
 * visibility is also enforced in CSS.
 */
export function MotionReveal({
  children,
  className,
  delay = 0,
  as = "div",
}: MotionRevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const controls = useAnimationControls();
  const isInView = useInView(ref, { once: true, amount: IN_VIEW_AMOUNT });
  const hasRevealedRef = useRef(false);
  const waitingForScrollRef = useRef(false);

  useLayoutEffect(() => {
    const element = ref.current;

    if (prefersReducedMotion === true) {
      hasRevealedRef.current = true;
      waitingForScrollRef.current = false;
      controls.set(shown);
      setElementInert(element, false);
      return;
    }

    if (!element) {
      controls.set(shown);
      return;
    }

    const initiallyInView =
      getViewportIntersectionRatio(element) >= IN_VIEW_AMOUNT;

    // Commit the hidden state before paint so the first frame is intentional.
    controls.set(hidden);
    setElementInert(element, true);

    if (initiallyInView) {
      waitingForScrollRef.current = false;
      const frame = requestAnimationFrame(() => {
        if (hasRevealedRef.current) return;
        hasRevealedRef.current = true;
        setElementInert(element, false);
        void controls.start({
          ...shown,
          transition: { duration: 0.5, ease: "easeOut", delay },
        });
      });
      return () => cancelAnimationFrame(frame);
    }

    waitingForScrollRef.current = true;
  }, [prefersReducedMotion, controls, delay]);

  useLayoutEffect(() => {
    if (!waitingForScrollRef.current || hasRevealedRef.current) return;
    if (!isInView || prefersReducedMotion === true) return;

    const element = ref.current;
    hasRevealedRef.current = true;
    waitingForScrollRef.current = false;
    setElementInert(element, false);
    void controls.start({
      ...shown,
      transition: { duration: 0.5, ease: "easeOut", delay },
    });
  }, [isInView, prefersReducedMotion, controls, delay]);

  const Component = motionTags[as];
  const setRef = <T extends HTMLElement>(node: T | null) => {
    ref.current = node;
  };

  return (
    <Component
      ref={setRef}
      data-reveal
      className={className}
      initial={shown}
      animate={controls}
    >
      {children}
    </Component>
  );
}
