"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Max 8px displacement
      const maxDist = 100;
      const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const factor = Math.min(dist, maxDist) / maxDist;

      setPosition({
        x: (deltaX / maxDist) * 8 * factor,
        y: (deltaY / maxDist) * 8 * factor,
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "tween",
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group relative border border-gold/40 text-gold bg-transparent px-12 py-5 font-inter text-[11px] tracking-[0.3em] uppercase font-light overflow-hidden transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-gold hover:text-noir hover:border-gold rounded-sm ${className}`}
      data-hoverable
    >
      {/* Text layers for slide effect */}
      <span className="relative z-10 block overflow-hidden">
        <span
          className={`block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isHovered ? "-translate-y-full" : "translate-y-0"
          }`}
        >
          {children}
        </span>
        <span
          className={`absolute inset-0 block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isHovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {children}
        </span>
      </span>
    </motion.button>
  );
}
