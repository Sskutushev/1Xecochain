// src/pages/MyTokens/MyTokens.tsx
// 
// PURPOSE: Page displaying tokens created by the current user
// RESPONSIBILITY: Shows user's tokens with same layout as listing page
// IMPLEMENTS: User token management specifications
// 
// KEY FEATURES:
// - Grid layout of user's tokens
// - Responsive design with adaptive columns
// - "Show more" pagination functionality
// - Translated content
// - Mock data integration (filtered by user in real app)
// 
// SPECIFICATION COMPLIANCE:
// - Container: 1295px max width
// - Grid: 5 columns desktop, 2 tablet, 1 mobile
// - Gap: 30px between cards
// - Header: "My tokens" with green accent
// - Button: "Show More" with green styling

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTokenStore } from '@/store/useTokenStore';
import { mockTokens } from '@/lib/mockData';
import TokenCard from '@/components/features/TokenCard/TokenCard';

const LISTING_PAGE_SIZE = 15; // Show 15 tokens per "page" as per spec

const MyTokens: React.FC = () => {
  const { t } = useTranslation();
  const { tokens, setTokens } = useTokenStore();
  const [visibleTokens, setVisibleTokens] = useState(LISTING_PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize with mock tokens (in a real app, this would be filtered by user)
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

  // Prepare tokens to display (in real app, filter by user)
  const tokensToDisplay = tokens.slice(0, visibleTokens);

  // Check if there are more tokens to load
  const hasMoreTokens = visibleTokens < tokens.length;

  return (
    <div className="max-w-[1295px] mx-auto px-[25px] pt-[80px] relative z-1">
      <h1 className="text-3xl mobile:text-2xl font-semibold text-primary-green dark:text-dark-accent mb-[80px] mobile:mb-10">
        {t('header.myTokens')}
      </h1>
      
      <div className="grid grid-cols-5 tablet:grid-cols-2 mobile:grid-cols-1 gap-[30px] mb-[50px]">
        {tokensToDisplay.map(token => (
          <TokenCard key={token.id} token={token} />
        ))}
      </div>
      
      {hasMoreTokens && (
        <div className="flex justify-center">
          <button 
            onClick={handleShowMore}
            disabled={isLoading}
            className={`
              w-[200px] h-[44px] rounded-20 flex items-center justify-center
              ${isLoading 
                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
                : 'bg-primary-green hover:bg-[#4a7a06] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(91,157,7,0.3)]'}
            `}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('listing.loading')}
              </>
            ) : (
              <span className="text-sm font-semibold text-white">
                {t('listing.showMore')}
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default MyTokens;