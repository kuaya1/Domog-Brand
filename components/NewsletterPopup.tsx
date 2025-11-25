'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Mail, Gift, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// Types
// ============================================================================

interface NewsletterPopupProps {
    /** Delay before showing popup (ms) */
    delay?: number;
    /** Enable exit-intent detection */
    exitIntent?: boolean;
    /** Discount code to display */
    discountCode?: string;
    /** Discount percentage */
    discountPercent?: number;
    /** Callback on successful subscription */
    onSubscribe?: (email: string) => void;
    /** Callback on close */
    onClose?: () => void;
}

interface FormData {
    email: string;
    gdprConsent: boolean;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

// ============================================================================
// Constants
// ============================================================================

const STORAGE_KEY = 'domog-newsletter-popup';
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days
const SUCCESS_DURATION = 5 * 24 * 60 * 60 * 1000; // Don't show for 5 days after success

// ============================================================================
// Component
// ============================================================================

export function NewsletterPopup({
    delay = 10000,
    exitIntent = true,
    discountCode = 'WELCOME10',
    discountPercent = 10,
    onSubscribe,
    onClose,
}: NewsletterPopupProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>({ email: '', gdprConsent: false });
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const hasTriggered = useRef(false);
    const inputRef = useRef<HTMLInputElement>(null);
    
    // Check if popup should be shown
    const shouldShowPopup = useCallback(() => {
        if (typeof window === 'undefined') return false;
        
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return true;
        
        try {
            const data = JSON.parse(stored);
            const now = Date.now();
            
            // If subscribed, don't show for SUCCESS_DURATION
            if (data.subscribed && now - data.timestamp < SUCCESS_DURATION) {
                return false;
            }
            
            // If dismissed, don't show for DISMISS_DURATION
            if (data.dismissed && now - data.timestamp < DISMISS_DURATION) {
                return false;
            }
            
            return true;
        } catch {
            return true;
        }
    }, []);
    
    // Show popup after delay
    useEffect(() => {
        if (!shouldShowPopup() || hasTriggered.current) return;
        
        const timer = setTimeout(() => {
            if (!hasTriggered.current) {
                hasTriggered.current = true;
                setIsOpen(true);
            }
        }, delay);
        
        return () => clearTimeout(timer);
    }, [delay, shouldShowPopup]);
    
    // Exit intent detection
    useEffect(() => {
        if (!exitIntent || !shouldShowPopup() || hasTriggered.current) return;
        
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasTriggered.current) {
                hasTriggered.current = true;
                setIsOpen(true);
            }
        };
        
        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [exitIntent, shouldShowPopup]);
    
    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);
    
    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);
    
    // Handle close
    const handleClose = useCallback(() => {
        setIsOpen(false);
        
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                dismissed: true,
                timestamp: Date.now(),
            }));
        }
        
        onClose?.();
    }, [onClose]);
    
    // Validate email
    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    
    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate
        if (!formData.email) {
            setErrorMessage('Please enter your email address');
            setStatus('error');
            return;
        }
        
        if (!validateEmail(formData.email)) {
            setErrorMessage('Please enter a valid email address');
            setStatus('error');
            return;
        }
        
        if (!formData.gdprConsent) {
            setErrorMessage('Please accept the privacy policy');
            setStatus('error');
            return;
        }
        
        setStatus('loading');
        setErrorMessage('');
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Save to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                subscribed: true,
                email: formData.email,
                timestamp: Date.now(),
            }));
        }
        
        setStatus('success');
        onSubscribe?.(formData.email);
        
        // Auto close after success
        setTimeout(() => {
            setIsOpen(false);
        }, 3000);
    };
    
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Newsletter">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={handleClose}
            />
            
            {/* Modal */}
            <div className="absolute inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md overflow-hidden animate-scale-in flex items-center justify-center">
                <div className="bg-cream w-full shadow-2xl relative">
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 text-cream-500 hover:text-black transition-colors z-10"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    
                    {status === 'success' ? (
                        // Success State
                        <div className="p-8 md:p-12 text-center">
                            <div className="w-16 h-16 bg-cognac-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check className="h-8 w-8 text-cognac-600" />
                            </div>
                            <h2 className="font-serif text-2xl md:text-3xl text-black mb-4">
                                Welcome to the Circle
                            </h2>
                            <p className="text-cream-600 mb-6">
                                Your discount code has been sent to your inbox.
                            </p>
                            <div className="bg-black text-white px-6 py-3 inline-block">
                                <span className="text-cream-400 text-sm">Your code:</span>
                                <span className="font-mono text-lg ml-2">{discountCode}</span>
                            </div>
                        </div>
                    ) : (
                        // Form State
                        <div className="p-8 md:p-12">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Gift className="h-8 w-8 text-gold" />
                                </div>
                                <h2 className="font-serif text-2xl md:text-3xl text-black mb-3">
                                    Join the Quiet Circle
                                </h2>
                                <p className="text-cream-600">
                                    Subscribe and receive {discountPercent}% off your first order, 
                                    plus early access to new collections.
                                </p>
                            </div>
                            
                            {/* Discount Badge */}
                            <div className="bg-cognac-50 border border-cognac-200 p-4 text-center mb-6">
                                <span className="text-cognac-600 text-sm">Exclusive Offer</span>
                                <p className="font-serif text-3xl text-black mt-1">
                                    {discountPercent}% OFF
                                </p>
                                <span className="text-xs text-cream-500">Your first purchase</span>
                            </div>
                            
                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="newsletter-email" className="sr-only">
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-cream-400" />
                                        <input
                                            ref={inputRef}
                                            id="newsletter-email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => {
                                                setFormData(prev => ({ ...prev, email: e.target.value }));
                                                setStatus('idle');
                                                setErrorMessage('');
                                            }}
                                            placeholder="Enter your email"
                                            className={cn(
                                                "w-full pl-12 pr-4 py-4 border bg-white",
                                                "focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold",
                                                status === 'error' 
                                                    ? "border-burgundy" 
                                                    : "border-cream-200"
                                            )}
                                        />
                                    </div>
                                </div>
                                
                                {/* GDPR Consent */}
                                <div className="flex items-start gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ 
                                            ...prev, 
                                            gdprConsent: !prev.gdprConsent 
                                        }))}
                                        className={cn(
                                            "w-5 h-5 border flex-shrink-0 flex items-center justify-center mt-0.5 transition-colors",
                                            formData.gdprConsent 
                                                ? "bg-black border-black" 
                                                : "border-cream-300 hover:border-cream-400"
                                        )}
                                    >
                                        {formData.gdprConsent && <Check className="h-3 w-3 text-white" />}
                                    </button>
                                    <label 
                                        onClick={() => setFormData(prev => ({ 
                                            ...prev, 
                                            gdprConsent: !prev.gdprConsent 
                                        }))}
                                        className="text-xs text-cream-500 cursor-pointer leading-relaxed"
                                    >
                                        I agree to receive marketing emails and accept the{' '}
                                        <a href="/privacy" className="text-cognac-600 underline">
                                            Privacy Policy
                                        </a>
                                        . You can unsubscribe anytime.
                                    </label>
                                </div>
                                
                                {/* Error Message */}
                                {status === 'error' && errorMessage && (
                                    <p className="text-sm text-burgundy">{errorMessage}</p>
                                )}
                                
                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className={cn(
                                        "w-full py-4 font-medium transition-colors flex items-center justify-center gap-2",
                                        status === 'loading'
                                            ? "bg-cream-200 text-cream-400 cursor-not-allowed"
                                            : "bg-black text-white hover:bg-cream-800"
                                    )}
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Subscribing...
                                        </>
                                    ) : (
                                        'Claim Your Discount'
                                    )}
                                </button>
                            </form>
                            
                            {/* Footer */}
                            <p className="text-center text-xs text-cream-400 mt-6">
                                We respect your privacy. No spam, ever.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NewsletterPopup;
