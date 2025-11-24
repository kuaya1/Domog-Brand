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
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
              
              {/* Mobile: Image First */}
              <div className="lg:hidden w-full mb-12">
                <img
                  src="/images/hero-image.jpg"
                  alt="Copper Mongol Boots"
                  className="w-full max-w-lg mx-auto h-auto"
                />
              </div>

              {/* Text Content - 1/3 on Desktop */}
              <div className="lg:w-1/3 text-center lg:text-left space-y-8">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#6b4b2f]">
                    NEW • COPPER MONGOL BOOTS
                  </p>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-[#111111] leading-tight">
                    Copper Mongol Boots
                  </h1>
                </div>
                
                <p className="text-base lg:text-lg text-[#2a2a2a] max-w-md lg:max-w-none">
                  Hand-lasted in Ulaanbaatar for heads of state, Naadam champions, and those who revere the bond between nomadic strength and Italian-level refinement.
                </p>

                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-3 border-2 border-black text-black px-8 py-4 text-sm uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300"
                >
                  DISCOVER
                  <span className="text-xl">›</span>
                </Link>
              </div>

              {/* Desktop: Image on Right - 2/3 */}
              <div className="hidden lg:block lg:w-2/3">
                <img
                  src="/images/hero-image.jpg"
                  alt="Copper Mongol Boots"
                  className="w-full h-auto"
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
