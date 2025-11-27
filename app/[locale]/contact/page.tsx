'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ContactPage() {
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
                        The Atelier
                    </span>
                    <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-cream font-medium tracking-tight mb-6">
                        Begin Your Journey
                    </h1>
                    <p className="text-cream/70 text-lg leading-relaxed max-w-2xl mx-auto">
                        Every pair of Domog boots begins with a conversation. 
                        Whether you seek a bespoke commission or simply wish to learn more, 
                        we welcome your inquiry.
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
                                    Visit the Workshop
                                </h2>
                                <p className="text-stone-warm leading-relaxed mb-8">
                                    Our atelier in Ulaanbaatar welcomes visitors by appointment. 
                                    Witness the craft firsthand, discuss bespoke commissions, 
                                    or simply share a cup of suutei tsai.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <ContactInfoItem
                                    icon={<MapPin className="h-5 w-5" />}
                                    label="Workshop"
                                    value={
                                        <>
                                            Khan-Uul District, 15th Khoroo<br />
                                            Ulaanbaatar, Mongolia
                                        </>
                                    }
                                />
                                <ContactInfoItem
                                    icon={<Phone className="h-5 w-5" />}
                                    label="Telephone"
                                    value="+976 9911-2345"
                                    subtext="Monday–Friday, 9am–6pm (UB Time)"
                                />
                                <ContactInfoItem
                                    icon={<Mail className="h-5 w-5" />}
                                    label="Email"
                                    value="atelier@domogbrand.com"
                                    subtext="We respond within 24 hours"
                                />
                                <ContactInfoItem
                                    icon={<Clock className="h-5 w-5" />}
                                    label="Hours"
                                    value={
                                        <>
                                            Mon–Fri: 09:00–18:00<br />
                                            Sat: 10:00–15:00 (by appointment)
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
                                    &ldquo;The best conversations begin with curiosity.&rdquo;
                                </p>
                            </blockquote>
                        </div>

                        {/* Contact Form - Right Column */}
                        <div className="lg:col-span-3">
                            <div className="bg-white border border-cream-200 p-8 lg:p-12">
                                <h2 className="font-serif text-2xl text-black mb-2">
                                    Send an Inquiry
                                </h2>
                                <p className="text-stone-warm text-sm mb-8">
                                    All fields marked with * are required
                                </p>

                                {status === 'success' ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-cognac/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Mail className="h-8 w-8 text-cognac" />
                                        </div>
                                        <h3 className="font-serif text-2xl text-black mb-4">
                                            Message Received
                                        </h3>
                                        <p className="text-stone-warm max-w-md mx-auto">
                                            Thank you for reaching out. A member of our team 
                                            will respond within 24 hours.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Name & Email Row */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-xs uppercase tracking-wider text-stone-warm mb-2">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full border border-cream-200 bg-cream-50 py-4 px-4 text-black placeholder:text-cream-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                                                    placeholder="Your name"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-xs uppercase tracking-wider text-stone-warm mb-2">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full border border-cream-200 bg-cream-50 py-4 px-4 text-black placeholder:text-cream-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-stone-warm mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full border border-cream-200 bg-cream-50 py-4 px-4 text-black placeholder:text-cream-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>

                                        {/* Subject */}
                                        <div>
                                            <label htmlFor="subject" className="block text-xs uppercase tracking-wider text-stone-warm mb-2">
                                                Inquiry Type *
                                            </label>
                                            <select
                                                id="subject"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full border border-cream-200 bg-cream-50 py-4 px-4 text-black focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors appearance-none"
                                            >
                                                <option value="general">General Inquiry</option>
                                                <option value="bespoke">Bespoke Commission</option>
                                                <option value="sizing">Sizing & Fit</option>
                                                <option value="care">Care & Repair</option>
                                                <option value="press">Press & Media</option>
                                                <option value="wholesale">Wholesale Partnership</option>
                                            </select>
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label htmlFor="message" className="block text-xs uppercase tracking-wider text-stone-warm mb-2">
                                                Your Message *
                                            </label>
                                            <textarea
                                                id="message"
                                                required
                                                rows={5}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full border border-cream-200 bg-cream-50 py-4 px-4 text-black placeholder:text-cream-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors resize-none"
                                                placeholder="Tell us how we can assist you..."
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
                                                <span className="animate-pulse">Sending...</span>
                                            ) : (
                                                <>
                                                    Send Inquiry
                                                    <ArrowRight className="h-4 w-4" />
                                                </>
                                            )}
                                        </button>

                                        <p className="text-xs text-cream-500 text-center">
                                            By submitting, you agree to our privacy policy.
                                        </p>
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
