import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '@/store/useThemeStore';
import { useUserStore } from '@/store/useUserStore';
import { useLanguageStore } from '@/store/useLanguageStore';
import Switch from '@/components/common/Switch/Switch';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Sun, Moon, ChevronDown, Check } from 'lucide-react';

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
      className="absolute top-[55px] right-0 w-[250px] bg-white dark:bg-dark-bgSecondary rounded-10 shadow-dropdown dark:backdrop-blur-30 py-3 z-[101] animate-scale-in"
    >
      {/* Profile Settings */}
      <div className="h-11 flex items-center gap-3 px-4 cursor-pointer hover:bg-light-bg dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors">
        <img 
          src="/assets/schoolteacher.svg" 
          alt="Settings"
          className="w-5 h-5"
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
            <img src="/assets/site.svg" alt="Language" className="w-5 h-5" />
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
          <img src="/assets/wallet.svg" alt="Balance" className="w-5 h-5" />
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
        className="h-11 flex items-center gap-3 px-4 cursor-pointer hover:bg-[rgba(255,88,88,0.1)] transition-colors rounded-b-10"
        onClick={handleLogout}
      >
        <img src="/assets/exit.svg" alt="Logout" className="w-5 h-5" />
        <span className="text-sm text-sell-red">
          {t('dropdown.logout')}
        </span>
      </div>
    </div>
  );
};

export default HeaderDropdown;