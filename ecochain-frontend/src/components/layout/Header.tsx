// src/components/layout/Header/Header.tsx
// 
// PURPOSE: Main header component that adapts between desktop, tablet and mobile layouts
// RESPONSIBILITY: Provides navigation, search, user profile, and theme controls
// IMPLEMENTS: Responsive design based on breakpoints (desktop, tablet, mobile)
// 
// KEY FEATURES:
// - Responsive layout switching based on screen width
// - Desktop: 1375px+ (full UI with search, nav, profile)
// - Tablet: 578px-1374px (simplified UI - menu, logo, create button like mobile)
// - Mobile: <578px (simple UI - menu, logo, create button)
// - Fixed 70px height for desktop, 40px for tablet/mobile

import DesktopHeader from './DesktopHeader';
import TabletHeader from './TabletHeader';
import MobileHeader from './MobileHeader';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const Header: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 577px)');
  const isTablet = useMediaQuery('(min-width: 578px) and (max-width: 1374px)');

  return (
    <>
      {isMobile ? <MobileHeader /> : isTablet ? <TabletHeader /> : <DesktopHeader />}
    </>
  );
};

export default Header;
