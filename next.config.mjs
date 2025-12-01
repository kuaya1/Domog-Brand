/**
 * Security Headers Configuration
 * 
 * Comprehensive security headers including Content Security Policy (CSP)
 * to protect against XSS, clickjacking, and other common web vulnerabilities.
 */
const securityHeaders = [
    {
        key: 'Content-Security-Policy',
        value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Required for Next.js hydration
            "style-src 'self' 'unsafe-inline'", // Required for Tailwind CSS
            "img-src 'self' data: blob: https:",
            "font-src 'self' data:",
            "connect-src 'self' https://vercel.live https://*.vercel.app",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "object-src 'none'",
        ].join('; '),
    },
    {
        key: 'X-Frame-Options',
        value: 'DENY',
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
    },
    {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
    },
    {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    },
    {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
    },
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains',
    },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Image optimization
    images: {
        unoptimized: false,
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        remotePatterns: [],
        minimumCacheTTL: 31536000,
    },

    // Production optimizations
    reactStrictMode: true,
    poweredByHeader: false,
    compress: true,
    trailingSlash: false,

    // Security and caching headers
    async headers() {
        return [
            {
                source: '/:path*',
                headers: securityHeaders,
            },
            {
                source: '/images/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ],
            },
            {
                source: '/_next/static/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ],
            },
        ];
    },
};

export default nextConfig;
