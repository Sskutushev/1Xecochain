// src/components/common/Input/Input.tsx

import { forwardRef, useState } from 'react';
import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const containerStyles = clsx(
      'flex items-center',
      'h-[48px] px-3',
      'rounded-20',
      'border transition-all duration-200',
      'bg-white dark:bg-[rgba(255,255,255,0.05)]',
      {
        'border-[rgba(28,68,48,0.1)] dark:border-[rgba(255,255,255,0.1)]':
          !error && !isFocused,
        'border-[#5B9D07] dark:border-[#58FF84] border-2': isFocused && !error,
        'border-[#FF5858] border-2': error,
        'opacity-50 cursor-not-allowed': disabled,
        'w-full': fullWidth,
      }
    );

    const inputStyles = clsx(
      'w-full bg-transparent outline-none',
      'font-sans text-sm',
      'text-light-text dark:text-dark-text',
      'placeholder:text-light-text50 dark:placeholder:text-dark-text50'
    );

    return (
      <div className={clsx('flex flex-col', fullWidth && 'w-full')}>
        {label && (
          <label className="mb-2 text-xs font-normal text-light-text50 dark:text-dark-text50">
            {label}
          </label>
        )}
        <div className={containerStyles}>
          <input
            ref={ref}
            disabled={disabled}
            className={inputStyles}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
        </div>
        {(error || helperText) && (
          <p
            className={clsx(
              'mt-1 text-xs',
              error
                ? 'text-sell-red'
                : 'text-light-text50 dark:text-dark-text50'
            )}
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
