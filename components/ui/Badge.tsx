import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Badge variants following Furlan Marri luxury aesthetic
 * - gold: Solid gold background - for premium/featured items
 * - burgundy: Solid burgundy background - for sale/special items
 * - dark: Black background, cream text - for neutral states
 * - cream: Cream background - for subtle indicators
 * - outline: Transparent with gold border - for minimal look
 */
type BadgeVariant = 'gold' | 'burgundy' | 'dark' | 'cream' | 'outline';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
    /** Visual style variant */
    variant?: BadgeVariant;
    /** Size preset */
    size?: BadgeSize;
    /** Children content (optional when dot is true) */
    children?: ReactNode;
    /** Additional class names */
    className?: string;
    /** Dot indicator instead of text */
    dot?: boolean;
    /** Pulsing animation for attention */
    pulse?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
    gold: 'bg-gold text-black',
    burgundy: 'bg-burgundy text-cream',
    dark: 'bg-black text-cream',
    cream: 'bg-cream-warm text-black border border-cream-dark',
    outline: 'bg-transparent border border-gold text-gold',
};

const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
};

/**
 * Premium Badge Component
 * 
 * @example
 * // Gold badge for new items
 * <Badge variant="gold">New</Badge>
 * 
 * @example
 * // Sale badge
 * <Badge variant="burgundy">-20%</Badge>
 * 
 * @example
 * // With pulse animation
 * <Badge variant="gold" pulse>Limited</Badge>
 */
export default function Badge({
    variant = 'gold',
    size = 'md',
    children,
    className,
    dot = false,
    pulse = false,
}: BadgeProps) {
    if (dot) {
        return (
            <span
                className={cn(
                    'inline-flex items-center justify-center',
                    'w-2 h-2 rounded-full',
                    variant === 'gold' && 'bg-gold',
                    variant === 'burgundy' && 'bg-burgundy',
                    variant === 'dark' && 'bg-black',
                    variant === 'cream' && 'bg-cream-warm',
                    variant === 'outline' && 'border-2 border-gold',
                    pulse && 'animate-pulse',
                    className
                )}
                aria-hidden="true"
            />
        );
    }

    return (
        <span
            className={cn(
                // Base
                'inline-flex items-center justify-center',
                'font-sans uppercase tracking-widest font-medium',
                'transition-all duration-200',
                // Variants & sizes
                variantStyles[variant],
                sizeStyles[size],
                // Pulse animation
                pulse && 'animate-pulse',
                className
            )}
        >
            {children}
        </span>
    );
}

export type { BadgeProps, BadgeVariant, BadgeSize };
