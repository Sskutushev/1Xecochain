// src/components/layout/PageBackground.tsx
// 
// PURPOSE: Background images component for all pages
// RESPONSIBILITY: Manages incubator and vector background images
// IMPLEMENTS: Background image specifications from design system
// 
// KEY FEATURES:
// - Incubator background at bottom of all pages (except token detail)
// - Vector background on right half of all pages
// - Proper z-index layering behind content
// - Theme-aware opacity adjustments
// - Conditional rendering for token detail page

import React from 'react';
import { useLocation } from 'react-router-dom';

const PageBackground: React.FC = () => {
  const location = useLocation();
  
  // Don't show incubator background on token detail page
  const showIncubatorBg = location.pathname !== '/token/:id' && !location.pathname.startsWith('/token/');
  
  return (
    <>
      {/* Incubator background - shown on all pages except token detail */}
      {showIncubatorBg && (
        <div 
          className="fixed bottom-0 left-0 right-0 z-[-2]"
          style={{ 
            width: 'calc(100% - 50px)',
            height: '1000px',
            margin: '0 auto',
            backgroundImage: 'url(/assets/images/backgrounds/INCUBATOR.svg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center bottom'
          }}
        />
      )}
      
      {/* Vector background - shown on all pages */}
      <div 
        className="fixed top-0 right-0 z-[-1]"
        style={{ 
          width: '50vw',
          maxWidth: '960px',
          height: '900px',
          opacity: '0.6',
          backgroundImage: 'url(/assets/images/backgrounds/vector.svg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Dark theme adjustments */}
      <style>{`
        .dark & {
          opacity: 0.4;
        }
      `}</style>
    </>
  );
};

export default PageBackground;