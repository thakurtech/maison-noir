import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/lib/products";
import type { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} — MAISON NOIR`,
    description: product.description,
    openGraph: {
      title: `${product.name} — MAISON NOIR`,
      description: product.description,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const variantIndex = products.findIndex((p) => p.slug === slug);

  return <ProductDetailClient product={product} variantIndex={variantIndex as 0 | 1 | 2} />;
}
