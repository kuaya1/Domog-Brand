'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getNamespace } from '@/lib/i18n/translations';
import { isValidLocale } from '@/lib/i18n/config';

function ContactPageContent() {
    const params = useParams();
    const searchParams = useSearchParams();
    const locale = typeof params.locale === 'string' ? params.locale : 'en';
    const t = isValidLocale(locale) ? getNamespace(locale, 'contact') : getNamespace('en', 'contact');
    
    // Check for inquiry type from URL (e.g., from cart checkout)
    const inquiryType = searchParams.get('inquiry');
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: inquiryType === 'order' ? 'order' : (inquiryType === 'sizing' ? 'custom' : 'general'),
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');
    
    // Update subject when URL parameter changes
    useEffect(() => {
        if (inquiryType === 'order') {
            setFormData(prev => ({ ...prev, subject: 'order' }));
        }
    }, [inquiryType]);

    const [errorMessage, setErrorMessage] = useState<string>('');
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setErrorMessage(data.errors?.[0] || 'Failed to send message. Please try again.');
                setTimeout(() => setStatus('idle'), 4000);
            }
        } catch {
            setStatus('error');
            setErrorMessage('Network error. Please check your connection and try again.');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    return (
        <div className="min-h-screen bg-cream">
            {/* Hero Header */}
            <section className="bg-charcoal-900 py-20 sm:py-24 lg:py-32 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" aria-hidden="true">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(201,169,97,0.4)_0%,_transparent_50%)]" />
                </div>
                <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block font-sans text-xs uppercase tracking-[0.25em] text-gold mb-4 sm:mb-6">
                        {t.hero_label}
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-cream font-medium tracking-tight mb-4 sm:mb-6">
                        {t.hero_title}
                    </h1>
                    <p className="text-cream/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                        {t.hero_description}
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 sm:py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 sm:gap-12 lg:gap-16">
                        
                        {/* Contact Information - Left Column */}
                        <div className="lg:col-span-2 space-y-10">
                            <div>
                                <h2 className="font-serif text-2xl text-charcoal-900 mb-8">
                                    {t.visit_title}
                                </h2>
                                <p className="text-stone-warm leading-relaxed mb-8">
                                    {t.visit_description}
                                </p>
                            </div>

                            <div className="space-y-6">
                                <ContactInfoItem
                                    icon={<MapPin className="h-5 w-5" />}
                                    label={t.workshop_label}
                                    value={
                                        <>
                                            Khan-Uul District, 15th Khoroo<br />
                                            Ulaanbaatar, Mongolia
                                        </>
                                    }
                                />
                                <ContactInfoItem
                                    icon={<Phone className="h-5 w-5" />}
                                    label={t.telephone_label}
                                    value="+976 9911-2345"
                                    subtext={t.telephone_subtext}
                                />
                                <ContactInfoItem
                                    icon={<Mail className="h-5 w-5" />}
                                    label={t.email_label}
                                    value="atelier@domogbrand.com"
                                    subtext={t.email_subtext}
                                />
                                <ContactInfoItem
                                    icon={<Clock className="h-5 w-5" />}
                                    label={t.hours_label}
                                    value={
                                        <>
                                            {t.hours_weekday}<br />
                                            {t.hours_saturday}
                                        </>
                                    }
                                />
                            </div>

                            {/* Decorative Divider */}
                            <div className="pt-8">
                                <div className="w-16 h-px bg-gold" aria-hidden="true" />
                            </div>

                            {/* Quote */}
                            <blockquote className="border-l-2 border-gold/30 pl-6">
                                <p className="font-serif text-lg text-charcoal-900 italic">
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                            </blockquote>
                        </div>

                        {/* Contact Form - Right Column */}
                        <div className="lg:col-span-3">
                            <div className="bg-cream-50 border border-cream-200 p-6 sm:p-8 lg:p-12">
                                <h2 className="font-serif text-2xl text-charcoal-900 mb-2">
                                    {t.form_title}
                                </h2>
                                <p className="text-stone-warm text-sm mb-8">
                                    {t.form_required}
                                </p>

                                {status === 'error' && errorMessage && (
                                    <div className="mb-6 p-4 bg-burgundy-700/10 border border-burgundy-700/20 text-burgundy-700">
                                        <p className="text-sm">{errorMessage}</p>
                                    </div>
                                )}

                                {status === 'success' ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-cognac/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Mail className="h-8 w-8 text-cognac" />
                                        </div>
                                        <h3 className="font-serif text-2xl text-charcoal-900 mb-4">
                                            {t.success_title}
                                        </h3>
                                        <p className="text-stone-warm max-w-md mx-auto">
                                            {t.success_message}
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Name & Email Row */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-xs uppercase tracking-wider text-stone-warm mb-2">
                                                    {t.full_name} *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full border border-cream-200 bg-cream-50 min-h-[52px] py-3.5 px-4 text-base text-charcoal-900 placeholder:text-cream-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-xs uppercase tracking-wider text-stone-warm mb-2">
                                                    {t.email} *
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full border border-cream-200 bg-cream-50 min-h-[52px] py-3.5 px-4 text-base text-charcoal-900 placeholder:text-cream-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                                                />
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-stone-warm mb-2">
                                                {t.phone}
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full border border-cream-200 bg-cream-50 min-h-[52px] py-3.5 px-4 text-base text-charcoal-900 placeholder:text-cream-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                                            />
                                        </div>

                                        {/* Subject */}
                                        <div>
                                            <label htmlFor="subject" className="block text-xs uppercase tracking-wider text-stone-warm mb-2">
                                                {t.subject} *
                                            </label>
                                            <select
                                                id="subject"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full border border-cream-200 bg-cream-50 min-h-[52px] py-3.5 px-4 text-base text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors appearance-none"
                                            >
                                                <option value="general">{t.subject_general}</option>
                                                <option value="order">{t.subject_order || 'Place an Order'}</option>
                                                <option value="bespoke">{t.subject_bespoke}</option>
                                                <option value="sizing">{t.subject_sizing}</option>
                                                <option value="care">{t.subject_care}</option>
                                                <option value="press">{t.subject_press}</option>
                                            </select>
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label htmlFor="message" className="block text-xs uppercase tracking-wider text-stone-warm mb-2">
                                                {t.message} *
                                            </label>
                                            <textarea
                                                id="message"
                                                required
                                                rows={5}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full border border-cream-200 bg-cream-50 min-h-[140px] py-3.5 px-4 text-base text-charcoal-900 placeholder:text-cream-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors resize-none"
                                                placeholder={t.message_placeholder}
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={status === 'submitting'}
                                            className={cn(
                                                "w-full bg-charcoal-900 text-cream-50 min-h-[56px] py-4 px-8 font-sans text-sm uppercase tracking-widest",
                                                "hover:bg-charcoal-800 active:bg-charcoal-800 transition-all duration-300",
                                                "focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2",
                                                "disabled:opacity-70 disabled:cursor-not-allowed",
                                                "flex items-center justify-center gap-3"
                                            )}
                                        >
                                            {status === 'submitting' ? (
                                                <span className="animate-pulse">{t.submitting}</span>
                                            ) : (
                                                <>
                                                    {t.submit}
                                                    <ArrowRight className="h-4 w-4" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Wrap in Suspense for useSearchParams
export default function ContactPage() {
    return (
        <Suspense fallback={<ContactPageSkeleton />}>
            <ContactPageContent />
        </Suspense>
    );
}

function ContactPageSkeleton() {
    return (
        <div className="min-h-screen bg-cream animate-pulse">
            <div className="bg-charcoal-900 py-24 lg:py-32" />
            <div className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="h-96 bg-cream-200 rounded" />
                </div>
            </div>
        </div>
    );
}

function ContactInfoItem({ 
    icon, 
    label, 
    value, 
    subtext 
}: { 
    icon: React.ReactNode; 
    label: string; 
    value: React.ReactNode; 
    subtext?: string;
}) {
    return (
        <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-cream-sand flex items-center justify-center text-cognac">
                {icon}
            </div>
            <div>
                <p className="text-xs uppercase tracking-wider text-stone-warm mb-1">{label}</p>
                <p className="text-charcoal-900">{value}</p>
                {subtext && <p className="text-sm text-cream-500 mt-1">{subtext}</p>}
            </div>
        </div>
    );
}
