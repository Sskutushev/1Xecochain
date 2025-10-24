// src/components/common/Switch/Switch.tsx

import { useState, useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

function Switch({ checked: controlledChecked, onChange, disabled = false }: SwitchProps) {
  const [isChecked, setIsChecked] = useState(controlledChecked || false);
  const { setTheme } = useThemeStore();
  
  // Sync internal state with controlled prop
  useEffect(() => {
    if (controlledChecked !== undefined) {
      setIsChecked(controlledChecked);
    }
  }, [controlledChecked]);
  
  // Handler for when switch is clicked
  const toggle = () => {
    if (disabled) return;
    
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    
    // If there's an onChange callback, call it
    if (onChange) {
      onChange(newChecked);
    }
    
    // Update theme in store
    setTheme(newChecked ? 'dark' : 'light');
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      onClick={toggle}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full
        transition-colors focus:outline-none focus:ring-2 focus:ring-primary-green
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isChecked ? 'bg-primary-green' : 'bg-gray-300 dark:bg-dark-inputBg'}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white shadow-lg
          transition-transform duration-200 ease-in-out
          ${isChecked ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );
}

export default Switch;
