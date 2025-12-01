/**
 * Premium UI Component Library
 * Domog Brand - Furlan Marri Inspired Design System
 * 
 * @description
 * A collection of luxury-styled UI components following the Furlan Marri aesthetic:
 * - Rich color palette (deep blacks, warm creams, cognac, burgundy, gold)
 * - Smooth transitions with custom easing (ease-luxury)
 * - Sculptural typography (Playfair Display for headings, Inter for body)
 * - Sophisticated hover states and animations
 * 
 * @example
 * // Import all components
 * import { Button, Input, Badge, Card, Typography, ImageGallery } from '@/components/ui';
 * 
 * // Import specific component
 * import Button from '@/components/ui/Button';
 * 
 * @version 2.0.0
 */

// Typography Component
export { default as Typography } from './Typography';
export type { TypographyProps, TypographyVariant, TypographyColor } from './Typography';

// Button Component
export { default as Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';

// Input Component
export { default as Input } from './Input';
export type { InputProps, TextareaProps, CombinedInputProps } from './Input';

// Badge Component
export { default as Badge } from './Badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './Badge';

// Card Component
export { default as Card } from './Card';
export type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps } from './Card';

// Toast Component & Provider
export { default as ToastProvider, useToast } from './Toast';
export type { Toast, ToastType, ToastContextValue } from './Toast';

// ImageGallery Component
export { default as ImageGallery } from './ImageGallery';
export type { ImageGalleryProps, GalleryImage } from './ImageGallery';
