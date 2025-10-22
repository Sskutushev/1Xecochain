// src/components/layout/Header/Header.tsx
// 
// PURPOSE: Main header component that adapts between desktop and mobile layouts
// RESPONSIBILITY: Provides navigation, search, user profile, and theme controls
// IMPLEMENTS: Responsive design based on breakpoints (desktop vs mobile)
// 
// KEY FEATURES:
// - Responsive layout switching based on screen width
// - Navigation links with active state highlighting
// - Search functionality
// - Create token button
// - User profile dropdown
// - Theme toggle between light/dark modes

import React from 'react';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { BREAKPOINTS } from '@/lib/constants';

const Header: React.FC = () => {
  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.DESKTOP}px)`);

  return (
    <>
      {isDesktop ? <DesktopHeader /> : <MobileHeader />}
    </>
  );
};

export default Header;