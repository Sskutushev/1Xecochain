// src/components/common/Modal/Modal.tsx

import { useEffect } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useKeyPress } from '@/hooks/useKeyPress';
import type { WithChildren } from '@/types/common';

interface ModalProps extends WithChildren {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  showCloseButton?: boolean;
}

function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  showCloseButton = true,
  children,
}: ModalProps) {
  const modalRef = useClickOutside<HTMLDivElement>(onClose);
  useKeyPress('Escape', onClose);

  // Блокировка скролла body при открытии modal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-[522px]',
    lg: 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center animate-fade-in">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[rgba(255,255,255,0.2)] dark:bg-[rgba(0,0,0,0.4)] backdrop-blur-[30.3px]"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        className={clsx(
          'relative z-[1000] w-[calc(100%-40px)]',
          sizeStyles[size],
          'bg-white dark:bg-[rgba(217,217,217,0.05)]',
          'rounded-20 shadow-modal',
          'dark:backdrop-blur-[73.2px]',
          'p-10 mobile:p-[30px]',
          'animate-scale-in'
        )}
      >
        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-light-text dark:text-dark-text opacity-50 hover:opacity-100 transition-opacity" />
          </button>
        )}

        {/* Title */}
        {title && (
          <h2
            id="modal-title"
            className="text-2xl font-semibold text-center mb-20 mobile:mb-[50px] text-primary-green dark:text-white"
          >
            {title}
          </h2>
        )}

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;