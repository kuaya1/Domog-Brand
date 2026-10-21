'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Ruler, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMessages } from '@/lib/i18n/use-messages';
import { SIZE_CHART, suggestSize, isSizeOffered, toInches, type LengthUnit, type SizeSuggestion } from '@/lib/sizing';

interface SizeGuideProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectSize?: (size: string) => void;
    /** EU sizes the product offers, as plain strings ("40"). */
    availableSizes?: string[];
}

/** Product-page size modal. Uses the same chart and calculator as /size-guide (lib/sizing.ts). */
export function SizeGuide({ isOpen, onClose, onSelectSize, availableSizes = [] }: SizeGuideProps) {
    const { locale, t } = useMessages();
    const [activeTab, setActiveTab] = useState<'chart' | 'measure'>('chart');
    const [footLength, setFootLength] = useState('');
    const [unit, setUnit] = useState<LengthUnit>('cm');
    const [suggestion, setSuggestion] = useState<SizeSuggestion | null>(null);

    useEffect(() => {
        if (!isOpen) return;
        const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const offered = (eu: number) =>
        availableSizes.length === 0 || availableSizes.includes(String(eu));

    const choose = (eu: number) => {
        onSelectSize?.(String(eu));
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label={t.fit.dialogLabel}>
            <div className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

            <div className="absolute inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] bg-cream shadow-2xl overflow-hidden flex flex-col rounded-lg">
                <div className="flex items-center justify-between px-6 py-4 border-b border-cream-200">
                    <div className="flex items-center gap-3">
                        <Ruler className="h-5 w-5 text-cognac-600" aria-hidden="true" />
                        <h2 className="font-serif text-xl text-charcoal-900">{t.fit.title}</h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 text-stone-warm hover:text-charcoal-900 transition-colors"
                        aria-label={t.common.close}
                    >
                        <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>

                <div className="flex border-b border-cream-200" role="tablist">
                    {(['chart', 'measure'] as const).map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            role="tab"
                            aria-selected={activeTab === tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                'flex-1 px-2 py-4 text-sm font-medium transition-default',
                                activeTab === tab
                                    ? 'text-charcoal-900 border-b-2 border-cognac bg-cream-50'
                                    : 'text-stone-warm hover:text-charcoal-900 bg-cream-100'
                            )}
                        >
                            {tab === 'chart' ? t.fit.tabChart : t.fit.tabMeasure}
                        </button>
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === 'chart' ? (
                        <div className="space-y-4">
                            <p className="text-sm text-stone-warm">{t.fit.chartNote}</p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b-2 border-charcoal-900 text-left">
                                            <th className="py-3 pr-4 font-medium">{t.fit.columnEu}</th>
                                            <th className="py-3 pr-4 font-medium">{t.fit.columnUs}</th>
                                            <th className="py-3 pr-4 font-medium">{t.fit.columnUk}</th>
                                            <th className="py-3 pr-4 font-medium">{t.fit.columnLength}</th>
                                            {availableSizes.length > 0 && <th className="py-3"><span className="sr-only">{t.fit.select}</span></th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {SIZE_CHART.map((row) => {
                                            const isOffered = offered(row.eu);
                                            return (
                                                <tr
                                                    key={row.eu}
                                                    className={cn('border-b border-cream-100', isOffered ? 'hover:bg-cream-100' : 'opacity-50')}
                                                >
                                                    <td className="py-3 pr-4 font-medium">{row.eu}</td>
                                                    <td className="py-3 pr-4">{row.us}</td>
                                                    <td className="py-3 pr-4">{row.uk}</td>
                                                    <td className="py-3 pr-4 text-stone-warm whitespace-nowrap">
                                                        {row.footLengthCm} {t.fit.unitCm} / {toInches(row.footLengthCm)} {t.fit.unitIn}
                                                    </td>
                                                    {availableSizes.length > 0 && (
                                                        <td className="py-3 text-right">
                                                            {isOffered ? (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => choose(row.eu)}
                                                                    className="text-cognac-600 hover:text-cognac-800 font-medium"
                                                                >
                                                                    {t.fit.select}
                                                                </button>
                                                            ) : (
                                                                <span className="text-cream-500">{t.fit.notOffered}</span>
                                                            )}
                                                        </td>
                                                    )}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <p className="text-stone-warm">{t.fit.intro}</p>
                            <ol className="space-y-3 text-sm text-stone-warm">
                                {(['1', '2', '3', '4', '5'] as const).map((step) => (
                                    <li key={step} className="flex gap-3">
                                        <span className="w-6 h-6 flex-shrink-0 rounded-full bg-cognac text-cream-50 text-xs flex items-center justify-center">
                                            {step}
                                        </span>
                                        <span>{t.fit.steps[step]}</span>
                                    </li>
                                ))}
                            </ol>

                            <div>
                                <label htmlFor="size-guide-length" className="block text-sm font-medium text-charcoal-900 mb-2">
                                    {t.fit.length}
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        id="size-guide-length"
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
                                        className="flex-1 min-w-0 px-4 py-3 border border-cream-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                                    />
                                    <div className="flex border border-cream-200" role="group" aria-label={t.fit.length}>
                                        {(['cm', 'in'] as const).map((u) => (
                                            <button
                                                key={u}
                                                type="button"
                                                aria-pressed={unit === u}
                                                onClick={() => {
                                                    setUnit(u);
                                                    setSuggestion(null);
                                                }}
                                                className={cn(
                                                    'px-4 py-3 text-sm transition-colors',
                                                    unit === u ? 'bg-charcoal-900 text-cream-50' : 'bg-cream-50 text-stone-warm hover:bg-cream-100'
                                                )}
                                            >
                                                {u === 'cm' ? t.fit.unitCm : t.fit.unitIn}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSuggestion(suggestSize(parseFloat(footLength), unit))}
                                className="w-full py-4 bg-charcoal-900 text-cream-50 font-medium hover:bg-charcoal-800 transition-default rounded"
                            >
                                {t.fit.calculate}
                            </button>

                            <div aria-live="polite">
                                {suggestion?.status === 'ok' && (
                                    <div className="bg-cognac-50 border border-cognac-200 p-6 text-center rounded">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <Check className="h-5 w-5 text-cognac-600" aria-hidden="true" />
                                            <span className="text-sm text-cognac-600">{t.fit.result}</span>
                                        </div>
                                        <div className="font-serif text-4xl text-charcoal-900 mb-2">EU {suggestion.row.eu}</div>
                                        <p className="text-sm text-stone-warm mb-4">
                                            US {suggestion.row.us} · UK {suggestion.row.uk}
                                        </p>
                                        <p className="text-xs text-stone-warm mb-4">{t.fit.resultHelp}</p>
                                        {availableSizes.length > 0 &&
                                            (isSizeOffered(suggestion.row, availableSizes) ? (
                                                <button
                                                    type="button"
                                                    onClick={() => choose(suggestion.row.eu)}
                                                    className="bg-charcoal-900 text-cream-50 px-6 py-3 text-sm font-medium hover:bg-charcoal-800 transition-default rounded"
                                                >
                                                    {t.fit.selectThisSize}
                                                </button>
                                            ) : (
                                                <p className="text-sm text-burgundy-700">{t.fit.sizeNotOffered}</p>
                                            ))}
                                    </div>
                                )}
                                {(suggestion?.status === 'invalid' || suggestion?.status === 'out-of-range') && (
                                    <p className="flex items-start gap-2 text-sm text-burgundy-700">
                                        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                                        {suggestion.status === 'invalid' ? t.fit.invalidLength : t.fit.outOfRange}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="px-6 py-4 border-t border-cream-200 bg-cream-50">
                    <Link
                        href={`/${locale}/contact?inquiry=sizing`}
                        className="text-sm text-cognac hover:text-cognac-dark underline underline-offset-4"
                    >
                        {t.fit.help}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SizeGuide;
