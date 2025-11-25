'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Button variants following Furlan Marri luxury aesthetic
 * - primary: Solid gold background, black text
 * - secondary: Gold outline, transparent background
 * - ghost: Minimal styling with gold underline on hover
 * - dark: Black background, cream text
 */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual style variant */
    variant?: ButtonVariant;
    /** Size preset */
    size?: ButtonSize;
    /** Loading state - shows spinner and disables button */
    isLoading?: boolean;
    /** Icon to display on the left */
    leftIcon?: ReactNode;
    /** Icon to display on the right */
    rightIcon?: ReactNode;
    /** Full width button */
    fullWidth?: boolean;
    /** Children elements */
    children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: `
        bg-gold text-black 
        hover:bg-gold-light hover:shadow-gold
        active:bg-gold-dark
        disabled:bg-gold/50 disabled:text-black/50
    `,
    secondary: `
        bg-transparent border-2 border-gold text-gold
        hover:bg-gold hover:text-black
        active:bg-gold-dark active:border-gold-dark
        disabled:border-gold/40 disabled:text-gold/40
    `,
    ghost: `
        bg-transparent text-black
        hover:text-cognac
        relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold
        hover:after:w-full after:transition-all after:duration-300
        disabled:text-stone-muted disabled:hover:after:w-0
    `,
    dark: `
        bg-black text-cream
        hover:bg-black-rich
        active:bg-black-soft
        disabled:bg-black/50 disabled:text-cream/50
    `,
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-sm gap-3',
};

/**
 * Premium Button Component
 * 
 * @example
 * // Primary button with icon
 * <Button variant="primary" rightIcon={<ArrowRight size={16} />}>
 *   Shop Now
 * </Button>
 * 
 * @example
 * // Loading state
 * <Button isLoading>Processing</Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            isLoading = false,
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

        return (
            <button
                ref={ref}
                disabled={isDisabled}
                className={cn(
                    // Base styles
                    'inline-flex items-center justify-center',
                    'font-sans uppercase tracking-widest font-medium',
                    'transition-all duration-300 ease-luxury',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2',
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
                            size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} 
                            className="animate-spin" 
                        />
                        <span>{children}</span>
                    </>
                ) : (
                    <>
                        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
                        <span>{children}</span>
                        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
export type { ButtonProps, ButtonVariant, ButtonSize };
