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
    params: Promise<{ id: string }>;
}

// Generate static paths for all products at build time
export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

// Generate dynamic metadata for SEO and social sharing
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { id } = await params;
    const product = products.find((p) => p.id === id);
    
    if (!product) {
        return {
            title: 'Product Not Found | Domog Brand',
        };
    }
    
    return {
        title: `${product.name} | Domog Brand`,
        description: product.description.slice(0, 160),
        openGraph: {
            title: product.name,
            description: product.description.slice(0, 160),
            images: [
                {
                    url: product.images[0],
                    width: 1200,
                    height: 630,
                    alt: product.name,
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: product.name,
            description: product.description.slice(0, 160),
            images: [product.images[0]],
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
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

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb - Server rendered */}
                <Link
                    href="/shop"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-amber-700 mb-8 transition-colors"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Shop
                </Link>

                {/* Product Details - Client component island */}
                <ProductDetails product={product} />

                {/* Related Products - Server rendered */}
                {displayProducts.length > 0 && (
                    <div className="border-t border-gray-100 pt-16 mt-16">
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">
                            You May Also Like
                        </h2>
                        <ProductGrid products={displayProducts} />
                    </div>
                )}
            </div>
        </div>
    );
}
