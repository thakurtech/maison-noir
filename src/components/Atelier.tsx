"use client";

import { WordReveal } from "./Reveal";

export default function Atelier() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(201, 169, 97, 0.05) 0%, #0a0a0a 70%)",
        }}
      />

      {/* Drifting blobs */}
      <div
        className="absolute opacity-10"
        style={{
          top: "20%",
          left: "20%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201, 169, 97, 0.2) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "drift-1 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute opacity-8"
        style={{
          bottom: "15%",
          right: "15%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201, 169, 97, 0.15) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "drift-2 24s ease-in-out infinite",
        }}
      />
      <div
        className="absolute opacity-6"
        style={{
          top: "50%",
          left: "60%",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201, 169, 97, 0.12) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "drift-3 18s ease-in-out infinite",
        }}
      />

      {/* Center text */}
      <div className="relative z-10 px-6 text-center">
        <WordReveal
          text="Made by hand. In small numbers."
          className="font-cormorant italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream-muted font-light"
          stagger={0.08}
        />
      </div>
    </section>
  );
}
