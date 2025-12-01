'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Button Variants - Domog Brand Design System
 * 
 * @variant primary - Solid charcoal background, cream text. Main CTAs.
 * @variant secondary - Gold background, charcoal text. Highlighted actions.
 * @variant outline - Transparent with charcoal border. Secondary CTAs.
 * @variant ghost - Minimal with subtle hover. Tertiary actions.
 * @variant link - Underline style with arrow support. In-content navigation.
 * @variant dark - Cream border on dark backgrounds. Inverse sections.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'dark';

/**
 * Button Sizes
 * 
 * @size sm - Compact utility buttons (filters, toggles)
 * @size md - Standard buttons
 * @size lg - Prominent section CTAs
 * @size xl - Hero-level primary CTAs
 */
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual style variant */
    variant?: ButtonVariant;
    /** Size preset */
    size?: ButtonSize;
    /** Loading state - shows spinner and disables button */
    isLoading?: boolean;
    /** Icon to display (left position by default) */
    icon?: ReactNode;
    /** Icon position */
    iconPosition?: 'left' | 'right';
    /** Legacy: Icon to display on the left */
    leftIcon?: ReactNode;
    /** Legacy: Icon to display on the right */
    rightIcon?: ReactNode;
    /** Full width button */
    fullWidth?: boolean;
    /** Children elements */
    children: ReactNode;
}

/**
 * Variant styles following luxury brand aesthetics (Hermès, Brunello Cucinelli)
 */
const variantStyles: Record<ButtonVariant, string> = {
    primary: `
        bg-charcoal-900 text-cream-50
        hover:bg-charcoal-800
        active:bg-black
        focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-2
        disabled:bg-charcoal-900/50 disabled:text-cream-50/50
    `,
    secondary: `
        bg-gold-600 text-charcoal-900
        hover:bg-gold-500
        active:bg-gold-700
        focus-visible:ring-2 focus-visible:ring-charcoal-900 focus-visible:ring-offset-2
        disabled:bg-gold-600/50 disabled:text-charcoal-900/50
    `,
    outline: `
        bg-transparent text-charcoal-900
        border-2 border-charcoal-900
        hover:bg-charcoal-900 hover:text-cream-50
        active:bg-charcoal-800 active:text-cream-50
        focus-visible:ring-2 focus-visible:ring-charcoal-900 focus-visible:ring-offset-2
        disabled:border-charcoal-900/40 disabled:text-charcoal-900/40
    `,
    ghost: `
        bg-transparent text-charcoal-900
        hover:bg-charcoal-900/5
        active:bg-charcoal-900/10
        focus-visible:ring-2 focus-visible:ring-charcoal-900 focus-visible:ring-offset-2
        disabled:text-charcoal-900/40 disabled:hover:bg-transparent
    `,
    link: `
        bg-transparent text-charcoal-900
        border-b-2 border-charcoal-900
        hover:text-cognac-accessible hover:border-cognac-accessible
        focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-2
        disabled:text-charcoal-900/40 disabled:border-charcoal-900/40
        !px-0 !py-0 pb-1
    `,
    dark: `
        bg-transparent text-cream-50
        border-2 border-cream-50
        hover:bg-cream-50 hover:text-charcoal-900
        active:bg-cream-100 active:text-charcoal-900
        focus-visible:ring-2 focus-visible:ring-cream-50 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900
        disabled:border-cream-50/40 disabled:text-cream-50/40
    `,
};

/**
 * Size styles with optical adjustments for each size
 */
const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-label-md gap-1.5',
    md: 'px-6 py-3 text-label-lg gap-2',
    lg: 'px-10 py-4 text-label-lg gap-2.5',
    xl: 'px-12 py-5 text-label-lg gap-3',
};

/**
 * Icon size mapping
 */
const iconSizes: Record<ButtonSize, number> = {
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
};

/**
 * Premium Button Component
 * 
 * A versatile button component following the Domog Brand design system.
 * Supports multiple variants for different hierarchy levels and use cases.
 * 
 * @example
 * // Primary CTA (one per viewport)
 * <Button variant="primary" size="lg">
 *   Shop Collection
 * </Button>
 * 
 * @example
 * // Secondary CTA with icon
 * <Button variant="outline" size="lg" icon={<ArrowRight />} iconPosition="right">
 *   View All Products
 * </Button>
 * 
 * @example
 * // Link style for in-content navigation
 * <Button variant="link" size="md" icon={<ArrowRight />} iconPosition="right">
 *   View the Craftsmanship
 * </Button>
 * 
 * @example
 * // Loading state
 * <Button variant="primary" isLoading>
 *   Processing
 * </Button>
 * 
 * @example
 * // Dark background variant
 * <Button variant="dark" size="lg">
 *   Discover Our Heritage
 * </Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            isLoading = false,
            icon,
            iconPosition = 'right',
            leftIcon,
            rightIcon,
            fullWidth = false,
            disabled,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const isDisabled = disabled || isLoading;
        const iconSize = iconSizes[size];
        
        // Resolve icon position (support both new and legacy API)
        const resolvedLeftIcon = leftIcon || (iconPosition === 'left' ? icon : null);
        const resolvedRightIcon = rightIcon || (iconPosition === 'right' ? icon : null);

        return (
            <button
                ref={ref}
                disabled={isDisabled}
                className={cn(
                    // Base styles
                    'inline-flex items-center justify-center',
                    'font-sans uppercase font-medium',
                    'transition-all duration-300 ease-luxury',
                    'focus-visible:outline-none',
                    'disabled:cursor-not-allowed',
                    // Variant & size
                    variantStyles[variant],
                    sizeStyles[size],
                    // Full width
                    fullWidth && 'w-full',
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <>
                        <Loader2 
                            size={iconSize} 
                            className="animate-spin" 
                        />
                        <span>{children}</span>
                    </>
                ) : (
                    <>
                        {resolvedLeftIcon && (
                            <span className="flex-shrink-0">{resolvedLeftIcon}</span>
                        )}
                        <span>{children}</span>
                        {resolvedRightIcon && (
                            <span className="flex-shrink-0">{resolvedRightIcon}</span>
                        )}
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;

