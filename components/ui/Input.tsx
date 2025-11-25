'use client';

import {
    forwardRef,
    InputHTMLAttributes,
    TextareaHTMLAttributes,
    ReactNode,
    useState,
    useId,
} from 'react';
import { cn } from '@/lib/utils';

/**
 * Input component with floating label animation
 * Follows Furlan Marri luxury aesthetic
 */
interface InputBaseProps {
    /** Floating label text */
    label: string;
    /** Error message - shows red styling */
    error?: string;
    /** Success message - shows green styling */
    success?: string;
    /** Helper text below input */
    helperText?: string;
    /** Icon on the left side */
    leftIcon?: ReactNode;
    /** Icon on the right side */
    rightIcon?: ReactNode;
    /** Full width input */
    fullWidth?: boolean;
}

type InputProps = InputBaseProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
    /** Render as textarea */
    as?: 'input';
};

type TextareaProps = InputBaseProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> & {
    /** Render as textarea */
    as: 'textarea';
    /** Number of rows for textarea */
    rows?: number;
};

type CombinedInputProps = InputProps | TextareaProps;

/**
 * Premium Input Component with Floating Label
 * 
 * @example
 * // Basic input
 * <Input label="Email Address" type="email" />
 * 
 * @example
 * // With error state
 * <Input label="Password" type="password" error="Password is required" />
 * 
 * @example
 * // As textarea
 * <Input as="textarea" label="Message" rows={5} />
 */
const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, CombinedInputProps>(
    (props, ref) => {
        const {
            label,
            error,
            success,
            helperText,
            leftIcon,
            rightIcon,
            fullWidth = true,
            className,
            ...rest
        } = props;

        const [isFocused, setIsFocused] = useState(false);
        const [hasValue, setHasValue] = useState(
            Boolean(rest.value || rest.defaultValue)
        );
        const generatedId = useId();
        const inputId = rest.id || generatedId;

        const isLabelFloating = isFocused || hasValue;
        const isTextarea = rest.as === 'textarea';

        const statusColor = error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            : success
            ? 'border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/20'
            : 'border-stone-light focus:border-gold focus:ring-gold/20';

        const labelColor = error
            ? 'text-red-500'
            : success
            ? 'text-emerald-500'
            : isFocused
            ? 'text-gold'
            : 'text-stone-muted';

        const baseInputStyles = cn(
            // Base
            'w-full bg-transparent',
            'border-b-2 transition-all duration-300 ease-luxury',
            'text-black placeholder-transparent',
            'font-sans text-base',
            // Focus state
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            // Padding
            leftIcon ? 'pl-10' : 'pl-0',
            rightIcon ? 'pr-10' : 'pr-0',
            'py-4 pt-6',
            // Status colors
            statusColor,
            // Disabled
            'disabled:bg-cream-warm disabled:cursor-not-allowed disabled:opacity-60'
        );

        // Render as textarea
        if (isTextarea) {
            const { as: _, ...textareaProps } = rest as TextareaProps;
            return (
                <div className={cn('relative', fullWidth && 'w-full', className)}>
                    {leftIcon && (
                        <span className="absolute left-0 top-6 text-stone-muted">
                            {leftIcon}
                        </span>
                    )}
                    <textarea
                        ref={ref as React.Ref<HTMLTextAreaElement>}
                        id={inputId}
                        className={cn(baseInputStyles, 'resize-none min-h-[120px]')}
                        placeholder={label}
                        onFocus={(e) => {
                            setIsFocused(true);
                            textareaProps.onFocus?.(e);
                        }}
                        onBlur={(e) => {
                            setIsFocused(false);
                            setHasValue(Boolean(e.target.value));
                            textareaProps.onBlur?.(e);
                        }}
                        onChange={(e) => {
                            setHasValue(Boolean(e.target.value));
                            textareaProps.onChange?.(e);
                        }}
                        aria-invalid={Boolean(error)}
                        aria-describedby={
                            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
                        }
                        {...textareaProps}
                    />
                    <label
                        htmlFor={inputId}
                        className={cn(
                            'absolute transition-all duration-200 ease-luxury pointer-events-none',
                            leftIcon ? 'left-10' : 'left-0',
                            isLabelFloating ? 'top-1 text-xs uppercase tracking-widest' : 'top-4 text-base',
                            labelColor
                        )}
                    >
                        {label}
                    </label>
                    {rightIcon && (
                        <span className="absolute right-0 top-6 text-stone-muted">
                            {rightIcon}
                        </span>
                    )}
                    {(error || success || helperText) && (
                        <p
                            id={error ? `${inputId}-error` : `${inputId}-helper`}
                            className={cn(
                                'mt-2 text-xs',
                                error && 'text-red-500',
                                success && 'text-emerald-500',
                                !error && !success && 'text-stone-muted'
                            )}
                            role={error ? 'alert' : undefined}
                        >
                            {error || success || helperText}
                        </p>
                    )}
                </div>
            );
        }

        // Render as input
        const { as: _, ...inputProps } = rest as InputProps;
        return (
            <div className={cn('relative', fullWidth && 'w-full', className)}>
                {leftIcon && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-stone-muted">
                        {leftIcon}
                    </span>
                )}
                <input
                    ref={ref as React.Ref<HTMLInputElement>}
                    id={inputId}
                    className={baseInputStyles}
                    placeholder={label}
                    onFocus={(e) => {
                        setIsFocused(true);
                        inputProps.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        setHasValue(Boolean(e.target.value));
                        inputProps.onBlur?.(e);
                    }}
                    onChange={(e) => {
                        setHasValue(Boolean(e.target.value));
                        inputProps.onChange?.(e);
                    }}
                    aria-invalid={Boolean(error)}
                    aria-describedby={
                        error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
                    }
                    {...inputProps}
                />
                <label
                    htmlFor={inputId}
                    className={cn(
                        'absolute transition-all duration-200 ease-luxury pointer-events-none',
                        leftIcon ? 'left-10' : 'left-0',
                        isLabelFloating ? 'top-1 text-xs uppercase tracking-widest' : 'top-4 text-base',
                        labelColor
                    )}
                >
                    {label}
                </label>
                {rightIcon && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-muted">
                        {rightIcon}
                    </span>
                )}
                {(error || success || helperText) && (
                    <p
                        id={error ? `${inputId}-error` : `${inputId}-helper`}
                        className={cn(
                            'mt-2 text-xs',
                            error && 'text-red-500',
                            success && 'text-emerald-500',
                            !error && !success && 'text-stone-muted'
                        )}
                        role={error ? 'alert' : undefined}
                    >
                        {error || success || helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
export type { InputProps, TextareaProps, CombinedInputProps };
