"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const ITEM: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const VIEWPORT = { once: true, margin: "0px 0px -80px 0px" } as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait once the element scrolls into view. */
  delay?: number;
}

/** Fades + lifts its children in once, the first time they scroll into view. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: ITEM.hidden,
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: EASE, delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  /** Seconds between each `RevealItem` inside. */
  stagger?: number;
}

/** Container that staggers its `RevealItem` children as it scrolls into view. */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
}: RevealGroupProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

/** Child of `RevealGroup` — inherits its trigger and stagger timing. */
export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={ITEM}>
      {children}
    </motion.div>
  );
}
