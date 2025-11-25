import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * Card component with compound pattern for flexible layout
 * Follows Furlan Marri luxury aesthetic
 */
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    /** Visual style variant */
    variant?: 'default' | 'elevated' | 'bordered' | 'dark';
    /** Padding size */
    padding?: 'none' | 'sm' | 'md' | 'lg';
    /** Hover effect */
    hover?: boolean;
    /** Children elements */
    children: ReactNode;
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    /** Add bottom border */
    bordered?: boolean;
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    /** Add top border */
    bordered?: boolean;
    /** Flex alignment */
    align?: 'left' | 'center' | 'right' | 'between';
}

const variantStyles = {
    default: 'bg-white',
    elevated: 'bg-white shadow-luxury',
    bordered: 'bg-white border border-cream-dark',
    dark: 'bg-black text-cream',
};

const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
};

/**
 * Premium Card Component
 * 
 * @example
 * // Basic card with header and body
 * <Card variant="elevated">
 *   <Card.Header>
 *     <h3>Card Title</h3>
 *   </Card.Header>
 *   <Card.Body>
 *     <p>Card content goes here.</p>
 *   </Card.Body>
 *   <Card.Footer align="right">
 *     <Button variant="primary">Action</Button>
 *   </Card.Footer>
 * </Card>
 */
function Card({
    variant = 'default',
    padding = 'none',
    hover = false,
    className,
    children,
    ...props
}: CardProps) {
    return (
        <div
            className={cn(
                // Base
                'overflow-hidden',
                'transition-all duration-300 ease-luxury',
                // Variants
                variantStyles[variant],
                paddingStyles[padding],
                // Hover
                hover && [
                    'hover:shadow-luxury-lg',
                    'hover:-translate-y-1',
                    'cursor-pointer',
                ],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

/**
 * Card Header
 */
function CardHeader({
    bordered = false,
    className,
    children,
    ...props
}: CardHeaderProps) {
    return (
        <div
            className={cn(
                'p-6',
                bordered && 'border-b border-cream-dark',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

/**
 * Card Body
 */
function CardBody({
    className,
    children,
    ...props
}: CardBodyProps) {
    return (
        <div
            className={cn('p-6', className)}
            {...props}
        >
            {children}
        </div>
    );
}

/**
 * Card Footer
 */
function CardFooter({
    bordered = false,
    align = 'right',
    className,
    children,
    ...props
}: CardFooterProps) {
    const alignStyles = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
        between: 'justify-between',
    };

    return (
        <div
            className={cn(
                'p-6 flex items-center gap-4',
                bordered && 'border-t border-cream-dark',
                alignStyles[align],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

// Compound component pattern
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
export type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps };
