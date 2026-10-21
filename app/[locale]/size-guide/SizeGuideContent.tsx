'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Ruler, ArrowRight, Info, Footprints, AlertCircle } from 'lucide-react';
import { useMessages } from '@/lib/i18n/use-messages';
import { SIZE_CHART, suggestSize, toInches, type LengthUnit, type SizeSuggestion } from '@/lib/sizing';

const STEPS = ['1', '2', '3', '4', '5'] as const;

/** Standalone size guide. Shares its chart and calculator with the product modal (lib/sizing.ts). */
export default function SizeGuideContent() {
    const { locale, t } = useMessages();
    const [unit, setUnit] = useState<LengthUnit>('cm');
    const [footLength, setFootLength] = useState('');
    const [suggestion, setSuggestion] = useState<SizeSuggestion | null>(null);

    return (
        <div className="min-h-screen bg-cream">
            <section className="bg-charcoal-900 pt-32 pb-16 lg:pt-36 lg:pb-24">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <span className="inline-block font-sans text-xs uppercase tracking-[0.25em] text-gold mb-4">{t.fit.pageEyebrow}</span>
                    <h1 className="font-serif text-3xl lg:text-4xl text-cream font-medium">{t.fit.pageTitle}</h1>
                    <p className="text-cream/70 text-base mt-4 max-w-2xl mx-auto">{t.fit.intro}</p>
                </div>
            </section>

            <section className="py-16 lg:py-24">
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    <div className="mb-16">
                        <h2 className="font-serif text-2xl text-charcoal-900 mb-8 flex items-center gap-3">
                            <Ruler className="w-6 h-6 text-cognac" aria-hidden="true" />
                            {t.fit.measureTitle}
                        </h2>

                        <div className="grid lg:grid-cols-2 gap-12">
                            <ol className="space-y-6">
                                {STEPS.map((step) => (
                                    <li key={step} className="flex gap-4">
                                        <span className="w-8 h-8 bg-cognac text-cream-50 flex items-center justify-center flex-shrink-0 text-sm font-medium">
                                            {step}
                                        </span>
                                        <p className="text-stone-warm leading-relaxed">{t.fit.steps[step]}</p>
                                    </li>
                                ))}
                            </ol>

                            <div className="bg-cream-sand p-6 sm:p-8 border border-cream-200">
                                <h3 className="font-serif text-xl text-charcoal-900 mb-6 flex items-center gap-2">
                                    <Footprints className="w-5 h-5 text-cognac" aria-hidden="true" />
                                    {t.fit.calculatorTitle}
                                </h3>

                                <div className="flex gap-2 mb-6" role="group" aria-label={t.fit.length}>
                                    {(['cm', 'in'] as const).map((u) => (
                                        <button
                                            key={u}
                                            type="button"
                                            aria-pressed={unit === u}
                                            onClick={() => {
                                                setUnit(u);
                                                setSuggestion(null);
                                            }}
                                            className={`px-4 py-2 text-sm tracking-wider transition-colors ${
                                                unit === u ? 'bg-charcoal-900 text-cream-50' : 'bg-cream text-stone-warm hover:bg-cream-200'
                                            }`}
                                        >
                                            {u === 'cm' ? t.fit.unitCm : t.fit.unitIn}
                                        </button>
                                    ))}
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="foot-length" className="block text-xs uppercase tracking-wider text-stone-warm mb-2">
                                        {t.fit.length}
                                    </label>
                                    <input
                                        id="foot-length"
                                        type="number"
                                        inputMode="decimal"
                                        step="0.1"
                                        min="0"
                                        value={footLength}
                                        onChange={(e) => {
                                            setFootLength(e.target.value);
                                            setSuggestion(null);
                                        }}
                                        placeholder={unit === 'cm' ? '25.5' : '10'}
                                        className="w-full border border-cream-200 bg-cream-50 py-3 px-4 text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setSuggestion(suggestSize(parseFloat(footLength), unit))}
                                    className="w-full bg-charcoal-900 text-cream-50 py-3 px-6 text-sm uppercase tracking-widest hover:bg-charcoal-800 transition-colors flex items-center justify-center gap-2"
                                >
                                    {t.fit.calculate}
                                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                </button>

                                <div aria-live="polite">
                                    {suggestion?.status === 'ok' && (
                                        <div className="mt-6 p-4 bg-cream border border-gold/30">
                                            <p className="text-stone-warm text-sm mb-1">{t.fit.result}</p>
                                            <p className="font-serif text-3xl text-charcoal-900">EU {suggestion.row.eu}</p>
                                            <p className="text-sm text-stone-warm mt-1">
                                                US {suggestion.row.us} · UK {suggestion.row.uk}
                                            </p>
                                            <p className="text-xs text-stone-warm mt-2">{t.fit.resultHelp}</p>
                                        </div>
                                    )}
                                    {(suggestion?.status === 'invalid' || suggestion?.status === 'out-of-range') && (
                                        <p className="mt-6 flex items-start gap-2 text-sm text-burgundy-700">
                                            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                                            {suggestion.status === 'invalid' ? t.fit.invalidLength : t.fit.outOfRange}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-16">
                        <h2 className="font-serif text-2xl text-charcoal-900 mb-4">{t.fit.chartTitle}</h2>
                        <p className="text-sm text-stone-warm mb-6">{t.fit.chartNote}</p>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse min-w-[460px]">
                                <thead>
                                    <tr className="border-b-2 border-charcoal-900 text-left">
                                        <th className="py-4 pr-6 font-medium text-charcoal-900">{t.fit.columnEu}</th>
                                        <th className="py-4 pr-6 font-medium text-charcoal-900">{t.fit.columnUs}</th>
                                        <th className="py-4 pr-6 font-medium text-charcoal-900">{t.fit.columnUk}</th>
                                        <th className="py-4 font-medium text-charcoal-900">{t.fit.columnLength}</th>
                                    </tr>
                                </thead>
                                <tbody className="text-stone-warm">
                                    {SIZE_CHART.map((row) => (
                                        <tr key={row.eu} className="border-b border-cream-200">
                                            <td className="py-3 pr-6 font-medium text-charcoal-900">{row.eu}</td>
                                            <td className="py-3 pr-6">{row.us}</td>
                                            <td className="py-3 pr-6">{row.uk}</td>
                                            <td className="py-3 whitespace-nowrap">
                                                {row.footLengthCm} {t.fit.unitCm} / {toInches(row.footLengthCm)} {t.fit.unitIn}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-cream-sand p-6 sm:p-8 lg:p-12 border-l-2 border-gold/30">
                        <div className="flex items-start gap-4">
                            <Info className="w-6 h-6 text-cognac flex-shrink-0 mt-1" aria-hidden="true" />
                            <div>
                                <h3 className="font-serif text-xl text-charcoal-900 mb-4">{t.fit.tipsTitle}</h3>
                                <ul className="space-y-3 text-stone-warm">
                                    {[t.fit.tipEvening, t.fit.tipBetween, t.fit.tipWide].map((tip) => (
                                        <li key={tip} className="flex gap-2">
                                            <span className="text-cognac" aria-hidden="true">•</span>
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 pt-16 border-t border-cream-200 text-center">
                        <h3 className="font-serif text-xl text-charcoal-900 mb-4">{t.fit.unsureTitle}</h3>
                        <p className="text-stone-warm mb-6">{t.fit.unsureBody}</p>
                        <Link
                            href={`/${locale}/contact?inquiry=sizing`}
                            className="inline-flex items-center gap-2 bg-charcoal-900 text-cream-50 px-8 py-4 text-sm uppercase tracking-widest hover:bg-charcoal-800 transition-colors text-center"
                        >
                            {t.fit.help}
                        </Link>
                    </div>

                    <div className="mt-12 pt-8 border-t border-cream-200">
                        <Link href={`/${locale}/shop`} className="text-cognac hover:text-cognac/80 transition-colors text-sm uppercase tracking-wider">
                            ← {t.common.backToCollection}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
