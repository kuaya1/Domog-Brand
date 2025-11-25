'use client';

import { useEffect } from 'react';

/**
 * Performance monitoring component
 * Reports Core Web Vitals metrics
 * Only runs in production
 */
export default function PerformanceMonitor() {
    useEffect(() => {
        // Only run in production
        if (process.env.NODE_ENV !== 'production') {
            return;
        }

        const reportWebVitals = async () => {
            try {
                // web-vitals v4+ removed onFID, use onINP instead
                const { onCLS, onFCP, onINP, onLCP, onTTFB } = await import('web-vitals');

                const sendToAnalytics = (metric: { 
                    name: string; 
                    value: number; 
                    id: string;
                    rating: 'good' | 'needs-improvement' | 'poor';
                }) => {
                    // Log to console in development
                    console.log(`[Web Vitals] ${metric.name}:`, {
                        value: metric.value,
                        rating: metric.rating,
                    });
                    
                    // Send to analytics (Google Analytics example)
                    if (typeof window !== 'undefined' && 'gtag' in window) {
                        const gtag = (window as typeof window & { 
                            gtag: (...args: unknown[]) => void 
                        }).gtag;
                        
                        gtag('event', metric.name, {
                            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                            event_label: metric.id,
                            metric_rating: metric.rating,
                            non_interaction: true,
                        });
                    }
                };

                // Core Web Vitals (v4+)
                onCLS(sendToAnalytics);  // Cumulative Layout Shift
                onFCP(sendToAnalytics);  // First Contentful Paint
                onINP(sendToAnalytics);  // Interaction to Next Paint (replaces FID)
                onLCP(sendToAnalytics);  // Largest Contentful Paint
                onTTFB(sendToAnalytics); // Time to First Byte
            } catch {
                // web-vitals not available or failed to load
                console.warn('[Performance] Web Vitals monitoring not available');
            }
        };

        reportWebVitals();
    }, []);

    // This component renders nothing
    return null;
}
