// src/components/layout/HeaderDropdown.tsx
// 
// PURPOSE: User profile dropdown menu in header
// RESPONSIBILITY: Provides user settings, language selection, theme toggle, and logout
// IMPLEMENTS: Dropdown menu specifications from design system
// 
// KEY FEATURES:
// - Profile settings option
// - Language selection with flag icons
// - Theme toggle switch
// - Balance display
// - Logout functionality
// - Click outside to close
// - Proper z-index layering

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '@/store/useThemeStore';
import { useUserStore } from '@/store/useUserStore';
import { useLanguageStore } from '@/store/useLanguageStore';
import Switch from '@/components/common/Switch/Switch';
import { useClickOutside } from '@/hooks/useClickOutside';

interface HeaderDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useThemeStore();
  const { user, clearUser } = useUserStore();
  const { locale, setLocale } = useLanguageStore();
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  
  const dropdownRef = useClickOutside<HTMLDivElement>(onClose);

  if (!isOpen) return null;

  const changeLanguage = (lang: 'en' | 'ru') => {
    i18n.changeLanguage(lang);
    setLocale(lang);
    setShowLanguageOptions(false);
  };

  const handleLogout = () => {
    clearUser();
    onClose();
  };

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-[55px] right-0 w-[250px] bg-white dark:bg-dark-bgSecondary rounded-10 shadow-dropdown dark:backdrop-blur-[30.3px] py-3 z-[101]"
    >
      {/* Profile Settings */}
      <div className="h-11 flex items-center gap-3 px-4 cursor-pointer hover:bg-light-bg dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors">
        <img 
          src="/assets/icons/profile-settings.svg" 
          alt="Profile Settings" 
          className="w-5 h-5 text-light-text dark:text-dark-text"
        />
        <span className="text-sm text-light-text dark:text-dark-text">
          {t('dropdown.profile')}
        </span>
      </div>
      
      {/* Language Selection */}
      <div 
        className="h-11 flex items-center justify-between px-4 cursor-pointer hover:bg-light-bg dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors relative"
        onClick={() => setShowLanguageOptions(!showLanguageOptions)}
      >
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
        <svg 
          className={`w-3 h-3 text-light-text dark:text-dark-text transform transition-transform ${showLanguageOptions ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 16 16"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7l3 3 3-3" />
        </svg>
        
        {/* Language Submenu */}
        {showLanguageOptions && (
          <div className="absolute left-0 top-full w-[120px] bg-white dark:bg-dark-bgSecondary rounded-10 shadow-dropdown dark:backdrop-blur-[30.3px] py-2 mt-1">
            <div 
              className={`h-9 flex items-center gap-2 px-3 cursor-pointer ${locale === 'en' ? 'text-primary-green dark:text-dark-accent' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                changeLanguage('en');
              }}
            >
              <img 
                src="/assets/icons/flag-en.svg" 
                alt="English Flag" 
                className="w-4 h-4"
              />
              <span className="text-sm text-light-text dark:text-dark-text">EN</span>
              {locale === 'en' && (
                <svg className="w-4 h-4 text-primary-green dark:text-dark-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <div 
              className={`h-9 flex items-center gap-2 px-3 cursor-pointer ${locale === 'ru' ? 'text-primary-green dark:text-dark-accent' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                changeLanguage('ru');
              }}
            >
              <img 
                src="/assets/icons/flag-ru.svg" 
                alt="Russian Flag" 
                className="w-4 h-4"
              />
              <span className="text-sm text-light-text dark:text-dark-text">RU</span>
              {locale === 'ru' && (
                <svg className="w-4 h-4 text-primary-green dark:text-dark-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Theme Toggle */}
      <div className="h-11 flex items-center justify-between px-4">
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
      <div className="h-11 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
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
      
      {/* Divider */}
      <div className="h-px w-full bg-light-inputBorder dark:bg-dark-inputBorder my-2 mx-4" />
      
      {/* Logout */}
      <div 
        className="h-11 flex items-center gap-3 px-4 cursor-pointer hover:bg-[rgba(255,88,88,0.1)] transition-colors"
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
  );
};

export default HeaderDropdown;