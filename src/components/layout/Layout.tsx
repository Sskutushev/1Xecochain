// src/components/layout/Layout.tsx
// 
// PURPOSE: Main layout wrapper component for all pages
// RESPONSIBILITY: Provides consistent structure with header, background, and modal
// IMPLEMENTS: Shared UI elements across all application pages
// 
// LAYOUT STRUCTURE:
// - Page background (conditional based on route)
// - Header (responsive desktop/mobile)
// - Main content outlet (from React Router)
// - Create token modal (global modal component)
// 
// THEMING: Supports light/dark theme with background transitions

import { Outlet } from 'react-router-dom';
import Header from './Header';
import PageBackground from './PageBackground';
import CreateTokenModal from '@/components/features/CreateTokenModal';

function Layout() {
  return (
    <div className="relative min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      {/* Background components - only show on specific pages */}
      <PageBackground />
      
      {/* Header component - responsive desktop/mobile version */}
      <Header />
      
      {/* Main content area - Router outlet for page components */}
      <main className="relative z-0">
        <Outlet />
      </main>
      
      {/* Global modal component - Create token modal */}
      <CreateTokenModal />
    </div>
  );
}

export default Layout;
