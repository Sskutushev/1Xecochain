// src/pages/TokenDetail/TokenDetail.tsx
// 
// PURPOSE: Detailed token information and trading page
// RESPONSIBILITY: Displays comprehensive token data and trading functionality
// IMPLEMENTS: Token detail specifications from design system
// 
// KEY FEATURES:
// - Comprehensive token information display
// - Interactive chart visualization
// - Token trading (buy/sell) functionality
// - Detailed description with scroll
// - Responsive layout (dual column desktop, stacked mobile)
// - Proper formatting of numbers and values
// 
// SPECIFICATION COMPLIANCE:
// - Layout: Dual column desktop, stacked mobile
// - Left column: 764px desktop, full mobile
// - Right column: 493px desktop, full mobile
// - Sticky positioning for trading panel on desktop
// - Proper color scheme and typography

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTokenStore } from '@/store/useTokenStore';
import { mockTokenDetail } from '@/lib/mockData';
import { useTokenContract } from '@/hooks/web3/useTokenContract';
import { useUserStore } from '@/store/useUserStore';

const TokenDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { tokens } = useTokenStore();
  const { buyToken, sellToken, isCreating } = useTokenContract();
  const { user } = useUserStore();
  const [quantity, setQuantity] = useState('');
  const [isBuyLoading, setIsBuyLoading] = useState(false);
  const [isSellLoading, setIsSellLoading] = useState(false);
  const [token, setToken] = useState(mockTokenDetail);
  
  // Find the token by ID or use mock data
  useEffect(() => {
    const foundToken = tokens.find(t => t.id === id) || mockTokenDetail;
    setToken(foundToken);
  }, [id, tokens]);

  const handleBuy = async () => {
    if (!quantity || parseFloat(quantity) <= 0 || !user?.isConnected) return;
    
    setIsBuyLoading(true);
    try {
      await buyToken(token.id, parseFloat(quantity));
      // Handle success - could show toast notification in real app
      setQuantity('');
    } catch (error) {
      console.error('Error buying token:', error);
      // In real app, show error to user
    } finally {
      setIsBuyLoading(false);
    }
  };
  
  const handleSell = async () => {
    if (!quantity || parseFloat(quantity) <= 0 || !user?.isConnected) return;
    
    setIsSellLoading(true);
    try {
      await sellToken(token.id, parseFloat(quantity));
      // Handle success - could show toast notification in real app
      setQuantity('');
    } catch (error) {
      console.error('Error selling token:', error);
      // In real app, show error to user
    } finally {
      setIsSellLoading(false);
    }
  };

  // Format large numbers with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, {
      maximumFractionDigits: 0
    });
  };

  return (
    <div className="max-w-[1295px] mx-auto px-[25px] pt-[80px] mobile:pt-[60px] relative z-1 flex flex-col desktop:flex-row gap-[60px]">
      {/* Left Column */}
      <div className="w-full desktop:w-[764px] flex flex-col gap-[50px] mobile:gap-[30px]">
        {/* Token Info Block */}
        <div className="h-[74px] mobile:h-[70px] flex items-center gap-[12px]">
          <img 
            src={token.imageUrl || '/assets/placeholders/token-placeholder.svg'} 
            alt={token.name}
            className="w-[74px] mobile:w-[60px] h-[74px] mobile:h-[60px] rounded-full bg-light-avatar"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl mobile:text-2xl font-bold text-light-text dark:text-dark-text leading-[1.2]">
              {token.name}
            </h1>
            <p className="text-base mobile:text-sm text-light-text dark:text-dark-text leading-[1.4] opacity-100">
              {token.description}
            </p>
          </div>
        </div>
        
        {/* Chart Container */}
        <div className="w-full desktop:w-[764px] h-[479px] mobile:h-[300px] rounded-10 bg-white dark:bg-[rgba(217,217,217,0.05)] shadow-card-light dark:shadow-card-dark dark:backdrop-blur-[73.2px] overflow-hidden">
          <img 
            src={token.chartUrl} 
            alt="Chart" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Description */}
        <div className="max-w-[764px]">
          <p className="text-lg mobile:text-base font-normal leading-[1.6] text-light-text dark:text-dark-text max-h-[300px] overflow-y-auto">
            {token.fullDescription}
          </p>
        </div>
      </div>
      
      {/* Right Column */}
      <div className="w-full desktop:w-[493px] bg-white dark:bg-[rgba(217,217,217,0.05)] shadow-card-light dark:shadow-card-dark rounded-10 backdrop-blur-[73.2px] p-5 mobile:p-4 sticky top-[100px] self-start">
        {/* Token Price */}
        <div className="text-[50px] mobile:text-[36px] font-bold text-primary-green dark:text-dark-accent leading-[1.2] mb-2">
          {token.raised}
        </div>
        
        {/* Progress */}
        <div className="flex items-baseline gap-1 mb-[30px]">
          <span className="text-base mobile:text-sm text-light-text dark:text-dark-text">
            {token.raisePercentage}
          </span>
          <span className="text-base mobile:text-sm text-light-text dark:text-dark-text opacity-50">
            of
          </span>
          <span className="text-base mobile:text-sm text-light-text dark:text-dark-text opacity-50">
            {token.raiseTarget} Raised
          </span>
        </div>
        
        {/* Summary Title */}
        <h2 className="text-3xl mobile:text-2xl font-bold text-primary-green dark:text-dark-accent leading-[1.2] mb-5">
          {t('tokenDetail.summary')}
        </h2>
        
        {/* Summary Info */}
        <div className="flex flex-col gap-[12px] mb-5">
          <div className="flex justify-between items-center h-8">
            <span className="text-xl mobile:text-base text-light-text dark:text-dark-text opacity-50">
              {t('tokenDetail.symbol')}
            </span>
            <span className="text-xl mobile:text-base text-light-text dark:text-dark-text opacity-100">
              ${token.symbol}
            </span>
          </div>
          <div className="flex justify-between items-center h-8">
            <span className="text-xl mobile:text-base text-light-text dark:text-dark-text opacity-50">
              {t('tokenDetail.blockchain')}
            </span>
            <span className="text-xl mobile:text-base text-light-text dark:text-dark-text opacity-100">
              {token.blockchain}
            </span>
          </div>
          <div className="flex justify-between items-center h-8">
            <span className="text-xl mobile:text-base text-light-text dark:text-dark-text opacity-50">
              {t('tokenDetail.price')}
            </span>
            <span className="text-xl mobile:text-base text-light-text dark:text-dark-text opacity-100">
              ${token.price.toFixed(4)}
            </span>
          </div>
          <div className="flex justify-between items-center h-8">
            <span className="text-xl mobile:text-base text-light-text dark:text-dark-text opacity-50">
              {t('tokenDetail.holders')}
            </span>
            <span className="text-xl mobile:text-base text-light-text dark:text-dark-text opacity-100">
              {formatNumber(token.holders)}
            </span>
          </div>
          <div className="flex justify-between items-center h-8">
            <span className="text-xl mobile:text-base text-light-text dark:text-dark-text opacity-50">
              {t('tokenDetail.volume')}
            </span>
            <span className="text-xl mobile:text-base text-light-text dark:text-dark-text opacity-100">
              {token.volume}
            </span>
          </div>
        </div>
        
        {/* Quantity Input */}
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder={t('tokenDetail.quantityPlaceholder')}
          min="0"
          step="0.01"
          className="w-full h-[50px] mobile:h-[44px] rounded-10 bg-[#F5F5F5] dark:bg-[rgba(255,255,255,0.05)] border-none p-3 text-sm text-light-text dark:text-dark-text placeholder:text-light-text50 dark:placeholder:text-dark-text50 outline-none"
          disabled={!user?.isConnected}
        />
        
        {/* Action Buttons */}
        <div className="flex gap-[10px] w-full mt-5">
          <button
            onClick={handleBuy}
            disabled={!quantity || parseFloat(quantity) <= 0 || isBuyLoading || isSellLoading || !user?.isConnected}
            className={`
              w-1/2 h-[50px] mobile:h-[44px] rounded-10 flex items-center justify-center
              ${!quantity || parseFloat(quantity) <= 0 || !user?.isConnected
                ? 'bg-gray-300 dark:bg-gray-700 opacity-50 cursor-not-allowed'
                : 'bg-primary-green hover:bg-[#4a7a06] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(91,157,7,0.3)]'}
              transition-all duration-200
            `}
          >
            {isBuyLoading || isCreating ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('listing.loading')}
              </>
            ) : (
              <span className="text-sm font-semibold text-white">
                {t('tokenDetail.buyButton')}
              </span>
            )}
          </button>
          <button
            onClick={handleSell}
            disabled={!quantity || parseFloat(quantity) <= 0 || isBuyLoading || isSellLoading || !user?.isConnected}
            className={`
              w-1/2 h-[50px] mobile:h-[44px] rounded-10 flex items-center justify-center
              ${!quantity || parseFloat(quantity) <= 0 || !user?.isConnected
                ? 'bg-gray-300 dark:bg-gray-700 opacity-50 cursor-not-allowed'
                : 'bg-sell-red hover:bg-sell-hover hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,88,88,0.3)]'}
              transition-all duration-200
            `}
          >
            {isSellLoading || isCreating ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('listing.loading')}
              </>
            ) : (
              <span className="text-sm font-semibold text-white">
                {t('tokenDetail.sellButton')}
              </span>
            )}
          </button>
        </div>
        
        {/* Wallet status reminder */}
        {!user?.isConnected && (
          <div className="mt-3 text-center text-sm text-sell-red">
            Please connect your wallet to trade tokens
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenDetail;