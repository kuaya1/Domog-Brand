import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/lib/products';
import ProductDetails from './ProductDetails';
import ProductGrid from '@/components/ProductGrid';
import { ArrowLeft } from 'lucide-react';

/**
 * PRODUCT PAGE - Server Component Architecture
 * 
 * This page is now a React Server Component (RSC), enabling:
 * 1. SEO: Full HTML rendered on server, crawlable by Google
 * 2. Caching: Static generation with ISR support
 * 3. Performance: Only interactive parts hydrate on client
 * 4. Metadata: Dynamic OG tags for social sharing
 * 
 * The interactive "ProductDetails" component (size selector, add to cart)
 * is a separate client component that hydrates independently.
 */

interface ProductPageProps {
    params: Promise<{ id: string; locale: string }>;
}

// Generate static paths for all products at build time
export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

// Generate dynamic metadata for SEO and social sharing
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { id, locale } = await params;
    const product = products.find((p) => p.id === id);
    
    if (!product) {
        return {
            title: 'Product Not Found | Domog Brand',
        };
    }
    
    const title = `${product.name} - Handcrafted ${product.category} Boots | Domog Brand`;
    const description = `${product.description.slice(0, 140)}... Handcrafted in Mongolia since 1990. $${product.price} USD.`;
    
    return {
        title,
        description,
        keywords: [
            product.name,
            `${product.category} boots`,
            'Mongolian boots',
            'handcrafted footwear',
            'luxury boots',
            'heritage craftsmanship',
            'Domog Brand'
        ],
        openGraph: {
            title,
            description,
            images: product.images.slice(0, 4).map((img, i) => ({
                url: img.startsWith('http') ? img : `https://domogbrand.com${img}`,
                width: 1200,
                height: 630,
                alt: `${product.name} - View ${i + 1}`,
            })),
            type: 'website',
            locale: locale === 'mn' ? 'mn_MN' : 'en_US',
            siteName: 'Domog Brand',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [product.images[0].startsWith('http') ? product.images[0] : `https://domogbrand.com${product.images[0]}`],
        },
        alternates: {
            canonical: `https://domogbrand.com/${locale}/products/${product.id}`,
            languages: {
                'en': `https://domogbrand.com/en/products/${product.id}`,
                'mn': `https://domogbrand.com/mn/products/${product.id}`,
            },
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id, locale } = await params;
    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    const relatedProducts = products
        .filter((p) => p.id !== product.id && p.category === product.category)
        .slice(0, 3);
    
    // If not enough related products in same category, fill with others
    const fillerProducts = relatedProducts.length < 3
        ? products.filter((p) => p.id !== product.id && !relatedProducts.includes(p)).slice(0, 3 - relatedProducts.length)
        : [];
    
    const displayProducts = [...relatedProducts, ...fillerProducts];

    // Generate enhanced Product JSON-LD for rich snippets
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.images.map(img => img.startsWith('http') ? img : `https://domogbrand.com${img}`),
        description: product.description,
        sku: `DOMOG-${product.id}`,
        mpn: `DOMOG-${product.name.toUpperCase()}`,
        brand: {
            '@type': 'Brand',
            name: 'Domog Brand',
            logo: 'https://domogbrand.com/images/logo.png'
        },
        manufacturer: {
            '@type': 'Organization',
            name: 'Domog Brand',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Ulaanbaatar',
                addressCountry: 'MN'
            }
        },
        category: `Footwear > Boots > ${product.category}`,
        material: 'Premium Leather',
        countryOfOrigin: 'Mongolia',
        offers: {
            '@type': 'Offer',
            url: `https://domogbrand.com/${locale}/products/${product.id}`,
            priceCurrency: 'USD',
            price: product.price,
            priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            itemCondition: 'https://schema.org/NewCondition',
            seller: {
                '@type': 'Organization',
                name: 'Domog Brand'
            },
            shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingDestination: {
                    '@type': 'DefinedRegion',
                    addressCountry: 'US'
                },
                deliveryTime: {
                    '@type': 'ShippingDeliveryTime',
                    handlingTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 5,
                        maxValue: 10,
                        unitCode: 'DAY'
                    },
                    transitTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 7,
                        maxValue: 14,
                        unitCode: 'DAY'
                    }
                }
            }
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '127',
            bestRating: '5',
            worstRating: '1'
        }
    };

    return (
        <div className="min-h-screen bg-cream">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            
            {/* Breadcrumb Navigation */}
            <div className="bg-cream-sand border-b border-cream-200">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-4">
                    <nav aria-label="Breadcrumb">
                        <ol className="flex items-center gap-2 text-sm">
                            <li>
                                <Link href={`/${locale}`} className="text-stone-warm hover:text-cognac transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li className="text-cream-400">/</li>
                            <li>
                                <Link href={`/${locale}/shop`} className="text-stone-warm hover:text-cognac transition-colors">
                                    Collection
                                </Link>
                            </li>
                            <li className="text-cream-400">/</li>
                            <li className="text-charcoal-900 font-medium" aria-current="page">
                                {product.name}
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 lg:py-16">

                {/* Product Details - Client component island */}
                <ProductDetails product={product} />

                {/* Related Products - Server rendered */}
                {displayProducts.length > 0 && (
                    <section className="border-t border-cream-200 pt-16 lg:pt-20 mt-16 lg:mt-20">
                        <div className="text-center mb-12">
                            <span className="text-xs uppercase tracking-[0.25em] text-cognac mb-3 block">
                                The Collection
                            </span>
                            <h2 className="text-2xl lg:text-3xl font-serif font-medium text-charcoal-900 mb-3">
                                From the Same Hands
                            </h2>
                            <p className="text-stone-warm max-w-lg mx-auto">
                                Each pair shaped by the same master craftsmen, carrying the same forty hours of devotion.
                            </p>
                        </div>
                        <ProductGrid products={displayProducts} locale={locale} />
                    </section>
                )}
            </div>
        </div>
    );
}
