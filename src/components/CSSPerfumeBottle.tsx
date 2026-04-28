"use client";

import { cn } from "@/lib/cn";

interface CSSPerfumeBottleProps {
  scale?: number;
  className?: string;
  animate?: boolean;
  showLabel?: boolean;
  variant?: 0 | 1 | 2;
}

export default function CSSPerfumeBottle({
  scale = 1,
  className = "",
  animate = true,
  showLabel = true,
  variant = 0,
}: CSSPerfumeBottleProps) {
  // Variant-based accent colors for subtle differentiation
  const accents = [
    { glow: "rgba(201, 169, 97, 0.15)", highlight: "rgba(201, 169, 97, 0.12)" },
    { glow: "rgba(180, 160, 120, 0.15)", highlight: "rgba(180, 160, 120, 0.12)" },
    { glow: "rgba(210, 175, 110, 0.15)", highlight: "rgba(210, 175, 110, 0.12)" },
  ];

  const accent = accents[variant] || accents[0];

  return (
    <div
      className={cn("bottle-wrapper flex items-center justify-center", className)}
      style={{ transform: `scale(${scale})` }}
    >
      <div
        className={cn(
          "relative flex flex-col items-center",
          animate && "bottle-float"
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ═══ CAP ═══ */}
        <div
          className="bottle-cap relative rounded-sm"
          style={{
            width: 96,
            height: 72,
            borderRadius: "3px 3px 1px 1px",
            borderBottom: `1px solid rgba(201, 169, 97, 0.35)`,
          }}
        >
          {/* Cap top highlight */}
          <div
            className="absolute top-0 left-0 right-0"
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
            }}
          />
          {/* Cap side reflection */}
          <div
            className="absolute top-[8px] left-[8px] bottom-[8px]"
            style={{
              width: 2,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.05), transparent)",
              borderRadius: 1,
            }}
          />
        </div>

        {/* ═══ NECK ═══ */}
        <div
          className="bottle-neck relative"
          style={{
            width: 48,
            height: 28,
            borderRadius: "0 0 2px 2px",
          }}
        >
          {/* Neck-to-body flare */}
          <div
            className="absolute -bottom-[1px] left-1/2 -translate-x-1/2"
            style={{
              width: 56,
              height: 4,
              background: "linear-gradient(180deg, #1a1a1a, #141414)",
              borderRadius: "0 0 2px 2px",
            }}
          />
        </div>

        {/* ═══ BODY ═══ */}
        <div
          className="bottle-body relative rounded-sm"
          style={{
            width: 168,
            height: 240,
            borderRadius: "2px",
            background: `radial-gradient(ellipse at 30% 30%, ${accent.glow} 0%, rgba(20, 20, 20, 0.9) 60%, #0a0a0a 100%)`,
          }}
        >
          {/* Right edge highlight */}
          <div className="bottle-edge-highlight" />
          {/* Left edge highlight */}
          <div className="bottle-edge-highlight-left" />

          {/* Inner vertical highlight strip */}
          <div
            className="absolute"
            style={{
              top: "8%",
              left: "12%",
              width: 2,
              height: "60%",
              background: `linear-gradient(180deg, ${accent.highlight}, transparent)`,
              opacity: 0.6,
              borderRadius: 1,
            }}
          />

          {/* Secondary inner reflection */}
          <div
            className="absolute"
            style={{
              top: "5%",
              left: "20%",
              width: "25%",
              height: "45%",
              background: `linear-gradient(160deg, rgba(255,255,255,0.04) 0%, transparent 60%)`,
              borderRadius: "2px",
              pointerEvents: "none",
            }}
          />

          {/* Ambient glass refraction */}
          <div
            className="absolute"
            style={{
              top: "15%",
              right: "15%",
              width: "20%",
              height: "30%",
              background: `radial-gradient(ellipse at center, rgba(201, 169, 97, 0.03), transparent)`,
              pointerEvents: "none",
            }}
          />

          {/* ═══ LABEL ═══ */}
          {showLabel && (
            <div
              className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
              style={{
                top: "42%",
                width: "70%",
                height: 48,
                borderTop: "1px solid rgba(201, 169, 97, 0.3)",
                borderBottom: "1px solid rgba(201, 169, 97, 0.3)",
              }}
            >
              <span
                className="font-cormorant text-gold/70 font-light"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.35em",
                }}
              >
                MAISON NOIR
              </span>
            </div>
          )}

          {/* Label volume text */}
          {showLabel && (
            <div
              className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
              style={{
                top: "65%",
              }}
            >
              <span
                className="font-inter text-cream-muted/30 font-light"
                style={{
                  fontSize: 7,
                  letterSpacing: "0.25em",
                }}
              >
                50ML
              </span>
            </div>
          )}

          {/* Bottom body gradient */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: "30%",
              background:
                "linear-gradient(180deg, transparent, rgba(0,0,0,0.4))",
              borderRadius: "0 0 2px 2px",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* ═══ BASE SHADOW ═══ */}
        <div
          style={{
            width: 120,
            height: 6,
            marginTop: 8,
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.5), transparent)",
            filter: "blur(4px)",
          }}
        />
      </div>
    </div>
  );
}
