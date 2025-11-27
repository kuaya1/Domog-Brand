import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, isValidLocale } from './lib/i18n/config';

// Get the preferred locale from the request headers
function getLocale(request: NextRequest): string {
    // Check if locale is already in the path
    const pathname = request.nextUrl.pathname;
    const pathnameLocale = locales.find(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
    
    if (pathnameLocale) return pathnameLocale;
    
    // Check Accept-Language header
    const acceptLanguage = request.headers.get('Accept-Language');
    if (acceptLanguage) {
        const preferredLocale = acceptLanguage
            .split(',')
            .map((lang) => lang.split(';')[0].trim().substring(0, 2))
            .find((lang) => isValidLocale(lang));
        
        if (preferredLocale) return preferredLocale;
    }
    
    return defaultLocale;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Skip middleware for static files, API routes, and Next.js internals
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/images') ||
        pathname.includes('.') || // files with extensions
        pathname.startsWith('/favicon')
    ) {
        return NextResponse.next();
    }
    
    // Check if the pathname already has a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
    
    if (pathnameHasLocale) {
        return NextResponse.next();
    }
    
    // Redirect to the default locale (without changing URL for default)
    // For non-default locale requests, redirect to locale-prefixed path
    const locale = getLocale(request);
    
    // For the default locale (en), don't redirect - serve from root
    if (locale === defaultLocale) {
        return NextResponse.next();
    }
    
    // For other locales, redirect to locale-prefixed path
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
}

export const config = {
    matcher: [
        // Match all paths except static files and API routes
        '/((?!_next/static|_next/image|favicon.ico|images|robots.txt|sitemap.xml|manifest.json|icons).*)',
    ],
};
