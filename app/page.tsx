import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-white flex items-center overflow-hidden">
        <div className="relative z-10 w-full">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-12 py-12 lg:py-0">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-0">
              
              {/* Mobile: Image First */}
              <div className="lg:hidden w-full mb-12">
                <img
                  src="/images/hero-image.jpg"
                  alt="The Master Craftsman hand-lasting a boot"
                  className="w-full max-w-lg mx-auto h-auto scale-125"
                />
              </div>

              {/* Text Content - 40% on Desktop */}
              <div className="lg:w-2/5 text-left space-y-8 z-10 lg:pr-12">
                <div className="space-y-3">
                  <p className="font-sans text-xs uppercase tracking-[0.25em] text-amber-700 font-medium">
                    Est. 1990 — The Master&apos;s Touch
                  </p>
                  <h1 className="font-serif text-5xl lg:text-6xl text-gray-900 font-medium leading-tight">
                    Legacy Carved by Hand
                  </h1>
                </div>
                
                <p className="font-sans text-base text-stone-600 leading-relaxed max-w-lg lg:max-w-none">
                  Founded by a family of artisans in 1990. Every pair is meticulously hand-lasted by our master craftsman, preserving the sacred traditions of the Steppe in every stitch.
                </p>

                <Link
                  href="/shop"
                  className="inline-block font-sans text-xs uppercase tracking-widest font-bold border-b-2 border-gray-900 pb-2 hover:text-amber-700 hover:border-amber-700 transition-all duration-300"
                >
                  VIEW THE CRAFTSMANSHIP
                </Link>
              </div>

              {/* Desktop: Image on Right - 60% scaled to viewport */}
              <div className="hidden lg:block lg:w-3/5 h-screen flex items-center justify-start">
                <img
                  src="/images/hero-image.jpg"
                  alt="The Master Craftsman hand-lasting a boot"
                  className="w-full h-full object-contain scale-110"
                />
              </div>

            </div>
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
