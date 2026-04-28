"use client";

import Link from "next/link";
import Reveal from "./Reveal";

const footerLinks = [
  { label: "Shop", href: "/#collection" },
  { label: "Our House", href: "/#the-house" },
  { label: "Contact", href: "#" },
  { label: "Instagram", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-subtle bg-noir">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-24 md:py-32">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-6">
            {/* Brand */}
            <div className="md:col-span-6">
              <span
                className="font-cormorant text-cream/90 font-light block"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "0.15em" }}
              >
                MAISON NOIR
              </span>
              <p
                className="mt-6 font-cormorant italic text-cream-muted/50 max-w-xs leading-relaxed"
                style={{ fontSize: "clamp(0.875rem, 1.2vw, 1rem)" }}
              >
                A small house of perfume.
                <br />
                Composed in silence.
              </p>
            </div>

            {/* Links */}
            <div className="md:col-span-3 md:col-start-8">
              <span className="eyebrow text-cream-muted/40 block mb-8">NAVIGATION</span>
              <div className="flex flex-col gap-5">
                {footerLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-inter text-cream-muted/60 hover:text-cream transition-colors duration-300 font-light"
                    style={{ fontSize: "13px", letterSpacing: "0.02em" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="md:col-span-2 md:col-start-11">
              <span className="eyebrow text-cream-muted/40 block mb-8">INFO</span>
              <div className="flex flex-col gap-5">
                <span
                  className="font-inter text-cream-muted/60 font-light"
                  style={{ fontSize: "13px", letterSpacing: "0.02em" }}
                >
                  Privacy
                </span>
                <span
                  className="font-inter text-cream-muted/60 font-light"
                  style={{ fontSize: "13px", letterSpacing: "0.02em" }}
                >
                  Terms
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom bar */}
        <div className="mt-24 pt-8 border-t border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="font-inter text-cream-muted/30 font-light"
            style={{ fontSize: "11px", letterSpacing: "0.05em" }}
          >
            © 2025 MAISON NOIR. All rights reserved.
          </span>
          <span
            className="font-inter text-cream-muted/20 font-light"
            style={{ fontSize: "10px", letterSpacing: "0.08em" }}
          >
            CRAFTED WITH INTENTION
          </span>
        </div>
      </div>
    </footer>
  );
}
