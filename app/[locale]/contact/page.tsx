'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getNamespace } from '@/lib/i18n/translations';
import { isValidLocale } from '@/lib/i18n/config';

export default function ContactPage() {
    const params = useParams();
    const locale = typeof params.locale === 'string' ? params.locale : 'en';
    const t = isValidLocale(locale) ? getNamespace(locale, 'contact') : getNamespace('en', 'contact');
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' });

        setTimeout(() => setStatus('idle'), 4000);
    };

    return (
        <div className="min-h-screen bg-cream">
            {/* Hero Header */}
            <section className="bg-black py-24 lg:py-32 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" aria-hidden="true">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(201,169,97,0.4)_0%,_transparent_50%)]" />
                </div>
                <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block font-sans text-xs uppercase tracking-[0.25em] text-gold mb-6">
                        {t.hero_label}
                    </span>
                    <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-cream font-medium tracking-tight mb-6">
                        {t.hero_title}
                    </h1>
                    <p className="text-cream/70 text-lg leading-relaxed max-w-2xl mx-auto">
                        {t.hero_description}
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                        
                        {/* Contact Information - Left Column */}
                        <div className="lg:col-span-2 space-y-10">
                            <div>
                                <h2 className="font-serif text-2xl text-black mb-8">
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
                                <p className="font-serif text-lg text-black italic">
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                            </blockquote>
                        </div>

                        {/* Contact Form - Right Column */}
                        <div className="lg:col-span-3">
                            <div className="bg-white border border-cream-200 p-8 lg:p-12">
                                <h2 className="font-serif text-2xl text-black mb-2">
                                    {t.form_title}
                                </h2>
                                <p className="text-stone-warm text-sm mb-8">
                                    {t.form_required}
                                </p>

                                {status === 'success' ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-cognac/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Mail className="h-8 w-8 text-cognac" />
                                        </div>
                                        <h3 className="font-serif text-2xl text-black mb-4">
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
                                                    className="w-full border border-cream-200 bg-cream-50 py-4 px-4 text-black placeholder:text-cream-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
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
                                                    className="w-full border border-cream-200 bg-cream-50 py-4 px-4 text-black placeholder:text-cream-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
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
                                                className="w-full border border-cream-200 bg-cream-50 py-4 px-4 text-black placeholder:text-cream-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
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
                                                className="w-full border border-cream-200 bg-cream-50 py-4 px-4 text-black focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors appearance-none"
                                            >
                                                <option value="general">{t.subject_general}</option>
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
                                                className="w-full border border-cream-200 bg-cream-50 py-4 px-4 text-black placeholder:text-cream-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors resize-none"
                                                placeholder={t.message_placeholder}
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={status === 'submitting'}
                                            className={cn(
                                                "w-full bg-black text-white py-4 px-8 font-sans text-sm uppercase tracking-widest",
                                                "hover:bg-black-rich transition-all duration-300",
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
                <p className="text-black">{value}</p>
                {subtext && <p className="text-sm text-cream-500 mt-1">{subtext}</p>}
            </div>
        </div>
    );
}
