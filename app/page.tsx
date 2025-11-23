import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/boot-1.jpg"
            alt="Mongolian Heritage"
            fill
            className="object-cover object-center brightness-[0.6]"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <span className="inline-block mb-4 text-gold tracking-[0.3em] uppercase text-sm font-medium animate-fade-in">
            Est. 1989 — Ulaanbaatar
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-tight drop-shadow-lg">
            Legacy of the <br />
            <span className="text-secondary">Great Steppe</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Handcrafted Mongolian boots that blend 35 years of master craftsmanship with timeless elegance. Worn by champions, crafted for you.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <Link
              href="/shop"
              className="bg-primary hover:bg-red-800 text-white px-10 py-4 rounded-sm font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-primary/30"
            >
              <span>Shop Collection</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/about"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-10 py-4 rounded-sm font-medium transition-all duration-300 hover:border-white/60"
            >
              Our Heritage
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-secondary font-medium uppercase tracking-[0.2em] text-sm">
              Excellence in Every Stitch
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-text mt-3 mb-6">
              Featured Masterpieces
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-20">
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 text-text hover:text-primary font-medium border-b-2 border-primary pb-1 transition-colors text-lg"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
