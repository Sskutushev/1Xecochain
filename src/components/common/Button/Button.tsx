// src/components/common/Button/Button.tsx

import { forwardRef } from 'react';
import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'sell';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

    const variantStyles = {
      primary:
        'bg-primary-green text-white hover:bg-[#4a7a06] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(91,157,7,0.3)]',
      secondary:
        'bg-white dark:bg-dark-bgSecondary text-light-text dark:text-dark-text border border-light-text dark:border-dark-text hover:bg-light-bg dark:hover:bg-dark-bg',
      outline:
        'bg-transparent border-2 border-primary-green dark:border-white text-primary-green dark:text-white hover:bg-[rgba(91,157,7,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)]',
      sell: 'bg-sell-red text-white hover:bg-sell-hover hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,88,88,0.3)]',
    };

    const sizeStyles = {
      sm: 'h-[30px] px-3 text-xs rounded-10',
      md: 'h-[44px] px-4 text-sm rounded-20',
      lg: 'h-[50px] px-6 text-sm rounded-30',
    };

    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyles,
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
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
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
