// src/components/layout/DesktopHeader.tsx
// 
// PURPOSE: Desktop-specific header component with full navigation and functionality
// RESPONSIBILITY: Provides complete header UI for desktop screens (>1240px)
// IMPLEMENTS: Desktop layout specifications from design system
// 
// KEY FEATURES:
// - Navigation links with active state highlighting
// - Search bar with styling
// - Create token button
// - User profile with dropdown
// - Theme awareness (light/dark)
// - Translation support
// 
// SPECIFICATION COMPLIANCE:
// - Size: 1870px × 70px
// - Position: Fixed, top 25px, horizontally centered
// - Border-radius: 8.32px
// - Colors and styling per theme

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useModalStore } from '@/store/useModalStore';
import { useUserStore } from '@/store/useUserStore';
import HeaderDropdown from './HeaderDropdown';

const DesktopHeader: React.FC = () => {
  const { t } = useTranslation();
  const openModal = useModalStore((state) => state.openCreateTokenModal);
  const user = useUserStore((state) => state.user);
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="fixed top-[25px] left-1/2 transform -translate-x-1/2 w-[calc(100%-50px)] max-w-[1870px] h-[70px] bg-white dark:bg-dark-bgSecondary rounded-8 shadow-header z-100 flex items-center px-[30px] relative">
      {/* Logo */}
      <Link to="/" className="mr-[50px]">
        <img 
          src="/assets/logos/logo-full.svg" 
          alt="EcoChain Logo" 
          className="w-[200px] h-[27px]"
        />
      </Link>

      {/* Navigation */}
      <nav className="flex gap-[50px]">
        <Link 
          to="/" 
          className={`text-base font-semibold ${
            isActive('/') 
              ? 'text-primary-green dark:text-dark-accent border-b-2 border-primary-green dark:border-dark-accent' 
              : 'text-light-text dark:text-dark-text'
          }`}
        >
          {t('header.dashboard')}
        </Link>
        <Link 
          to="/listing" 
          className={`text-base font-semibold ${
            isActive('/listing') 
              ? 'text-primary-green dark:text-dark-accent border-b-2 border-primary-green dark:border-dark-accent' 
              : 'text-light-text dark:text-dark-text'
          }`}
        >
          {t('header.listing')}
        </Link>
        <Link 
          to="/my-tokens" 
          className={`text-base font-semibold ${
            isActive('/my-tokens') 
              ? 'text-primary-green dark:text-dark-accent border-b-2 border-primary-green dark:border-dark-accent' 
              : 'text-light-text dark:text-dark-text'
          }`}
        >
          {t('header.myTokens')}
        </Link>
      </nav>

      {/* Search */}
      <div className="ml-[50px] w-[480px] h-[36px] bg-light-bg dark:bg-dark-inputBg rounded-20 flex items-center px-3">
        <svg className="w-4 h-4 text-primary-green dark:text-dark-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder={t('header.search')}
          className="w-full bg-transparent text-sm text-light-text dark:text-dark-text placeholder:text-light-text50 dark:placeholder:text-dark-text50 outline-none"
        />
      </div>

      {/* Spacer */}
      <div className="ml-auto" />

      {/* Create Token Button */}
      <button
        onClick={openModal}
        className="w-[160px] h-[36px] bg-primary-green rounded-20 flex items-center justify-center gap-1.5 mr-[30px]"
      >
        <span className="text-[12.6px] font-bold text-white">
          {t('header.createToken')}
        </span>
        <svg className="w-[3.5px] h-[8.5px] text-white" fill="none" stroke="currentColor" viewBox="0 0 8 4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l3 3 3-3" />
        </svg>
      </button>

      {/* User Profile */}
      <div 
        className="w-[170px] h-[36px] bg-transparent rounded-20 flex items-center gap-2.5 px-2 hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors cursor-pointer relative"
        onClick={toggleDropdown}
      >
        <div className="flex flex-col">
          <span className="text-[14px] font-bold text-light-text dark:text-dark-text">
            {user?.name || 'Noname'}
          </span>
          <span className="text-[12px] text-light-text dark:text-dark-text opacity-50">
            {user?.address || '0x2...006728'}
          </span>
        </div>
        <img
          src={user?.avatar || '/assets/avatars/avatar-placeholder-36.svg'}
          alt="User Avatar"
          className="w-9 h-9 rounded-full bg-light-avatar"
        />
        <img 
          src="/assets/icons/settings.svg" 
          alt="Settings" 
          className="w-4 h-5 text-light-text dark:text-dark-text"
        />
      </div>
      
      {/* User Dropdown */}
      {isDropdownOpen && (
        <HeaderDropdown 
          isOpen={isDropdownOpen} 
          onClose={() => setIsDropdownOpen(false)} 
        />
      )}
    </header>
  );
};

export default DesktopHeader;