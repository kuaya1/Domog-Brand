'use client';

import { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Typography Variants
 * 
 * Display variants: Large headlines with tight line-height and negative letter-spacing
 * Heading variants: Section titles with balanced proportions
 * Body variants: Readable paragraph text with generous line-height
 * Label variants: UI elements with wide letter-spacing for legibility at small sizes
 */
export type TypographyVariant = 
    | 'display-xl' | 'display-lg' | 'display-md' | 'display-sm'
    | 'heading-xl' | 'heading-lg' | 'heading-md'
    | 'body-lg' | 'body-md' | 'body-sm'
    | 'label-lg' | 'label-md' | 'label-sm';

/**
 * Typography Colors
 * 
 * primary: Main text color (charcoal-900)
 * secondary: Muted text for supporting content (stone-warm)
 * muted: Subtle text for captions and metadata (warm-500)
 * accent: Brand accent color (cognac or gold)
 * inverse: Light text on dark backgrounds (cream-50)
 * inherit: Inherits color from parent
 */
export type TypographyColor = 
    | 'primary' | 'secondary' | 'muted' | 'accent' | 'gold' | 'inverse' | 'inherit';

/**
 * Semantic HTML element mapping based on variant
 */
const defaultElements: Record<TypographyVariant, ElementType> = {
    'display-xl': 'h1',
    'display-lg': 'h1',
    'display-md': 'h2',
    'display-sm': 'h2',
    'heading-xl': 'h3',
    'heading-lg': 'h4',
    'heading-md': 'h5',
    'body-lg': 'p',
    'body-md': 'p',
    'body-sm': 'p',
    'label-lg': 'span',
    'label-md': 'span',
    'label-sm': 'span',
};

/**
 * Typography variant styles
 */
const variantStyles: Record<TypographyVariant, string> = {
    'display-xl': 'text-display-xl font-serif font-medium',
    'display-lg': 'text-display-lg font-serif font-medium',
    'display-md': 'text-display-md font-serif font-medium',
    'display-sm': 'text-display-sm font-serif font-medium',
    'heading-xl': 'text-heading-xl font-serif font-medium',
    'heading-lg': 'text-heading-lg font-serif font-medium',
    'heading-md': 'text-heading-md font-serif font-medium',
    'body-lg': 'text-body-lg font-sans',
    'body-md': 'text-body-md font-sans',
    'body-sm': 'text-body-sm font-sans',
    'label-lg': 'text-label-lg font-sans uppercase font-medium',
    'label-md': 'text-label-md font-sans uppercase font-medium',
    'label-sm': 'text-label-sm font-sans uppercase font-medium',
};

/**
 * Typography color styles
 */
const colorStyles: Record<TypographyColor, string> = {
    primary: 'text-charcoal-900',
    secondary: 'text-stone-warm',
    muted: 'text-warm-500',
    accent: 'text-cognac-accessible',
    gold: 'text-gold-text-accessible',
    inverse: 'text-cream-50',
    inherit: 'text-inherit',
};

/**
 * Props interface with polymorphic "as" support
 */
export interface TypographyProps<T extends ElementType = 'span'> {
    /** Typography variant determining size, weight, and line-height */
    variant: TypographyVariant;
    /** Override the semantic HTML element */
    as?: T;
    /** Use serif font family (default for display/heading, sans for body/label) */
    serif?: boolean;
    /** Color variant */
    color?: TypographyColor;
    /** Apply text balance for better headline wrapping */
    balance?: boolean;
    /** Additional className */
    className?: string;
    /** Content */
    children: ReactNode;
}

/**
 * Typography Component
 * 
 * A polymorphic typography component that provides consistent text styling
 * across the Domog Brand design system. Supports all semantic HTML elements
 * and automatically applies appropriate styles based on variant.
 * 
 * @example
 * // Hero headline
 * <Typography variant="display-lg" color="primary">
 *   Legacy Carved by Hand
 * </Typography>
 * 
 * @example
 * // Section title with custom element
 * <Typography variant="display-sm" as="h2" color="primary">
 *   Featured Masterpieces
 * </Typography>
 * 
 * @example
 * // Body text
 * <Typography variant="body-md" color="secondary">
 *   Each boot tells a story of Mongolian heritage...
 * </Typography>
 * 
 * @example
 * // Label with gold color
 * <Typography variant="label-md" color="gold">
 *   Artisan Collection
 * </Typography>
 */
function Typography<T extends ElementType = 'span'>({
    variant,
    as,
    serif,
    color = 'inherit',
    balance = false,
    className,
    children,
    ...props
}: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>) {
    const Component = as || defaultElements[variant];
    
    // Determine font family based on variant or explicit prop
    const isSerifVariant = variant.startsWith('display') || variant.startsWith('heading');
    
    return (
        <Component
            className={cn(
                variantStyles[variant],
                colorStyles[color],
                // Override font family if explicitly set
                serif === true && !isSerifVariant && 'font-serif',
                serif === false && isSerifVariant && 'font-sans',
                // Text balance for headlines
                balance && 'text-balance',
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
}

export default Typography;
