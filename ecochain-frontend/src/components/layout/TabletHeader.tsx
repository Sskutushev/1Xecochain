// src/components/layout/TabletHeader.tsx
// 
// PURPOSE: Tablet-specific header component with simplified mobile-like layout
// RESPONSIBILITY: Provides header UI for tablet screens (578px-1374px)
// IMPLEMENTS: Mobile-like layout for intermediate screen sizes
// 
// KEY FEATURES:
// - Full width header with simplified layout
// - Fixed height of 40px
// - Elements: Burger menu (left), Logo (center), Create Token button (right)
// - Create token button: 63x30px with white icon
// - Fixed 25px margins on top and sides
// - Burger menu button opens mobile menu

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModalStore } from '@/store/useModalStore';
import MobileMenu from './MobileMenu';

const TabletHeader: React.FC = () => {
  const openModal = useModalStore((state) => state.openCreateTokenModal);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header 
        className="fixed top-[25px] left-1/2 transform -translate-x-1/2 
          w-[calc(100%-50px)] 
          h-[40px] 
          bg-white dark:bg-dark-bgSecondary rounded-8 shadow-header z-50 
          flex items-center px-[25px]"
      >
        {/* Burger Menu - left */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex-shrink-0"
        >
          <img 
            src="/assets/Frame 12.svg" 
            alt="Menu" 
            className="w-6 h-6 text-light-text dark:text-dark-text cursor-pointer" 
          />
        </button>

        {/* Logo - center */}
        <a href="https://x1ecochain.com/" className="absolute left-1/2 transform -translate-x-1/2">
          <img 
            src="/assets/Group 131.svg" 
            alt="EcoChain Logo" 
            className="h-[18px] w-auto max-w-full"
          />
        </a>

        {/* Spacer to push create button to right */}
        <div className="flex-grow" />

        {/* Create Token Button - right */}
        <button
          onClick={openModal}
          className="flex-shrink-0 w-[63px] h-[30px] bg-primary-green dark:bg-white dark:text-black rounded-20 flex items-center justify-center"
        >
          <img 
            src="/assets/Icon (1).svg" 
            alt="Create Token" 
            className="w-4 h-4 brightness-0 dark:brightness-[2.5] invert dark:invert-0"
          />
        </button>
      </header>
      
      {/* Mobile Menu for Tablet */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
};

export default TabletHeader;