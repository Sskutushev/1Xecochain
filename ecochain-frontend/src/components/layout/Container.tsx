// src/components/layout/Container.tsx
// 
// PURPOSE: Responsive container component for consistent page layouts
// RESPONSIBILITY: Provides proper max-width and horizontal padding for content
// IMPLEMENTS: Container specifications from design system
// 
// SPECIFICATION COMPLIANCE:
// - Max widths: mobile (350px), container (1295px)
// - Horizontal padding: 25px (consistent margins)
// - Centered alignment
// - Responsive design

import React from 'react';
import { WithChildren } from '@/types/common';

interface ContainerProps extends WithChildren {
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`max-w-mobile desktop:max-w-container mx-auto px-[25px] ${className}`}>
      {children}
    </div>
  );
};

export default Container;