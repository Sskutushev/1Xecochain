import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useUserStore } from '@/store/useUserStore';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useKeyPress } from '@/hooks/useKeyPress';
import HeaderDropdown from './HeaderDropdown';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const user = useUserStore((state) => state.user);
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menuRef = useClickOutside<HTMLDivElement>(onClose);
  useKeyPress('Escape', onClose);

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

  const isActive = (path: string) => location.pathname === path;
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <>
      <div 
        className="fixed inset-0 z-[99] bg-black/30 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      <div 
        ref={menuRef}
        className="fixed top-0 left-0 z-[100] w-[300px] max-w-[80vw] h-full bg-white dark:bg-[#192321] animate-slide-in-left flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between h-[70px] border-b border-light-inputBorder dark:border-dark-inputBorder px-5 flex-shrink-0">
          <a href="https://x1ecochain.com/" onClick={(e) => {e.preventDefault(); onClose();}}>
            <img 
              src="/assets/Logo X1 Ecochain.svg" 
              alt="EcoChain Logo" 
              className="h-[27px] dark:brightness-0 dark:invert"
            />
          </a>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:rotate-90 transition-transform"
          >
            <img 
              src="/assets/close.svg" 
              alt="Close"
              className="w-6 h-6 text-light-text dark:text-dark-text"
            />
          </button>
        </div>
        
        <div className="p-5 flex flex-col flex-grow overflow-y-auto">
            {/* Search */}
            <div className="w-full h-[36px] bg-light-bg dark:bg-dark-inputBg rounded-20 flex items-center px-3 flex-shrink-0">
                <img src="/assets/Icon-loop.svg" alt="Search" className="w-4 h-4 mr-2" />
                <input
                type="text"
                placeholder={t('header.search')}
                className="w-full bg-transparent text-sm text-light-text dark:text-dark-text placeholder:text-light-text50 dark:placeholder:text-dark-text50 outline-none"
                />
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-[15px] mt-[30px]">
                <Link to="/" className={clsx('font-semibold text-light-text dark:text-white', { 'text-primary-green dark:text-[#58FF84]': isActive('/') })} onClick={onClose}>{t('header.dashboard')}</Link>
                <Link to="/listing" className={clsx('font-semibold text-light-text dark:text-white', { 'text-primary-green dark:text-[#58FF84]': isActive('/listing') })} onClick={onClose}>{t('header.listing')}</Link>
                <Link to="/my-tokens" className={clsx('font-semibold text-light-text dark:text-white', { 'text-primary-green dark:text-[#58FF84]': isActive('/my-tokens') })} onClick={onClose}>{t('header.myTokens')}</Link>
            </nav>

            {/* Profile Block */}
            <div className="mt-[30px] pt-[30px] border-t border-light-inputBorder dark:border-dark-inputBorder">
                <div 
                    className="w-full h-[50px] bg-transparent rounded-20 flex items-center gap-2.5 p-2 hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors cursor-pointer relative"
                    onClick={toggleDropdown}
                >
                    <img
                        src={user?.avatar || '/assets/Frame 9.svg'}
                        alt="User Avatar"
                        className="w-9 h-9 rounded-full bg-light-avatar"
                    />
                    <div className="flex flex-col text-left flex-grow overflow-hidden">
                        <span className="text-sm font-bold text-primary-darkGreen dark:text-white truncate">
                            {user?.name || 'Noname'}
                        </span>
                        <span className="text-xs text-light-text dark:text-dark-text opacity-50 truncate">
                            {user?.address || '0x2...006728'}
                        </span>
                    </div>
                    <img 
                        src="/assets/Icon-sett.svg" 
                        alt="Open menu"
                        className={`w-5 h-5 text-light-text dark:text-dark-text transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                    {/* User Dropdown - positioned relative to this block */}
                    {isDropdownOpen && (
                        <div 
                            className="absolute top-full right-0 mt-[-45px] w-[250px] z-50"
                        >
                            <HeaderDropdown 
                                isOpen={isDropdownOpen} 
                                onClose={() => setIsDropdownOpen(false)} 
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
