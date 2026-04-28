import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAISON NOIR — Eau de Parfum",
  description: "A small house of perfume. Composed in silence.",
  openGraph: {
    title: "MAISON NOIR — Eau de Parfum",
    description: "A small house of perfume. Composed in silence.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen bg-noir text-cream overflow-x-hidden">
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
