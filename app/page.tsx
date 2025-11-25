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
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-12 py-12 lg:py-0">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-0">
              
              {/* Mobile: Image First - Fixed aspect ratio */}
              <div className="lg:hidden w-full mb-12">
                <div className="relative w-full max-w-lg mx-auto aspect-square">
                  <Image
                    src="/images/hero-image.jpg"
                    alt="Master craftsman hand-lasting a premium Mongolian boot"
                    fill
                    sizes="(max-width: 768px) 100vw, 512px"
                    className="object-cover"
                    priority
                    placeholder="blur"
                    blurDataURL={heroBlurDataURL}
                  />
                </div>
              </div>

              {/* Text Content - 40% on Desktop */}
              <div className="lg:w-2/5 text-left space-y-8 z-10 lg:pr-12">
                <div className="space-y-3 hidden lg:block">
                  <p className="font-sans text-xs uppercase tracking-[0.25em] text-cognac font-medium">
                    Est. 1990 — The Master&apos;s Touch
                  </p>
                  <h1 className="font-serif text-5xl lg:text-6xl text-black font-medium leading-tight">
                    Legacy Carved by Hand
                  </h1>
                </div>
                <div className="space-y-3 lg:hidden">
                  <h1 className="font-serif text-4xl sm:text-5xl text-black font-medium leading-tight">
                    Legacy Carved by Hand
                  </h1>
                </div>
                
                <p className="font-sans text-base text-stone-warm leading-relaxed max-w-lg lg:max-w-none">
                  Founded by a family of artisans in 1990. Every pair is meticulously 
                  hand-lasted by our master craftsman, preserving the sacred traditions 
                  of the Steppe in every stitch.
                </p>

                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-bold border-b-2 border-black pb-2 hover:text-cognac hover:border-cognac transition-colors duration-300"
                >
                  View the Craftsmanship
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>

              {/* Desktop: Image - Fixed layout to prevent CLS */}
              <div className="hidden lg:flex lg:w-3/5 items-center justify-center relative min-h-[80vh]">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/hero-image.jpg"
                    alt="Master craftsman hand-lasting a premium Mongolian boot"
                    fill
                    sizes="60vw"
                    className="object-contain"
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
              Curated Selection
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl text-black font-medium tracking-tight mb-6">
              Featured Masterpieces
            </h2>
            <div className="w-24 h-px bg-gold mx-auto" aria-hidden="true" />
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
      <section className="py-24 lg:py-32 bg-black relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(201,169,97,0.3)_0%,_transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
              <Image
                src="/images/boots/genghis-1.jpg"
                alt="Master craftsman at work in the Domog atelier"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" aria-hidden="true" />
              
              {/* Floating Quote */}
              <figure className="absolute bottom-8 left-8 right-8">
                <blockquote className="bg-black/80 backdrop-blur-sm border border-gold/20 p-6">
                  <p className="font-serif text-xl lg:text-2xl text-cream italic">
                    &ldquo;A machine can measure a boot. Only hands can know it.&rdquo;
                  </p>
                  <figcaption className="font-sans text-xs uppercase tracking-widest text-gold mt-4">
                    — The Founder
                  </figcaption>
                </blockquote>
              </figure>
            </div>

            {/* Content */}
            <div className="lg:pl-8">
              <span className="inline-block font-sans text-xs uppercase tracking-[0.25em] text-gold mb-6">
                Our Heritage
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl text-cream font-medium tracking-tight mb-8">
                The Master&apos;s Touch
              </h2>
              
              <div className="space-y-6 text-cream/70 text-lg leading-relaxed">
                <p>
                  In 1990, our founder opened a small workshop in Ulaanbaatar. 
                  He had no business plan—only hands that had apprenticed under 
                  masters who remembered the old ways.
                </p>
                <p>
                  Thirty-five years later, those same hands still touch every 
                  pair we make. Not symbolically. Literally.
                </p>
                <p className="text-cream font-medium">
                  We will never open a factory. Some things cannot be rushed.
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
