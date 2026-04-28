"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 1,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const directionMap = {
    up: { y: 32, x: 0 },
    down: { y: -32, x: 0 },
    left: { x: 32, y: 0 },
    right: { x: -32, y: 0 },
  };

  const offset = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* Staggered word reveal for headlines */
interface WordRevealProps {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
}

export function WordReveal({
  text,
  className = "",
  stagger = 0.05,
  delay = 0,
}: WordRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const words = text.split(" ");

  return (
    <motion.div ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={
              isInView
                ? { y: "0%", opacity: 1 }
                : { y: "100%", opacity: 0 }
            }
            transition={{
              duration: 0.8,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

/* Line-by-line reveal for body text */
interface LineRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  delay?: number;
}

export function LineReveal({
  lines,
  className = "",
  lineClassName = "",
  stagger = 0.1,
  delay = 0,
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div ref={ref} className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className={`block ${lineClassName}`}
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{
            duration: 0.8,
            delay: delay + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {line}
        </motion.span>
      ))}
    </motion.div>
  );
}
