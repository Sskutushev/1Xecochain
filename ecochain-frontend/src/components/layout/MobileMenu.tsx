// src/components/layout/MobileMenu.tsx
// 
// PURPOSE: Mobile navigation drawer for smaller screens
// RESPONSIBILITY: Provides navigation and user options in a slide-out drawer
// IMPLEMENTS: Mobile menu specifications from design system
// 
// KEY FEATURES:
// - Slide-in animation from left
// - Navigation links
// - User profile section
// - Theme toggle
// - Search functionality
// - Overlay backdrop
// 
// SPECIFICATION COMPLIANCE:
// - Size: 280px × 100vh
// - Position: Fixed, left 0
// - Backdrop blur effect
// - Close on overlay click

import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '@/store/useThemeStore';
import { useUserStore } from '@/store/useUserStore';
import { useLanguageStore } from '@/store/useLanguageStore';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useKeyPress } from '@/hooks/useKeyPress';
import Switch from '@/components/common/Switch/Switch';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useThemeStore();
  const { user, clearUser } = useUserStore();
  const { locale, setLocale } = useLanguageStore();
  const location = useLocation();
  
  const menuRef = useClickOutside<HTMLDivElement>(onClose);
  useKeyPress('Escape', onClose);

  // Handle body scroll when menu is open
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

  const changeLanguage = (lang: 'en' | 'ru') => {
    i18n.changeLanguage(lang);
    setLocale(lang);
  };

  const handleLogout = () => {
    clearUser();
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-998 bg-[rgba(0,0,0,0.3)] backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Mobile Menu Drawer */}
      <div 
        ref={menuRef}
        className="fixed top-0 left-0 z-999 w-[280px] max-w-[80vw] h-full bg-white dark:bg-dark-bgSecondary animate-slide-in-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between h-15 border-b border-light-inputBorder dark:border-dark-inputBorder mb-7.5 px-5">
          <Link to="/">
            <img 
              src="/assets/logos/logo-mobile.svg" 
              alt="EcoChain Logo" 
              className="w-[140px] h-[20px]"
            />
          </Link>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:rotate-90 transition-transform"
          >
            <img 
              src="/assets/icons/close.svg" 
              alt="Close" 
              className="w-6 h-6 text-light-text dark:text-dark-text" 
            />
          </button>
        </div>
        
        {/* Search */}
        <div className="w-[240px] h-[36px] bg-light-bg dark:bg-dark-inputBg rounded-20 flex items-center px-3 mx-5 mb-7.5">
          <svg className="w-4 h-4 text-primary-green dark:text-dark-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder={t('header.search')}
            className="w-full bg-transparent text-sm text-light-text dark:text-dark-text placeholder:text-light-text50 dark:placeholder:text-dark-text50 outline-none"
          />
        </div>
        
        {/* Navigation Links */}
        <div className="flex flex-col px-5 mb-7.5">
          <Link 
            to="/" 
            className={`h-11 w-full flex items-center px-3 rounded-2 border-l-0.75 ${
              location.pathname === '/' 
                ? 'border-l-primary-green dark:border-l-dark-accent bg-[rgba(91,157,7,0.05)]' 
                : 'border-l-transparent hover:bg-light-bg dark:hover:bg-[rgba(255,255,255,0.05)]'
            }`}
            onClick={onClose}
          >
            <span className="text-lg font-semibold text-light-text dark:text-dark-text">
              {t('header.dashboard')}
            </span>
          </Link>
          <Link 
            to="/listing" 
            className={`h-11 w-full flex items-center px-3 rounded-2 border-l-0.75 ${
              location.pathname === '/listing' 
                ? 'border-l-primary-green dark:border-l-dark-accent bg-[rgba(91,157,7,0.05)]' 
                : 'border-l-transparent hover:bg-light-bg dark:hover:bg-[rgba(255,255,255,0.05)]'
            }`}
            onClick={onClose}
          >
            <span className="text-lg font-semibold text-light-text dark:text-dark-text">
              {t('header.listing')}
            </span>
          </Link>
          <Link 
            to="/my-tokens" 
            className={`h-11 w-full flex items-center px-3 rounded-2 border-l-0.75 ${
              location.pathname === '/my-tokens' 
                ? 'border-l-primary-green dark:border-l-dark-accent bg-[rgba(91,157,7,0.05)]' 
                : 'border-l-transparent hover:bg-light-bg dark:hover:bg-[rgba(255,255,255,0.05)]'
            }`}
            onClick={onClose}
          >
            <span className="text-lg font-semibold text-light-text dark:text-dark-text">
              {t('header.myTokens')}
            </span>
          </Link>
        </div>
        
        {/* Divider */}
        <div className="h-px w-full bg-light-inputBorder dark:bg-dark-inputBorder mx-5 mb-7.5" />
        
        {/* User Profile Section */}
        <div className="flex flex-col items-center gap-3 px-5 mb-7.5">
          <img
            src={user?.avatar || '/assets/avatars/avatar-placeholder-36.svg'}
            alt="User Avatar"
            className="w-12.5 h-12.5 rounded-full bg-light-avatar"
          />
          <div className="text-center">
            <div className="text-lg font-bold text-light-text dark:text-dark-text">
              {user?.name || 'Noname'}
            </div>
            <div className="text-sm text-light-text dark:text-dark-text opacity-50">
              {user?.address || '0x2...006728'}
            </div>
          </div>
        </div>
        
        {/* User Options */}
        <div className="flex flex-col px-5">
          {/* Language Selection */}
          <div className="h-11 flex items-center justify-between px-3 cursor-pointer">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/icons/language.svg" 
                alt="Language" 
                className="w-5 h-5 text-light-text dark:text-dark-text"
              />
              <span className="text-sm text-light-text dark:text-dark-text">
                {t('dropdown.language')}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => changeLanguage('en')}
                className={`px-2 py-1 rounded flex items-center gap-1 ${
                  locale === 'en' 
                    ? 'text-primary-green dark:text-dark-accent' 
                    : 'text-light-text dark:text-dark-text'
                }`}
              >
                <img 
                  src="/assets/icons/flag-en.svg" 
                  alt="English Flag" 
                  className="w-4 h-4"
                />
                EN
              </button>
              <button
                onClick={() => changeLanguage('ru')}
                className={`px-2 py-1 rounded flex items-center gap-1 ${
                  locale === 'ru' 
                    ? 'text-primary-green dark:text-dark-accent' 
                    : 'text-light-text dark:text-dark-text'
                }`}
              >
                <img 
                  src="/assets/icons/flag-ru.svg" 
                  alt="Russian Flag" 
                  className="w-4 h-4"
                />
                RU
              </button>
            </div>
          </div>
          
          {/* Theme Toggle */}
          <div className="h-11 flex items-center justify-between px-3">
            <div className="flex items-center gap-3">
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-light-text dark:text-dark-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-light-text dark:text-dark-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
              <span className="text-sm text-light-text dark:text-dark-text">
                {t('dropdown.theme')}
              </span>
            </div>
            <Switch 
              checked={theme === 'dark'} 
              onChange={toggleTheme}
            />
          </div>
          
          {/* Balance */}
          <div className="h-11 flex items-center px-3">
            <div className="flex items-center gap-3 flex-1">
              <svg className="w-5 h-5 text-light-text dark:text-dark-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span className="text-sm text-light-text dark:text-dark-text">
                {t('dropdown.balance')}
              </span>
            </div>
            <span className="text-sm font-bold text-primary-green dark:text-dark-accent">
              {user?.balance || '1,234.56 USDT'}
            </span>
          </div>
          
          {/* Logout */}
          <div 
            className="h-11 flex items-center gap-3 px-3 cursor-pointer hover:bg-[rgba(255,88,88,0.1)] transition-colors"
            onClick={handleLogout}
          >
            <svg className="w-5 h-5 text-sell-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-sm text-sell-red">
              {t('dropdown.logout')}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;