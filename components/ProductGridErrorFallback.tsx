'use client';

/**
 * ProductGridErrorFallback Component
 * 
 * Specialized fallback UI for product grid loading failures.
 * Displays a luxury-styled error message with retry functionality.
 */
export function ProductGridErrorFallback({ onRetry }: { onRetry?: () => void }) {
    const handleRetry = () => {
        if (onRetry) {
            onRetry();
        } else {
            // Default behavior: reload the page
            window.location.reload();
        }
    };

    return (
        <div className="col-span-full min-h-[500px] flex items-center justify-center px-6 py-20">
            <div className="max-w-md text-center space-y-8">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-gold-600/10 flex items-center justify-center">
                        <svg
                            className="w-10 h-10 text-gold-700"
                            fill="none"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-4">
                    <h3 className="font-serif text-3xl lg:text-4xl text-charcoal-900 font-medium">
                        Unable to Load Collection
                    </h3>
                    <p className="font-sans text-base text-stone-warm leading-relaxed">
                        We&apos;re experiencing difficulty displaying our products. 
                        Please check your connection and try again.
                    </p>
                </div>

                {/* Retry Button */}
                <button
                    onClick={handleRetry}
                    className="
                        inline-flex items-center gap-2
                        px-10 py-4
                        border-2 border-charcoal-900
                        text-sm uppercase tracking-[0.2em] font-medium
                        text-charcoal-900
                        hover:bg-charcoal-900 hover:text-cream-50
                        transition-all duration-400
                        focus:outline-none focus:ring-2 focus:ring-gold-600 focus:ring-offset-4
                    "
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        strokeWidth={2}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                    </svg>
                    Retry Loading
                </button>
            </div>
        </div>
    );
}
