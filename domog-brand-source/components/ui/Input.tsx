'use client';

import React, { useState, forwardRef, TextareaHTMLAttributes, InputHTMLAttributes } from 'react';

interface BaseInputProps {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  className?: string;
}

interface InputProps extends BaseInputProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'text' | 'email' | 'tel' | 'search' | 'number';
}

interface TextareaProps extends BaseInputProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant: 'textarea';
  rows?: number;
}

type CombinedInputProps = InputProps | TextareaProps;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, CombinedInputProps>(
  (props, ref) => {
    const {
      label,
      error,
      success,
      helperText,
      prefixIcon,
      suffixIcon,
      className = '',
      variant = 'text',
      disabled,
      ...restProps
    } = props;

    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(false);
      setHasValue(e.target.value.length > 0);
      if ('onBlur' in restProps && restProps.onBlur) {
        restProps.onBlur(e as any);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setHasValue(e.target.value.length > 0);
      if ('onChange' in restProps && restProps.onChange) {
        restProps.onChange(e as any);
      }
    };

    // Base styles
    const containerClasses = 'relative w-full';

    const inputBaseClasses = `
      w-full px-4 py-3 
      bg-cream-50 
      border-2 rounded-crafted
      font-sans text-base text-charcoal-900
      placeholder-transparent
      transition-all duration-300 ease-elegant
      shadow-inner
      disabled:opacity-50 disabled:cursor-not-allowed
      ${prefixIcon ? 'pl-12' : ''}
      ${suffixIcon ? 'pr-12' : ''}
      ${variant === 'textarea' ? 'resize-y min-h-[120px]' : ''}
    `;

    // State-dependent styles
    const getInputStateClasses = () => {
      if (error) {
        return 'border-crimson-500 focus:border-crimson-600 focus:ring-4 focus:ring-crimson-500/20';
      }
      if (success) {
        return 'border-green-500 focus:border-green-600 focus:ring-4 focus:ring-green-500/20';
      }
      return 'border-warmGray-300 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/20 hover:border-warmGray-400';
    };

    // Floating label classes
    const labelClasses = `
      absolute left-4 transition-all duration-300 ease-elegant
      pointer-events-none
      font-medium
      ${isFocused || hasValue
        ? 'top-0 -translate-y-1/2 text-xs bg-cream-50 px-2'
        : 'top-1/2 -translate-y-1/2 text-base'
      }
      ${error ? 'text-crimson-600' : success ? 'text-green-600' : isFocused ? 'text-gold-600' : 'text-charcoal-600'}
      ${prefixIcon && !isFocused && !hasValue ? 'left-12' : ''}
      ${variant === 'textarea' && !isFocused && !hasValue ? 'top-6' : ''}
    `;

    // Icon container classes
    const iconContainerClasses = 'absolute top-1/2 -translate-y-1/2 text-charcoal-500 transition-colors duration-300';

    // Render search variant with icon
    const renderSearchIcon = () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    );

    // Render validation icons
    const renderValidationIcon = () => {
      if (success) {
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      }
      if (error) {
        return (
          <svg className="w-5 h-5 text-crimson-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      }
      return null;
    };

    // Number variant increment/decrement handlers
    const [numberValue, setNumberValue] = useState<number>(0);

  const handleIncrement = () => {
    if (variant === 'number' && !disabled) {
      const newValue = numberValue + 1;
      setNumberValue(newValue);
      if ('onChange' in restProps && restProps.onChange) {
        const syntheticEvent = {
          target: { value: String(newValue) }
        } as React.ChangeEvent<HTMLInputElement>;
        (restProps as InputHTMLAttributes<HTMLInputElement>).onChange?.(syntheticEvent);
      }
    }
  };

  const handleDecrement = () => {
    if (variant === 'number' && !disabled) {
      const newValue = numberValue - 1;
      setNumberValue(newValue);
      if ('onChange' in restProps && restProps.onChange) {
        const syntheticEvent = {
          target: { value: String(newValue) }
        } as React.ChangeEvent<HTMLInputElement>;
        (restProps as InputHTMLAttributes<HTMLInputElement>).onChange?.(syntheticEvent);
      }
    }
  };    return (
      <div className={containerClasses}>
        {/* Input/Textarea Container */}
        <div className="relative">
          {/* Prefix Icon */}
          {(prefixIcon || variant === 'search') && (
            <div className={`${iconContainerClasses} left-4`}>
              {variant === 'search' ? renderSearchIcon() : prefixIcon}
            </div>
          )}

          {/* Input Field */}
          {variant === 'textarea' ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              className={`${inputBaseClasses} ${getInputStateClasses()} ${className}`}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              disabled={disabled}
              {...(restProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              type={variant === 'search' ? 'text' : variant}
              className={`${inputBaseClasses} ${getInputStateClasses()} ${className}`}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              disabled={disabled}
              value={variant === 'number' ? numberValue : undefined}
              {...(restProps as InputHTMLAttributes<HTMLInputElement>)}
            />
          )}

          {/* Floating Label */}
          {label && (
            <label className={labelClasses}>
              {label}
            </label>
          )}

          {/* Suffix Icon or Validation Icon */}
          {(suffixIcon || success || error) && variant !== 'number' && (
            <div className={`${iconContainerClasses} right-4`}>
              {renderValidationIcon() || suffixIcon}
            </div>
          )}

          {/* Number Variant Controls */}
          {variant === 'number' && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
              <button
                type="button"
                onClick={handleIncrement}
                disabled={disabled}
                className="p-1 text-charcoal-600 hover:text-gold-600 hover:bg-warmGray-100 rounded-sm transition-all duration-200 disabled:opacity-50"
                aria-label="Increment"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleDecrement}
                disabled={disabled}
                className="p-1 text-charcoal-600 hover:text-gold-600 hover:bg-warmGray-100 rounded-sm transition-all duration-200 disabled:opacity-50"
                aria-label="Decrement"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Helper Text or Error Message */}
        {(helperText || error) && (
          <p
            className={`mt-2 text-sm transition-colors duration-300 ${
              error ? 'text-crimson-600' : success ? 'text-green-600' : 'text-charcoal-600'
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
