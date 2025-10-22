import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModalStore } from '@/store/useModalStore';
import MobileMenu from './MobileMenu';

const MobileHeader: React.FC = () => {
  const openModal = useModalStore((state) => state.openCreateTokenModal);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-[25px] left-1/2 transform -translate-x-1/2 w-[calc(100%-50px)] max-w-[350px] h-[40px] bg-white dark:bg-dark-bgSecondary rounded-8 shadow-header z-50 flex items-center justify-between px-4">
        {/* Burger Menu */}
        <button onClick={() => setIsMobileMenuOpen(true)} className="p-1">
          <img 
            src="/assets/Frame 12.svg" 
            alt="Menu" 
            className="w-6 h-6 text-light-text dark:text-dark-text cursor-pointer" 
          />
        </button>
        
        {/* Logo */}
        <a href="https://x1ecochain.com/" className="absolute left-1/2 transform -translate-x-1/2">
          <img 
            src="/assets/Group 131.svg" 
            alt="EcoChain Logo" 
            className="h-[18px] dark:brightness-0 dark:invert"
          />
        </a>

        {/* Create Token Button */}
        <button
          onClick={openModal}
          className="w-[63px] h-[30px] bg-primary-green dark:bg-white dark:text-black rounded-20 flex items-center justify-center"
        >
          <img 
            src="/assets/Icon (1).svg" 
            alt="Create Token" 
            className="w-4 h-4 brightness-0 dark:brightness-[2.5] invert dark:invert-0 dark:filter-none"
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