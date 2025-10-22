// src/components/layout/DesktopHeader.tsx
// 
// PURPOSE: Desktop-specific header component with full navigation and functionality
// RESPONSIBILITY: Provides complete header UI for desktop screens (>=1330px)
// IMPLEMENTS: Responsive design with fixed minimum search width
// 
// KEY FEATURES:
// - Navigation links with active state highlighting
// - Search bar with fixed minimum width of 280px
// - Create token button
// - User profile with dropdown
// - Theme awareness (light/dark)
// - Translation support
// - Fixed height of 70px regardless of screen width
// - Fixed 25px margins on all sides
// - Prevents elements from moving when screen width decreases
// 
// SPECIFICATION COMPLIANCE:
// - Size: Scales width with screen, fixed height 70px
// - Position: Fixed, top 25px, horizontally centered
// - Border-radius: 8.32px
// - Colors and styling per theme
// - Search input never decreases below 280px
// - Elements maintain proper spacing down to 1330px (then switches to tablet view)

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
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
    <header 
      className="fixed top-[25px] left-1/2 transform -translate-x-1/2 
        w-full max-w-[min(100vw-50px,1870px)] 
        h-[70px] 
        bg-white dark:bg-dark-bgSecondary rounded-8 shadow-header z-50 
        flex items-center px-[25px]"
    >
      {/* Logo */}
      <a href="https://x1ecochain.com/" className="mr-[50px] flex-shrink-0">
        <img 
          src="/assets/Logo X1 Ecochain.svg" 
          alt="EcoChain Logo" 
          className="h-[27px] w-auto max-w-full"
        />
      </a>

      {/* Navigation */}
      <nav className="flex gap-[50px]">
        <Link 
          to="/"
          className={clsx(
            'text-[0.85rem] sm:text-[0.9rem] md:text-base font-semibold pb-1 whitespace-nowrap',
            {
              'text-primary-green dark:text-dark-accent border-b-2 border-primary-green dark:border-dark-accent': isActive('/'),
              'text-light-text dark:text-dark-text': !isActive('/')
            }
          )}
        >
          {t('header.dashboard')}
        </Link>
        <Link 
          to="/listing"
          className={clsx(
            'text-[0.85rem] sm:text-[0.9rem] md:text-base font-semibold pb-1 whitespace-nowrap',
            {
              'text-primary-green dark:text-dark-accent border-b-2 border-primary-green dark:border-dark-accent': isActive('/listing'),
              'text-light-text dark:text-dark-text': !isActive('/listing')
            }
          )}
        >
          {t('header.listing')}
        </Link>
        <Link 
          to="/my-tokens"
          className={clsx(
            'text-[0.85rem] sm:text-[0.9rem] md:text-base font-semibold pb-1 whitespace-nowrap',
            {
              'text-primary-green dark:text-dark-accent border-b-2 border-primary-green dark:border-dark-accent': isActive('/my-tokens'),
              'text-light-text dark:text-dark-text': !isActive('/my-tokens')
            }
          )}
        >
          {t('header.myTokens')}
        </Link>
      </nav>

      {/* Search - Maintain minimum width of 280px */}
      <div className="ml-[50px] w-full max-w-[480px] min-w-[280px] h-[36px] bg-light-bg dark:bg-dark-inputBg rounded-20 flex items-center px-3">
        <img src="/assets/Icon-loop.svg" alt="Search" className="w-4 h-4 mr-2" />
        <input
          type="text"
          placeholder={t('header.search')}
          className="w-full bg-transparent text-sm text-light-text dark:text-dark-text placeholder:text-light-text50 dark:placeholder:text-dark-text50 outline-none"
        />
      </div>

      {/* Spacer will be handled by the margin on the next element */}
      <div className="flex-grow" />

      {/* Create Token Button */}
      <button
        onClick={openModal}
        className="flex-shrink-0 w-[160px] h-[36px] bg-primary-green dark:bg-white dark:text-black rounded-20 flex items-center justify-center gap-2 ml-[30px] mr-[30px]"
      >
        <span className="text-xs font-bold text-white dark:text-black">
          {t('header.createToken')}
        </span>
        <img src="/assets/Icon.svg" alt="arrow" className="w-[5px] h-[10px] brightness-0 invert dark:brightness-100 dark:invert" />
      </button>

      {/* User Profile */}
      <div 
        className="flex-shrink-0 w-[170px] h-[36px] bg-transparent rounded-20 flex items-center gap-2.5 px-2 hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors cursor-pointer relative"
        onClick={toggleDropdown}
      >
        <div className="flex flex-col text-left">
          <span className="text-sm font-bold text-primary-darkGreen dark:text-white">
            {user?.name || 'Noname'}
          </span>
          <span className="text-xs text-light-text dark:text-dark-text opacity-50 truncate">
            {user?.address || '0x2...006728'}
          </span>
        </div>
        <img
          src={user?.avatar || '/assets/Frame 9.svg'}
          alt="User Avatar"
          className="w-9 h-9 rounded-full bg-light-avatar"
        />
        <img 
          src="/assets/Icon-sett.svg" 
          alt="Open menu"
          className="w-4 h-4 text-light-text dark:text-dark-text"
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