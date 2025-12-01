'use client';

import { Component, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
    hasError: boolean;
    error?: Error;
}

/**
 * ErrorBoundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a luxury-styled fallback UI.
 * 
 * @example
 * <ErrorBoundary fallback={<CustomFallback />}>
 *   <ProductGrid />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log error to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('ErrorBoundary caught an error:', error, errorInfo);
        }

        // Call custom error handler if provided
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }

        // In production, you would log to an error reporting service
        // Example: logErrorToService(error, errorInfo);
    }

    resetError = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            // Use custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default luxury-styled fallback UI
            return (
                <div className="min-h-[400px] flex items-center justify-center bg-cream-50 px-6 py-16">
                    <div className="max-w-lg text-center space-y-6">
                        {/* Error Icon */}
                        <div className="flex justify-center">
                            <div className="w-16 h-16 rounded-full bg-burgundy-700/10 flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-burgundy-700"
                                    fill="none"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Error Message */}
                        <div className="space-y-3">
                            <h2 className="font-serif text-3xl text-charcoal-900 font-medium">
                                Something Went Wrong
                            </h2>
                            <p className="font-sans text-base text-stone-warm leading-relaxed">
                                We apologize for the inconvenience. An unexpected error has occurred.
                            </p>
                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <details className="mt-4 text-left">
                                    <summary className="cursor-pointer text-sm text-burgundy-700 hover:text-burgundy-dark">
                                        Error Details (Development)
                                    </summary>
                                    <pre className="mt-2 text-xs bg-charcoal-900 text-cream-50 p-4 rounded overflow-auto max-h-40">
                                        {this.state.error.toString()}
                                    </pre>
                                </details>
                            )}
                        </div>

                        {/* Reset Button */}
                        <button
                            onClick={this.resetError}
                            className="
                                px-8 py-3
                                border-2 border-charcoal-900
                                text-sm uppercase tracking-[0.2em] font-medium
                                text-charcoal-900
                                hover:bg-charcoal-900 hover:text-cream-50
                                transition-all duration-400
                                focus:outline-none focus:ring-2 focus:ring-gold-600 focus:ring-offset-2
                            "
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
