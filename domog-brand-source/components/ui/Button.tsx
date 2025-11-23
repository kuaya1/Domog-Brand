import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-medium tracking-wide
      rounded-crafted
      transition-all duration-300 ease-elegant
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
      hover:scale-[1.02] active:scale-[0.98]
    `;

    // Variant styles
    const variantStyles = {
      primary: `
        bg-gradient-crimson text-white
        shadow-md hover:shadow-lg
        focus:ring-crimson-500
        hover:brightness-110
      `,
      secondary: `
        bg-gradient-gold text-charcoal-900
        shadow-md hover:shadow-gold
        focus:ring-gold-500
        hover:brightness-110
      `,
      outline: `
        bg-transparent border-2 border-crimson-600
        text-crimson-600 hover:bg-crimson-50
        shadow-sm hover:shadow-md hover:border-crimson-700
        focus:ring-crimson-500
      `,
      ghost: `
        bg-transparent text-charcoal-700
        hover:bg-warmGray-100 hover:text-crimson-600
        focus:ring-warmGray-300
      `,
    };

    // Size styles
    const sizeStyles = {
      sm: 'px-4 py-2 text-sm min-h-[2.25rem]',
      md: 'px-6 py-3 text-base min-h-[2.75rem]',
      lg: 'px-8 py-4 text-lg min-h-[3.25rem]',
      xl: 'px-10 py-5 text-xl min-h-[3.75rem]',
    };

    // Full width
    const widthStyle = fullWidth ? 'w-full' : '';

    // Loading spinner component
    const LoadingSpinner = () => (
      <svg
        className="animate-spin h-5 w-5"
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
    );

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${widthStyle}
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <>
            <LoadingSpinner />
            <span>Loading...</span>
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
