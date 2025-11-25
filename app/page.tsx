import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

// Blur placeholder for hero image (reduces LCP)
const heroBlurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBRIhBhMiMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEQA/ANsNJdOuppXlkMaqN3IJ2sCcnBH3Hsq/arSlKUrTJZn/2Q==";

export default function Home() {
  const featuredProducts = products.slice(0, 6);

  return (
    <main className="min-h-screen">
      {/* Hero Section - Optimized for LCP */}
      <section className="relative min-h-screen bg-white flex items-center overflow-hidden">
        <div className="relative z-10 w-full">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-12 py-24 lg:py-0">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">
              
              {/* Mobile: Image First - Fixed aspect ratio */}
              <div className="lg:hidden w-full mb-12">
                <div className="relative w-full max-w-xl mx-auto">
                  <Image
                    src="/images/hero-image.jpg"
                    alt="Premium Mongolian boots with traditional embossed medallion"
                    width={780}
                    height={910}
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-contain scale-[1.5] origin-center"
                    priority
                    placeholder="blur"
                    blurDataURL={heroBlurDataURL}
                  />
                </div>
              </div>

              {/* Text Content - 40% on Desktop */}
              <div className="lg:w-2/5 text-left space-y-6 z-10 lg:pr-8">
                <div className="space-y-4">
                  <p className="font-sans text-xs uppercase tracking-[0.3em] text-cognac font-medium">
                    Est. 1990 — The Master&apos;s Touch
                  </p>
                  <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl text-[#1a2a4a] font-normal leading-[1.1]">
                    Legacy Carved<br />by Hand
                  </h1>
                </div>
                
                <p className="font-sans text-base lg:text-lg text-stone-warm leading-relaxed max-w-md">
                  Founded by a family of artisans in 1990. Every pair is meticulously hand-lasted by our master craftsman, preserving the sacred traditions of the Steppe in every stitch.
                </p>

                <Link
                  href="/about"
                  className="inline-block font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#1a2a4a] border-b-2 border-[#1a2a4a] pb-1.5 hover:text-cognac hover:border-cognac transition-colors duration-300"
                >
                  View the Craftsmanship
                </Link>
              </div>

              {/* Desktop: Image - Right side with boots */}
              <div className="hidden lg:flex lg:w-3/5 items-center justify-end relative">
                <div className="relative w-full max-w-3xl">
                  <Image
                    src="/images/hero-image.jpg"
                    alt="Premium Mongolian boots with traditional embossed medallion"
                    width={1040}
                    height={1170}
                    sizes="70vw"
                    className="object-contain scale-[1.3] origin-center"
                    priority
                    placeholder="blur"
                    blurDataURL={heroBlurDataURL}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 lg:py-32 bg-cream-sand">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block font-sans text-xs uppercase tracking-[0.25em] text-cognac mb-6">
              The Collection
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl text-black font-medium tracking-tight mb-6">
              Where Heritage Meets Hand
            </h2>
            <p className="text-stone-warm max-w-2xl mx-auto mt-4">
              Each boot begins as raw leather and a wooden last. What emerges—forty hours later—carries 
              the weight of tradition and the lightness of true craftsmanship.
            </p>
            <div className="w-24 h-px bg-gold mx-auto mt-8" aria-hidden="true" />
          </div>

          {/* Product Grid - Optimized loading */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {featuredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                priority={index < 3}
              />
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-16">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 font-sans text-sm uppercase tracking-widest text-black hover:text-cognac transition-colors duration-300 group"
            >
              <span>View All Collection</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden shadow-lg">
              <Image
                src="/images/heritage-craftsman.jpg"
                alt="Master craftsman at work in the Domog atelier"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="lg:pl-8">
              <span className="inline-block font-sans text-xs uppercase tracking-[0.25em] text-cognac mb-6">
                Our Heritage
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl text-black font-medium tracking-tight mb-8">
                The Hands That Remember
              </h2>
              
              <div className="space-y-6 text-stone-warm text-lg leading-relaxed">
                <p>
                  Our founder learned his craft from masters who remembered the old ways—
                  men who had shod the horses of khans, who knew that a boot must speak 
                  to both stirrup and ceremony.
                </p>
                <p>
                  Today, those same techniques endure. We cure leather by seasons, not hours. 
                  We shape by hand, not machine. We sign each pair, because anonymity 
                  belongs to factories, not artisans.
                </p>
                <p className="text-black font-medium">
                  Presidents have worn our work. Champions have competed in it. 
                  We keep no photographs—only the wooden lasts, shaped to their feet.
                </p>
              </div>

              <div className="mt-10">
                <Link
                  href="/about"
                  className="btn-secondary"
                >
                  Explore Our Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Pillars */}
      <section className="py-32 lg:py-40 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-block font-sans text-xs uppercase tracking-[0.25em] text-cognac mb-6">
              Our Promise
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl text-black font-medium tracking-tight">
              Excellence in Every Detail
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <div className="text-center group">
              <div className="mb-6">
                <span className="font-serif text-5xl lg:text-6xl text-gold/20 group-hover:text-gold/40 transition-colors duration-500">
                  01
                </span>
              </div>
              <h3 className="font-serif text-2xl text-black font-medium mb-4">
                Hand-Lasted
              </h3>
              <p className="font-sans text-stone-warm leading-relaxed">
                Each boot is shaped over a wooden last by hand, a process that takes 40+ hours and cannot be rushed.
              </p>
            </div>
            <div className="text-center group">
              <div className="mb-6">
                <span className="font-serif text-5xl lg:text-6xl text-gold/20 group-hover:text-gold/40 transition-colors duration-500">
                  02
                </span>
              </div>
              <h3 className="font-serif text-2xl text-black font-medium mb-4">
                Vegetable-Tanned
              </h3>
              <p className="font-sans text-stone-warm leading-relaxed">
                Our leather is tanned using centuries-old methods. It breaks in, conforms, and develops a patina unique to you.
              </p>
            </div>
            <div className="text-center group">
              <div className="mb-6">
                <span className="font-serif text-5xl lg:text-6xl text-gold/20 group-hover:text-gold/40 transition-colors duration-500">
                  03
                </span>
              </div>
              <h3 className="font-serif text-2xl text-black font-medium mb-4">
                Lifetime Warranty
              </h3>
              <p className="font-sans text-stone-warm leading-relaxed">
                We stand behind every pair. Repairs, re-soling, reconditioning—we maintain what we create.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
