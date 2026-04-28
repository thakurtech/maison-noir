"use client";

import { LineReveal } from "./Reveal";
import Reveal from "./Reveal";

export default function TheHouse() {
  const para1Lines = [
    "MAISON NOIR is a small house.",
    "We do not make perfume for everyone.",
    "We make it for the few who understand",
    "that scent is a private language.",
  ];

  const para2Lines = [
    "Each composition is made in small batches",
    "in our atelier. We use ingredients that take time.",
    "We move slowly because there is no other way.",
  ];

  return (
    <section
      id="the-house"
      className="py-32 md:py-48 max-w-[1440px] mx-auto px-6 md:px-12"
    >
      <div className="grid grid-cols-12 gap-6 md:gap-12">
        {/* Left: Sticky Eyebrow */}
        <div className="col-span-12 md:col-span-2">
          <div className="md:sticky md:top-48">
            <Reveal>
              <span className="eyebrow">THE HOUSE</span>
            </Reveal>
          </div>
        </div>

        {/* Right: Manifesto Text */}
        <div className="col-span-12 md:col-span-7 md:col-start-5 mt-8 md:mt-0">
          <LineReveal
            lines={para1Lines}
            className="font-cormorant text-2xl sm:text-3xl md:text-4xl font-light leading-[1.5] text-cream"
            stagger={0.1}
          />

          <LineReveal
            lines={para2Lines}
            className="font-cormorant text-2xl sm:text-3xl md:text-4xl font-light leading-[1.5] text-cream mt-12"
            stagger={0.1}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
