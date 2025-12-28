import { MetadataRoute } from 'next';
import { products } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://domogbrand.com';
    const locales = ['en', 'mn'];
    
    // Generate sitemap entries for each locale
    const sitemapEntries: MetadataRoute.Sitemap = [];
    
    // Static pages per locale
    locales.forEach((locale) => {
        // Homepage
        sitemapEntries.push({
            url: `${baseUrl}/${locale}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
            alternates: {
                languages: {
                    en: `${baseUrl}/en`,
                    mn: `${baseUrl}/mn`,
                },
            },
        });
        
        // Shop
        sitemapEntries.push({
            url: `${baseUrl}/${locale}/shop`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
            alternates: {
                languages: {
                    en: `${baseUrl}/en/shop`,
                    mn: `${baseUrl}/mn/shop`,
                },
            },
        });
        
        // About/Heritage
        sitemapEntries.push({
            url: `${baseUrl}/${locale}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
            alternates: {
                languages: {
                    en: `${baseUrl}/en/about`,
                    mn: `${baseUrl}/mn/about`,
                },
            },
        });
        
        // Contact/Atelier
        sitemapEntries.push({
            url: `${baseUrl}/${locale}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
            alternates: {
                languages: {
                    en: `${baseUrl}/en/contact`,
                    mn: `${baseUrl}/mn/contact`,
                },
            },
        });
        
        // Care
        sitemapEntries.push({
            url: `${baseUrl}/${locale}/care`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
            alternates: {
                languages: {
                    en: `${baseUrl}/en/care`,
                    mn: `${baseUrl}/mn/care`,
                },
            },
        });
        
        // Product pages
        products.forEach((product) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/products/${product.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8,
                alternates: {
                    languages: {
                        en: `${baseUrl}/en/products/${product.id}`,
                        mn: `${baseUrl}/mn/products/${product.id}`,
                    },
                },
            });
        });
    });

    return sitemapEntries;
}
