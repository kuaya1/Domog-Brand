'use client';

import { useState, useEffect } from 'react';
import { 
    FitConfidenceScore, 
    FitGrade, 
    AreaScore,
    FitRecommendation 
} from '@/lib/fitting';

interface FitConfidenceDisplayProps {
    score: FitConfidenceScore;
    productName: string;
    selectedSize: string;
}

/**
 * FIT CONFIDENCE DISPLAY
 * 
 * Design Philosophy:
 * This component must feel like receiving a consultation from a master craftsman,
 * not like a video game achievement screen. The design language is:
 * - Typography over graphics
 * - Quiet confidence over loud celebration
 * - Intimate detail over broad strokes
 */

export default function FitConfidenceDisplay({ 
    score, 
    productName, 
    selectedSize 
}: FitConfidenceDisplayProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState<'now' | 'evolution'>('now');
    
    return (
        <div className="bg-stone-50 border border-stone-200 rounded-sm overflow-hidden">
            {/* Header: The Grade */}
            <div className="px-8 py-10 bg-white border-b border-stone-100">
                <div className="flex items-baseline justify-between mb-8">
                    <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-stone-400 mb-2">
                            Fit Assessment
                        </p>
                        <p className="text-sm text-stone-600">
                            {productName} · Size {selectedSize}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs uppercase tracking-[0.2em] text-amber-700 mb-1">
                            Confidence
                        </p>
                        <p className="font-serif text-4xl text-stone-900">
                            {score.overall}
                        </p>
                    </div>
                </div>
                
                {/* The Grade Statement */}
                <GradeStatement grade={score.grade} />
                
                {/* Bespoke Recommendation (if applicable) */}
                {score.bespokeRecommended && (
                    <div className="mt-8 pt-8 border-t border-amber-100 bg-amber-50/50 -mx-8 -mb-10 px-8 pb-8">
                        <p className="text-sm text-amber-800">
                            <span className="font-medium">Our Recommendation:</span>{' '}
                            {score.bespokeReason}
                        </p>
                        <button className="mt-4 text-xs uppercase tracking-widest text-amber-900 border-b border-amber-900 pb-1 hover:text-amber-700 hover:border-amber-700 transition-colors">
                            Explore Bespoke Service
                        </button>
                    </div>
                )}
            </div>
            
            {/* Tab Navigation */}
            <div className="flex border-b border-stone-200">
                <button
                    onClick={() => setActiveTab('now')}
                    className={`flex-1 px-6 py-4 text-xs uppercase tracking-widest transition-colors ${
                        activeTab === 'now' 
                            ? 'text-stone-900 bg-white border-b-2 border-stone-900' 
                            : 'text-stone-400 hover:text-stone-600'
                    }`}
                >
                    Day One
                </button>
                <button
                    onClick={() => setActiveTab('evolution')}
                    className={`flex-1 px-6 py-4 text-xs uppercase tracking-widest transition-colors ${
                        activeTab === 'evolution' 
                            ? 'text-stone-900 bg-white border-b-2 border-stone-900' 
                            : 'text-stone-400 hover:text-stone-600'
                    }`}
                >
                    The Evolution
                </button>
            </div>
            
            {/* Content */}
            <div className="px-8 py-8">
                {activeTab === 'now' ? (
                    <DayOneView breakdown={score.breakdown} />
                ) : (
                    <EvolutionView 
                        breakdown={score.breakdown} 
                        evolution={score.leatherEvolution} 
                    />
                )}
            </div>
            
            {/* Recommendations */}
            {score.recommendations.length > 0 && (
                <div className="px-8 pb-8">
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full flex items-center justify-between py-4 border-t border-stone-200 text-left"
                    >
                        <span className="text-xs uppercase tracking-widest text-stone-500">
                            Guidance from Our Fitters
                        </span>
                        <span className="text-stone-400 text-lg">
                            {isExpanded ? '−' : '+'}
                        </span>
                    </button>
                    
                    {isExpanded && (
                        <div className="space-y-4 pt-2">
                            {score.recommendations.map((rec, idx) => (
                                <RecommendationCard key={idx} recommendation={rec} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function GradeStatement({ grade }: { grade: FitGrade }) {
    const statements: Record<FitGrade, { headline: string; body: string }> = {
        'EXCEPTIONAL': {
            headline: 'A Rare Match',
            body: 'Your measurements align with this boot as if the last were carved for you. This is the fit our masters dream of.'
        },
        'EXCELLENT': {
            headline: 'An Excellent Foundation',
            body: 'We are confident in this pairing. The boot will embrace your foot beautifully from the first day.'
        },
        'GOOD': {
            headline: 'A Worthy Partnership',
            body: 'This boot will serve you well. Allow time for the leather to learn your foot, and it will reward your patience.'
        },
        'FAIR': {
            headline: 'Consider Carefully',
            body: 'This pairing is possible, but may benefit from adjustment. Our fitters are available to guide you.'
        },
        'CONSULT': {
            headline: 'Let Us Guide You',
            body: 'Your unique measurements suggest that a conversation with our fitting specialists would be valuable. We are here to help.'
        }
    };
    
    const { headline, body } = statements[grade];
    
    return (
        <div className="text-center max-w-md mx-auto">
            <h3 className="font-serif text-2xl text-stone-900 mb-3">
                {headline}
            </h3>
            <p className="text-stone-600 leading-relaxed">
                {body}
            </p>
        </div>
    );
}

function DayOneView({ breakdown }: { breakdown: FitConfidenceScore['breakdown'] }) {
    const areas = [
        { key: 'length', label: 'Length', data: breakdown.length },
        { key: 'arch', label: 'Arch Support', data: breakdown.arch },
        { key: 'width', label: 'Width', data: breakdown.width },
        { key: 'instep', label: 'Instep', data: breakdown.instep },
        ...(breakdown.calf ? [{ key: 'calf', label: 'Calf', data: breakdown.calf }] : [])
    ];
    
    return (
        <div className="space-y-6">
            <p className="text-sm text-stone-500 italic text-center mb-8">
                How this boot will feel when it first arrives
            </p>
            
            {areas.map(({ key, label, data }) => (
                <AreaScoreRow 
                    key={key} 
                    label={label} 
                    score={data} 
                    showNote="dayOne"
                />
            ))}
        </div>
    );
}

function EvolutionView({ 
    breakdown, 
    evolution 
}: { 
    breakdown: FitConfidenceScore['breakdown'];
    evolution: FitConfidenceScore['leatherEvolution'];
}) {
    return (
        <div className="space-y-8">
            {/* Timeline */}
            <div className="bg-white p-6 rounded-sm border border-stone-100">
                <h4 className="text-xs uppercase tracking-widest text-stone-400 mb-6">
                    The Journey
                </h4>
                <div className="space-y-4">
                    {Object.entries(evolution.breakInPeriod).map(([key, description]) => (
                        <div key={key} className="flex gap-4">
                            <div className="w-2 h-2 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
                            <p className="text-sm text-stone-600 leading-relaxed">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Expected Stretch */}
            <div>
                <h4 className="text-xs uppercase tracking-widest text-stone-400 mb-4">
                    Leather Evolution
                </h4>
                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(evolution.expectedStretch).map(([area, percent]) => (
                        <div key={area} className="text-center p-4 bg-white rounded-sm border border-stone-100">
                            <p className="text-2xl font-serif text-stone-900 mb-1">
                                {percent.toFixed(1)}%
                            </p>
                            <p className="text-xs uppercase tracking-wider text-stone-400">
                                {area} stretch
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Day 90 Notes */}
            <div>
                <h4 className="text-xs uppercase tracking-widest text-stone-400 mb-4">
                    After 90 Days
                </h4>
                <div className="space-y-3">
                    {Object.entries(breakdown).map(([key, data]) => {
                        if (!data) return null;
                        return (
                            <div key={key} className="flex gap-3 text-sm">
                                <span className="text-stone-400 uppercase text-xs tracking-wider w-16 flex-shrink-0 pt-0.5">
                                    {key}
                                </span>
                                <span className="text-stone-600">
                                    {data.day90Note}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            {/* Care Instructions */}
            <div className="pt-6 border-t border-stone-200">
                <h4 className="text-xs uppercase tracking-widest text-stone-400 mb-4">
                    Care During Break-In
                </h4>
                <ul className="space-y-2">
                    {evolution.careInstructions.map((instruction, idx) => (
                        <li key={idx} className="text-sm text-stone-600 flex gap-2">
                            <span className="text-amber-600">·</span>
                            {instruction}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function AreaScoreRow({ 
    label, 
    score, 
    showNote 
}: { 
    label: string; 
    score: AreaScore;
    showNote: 'dayOne' | 'day90';
}) {
    const statusColors: Record<AreaScore['status'], string> = {
        'optimal': 'text-emerald-700',
        'acceptable': 'text-stone-600',
        'tight': 'text-amber-700',
        'loose': 'text-blue-600',
        'concern': 'text-rose-600'
    };
    
    const statusLabels: Record<AreaScore['status'], string> = {
        'optimal': 'Excellent',
        'acceptable': 'Good',
        'tight': 'Snug',
        'loose': 'Relaxed',
        'concern': 'Attention'
    };
    
    return (
        <div className="flex items-start gap-6 pb-6 border-b border-stone-100 last:border-0 last:pb-0">
            {/* Score Circle - Minimal, typographic */}
            <div className="w-16 h-16 rounded-full border-2 border-stone-200 flex items-center justify-center flex-shrink-0">
                <span className="font-serif text-xl text-stone-800">
                    {score.score}
                </span>
            </div>
            
            {/* Details */}
            <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-1">
                    <h5 className="font-medium text-stone-900">
                        {label}
                    </h5>
                    <span className={`text-xs uppercase tracking-wider ${statusColors[score.status]}`}>
                        {statusLabels[score.status]}
                    </span>
                </div>
                <p className="text-sm text-stone-500 leading-relaxed">
                    {showNote === 'dayOne' ? score.dayOneNote : score.day90Note}
                </p>
            </div>
        </div>
    );
}

function RecommendationCard({ recommendation }: { recommendation: FitRecommendation }) {
    const priorityStyles: Record<FitRecommendation['priority'], string> = {
        'essential': 'border-l-amber-600 bg-amber-50/50',
        'suggested': 'border-l-stone-400 bg-stone-50',
        'optional': 'border-l-stone-200 bg-white'
    };
    
    const categoryLabels: Record<FitRecommendation['category'], string> = {
        'sizing': 'Sizing',
        'style': 'Style',
        'care': 'Care',
        'timing': 'Timing'
    };
    
    return (
        <div className={`border-l-4 pl-4 py-3 ${priorityStyles[recommendation.priority]}`}>
            <p className="text-xs uppercase tracking-wider text-stone-400 mb-1">
                {categoryLabels[recommendation.category]}
            </p>
            <p className="text-sm text-stone-700">
                {recommendation.message}
            </p>
        </div>
    );
}

// ============================================================================
// MEASUREMENT INPUT FORM COMPONENT
// ============================================================================

interface MeasurementFormProps {
    onSubmit: (measurements: any) => void;
    isLoading?: boolean;
}

export function MeasurementForm({ onSubmit, isLoading }: MeasurementFormProps) {
    const [step, setStep] = useState(1);
    const [unit, setUnit] = useState<'cm' | 'in'>('cm');
    
    // Form state
    const [measurements, setMeasurements] = useState({
        footLength: '',
        ballWidth: '',
        archProfile: 'neutral' as const,
        instepHeight: '',
        calfCircumference: '',
        fitPreference: 'standard' as const,
        primaryUse: 'daily' as const
    });
    
    const updateMeasurement = (key: string, value: string) => {
        setMeasurements(prev => ({ ...prev, [key]: value }));
    };
    
    return (
        <div className="bg-white border border-stone-200 rounded-sm overflow-hidden">
            {/* Header */}
            <div className="px-8 py-6 border-b border-stone-100">
                <p className="text-xs uppercase tracking-[0.25em] text-amber-700 mb-2">
                    Virtual Fitting Room
                </p>
                <h3 className="font-serif text-2xl text-stone-900">
                    Know Your Fit
                </h3>
                <p className="text-sm text-stone-500 mt-2">
                    Share your measurements, and we will guide you to your perfect boot.
                </p>
            </div>
            
            {/* Progress */}
            <div className="px-8 py-4 bg-stone-50 border-b border-stone-100">
                <div className="flex items-center gap-2">
                    {[1, 2, 3].map(s => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                                s === step 
                                    ? 'bg-stone-900 text-white' 
                                    : s < step 
                                        ? 'bg-amber-100 text-amber-800' 
                                        : 'bg-stone-200 text-stone-400'
                            }`}>
                                {s < step ? '✓' : s}
                            </div>
                            {s < 3 && <div className="w-12 h-px bg-stone-200" />}
                        </div>
                    ))}
                </div>
                <p className="text-xs text-stone-400 mt-3">
                    {step === 1 && 'Foot Measurements'}
                    {step === 2 && 'Arch & Instep'}
                    {step === 3 && 'Preferences'}
                </p>
            </div>
            
            {/* Form Content */}
            <div className="px-8 py-8">
                {step === 1 && (
                    <div className="space-y-6">
                        {/* Unit Toggle */}
                        <div className="flex items-center justify-end gap-2 mb-8">
                            <button 
                                onClick={() => setUnit('cm')}
                                className={`px-3 py-1 text-xs uppercase tracking-wider ${
                                    unit === 'cm' ? 'bg-stone-900 text-white' : 'text-stone-400'
                                }`}
                            >
                                CM
                            </button>
                            <button 
                                onClick={() => setUnit('in')}
                                className={`px-3 py-1 text-xs uppercase tracking-wider ${
                                    unit === 'in' ? 'bg-stone-900 text-white' : 'text-stone-400'
                                }`}
                            >
                                IN
                            </button>
                        </div>
                        
                        <MeasurementInput
                            label="Foot Length"
                            hint="Heel to longest toe"
                            value={measurements.footLength}
                            onChange={(v) => updateMeasurement('footLength', v)}
                            unit={unit}
                        />
                        
                        <MeasurementInput
                            label="Ball Width"
                            hint="Widest part of forefoot"
                            value={measurements.ballWidth}
                            onChange={(v) => updateMeasurement('ballWidth', v)}
                            unit={unit}
                        />
                    </div>
                )}
                
                {step === 2 && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-3">
                                Arch Profile
                            </label>
                            <p className="text-xs text-stone-400 mb-4">
                                Stand on wet sand or paper—observe your footprint
                            </p>
                            <div className="grid grid-cols-5 gap-2">
                                {(['flat', 'low', 'neutral', 'high', 'very-high'] as const).map(arch => (
                                    <button
                                        key={arch}
                                        onClick={() => updateMeasurement('archProfile', arch)}
                                        className={`py-3 text-xs text-center border transition-colors ${
                                            measurements.archProfile === arch
                                                ? 'border-stone-900 bg-stone-900 text-white'
                                                : 'border-stone-200 hover:border-stone-400'
                                        }`}
                                    >
                                        {arch.replace('-', ' ')}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <MeasurementInput
                            label="Instep Height"
                            hint="Top of foot at highest point"
                            value={measurements.instepHeight}
                            onChange={(v) => updateMeasurement('instepHeight', v)}
                            unit={unit}
                        />
                        
                        <MeasurementInput
                            label="Calf Circumference"
                            hint="For tall boots only"
                            value={measurements.calfCircumference}
                            onChange={(v) => updateMeasurement('calfCircumference', v)}
                            unit={unit}
                            optional
                        />
                    </div>
                )}
                
                {step === 3 && (
                    <div className="space-y-8">
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-3">
                                Fit Preference
                            </label>
                            <div className="space-y-2">
                                {([
                                    { value: 'snug', label: 'Snug', desc: 'Close fit that will relax with wear' },
                                    { value: 'standard', label: 'Standard', desc: 'Balanced comfort from day one' },
                                    { value: 'relaxed', label: 'Relaxed', desc: 'Room for thick socks or orthotics' }
                                ] as const).map(opt => (
                                    <button
                                        key={opt.value}
                                        onClick={() => updateMeasurement('fitPreference', opt.value)}
                                        className={`w-full text-left px-4 py-3 border transition-colors ${
                                            measurements.fitPreference === opt.value
                                                ? 'border-stone-900 bg-stone-50'
                                                : 'border-stone-200 hover:border-stone-400'
                                        }`}
                                    >
                                        <span className="block font-medium text-stone-800">{opt.label}</span>
                                        <span className="block text-xs text-stone-400 mt-1">{opt.desc}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-3">
                                Primary Use
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {([
                                    { value: 'ceremonial', label: 'Ceremonial' },
                                    { value: 'daily', label: 'Daily Wear' },
                                    { value: 'riding', label: 'Riding' },
                                    { value: 'display', label: 'Collection' }
                                ] as const).map(opt => (
                                    <button
                                        key={opt.value}
                                        onClick={() => updateMeasurement('primaryUse', opt.value)}
                                        className={`py-3 text-sm border transition-colors ${
                                            measurements.primaryUse === opt.value
                                                ? 'border-stone-900 bg-stone-900 text-white'
                                                : 'border-stone-200 hover:border-stone-400'
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Navigation */}
            <div className="px-8 py-6 bg-stone-50 border-t border-stone-100 flex justify-between">
                {step > 1 ? (
                    <button
                        onClick={() => setStep(s => s - 1)}
                        className="text-sm text-stone-500 hover:text-stone-800 transition-colors"
                    >
                        ← Back
                    </button>
                ) : (
                    <div />
                )}
                
                {step < 3 ? (
                    <button
                        onClick={() => setStep(s => s + 1)}
                        className="px-6 py-2 bg-stone-900 text-white text-sm hover:bg-stone-800 transition-colors"
                    >
                        Continue
                    </button>
                ) : (
                    <button
                        onClick={() => onSubmit(measurements)}
                        disabled={isLoading}
                        className="px-6 py-2 bg-amber-700 text-white text-sm hover:bg-amber-800 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'Calculating...' : 'Calculate My Fit'}
                    </button>
                )}
            </div>
        </div>
    );
}

function MeasurementInput({ 
    label, 
    hint, 
    value, 
    onChange, 
    unit,
    optional = false 
}: {
    label: string;
    hint: string;
    value: string;
    onChange: (value: string) => void;
    unit: 'cm' | 'in';
    optional?: boolean;
}) {
    return (
        <div>
            <div className="flex items-baseline justify-between mb-2">
                <label className="text-sm font-medium text-stone-700">
                    {label}
                    {optional && <span className="text-stone-400 font-normal ml-2">(optional)</span>}
                </label>
                <span className="text-xs text-stone-400">{unit}</span>
            </div>
            <p className="text-xs text-stone-400 mb-2">{hint}</p>
            <input
                type="number"
                step="0.1"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 border border-stone-200 focus:border-stone-400 focus:outline-none text-lg font-serif"
                placeholder={unit === 'cm' ? '25.0' : '9.8'}
            />
        </div>
    );
}
