// src/components/layout/MobileHeader.tsx
// 
// PURPOSE: Mobile-specific header component for smaller screens
// RESPONSIBILITY: Provides header UI for mobile screens (<1240px)
// IMPLEMENTS: Mobile layout specifications from design system
// 
// KEY FEATURES:
// - Burger menu for navigation
// - Centered logo
// - Create token button (icon only)
// - Responsive design
// 
// SPECIFICATION COMPLIANCE:
// - Size: 350px × 36px (max width)
// - Position: Fixed, top 25px, horizontally centered
// - Simplified UI for mobile

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModalStore } from '@/store/useModalStore';
import MobileMenu from './MobileMenu';

const MobileHeader: React.FC = () => {
  const openModal = useModalStore((state) => state.openCreateTokenModal);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-[25px] left-1/2 transform -translate-x-1/2 w-[calc(100%-50px)] max-w-[350px] h-[36px] bg-white dark:bg-dark-bgSecondary rounded-8 shadow-header z-100 flex items-center justify-between px-2">
        {/* Burger Menu */}
        <img 
          src="/assets/icons/menu.svg" 
          alt="Menu" 
          className="w-6 h-6 text-light-text dark:text-dark-text cursor-pointer" 
          onClick={() => setIsMobileMenuOpen(true)}
        />
        
        {/* Logo */}
        <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
          <img 
            src="/assets/logos/logo-mobile.svg" 
            alt="EcoChain Logo" 
            className="w-[120px] h-[18px]"
          />
        </Link>

        {/* Create Token Button */}
        <button
          onClick={openModal}
          className="w-[63px] h-[30px] bg-primary-green rounded-20 flex items-center justify-center"
        >
          <img 
            src="/assets/icons/arrow-right.svg" 
            alt="Create Token" 
            className="w-3 h-1.5 text-white" 
          />
        </button>
      </header>
      
      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
};

export default MobileHeader;