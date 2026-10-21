'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMessages } from '@/lib/i18n/use-messages';
import { format } from '@/lib/i18n/messages';
import { useCartStore } from '@/lib/stores/cart-store';
import { getProductById, getLocalizedName } from '@/lib/products';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_E164 } from '@/lib/contact';

const SUBJECTS = ['general', 'order', 'bespoke', 'sizing', 'care', 'press'] as const;
type Subject = (typeof SUBJECTS)[number];

const inputClass =
    'w-full border border-cream-200 bg-cream-50 min-h-[52px] py-3.5 px-4 text-base text-charcoal-900 placeholder:text-cream-500 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors';

function ContactPageContent() {
    const { locale, t } = useMessages();
    const searchParams = useSearchParams();
    const inquiry = searchParams.get('inquiry');
    const productId = searchParams.get('product');

    const [formData, setFormData] = useState<{ name: string; email: string; phone: string; subject: Subject; message: string }>({
        name: '',
        email: '',
        phone: '',
        subject: (SUBJECTS as readonly string[]).includes(inquiry ?? '') ? (inquiry as Subject) : 'general',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    // 'invalid': the server rejected the input; 'unavailable': the message was not delivered
    const [errorKind, setErrorKind] = useState<'invalid' | 'unavailable' | null>(null);

    // Prefill the message from the bag ("Contact us to order") or a product ("Ask about this pair").
    useEffect(() => {
        let prefill = '';
        if (inquiry === 'order') {
            const { items, appliedPromoCode } = useCartStore.getState();
            if (items.length > 0) {
                const lines = items.map((item) => {
                    const product = getProductById(item.productId);
                    return format(t.bag.orderMessageLine, {
                        model: product ? getLocalizedName(product, locale) : item.name,
                        size: item.size,
                        quantity: item.quantity,
                    });
                });
                prefill = [t.bag.orderMessageIntro, ...lines].join('\n');
                if (appliedPromoCode) prefill += `\n${format(t.bag.orderMessagePromo, { code: appliedPromoCode.code })}`;
            }
        } else if (productId) {
            const product = getProductById(productId);
            if (product) prefill = format(t.product.inquiryPrefix, { model: getLocalizedName(product, locale) });
        }
        if (prefill) setFormData((prev) => (prev.message ? prev : { ...prev, message: prefill }));
    }, [inquiry, productId, locale, t]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorKind(null);

        // Show success only when the server confirms delivery. Any other
        // outcome keeps the form filled in and points to email/phone.
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok && data.success === true) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setErrorKind(data.code === 'INVALID' ? 'invalid' : 'unavailable');
            }
        } catch {
            setStatus('error');
            setErrorKind('unavailable');
        }
    };

    const subjectLabels: Record<Subject, string> = {
        general: t.contact.subjectGeneral,
        order: t.contact.subjectOrder,
        bespoke: t.contact.subjectBespoke,
        sizing: t.contact.subjectSizing,
        care: t.contact.subjectCare,
        press: t.contact.subjectPress,
    };

    return (
        <div className="min-h-screen bg-cream">
            <section className="bg-charcoal-900 py-20 sm:py-24 lg:py-32 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" aria-hidden="true">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(201,169,97,0.4)_0%,_transparent_50%)]" />
                </div>
                <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block font-sans text-xs uppercase tracking-[0.25em] text-gold mb-4 sm:mb-6">
                        {t.contact.eyebrow}
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-cream font-medium tracking-tight mb-4 sm:mb-6">
                        {t.contact.title}
                    </h1>
                    <p className="text-cream/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">{t.contact.intro}</p>
                </div>
            </section>

            <section className="py-12 sm:py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 sm:gap-12 lg:gap-16">
                        <div className="lg:col-span-2 space-y-10">
                            <div>
                                <h2 className="font-serif text-2xl text-charcoal-900 mb-4">{t.contact.visitTitle}</h2>
                                <p className="text-stone-warm leading-relaxed">{t.contact.visitBody}</p>
                            </div>

                            <div className="space-y-6">
                                <ContactInfoItem
                                    icon={<MapPin className="h-5 w-5" aria-hidden="true" />}
                                    label={t.contact.addressLabel}
                                    value={
                                        <>
                                            {t.footer.addressLine1}
                                            <br />
                                            {t.footer.addressLine2}
                                        </>
                                    }
                                />
                                <ContactInfoItem
                                    icon={<Phone className="h-5 w-5" aria-hidden="true" />}
                                    label={t.contact.phoneLabel}
                                    value={
                                        <a href={`tel:${CONTACT_PHONE_E164}`} className="hover:text-cognac whitespace-nowrap">
                                            {CONTACT_PHONE}
                                        </a>
                                    }
                                    subtext={t.contact.phoneHours}
                                />
                                <ContactInfoItem
                                    icon={<Mail className="h-5 w-5" aria-hidden="true" />}
                                    label={t.contact.emailLabel}
                                    value={
                                        <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-cognac break-all">
                                            {CONTACT_EMAIL}
                                        </a>
                                    }
                                    subtext={t.contact.emailNote}
                                />
                                <ContactInfoItem
                                    icon={<Clock className="h-5 w-5" aria-hidden="true" />}
                                    label={t.contact.hoursLabel}
                                    value={
                                        <>
                                            {t.contact.hoursWeekday}
                                            <br />
                                            {t.contact.hoursSaturday}
                                        </>
                                    }
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <div className="bg-cream-50 border border-cream-200 p-6 sm:p-8 lg:p-12">
                                <h2 className="font-serif text-2xl text-charcoal-900 mb-2">{t.contact.formTitle}</h2>
                                <p className="text-stone-warm text-sm mb-8">{t.contact.formRequired}</p>

                                {status === 'error' && errorKind && (
                                    <div role="alert" className="mb-6 p-4 bg-burgundy-700/10 border border-burgundy-700/20 text-burgundy-700">
                                        <p className="text-sm">{errorKind === 'invalid' ? t.contact.errorInvalid : t.contact.errorUnavailable}</p>
                                        {errorKind === 'unavailable' && (
                                            <p className="text-sm mt-2">
                                                <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4 whitespace-nowrap">
                                                    {CONTACT_EMAIL}
                                                </a>
                                                {' · '}
                                                <a href={`tel:${CONTACT_PHONE_E164}`} className="underline underline-offset-4 whitespace-nowrap">
                                                    {CONTACT_PHONE}
                                                </a>
                                            </p>
                                        )}
                                    </div>
                                )}

                                {status === 'success' ? (
                                    <div className="text-center py-12" role="status">
                                        <div className="w-16 h-16 bg-cognac/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Mail className="h-8 w-8 text-cognac" aria-hidden="true" />
                                        </div>
                                        <h3 className="font-serif text-2xl text-charcoal-900 mb-4">{t.contact.successTitle}</h3>
                                        <p className="text-stone-warm max-w-md mx-auto">{t.contact.successBody}</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <Field id="name" label={`${t.contact.name} *`}>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    required
                                                    minLength={2}
                                                    autoComplete="name"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className={inputClass}
                                                />
                                            </Field>
                                            <Field id="email" label={`${t.contact.email} *`}>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    required
                                                    autoComplete="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className={inputClass}
                                                />
                                            </Field>
                                        </div>

                                        <Field id="phone" label={`${t.contact.phone} (${t.contact.optional})`}>
                                            <input
                                                type="tel"
                                                id="phone"
                                                autoComplete="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className={inputClass}
                                            />
                                        </Field>

                                        <Field id="subject" label={`${t.contact.subject} *`}>
                                            <select
                                                id="subject"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value as Subject })}
                                                className={cn(inputClass, 'appearance-none')}
                                            >
                                                {SUBJECTS.map((subject) => (
                                                    <option key={subject} value={subject}>
                                                        {subjectLabels[subject]}
                                                    </option>
                                                ))}
                                            </select>
                                        </Field>

                                        <Field id="message" label={`${t.contact.message} *`}>
                                            <textarea
                                                id="message"
                                                required
                                                minLength={10}
                                                rows={6}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className={cn(inputClass, 'min-h-[160px] resize-y')}
                                                placeholder={t.contact.messagePlaceholder}
                                            />
                                        </Field>

                                        <button
                                            type="submit"
                                            disabled={status === 'submitting'}
                                            className="w-full bg-charcoal-900 text-cream-50 min-h-[56px] py-4 px-8 font-sans text-sm uppercase tracking-widest hover:bg-charcoal-800 active:bg-charcoal-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                        >
                                            {status === 'submitting' ? (
                                                <span className="animate-pulse">{t.contact.sending}</span>
                                            ) : (
                                                <>
                                                    {t.contact.send}
                                                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
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

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
    return (
        <div>
            <label htmlFor={id} className="block text-xs uppercase tracking-wider text-stone-warm mb-2">
                {label}
            </label>
            {children}
        </div>
    );
}

function ContactInfoItem({
    icon,
    label,
    value,
    subtext,
}: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
    subtext?: string;
}) {
    return (
        <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-cream-sand flex items-center justify-center text-cognac">{icon}</div>
            <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-stone-warm mb-1">{label}</p>
                <p className="text-charcoal-900">{value}</p>
                {subtext && <p className="text-sm text-stone-warm mt-1">{subtext}</p>}
            </div>
        </div>
    );
}

function ContactPageSkeleton() {
    return (
        <div className="min-h-screen bg-cream animate-pulse" aria-busy="true">
            <div className="bg-charcoal-900 py-24 lg:py-32" />
            <div className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="h-96 bg-cream-200 rounded" />
                </div>
            </div>
        </div>
    );
}

// useSearchParams needs a Suspense boundary
export default function ContactPage() {
    return (
        <Suspense fallback={<ContactPageSkeleton />}>
            <ContactPageContent />
        </Suspense>
    );
}
