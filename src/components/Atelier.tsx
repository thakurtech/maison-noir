"use client";

import Image from "next/image";
import { WordReveal } from "./Reveal";

export default function Atelier() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/atelier.png"
          alt="The Atelier"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-noir/75" />
        {/* Vignette overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 30%, #0a0a0a 90%)",
          }}
        />
      </div>

      {/* Center text */}
      <div className="relative z-10 px-6 text-center">
        <WordReveal
          text="Made by hand. In small numbers."
          className="font-cormorant italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream/90 font-light"
          stagger={0.08}
        />
      </div>
    </section>
  );
}
