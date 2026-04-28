"use client";

import { cn } from "@/lib/cn";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card bg-noir-glass backdrop-blur-2xl border border-white/5 hover:border-gold/30 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        className
      )}
    >
      {children}
    </div>
  );
}
