"use client";

import { motion, useReducedMotion } from "motion/react";

import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`reveal-content ${className}`}
      initial={{
        opacity: 0,
        y: 80,
        scale: 0.9,
        rotateX: 7,
        filter: "blur(15px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: 0.16,
        margin: "0px 0px -8% 0px",
      }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        transformPerspective: 1200,
        transformOrigin: "center bottom",
      }}
    >
      {children}
    </motion.div>
  );
}
