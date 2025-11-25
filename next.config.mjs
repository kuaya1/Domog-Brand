/** @type {import('next').NextConfig} */
const nextConfig = {
    /**
     * IMAGE OPTIMIZATION CONFIG
     * 
     * This configuration ensures:
     * 1. Local images in /public are properly optimized
     * 2. Remote images (if any) are explicitly allowed
     * 3. Proper caching headers for Vercel CDN
     */
    images: {
        // Optimize images - enabled by default but explicit is better
        unoptimized: false,
        
        // Supported formats - webp and avif for modern browsers
        formats: ['image/avif', 'image/webp'],
        
        // Device sizes for responsive images
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        
        // Image sizes for the `sizes` prop
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        
        // Remote patterns - add domains here if you need external images
        // Example: Instagram CDN, Cloudinary, etc.
        remotePatterns: [
            // Uncomment and modify if you use external image hosts:
            // {
            //     protocol: 'https',
            //     hostname: 'cdn.example.com',
            //     port: '',
            //     pathname: '/images/**',
            // },
        ],
        
        // Minimum cache TTL in seconds (1 year for static assets)
        minimumCacheTTL: 31536000,
    },
    
    // Enable strict mode for better React practices
    reactStrictMode: true,
    
    // Disable x-powered-by header for security
    poweredByHeader: false,
    
    // Trailing slash configuration - keep consistent
    trailingSlash: false,
};

export default nextConfig;
