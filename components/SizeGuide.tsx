'use client';

import { useState, useCallback } from 'react';
import { X, Ruler, Info, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// Types
// ============================================================================

interface SizeData {
    eu: number;
    us: string;
    uk: string;
    footLengthCm: number;
    footLengthIn: number;
}

type SizeSystem = 'eu' | 'us' | 'uk';
type FitPreference = 'snug' | 'standard' | 'roomy';

interface SizeGuideProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectSize?: (size: string) => void;
    availableSizes?: string[];
    productCategory?: string;
}

// ============================================================================
// Size Data
// ============================================================================

const SIZE_CHART: SizeData[] = [
    { eu: 36, us: '4', uk: '3', footLengthCm: 22.8, footLengthIn: 9.0 },
    { eu: 37, us: '5', uk: '4', footLengthCm: 23.5, footLengthIn: 9.25 },
    { eu: 38, us: '6', uk: '5', footLengthCm: 24.1, footLengthIn: 9.5 },
    { eu: 39, us: '7', uk: '6', footLengthCm: 24.8, footLengthIn: 9.75 },
    { eu: 40, us: '8', uk: '7', footLengthCm: 25.4, footLengthIn: 10.0 },
    { eu: 41, us: '9', uk: '8', footLengthCm: 26.0, footLengthIn: 10.25 },
    { eu: 42, us: '10', uk: '9', footLengthCm: 26.7, footLengthIn: 10.5 },
    { eu: 43, us: '11', uk: '10', footLengthCm: 27.3, footLengthIn: 10.75 },
    { eu: 44, us: '12', uk: '11', footLengthCm: 28.0, footLengthIn: 11.0 },
    { eu: 45, us: '13', uk: '12', footLengthCm: 28.6, footLengthIn: 11.25 },
    { eu: 46, us: '14', uk: '13', footLengthCm: 29.2, footLengthIn: 11.5 },
];

const FIT_TIPS: Record<string, string> = {
    'Riding Boots': 'Riding boots should fit snugly through the calf. Consider sizing up if you prefer wearing thick socks.',
    'Winter Boots': 'Winter boots benefit from a slightly roomier fit to accommodate thermal socks and allow air circulation.',
    'Ceremonial Boots': 'Ceremonial boots should fit true to size for the most elegant silhouette.',
    'Heritage Collection': 'Heritage styles are traditionally crafted and may require a brief break-in period.',
    'Everyday': 'Everyday boots should balance comfort with support. Standard fit recommended.',
    default: 'Our boots are handcrafted in European sizing. We recommend measuring your foot for the best fit.',
};

// ============================================================================
// Helper Functions
// ============================================================================

function measurementToSize(lengthCm: number, fitPreference: FitPreference): SizeData | null {
    // Adjust for fit preference
    let adjustedLength = lengthCm;
    if (fitPreference === 'snug') adjustedLength -= 0.3;
    if (fitPreference === 'roomy') adjustedLength += 0.3;
    
    // Find best matching size
    for (let i = 0; i < SIZE_CHART.length; i++) {
        if (SIZE_CHART[i].footLengthCm >= adjustedLength) {
            return SIZE_CHART[i];
        }
    }
    
    // Return largest if measurement exceeds chart
    return SIZE_CHART[SIZE_CHART.length - 1];
}

// ============================================================================
// Component
// ============================================================================

export function SizeGuide({
    isOpen,
    onClose,
    onSelectSize,
    availableSizes = [],
    productCategory,
}: SizeGuideProps) {
    const [activeTab, setActiveTab] = useState<'chart' | 'measure'>('chart');
    const [sizeSystem, setSizeSystem] = useState<SizeSystem>('eu');
    const [footLength, setFootLength] = useState<string>('');
    const [measurementUnit, setMeasurementUnit] = useState<'cm' | 'in'>('cm');
    const [fitPreference, setFitPreference] = useState<FitPreference>('standard');
    const [recommendedSize, setRecommendedSize] = useState<SizeData | null>(null);
    
    const fitTip = productCategory ? FIT_TIPS[productCategory] || FIT_TIPS.default : FIT_TIPS.default;
    
    const calculateSize = useCallback(() => {
        const length = parseFloat(footLength);
        if (isNaN(length) || length <= 0) {
            setRecommendedSize(null);
            return;
        }
        
        // Convert to cm if needed
        const lengthCm = measurementUnit === 'in' ? length * 2.54 : length;
        const size = measurementToSize(lengthCm, fitPreference);
        setRecommendedSize(size);
    }, [footLength, measurementUnit, fitPreference]);
    
    const handleSelectSize = useCallback((size: string) => {
        if (onSelectSize) {
            onSelectSize(size);
        }
        onClose();
    }, [onSelectSize, onClose]);
    
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Size Guide">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="absolute inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] bg-cream shadow-2xl overflow-hidden flex flex-col animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-cream-200">
                    <h2 className="font-serif text-xl md:text-2xl text-black flex items-center gap-2">
                        <Ruler className="h-5 w-5 text-cognac-500" />
                        Size Guide
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-cream-500 hover:text-black transition-colors"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                
                {/* Tabs */}
                <div className="flex border-b border-cream-200">
                    <button
                        onClick={() => setActiveTab('chart')}
                        className={cn(
                            "flex-1 py-3 text-sm font-medium transition-colors",
                            activeTab === 'chart'
                                ? "text-black border-b-2 border-black"
                                : "text-cream-500 hover:text-black"
                        )}
                    >
                        Size Chart
                    </button>
                    <button
                        onClick={() => setActiveTab('measure')}
                        className={cn(
                            "flex-1 py-3 text-sm font-medium transition-colors",
                            activeTab === 'measure'
                                ? "text-black border-b-2 border-black"
                                : "text-cream-500 hover:text-black"
                        )}
                    >
                        Find Your Size
                    </button>
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === 'chart' && (
                        <div>
                            {/* Size System Selector */}
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-sm text-cream-500">Display in:</span>
                                {(['eu', 'us', 'uk'] as SizeSystem[]).map((system) => (
                                    <button
                                        key={system}
                                        onClick={() => setSizeSystem(system)}
                                        className={cn(
                                            "px-3 py-1 text-sm border transition-colors uppercase",
                                            sizeSystem === system
                                                ? "bg-black text-white border-black"
                                                : "bg-white text-cream-600 border-cream-200 hover:border-black"
                                        )}
                                    >
                                        {system}
                                    </button>
                                ))}
                            </div>
                            
                            {/* Size Chart Table */}
                            <div className="overflow-x-auto mb-6">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-cream-200">
                                            <th className="text-left py-3 pr-4 font-medium text-cream-500">EU</th>
                                            <th className="text-left py-3 pr-4 font-medium text-cream-500">US</th>
                                            <th className="text-left py-3 pr-4 font-medium text-cream-500">UK</th>
                                            <th className="text-left py-3 pr-4 font-medium text-cream-500">Foot Length</th>
                                            {availableSizes.length > 0 && (
                                                <th className="text-right py-3 font-medium text-cream-500">Available</th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {SIZE_CHART.map((size) => {
                                            const sizeValue = sizeSystem === 'eu' 
                                                ? size.eu.toString() 
                                                : sizeSystem === 'us' 
                                                    ? size.us 
                                                    : size.uk;
                                            const isAvailable = availableSizes.length === 0 || 
                                                availableSizes.some(s => 
                                                    s.includes(size.eu.toString()) ||
                                                    s.includes(size.us) ||
                                                    s === `EU ${size.eu}` ||
                                                    s === `US ${size.us}` ||
                                                    s === `UK ${size.uk}`
                                                );
                                            
                                            return (
                                                <tr 
                                                    key={size.eu} 
                                                    className={cn(
                                                        "border-b border-cream-100 transition-colors",
                                                        isAvailable ? "hover:bg-cream-100" : "opacity-50"
                                                    )}
                                                >
                                                    <td className="py-3 pr-4 font-medium">{size.eu}</td>
                                                    <td className="py-3 pr-4">{size.us}</td>
                                                    <td className="py-3 pr-4">{size.uk}</td>
                                                    <td className="py-3 pr-4 text-cream-500">
                                                        {size.footLengthCm} cm / {size.footLengthIn}&quot;
                                                    </td>
                                                    {availableSizes.length > 0 && (
                                                        <td className="py-3 text-right">
                                                            {isAvailable ? (
                                                                <button
                                                                    onClick={() => handleSelectSize(`EU ${size.eu}`)}
                                                                    className="text-cognac-600 hover:text-cognac-800 font-medium"
                                                                >
                                                                    Select
                                                                </button>
                                                            ) : (
                                                                <span className="text-cream-400">Sold out</span>
                                                            )}
                                                        </td>
                                                    )}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Fit Tip */}
                            <div className="bg-cream-100 p-4 flex gap-3">
                                <Info className="h-5 w-5 text-cognac-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm text-cream-700">{fitTip}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'measure' && (
                        <div className="space-y-6">
                            {/* Instructions */}
                            <div className="bg-cream-100 p-4">
                                <h3 className="font-medium text-black mb-2">How to Measure Your Foot</h3>
                                <ol className="text-sm text-cream-600 space-y-2 list-decimal list-inside">
                                    <li>Place a piece of paper against a wall</li>
                                    <li>Stand on the paper with your heel against the wall</li>
                                    <li>Mark the longest part of your foot (usually the big toe)</li>
                                    <li>Measure the distance from the wall to the mark</li>
                                    <li>Repeat for both feet and use the larger measurement</li>
                                </ol>
                            </div>
                            
                            {/* Measurement Input */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-cream-500 mb-2">
                                        Foot Length
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="number"
                                            value={footLength}
                                            onChange={(e) => setFootLength(e.target.value)}
                                            placeholder={measurementUnit === 'cm' ? '25.5' : '10.0'}
                                            step="0.1"
                                            className="flex-1 px-4 py-3 border border-cream-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                                        />
                                        <div className="flex border border-l-0 border-cream-200">
                                            <button
                                                onClick={() => setMeasurementUnit('cm')}
                                                className={cn(
                                                    "px-3 py-2 text-sm transition-colors",
                                                    measurementUnit === 'cm'
                                                        ? "bg-black text-white"
                                                        : "bg-white text-cream-600 hover:bg-cream-50"
                                                )}
                                            >
                                                cm
                                            </button>
                                            <button
                                                onClick={() => setMeasurementUnit('in')}
                                                className={cn(
                                                    "px-3 py-2 text-sm transition-colors",
                                                    measurementUnit === 'in'
                                                        ? "bg-black text-white"
                                                        : "bg-white text-cream-600 hover:bg-cream-50"
                                                )}
                                            >
                                                in
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm text-cream-500 mb-2">
                                        Fit Preference
                                    </label>
                                    <div className="flex gap-2">
                                        {(['snug', 'standard', 'roomy'] as FitPreference[]).map((fit) => (
                                            <button
                                                key={fit}
                                                onClick={() => setFitPreference(fit)}
                                                className={cn(
                                                    "flex-1 py-3 text-sm border transition-colors capitalize",
                                                    fitPreference === fit
                                                        ? "bg-black text-white border-black"
                                                        : "bg-white text-cream-600 border-cream-200 hover:border-black"
                                                )}
                                            >
                                                {fit}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Calculate Button */}
                            <button
                                onClick={calculateSize}
                                disabled={!footLength}
                                className={cn(
                                    "w-full py-4 font-medium transition-colors",
                                    footLength
                                        ? "bg-black text-white hover:bg-cream-800"
                                        : "bg-cream-200 text-cream-400 cursor-not-allowed"
                                )}
                            >
                                Find My Size
                            </button>
                            
                            {/* Result */}
                            {recommendedSize && (
                                <div className="bg-cognac-50 border border-cognac-200 p-6 text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Check className="h-5 w-5 text-cognac-600" />
                                        <span className="text-sm text-cognac-600 uppercase tracking-wider">
                                            Recommended Size
                                        </span>
                                    </div>
                                    <div className="font-serif text-4xl text-black mb-4">
                                        EU {recommendedSize.eu}
                                    </div>
                                    <p className="text-sm text-cream-500 mb-4">
                                        US {recommendedSize.us} • UK {recommendedSize.uk}
                                    </p>
                                    
                                    {availableSizes.length > 0 && (
                                        <button
                                            onClick={() => handleSelectSize(`EU ${recommendedSize.eu}`)}
                                            className="bg-black text-white px-6 py-3 text-sm font-medium hover:bg-cream-800 transition-colors"
                                        >
                                            Select This Size
                                        </button>
                                    )}
                                    
                                    {fitPreference !== 'standard' && (
                                        <p className="text-xs text-cognac-500 mt-4 flex items-center justify-center gap-1">
                                            <AlertCircle className="h-3 w-3" />
                                            Adjusted for {fitPreference} fit preference
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SizeGuide;
