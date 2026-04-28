"use client";

import Reveal from "./Reveal";
import Link from "next/link";

const footerLinks = [
  { label: "INSTAGRAM", href: "#" },
  { label: "CONTACT", href: "#" },
  { label: "PRIVACY", href: "#" },
];

export default function Footer() {
  return (
    <footer className="py-32 border-t border-subtle text-center">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <Reveal>
          <span className="font-cormorant text-xl tracking-[0.25em] text-cream font-light">
            MAISON NOIR
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 font-cormorant italic text-cream-muted">
            A small house of perfume.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 flex gap-12 justify-center flex-wrap">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-inter text-[11px] tracking-[0.3em] uppercase text-cream-muted hover:text-gold transition-colors duration-300 font-light"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-24 text-[10px] text-cream-muted/50 tracking-wider font-inter font-light">
            &copy; 2025 MAISON NOIR. COMPOSED IN SMALL BATCHES.
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
