'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-light tracking-wider transition-opacity duration-300 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none';
    
    const variants = {
      primary: 'bg-crimson-800 text-warm-50 border border-crimson-800 hover:opacity-90',
      secondary: 'bg-gold-700 text-warm-50 border border-gold-700 hover:opacity-90',
      outline: 'border border-warm-800 text-warm-800 bg-transparent hover:opacity-60',
    };

    const sizes = {
      sm: 'px-6 py-2 text-xs rounded-sm',
      md: 'px-8 py-3 text-sm rounded-sm',
      lg: 'px-12 py-4 text-base rounded-sm',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <span className="uppercase">{children}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
