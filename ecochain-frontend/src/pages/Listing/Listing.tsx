// src/pages/Listing/Listing.tsx
// 
// PURPOSE: Token listing page displaying all available tokens
// RESPONSIBILITY: Shows grid of tokens with pagination and filtering
// IMPLEMENTS: Token listing specifications from design system
// 
// KEY FEATURES:
// - Grid layout of token cards (5 columns desktop, 2 tablet, 1 mobile)
// - Responsive design with adaptive columns
// - "Show more" pagination functionality
// - Translated content
// - Mock data integration
// 
// SPECIFICATION COMPLIANCE:
// - Container: 1295px max width
// - Grid: 5 columns desktop, 2 tablet, 1 mobile
// - Gap: 30px between cards
// - Header: "All tokens" with green accent
// - Button: "Show More" with green styling

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTokenStore } from '@/store/useTokenStore';
import { mockTokens } from '@/lib/mockData';
import TokenCard from '@/components/features/TokenCard/TokenCard';
import Button from '@/components/common/Button';

const LISTING_PAGE_SIZE = 15; // Show 15 tokens per "page" as per spec

const Listing: React.FC = () => {
  const { t } = useTranslation();
  const { tokens, setTokens } = useTokenStore();
  const [visibleTokens, setVisibleTokens] = useState(LISTING_PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setTokens(mockTokens);
  }, [setTokens]);

  const handleShowMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleTokens(prev => prev + LISTING_PAGE_SIZE);
      setIsLoading(false);
    }, 500); // Simulate loading
  };

  const tokensToDisplay = tokens.slice(0, visibleTokens);
  const hasMoreTokens = visibleTokens < tokens.length;

  return (
    <div className="container mx-auto px-4 py-20 relative z-1">
      <h1 className="text-2xl font-semibold text-primary-green dark:text-dark-accent mb-20 mobile:mb-10">
        {t('listing.title')}
      </h1>
      
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-5 gap-[30px] mb-12">
        {tokensToDisplay.map(token => (
          <TokenCard key={token.id} token={token} />
        ))}
      </div>
      
      {hasMoreTokens && (
        <div className="flex justify-center">
          <Button 
            onClick={handleShowMore}
            isLoading={isLoading}
            variant="primary"
            size="md"
            className="w-[200px]"
          >
            {t('listing.showMore')}
          </Button>
        </div>
      )}
      
      {/* Vector Background - appears at x=590px from left, y=100px from top */}
      <img
        src="/assets/Vector.svg"
        alt="Vector Background"
        className="fixed top-[100px] left-[590px] w-[1660px] h-[900px] pointer-events-none z-[-30] dark:brightness-[0.22] dark:contrast-[1.2] dark:saturate-[1.5]"
      />
      
      {/* Incubator Element - full width with 25px margins, size 1870x260, flush with bottom */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-50px)] max-w-[1870px] h-[260px] bg-transparent z-[-10] pointer-events-none overflow-hidden">
        <img
          src="/assets/INCUBATOR.svg"
          alt="Incubator Background"
          className="absolute bottom-0 left-0 w-full h-auto dark:brightness-[0.22] dark:contrast-[1.2]"
        />
      </div>
    </div>
  );
};

export default Listing;