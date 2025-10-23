import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '@/store/useThemeStore';
import { useUserStore } from '@/store/useUserStore';
import { useLanguageStore } from '@/store/useLanguageStore';
import Switch from '@/components/common/Switch/Switch';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Sun, Moon, ChevronDown, Check } from 'lucide-react';

// ==================================================================================================
// ВСТРАИВАЕМАЯ SVG-ИКОНКА ВЫХОДА
// SVG-код иконки вынесен в отдельный React-компонент, чтобы можно было управлять
// его цветом через `fill="currentColor"` и CSS-класс `-text-`.
// ==================================================================================================
const ExitIcon = (props: any) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M15.1923 21.799C15.1923 22.3513 15.6401 22.799 16.1923 22.799C16.7446 22.799 17.1923 22.3513 17.1923 21.799V5.82843L19.6984 8.3345C20.0889 8.72502 20.7221 8.72502 21.1126 8.3345C21.5032 7.94397 21.5032 7.31081 21.1126 6.92028L16.1923 2L10.889 7.3033C10.4985 7.69383 10.4985 8.32699 10.889 8.71751C11.2796 9.10804 11.9127 9.10804 12.3033 8.71751L15.1923 5.82843V21.799ZM6 16.4142C6 15.8619 5.55228 15.4142 5 15.4142C4.44772 15.4142 4 15.8619 4 16.4142V25.4142C4 27.0711 5.34314 28.4142 7 28.4142H25C26.6569 28.4142 28 27.0711 28 25.4142V16.4142C28 15.8619 27.5523 15.4142 27 15.4142C26.4477 15.4142 26 15.8619 26 16.4142V25.4142C26 25.9665 25.5523 26.4142 25 26.4142H7C6.44772 26.4142 6 25.9665 6 25.4142V16.4142Z" fill="currentColor"/>
  </svg>
);

// ==================================================================================================
// КОМПОНЕНТ ВЫПАДАЮЩЕГО МЕНЮ ПРОФИЛЯ
// ==================================================================================================
interface HeaderDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useThemeStore();
  const { user, clearUser } = useUserStore();
  const { locale, setLocale } = useLanguageStore();
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  
  const dropdownRef = useClickOutside<HTMLDivElement>(onClose);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const changeLanguage = (lang: 'en' | 'ru') => {
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
      onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up and closing the menu
      className="absolute top-[55px] right-0 w-[250px] bg-white dark:bg-dark-bgSecondary rounded-10 shadow-dropdown dark:backdrop-blur-30 py-3 z-[101] animate-scale-in"
    >
      {/* Profile Settings */}
      <div className="h-11 flex items-center gap-3 px-4 cursor-pointer hover:bg-light-bg dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors">
        <img 
          src="/assets/schoolteacher.svg" 
          alt="Settings"
          className="w-5 h-5 dark:invert"
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
            <img src="/assets/site.svg" alt="Language" className="w-5 h-5 dark:invert" />
            <span className="text-sm text-light-text dark:text-dark-text">
                {t('dropdown.language')}
            </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-light-text dark:text-dark-text transform transition-transform ${showLanguageOptions ? 'rotate-180' : ''}`} />
        
        {showLanguageOptions && (
          <div 
            ref={languageDropdownRef}
            className="absolute left-0 top-full w-full bg-white dark:bg-dark-bgSecondary rounded-10 shadow-dropdown dark:backdrop-blur-30 py-2 mt-1 z-10"
          >
            <div 
              className={`h-9 flex items-center justify-between gap-2 px-3 cursor-pointer hover:bg-light-bg dark:hover:bg-[rgba(255,255,255,0.05)]`}
              onClick={(e) => { e.stopPropagation(); changeLanguage('en'); }}
            >
                <div className="flex items-center gap-2">
                    <img src="/assets/Eng.svg" alt="English Flag" className="w-5 h-5" />
                    <span className="text-sm text-light-text dark:text-dark-text">English</span>
                </div>
              {locale === 'en' && <Check className="w-4 h-4 text-primary-green dark:text-dark-accent" />}
            </div>
            <div 
              className={`h-9 flex items-center justify-between gap-2 px-3 cursor-pointer hover:bg-light-bg dark:hover:bg-[rgba(255,255,255,0.05)]`}
              onClick={(e) => { e.stopPropagation(); changeLanguage('ru'); }}
            >
                <div className="flex items-center gap-2">
                    <img src="/assets/Rus.svg" alt="Russian Flag" className="w-5 h-5" />
                    <span className="text-sm text-light-text dark:text-dark-text">Русский</span>
                </div>
              {locale === 'ru' && <Check className="w-4 h-4 text-primary-green dark:text-dark-accent" />}
            </div>
          </div>
        )}
      </div>
      
      {/* Theme Toggle */}
      <div className="h-11 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          {theme === 'light' 
            ? <Sun className="w-5 h-5 text-light-text dark:text-dark-text" /> 
            : <Moon className="w-5 h-5 text-light-text dark:text-dark-text" />
          }
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
          <img src="/assets/wallet.svg" alt="Balance" className="w-5 h-5 dark:invert" />
          <span className="text-sm text-light-text dark:text-dark-text">
            {t('dropdown.balance')}
          </span>
        </div>
        <span className="text-sm font-bold text-primary-green dark:text-dark-accent">
          {user?.balance || '1,234.56 USDT'}
        </span>
      </div>
      
      {/* Divider */}
      <div className="h-px w-[calc(100%-32px)] mx-auto bg-light-inputBorder dark:bg-dark-inputBorder my-2" />
      
      {/* Logout */}
      <div 
        className="h-11 flex items-center gap-3 px-4 cursor-pointer hover:bg-[rgba(255,114,85,0.1)] transition-colors rounded-b-10"
        onClick={handleLogout}
      >
        <ExitIcon className="w-5 h-5 text-[#FF7255]" />
        <span className="text-sm text-[#FF7255]">
          {t('dropdown.logout')}
        </span>
      </div>
    </div>
  );
};

export default HeaderDropdown;