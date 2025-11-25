'use client';

import { useState, useCallback, useMemo } from 'react';
import { Gift, Truck, Type, Check, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// Types
// ============================================================================

export interface CustomizationOption {
    id: string;
    label: string;
    description: string;
    price: number;
    icon: typeof Gift;
}

export interface EngravingConfig {
    text: string;
    font: 'classic' | 'modern' | 'script';
    position: 'inside' | 'outside';
}

export interface GiftWrappingConfig {
    style: 'standard' | 'premium' | 'luxury';
    message: string;
    includeCard: boolean;
}

export interface CustomizationState {
    engraving: EngravingConfig | null;
    giftWrapping: GiftWrappingConfig | null;
    expressShipping: boolean;
}

interface ProductCustomizationProps {
    /** Base product price */
    basePrice: number;
    /** Callback when customization changes */
    onChange: (customization: CustomizationState, additionalCost: number) => void;
    /** Initial customization state */
    initialState?: Partial<CustomizationState>;
    /** Class name for styling */
    className?: string;
}

// ============================================================================
// Constants
// ============================================================================

const ENGRAVING_PRICE = 35;
const ENGRAVING_MAX_CHARS = 20;

const GIFT_WRAPPING_PRICES: Record<GiftWrappingConfig['style'], number> = {
    standard: 15,
    premium: 30,
    luxury: 50,
};

const EXPRESS_SHIPPING_PRICE = 45;

const ENGRAVING_FONTS = [
    { id: 'classic', name: 'Classic', sample: 'Aa' },
    { id: 'modern', name: 'Modern', sample: 'Aa' },
    { id: 'script', name: 'Script', sample: 'Aa' },
] as const;

const GIFT_STYLES = [
    { 
        id: 'standard', 
        name: 'Standard Gift Box', 
        description: 'Elegant black box with ribbon',
        price: 15,
    },
    { 
        id: 'premium', 
        name: 'Premium Gift Set', 
        description: 'Leather box with care kit',
        price: 30,
    },
    { 
        id: 'luxury', 
        name: 'Luxury Presentation', 
        description: 'Handcrafted wooden case with brass fittings',
        price: 50,
    },
] as const;

// ============================================================================
// Component
// ============================================================================

export function ProductCustomization({
    basePrice,
    onChange,
    initialState,
    className,
}: ProductCustomizationProps) {
    const [engraving, setEngraving] = useState<EngravingConfig | null>(
        initialState?.engraving ?? null
    );
    const [giftWrapping, setGiftWrapping] = useState<GiftWrappingConfig | null>(
        initialState?.giftWrapping ?? null
    );
    const [expressShipping, setExpressShipping] = useState<boolean>(
        initialState?.expressShipping ?? false
    );
    
    const [showEngraving, setShowEngraving] = useState(!!initialState?.engraving);
    const [showGiftWrapping, setShowGiftWrapping] = useState(!!initialState?.giftWrapping);
    
    // Calculate additional cost
    const additionalCost = useMemo(() => {
        let cost = 0;
        if (engraving) cost += ENGRAVING_PRICE;
        if (giftWrapping) cost += GIFT_WRAPPING_PRICES[giftWrapping.style];
        if (expressShipping) cost += EXPRESS_SHIPPING_PRICE;
        return cost;
    }, [engraving, giftWrapping, expressShipping]);
    
    // Notify parent of changes
    const notifyChange = useCallback(() => {
        onChange({ engraving, giftWrapping, expressShipping }, additionalCost);
    }, [engraving, giftWrapping, expressShipping, additionalCost, onChange]);
    
    // Engraving handlers
    const handleEngravingToggle = useCallback((enabled: boolean) => {
        setShowEngraving(enabled);
        if (enabled) {
            setEngraving({ text: '', font: 'classic', position: 'inside' });
        } else {
            setEngraving(null);
        }
    }, []);
    
    const updateEngraving = useCallback((updates: Partial<EngravingConfig>) => {
        setEngraving((prev) => {
            if (!prev) return null;
            const updated = { ...prev, ...updates };
            return updated;
        });
    }, []);
    
    // Gift wrapping handlers
    const handleGiftWrappingToggle = useCallback((enabled: boolean) => {
        setShowGiftWrapping(enabled);
        if (enabled) {
            setGiftWrapping({ style: 'standard', message: '', includeCard: false });
        } else {
            setGiftWrapping(null);
        }
    }, []);
    
    const updateGiftWrapping = useCallback((updates: Partial<GiftWrappingConfig>) => {
        setGiftWrapping((prev) => {
            if (!prev) return null;
            const updated = { ...prev, ...updates };
            return updated;
        });
    }, []);
    
    // Call notifyChange when state changes
    useMemo(() => {
        notifyChange();
    }, [notifyChange]);
    
    return (
        <div className={cn('space-y-6', className)}>
            {/* Section Header */}
            <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-gold" />
                <h3 className="font-serif text-lg text-black">Personalize Your Order</h3>
            </div>
            
            {/* Engraving Option */}
            <div className="border border-cream-200 bg-white">
                <button
                    onClick={() => handleEngravingToggle(!showEngraving)}
                    className="w-full px-4 py-4 flex items-center justify-between hover:bg-cream-50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "w-5 h-5 border flex items-center justify-center transition-colors",
                            showEngraving ? "bg-black border-black" : "border-cream-300"
                        )}>
                            {showEngraving && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <Type className="h-5 w-5 text-cognac-500" />
                        <div className="text-left">
                            <p className="font-medium text-black">Personalized Engraving</p>
                            <p className="text-sm text-cream-500">Add initials or a short message</p>
                        </div>
                    </div>
                    <span className="text-cognac-600 font-medium">+${ENGRAVING_PRICE}</span>
                </button>
                
                {showEngraving && (
                    <div className="px-4 pb-4 space-y-4 border-t border-cream-100 pt-4">
                        {/* Engraving Text */}
                        <div>
                            <label className="block text-sm text-cream-500 mb-2">
                                Engraving Text ({engraving?.text.length || 0}/{ENGRAVING_MAX_CHARS})
                            </label>
                            <input
                                type="text"
                                value={engraving?.text || ''}
                                onChange={(e) => updateEngraving({ 
                                    text: e.target.value.slice(0, ENGRAVING_MAX_CHARS) 
                                })}
                                placeholder="Enter initials or text"
                                maxLength={ENGRAVING_MAX_CHARS}
                                className="w-full px-4 py-3 border border-cream-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                            />
                        </div>
                        
                        {/* Font Selection */}
                        <div>
                            <label className="block text-sm text-cream-500 mb-2">Font Style</label>
                            <div className="flex gap-2">
                                {ENGRAVING_FONTS.map((font) => (
                                    <button
                                        key={font.id}
                                        onClick={() => updateEngraving({ font: font.id })}
                                        className={cn(
                                            "flex-1 py-3 text-center border transition-colors",
                                            engraving?.font === font.id
                                                ? "bg-black text-white border-black"
                                                : "bg-white text-cream-600 border-cream-200 hover:border-black"
                                        )}
                                    >
                                        <span className={cn(
                                            "text-lg block mb-1",
                                            font.id === 'script' && "font-serif italic",
                                            font.id === 'modern' && "font-sans"
                                        )}>
                                            {font.sample}
                                        </span>
                                        <span className="text-xs">{font.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        {/* Position */}
                        <div>
                            <label className="block text-sm text-cream-500 mb-2">Position</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => updateEngraving({ position: 'inside' })}
                                    className={cn(
                                        "flex-1 py-3 text-sm border transition-colors",
                                        engraving?.position === 'inside'
                                            ? "bg-black text-white border-black"
                                            : "bg-white text-cream-600 border-cream-200 hover:border-black"
                                    )}
                                >
                                    Inside (Hidden)
                                </button>
                                <button
                                    onClick={() => updateEngraving({ position: 'outside' })}
                                    className={cn(
                                        "flex-1 py-3 text-sm border transition-colors",
                                        engraving?.position === 'outside'
                                            ? "bg-black text-white border-black"
                                            : "bg-white text-cream-600 border-cream-200 hover:border-black"
                                    )}
                                >
                                    Outside (Visible)
                                </button>
                            </div>
                        </div>
                        
                        {/* Preview */}
                        {engraving?.text && (
                            <div className="bg-cream-100 p-4 text-center">
                                <span className="text-xs text-cream-500 uppercase tracking-wider block mb-2">
                                    Preview
                                </span>
                                <span className={cn(
                                    "text-2xl text-black",
                                    engraving.font === 'script' && "font-serif italic",
                                    engraving.font === 'modern' && "font-sans tracking-wide"
                                )}>
                                    {engraving.text}
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            {/* Gift Wrapping Option */}
            <div className="border border-cream-200 bg-white">
                <button
                    onClick={() => handleGiftWrappingToggle(!showGiftWrapping)}
                    className="w-full px-4 py-4 flex items-center justify-between hover:bg-cream-50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "w-5 h-5 border flex items-center justify-center transition-colors",
                            showGiftWrapping ? "bg-black border-black" : "border-cream-300"
                        )}>
                            {showGiftWrapping && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <Gift className="h-5 w-5 text-cognac-500" />
                        <div className="text-left">
                            <p className="font-medium text-black">Gift Wrapping</p>
                            <p className="text-sm text-cream-500">Beautifully presented for gifting</p>
                        </div>
                    </div>
                    <span className="text-cognac-600 font-medium">
                        from ${GIFT_WRAPPING_PRICES.standard}
                    </span>
                </button>
                
                {showGiftWrapping && (
                    <div className="px-4 pb-4 space-y-4 border-t border-cream-100 pt-4">
                        {/* Style Selection */}
                        <div className="space-y-2">
                            {GIFT_STYLES.map((style) => (
                                <button
                                    key={style.id}
                                    onClick={() => updateGiftWrapping({ style: style.id })}
                                    className={cn(
                                        "w-full px-4 py-3 flex items-center justify-between border transition-colors text-left",
                                        giftWrapping?.style === style.id
                                            ? "bg-cream-50 border-black"
                                            : "border-cream-200 hover:border-cream-300"
                                    )}
                                >
                                    <div>
                                        <p className="font-medium text-black">{style.name}</p>
                                        <p className="text-sm text-cream-500">{style.description}</p>
                                    </div>
                                    <span className="text-cognac-600 font-medium">+${style.price}</span>
                                </button>
                            ))}
                        </div>
                        
                        {/* Gift Message */}
                        <div>
                            <label className="block text-sm text-cream-500 mb-2">
                                Gift Message (optional)
                            </label>
                            <textarea
                                value={giftWrapping?.message || ''}
                                onChange={(e) => updateGiftWrapping({ message: e.target.value })}
                                placeholder="Write a personal message..."
                                rows={3}
                                maxLength={200}
                                className="w-full px-4 py-3 border border-cream-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold resize-none"
                            />
                        </div>
                        
                        {/* Include Card */}
                        <button
                            onClick={() => updateGiftWrapping({ includeCard: !giftWrapping?.includeCard })}
                            className="flex items-center gap-3"
                        >
                            <div className={cn(
                                "w-5 h-5 border flex items-center justify-center transition-colors",
                                giftWrapping?.includeCard ? "bg-black border-black" : "border-cream-300"
                            )}>
                                {giftWrapping?.includeCard && <Check className="h-3 w-3 text-white" />}
                            </div>
                            <span className="text-sm text-cream-700">
                                Include printed gift card
                            </span>
                        </button>
                    </div>
                )}
            </div>
            
            {/* Express Shipping Option */}
            <div className="border border-cream-200 bg-white">
                <button
                    onClick={() => setExpressShipping(!expressShipping)}
                    className="w-full px-4 py-4 flex items-center justify-between hover:bg-cream-50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "w-5 h-5 border flex items-center justify-center transition-colors",
                            expressShipping ? "bg-black border-black" : "border-cream-300"
                        )}>
                            {expressShipping && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <Truck className="h-5 w-5 text-cognac-500" />
                        <div className="text-left">
                            <p className="font-medium text-black">Express Shipping</p>
                            <p className="text-sm text-cream-500">2-3 business day delivery</p>
                        </div>
                    </div>
                    <span className="text-cognac-600 font-medium">+${EXPRESS_SHIPPING_PRICE}</span>
                </button>
            </div>
            
            {/* Total Additional Cost */}
            {additionalCost > 0 && (
                <div className="bg-cream-100 px-4 py-3 flex items-center justify-between">
                    <span className="text-sm text-cream-600">Customization Total</span>
                    <span className="font-serif text-lg text-black">+${additionalCost}</span>
                </div>
            )}
            
            {/* Price Summary */}
            <div className="pt-4 border-t border-cream-200">
                <div className="flex items-center justify-between">
                    <span className="text-cream-500">Product Total</span>
                    <span className="font-serif text-2xl text-black">
                        ${basePrice + additionalCost}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ProductCustomization;
