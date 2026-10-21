import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products, getProductById, getLocalizedName, getCategoryLabel } from '@/lib/products';
import { isValidLocale } from '@/lib/i18n/config';
import { getMessages, format, formatPrice } from '@/lib/i18n/messages';
import { buildMetadata, localizedUrl } from '@/lib/seo/metadata';
import { productSchema, breadcrumbSchema } from '@/lib/seo/structured-data';
import ProductDetails from './ProductDetails';

interface ProductPageProps {
    params: { id: string; locale: string };
}

export function generateStaticParams() {
    return products.map((product) => ({ id: product.id }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
    const { id, locale } = params;
    const product = getProductById(id);
    if (!product || !isValidLocale(locale)) {
        return { title: getMessages(isValidLocale(locale) ? locale : 'en').meta.notFound.title };
    }

    const t = getMessages(locale);
    const model = getLocalizedName(product, locale);
    return buildMetadata({
        locale,
        path: `/products/${product.id}`,
        title: format(t.meta.product.title, { model, category: getCategoryLabel(product.category, locale) }),
        description: format(t.meta.product.description, { model, price: formatPrice(product.price) }),
        image: product.images[0],
    });
}

export default function ProductPage({ params }: ProductPageProps) {
    const { id, locale } = params;
    const product = getProductById(id);
    if (!product || !isValidLocale(locale)) {
        notFound();
    }

    const t = getMessages(locale);
    const model = getLocalizedName(product, locale);
    const structuredData = [
        productSchema(product, locale),
        breadcrumbSchema([
            { name: t.common.home, url: localizedUrl(locale) },
            { name: t.product.breadcrumbCollection, url: localizedUrl(locale, '/shop') },
            { name: model, url: localizedUrl(locale, `/products/${product.id}`) },
        ]),
    ];

    return (
        <div className="min-h-screen bg-cream pt-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <div className="bg-cream-sand border-b border-cream-200">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-4">
                    <nav aria-label={t.product.breadcrumbLabel}>
                        <ol className="flex flex-wrap items-center gap-2 text-sm">
                            <li>
                                <Link href={`/${locale}`} className="text-stone-warm hover:text-cognac transition-colors">
                                    {t.common.home}
                                </Link>
                            </li>
                            <li className="text-cream-400" aria-hidden="true">/</li>
                            <li>
                                <Link href={`/${locale}/shop`} className="text-stone-warm hover:text-cognac transition-colors">
                                    {t.product.breadcrumbCollection}
                                </Link>
                            </li>
                            <li className="text-cream-400" aria-hidden="true">/</li>
                            <li className="text-charcoal-900 font-medium" aria-current="page">
                                {model}
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 lg:py-16">
                <ProductDetails product={product} />
            </div>
        </div>
    );
}
