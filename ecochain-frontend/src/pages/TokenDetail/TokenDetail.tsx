import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mockTokenDetail } from '@/lib/mockData';
import { useTokenContract } from '@/hooks/web3/useTokenContract';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input/Input';
import type { TokenDetail as TokenDetailType } from '@/types/token';

const TokenDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { buyToken, sellToken, isCreating } = useTokenContract();
  const [quantity, setQuantity] = useState('');
  const [token, setToken] = useState<TokenDetailType>(mockTokenDetail);

  useEffect(() => {
    // In a real app, you would fetch token details by id
    setToken(mockTokenDetail);
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-20 relative z-1">
      <div className="flex flex-col desktop:flex-row desktop:flex-wrap desktop:justify-between gap-x-8 gap-y-10">
        
        {/* Mobile Order: 1, Desktop Order: 1 */}
        <div className="desktop:w-full order-1 flex items-center gap-4">
          <img 
            src={token.imageUrl || '/assets/placeholders/token-placeholder.svg'} 
            alt={token.name}
            className="w-[74px] h-[74px] rounded-full bg-light-avatar flex-shrink-0"
          />
          <div>
            <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">
              {token.name}
            </h1>
            <p className="text-sm font-normal text-light-text dark:text-dark-text">
              {token.description}
            </p>
          </div>
        </div>

        {/* Mobile Order: 3, Desktop Order: 3 (Right Column) */}
        <div className="desktop:w-[493px] order-3 desktop:order-2 bg-white dark:bg-dark-bgSecondary shadow-card-light dark:shadow-card-dark rounded-10 dark:backdrop-blur-73 p-8 desktop:sticky top-28 self-start flex-shrink-0">
          <div className="text-3xl font-bold text-primary-green dark:text-dark-accent">
            {token.raised}
          </div>
          <div className="flex items-baseline gap-1.5 mb-8">
            <span className="text-base text-light-text dark:text-dark-text">
              {token.raisePercentage}
            </span>
            <span className="text-base text-light-text50 dark:text-dark-text50">
              of {token.raiseTarget} Raised
            </span>
          </div>

          <h2 className="text-2xl font-bold text-primary-green dark:text-dark-accent mb-4">
            {t('tokenDetail.summary')}
          </h2>
          <div className="flex flex-col gap-3 mb-6">
            {[ 
              { label: t('tokenDetail.symbol'), value: `$${token.symbol}` },
              { label: t('tokenDetail.blockchain'), value: token.blockchain },
              { label: t('tokenDetail.price'), value: `$${token.price.toFixed(4)}` },
              { label: t('tokenDetail.holders'), value: token.holders.toLocaleString() },
              { label: t('tokenDetail.volume'), value: token.volume },
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center text-lg">
                <span className="font-normal text-light-text50 dark:text-dark-text50">{item.label}</span>
                <span className="font-normal text-light-text dark:text-dark-text">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-[5px]">
            <Input 
                placeholder={t('tokenDetail.quantityPlaceholder')} 
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="!bg-light-inputBgAlt dark:!bg-dark-inputBg"
            />
            <Button variant="primary" size="lg" fullWidth onClick={() => buyToken(token.id, parseFloat(quantity))} isLoading={isCreating}>{t('tokenDetail.buyButton')}</Button>
            <Button variant="sell" size="lg" fullWidth onClick={() => sellToken(token.id, parseFloat(quantity))} isLoading={isCreating}>{t('tokenDetail.sellButton')}</Button>
          </div>
        </div>

        {/* Mobile Order: 2, Desktop Order: 2 */}
        <div className="desktop:w-[calc(100%-525px)] order-2 desktop:order-3">
            <div className="w-full h-[479px] rounded-10 bg-white dark:bg-dark-bgSecondary shadow-card-light dark:shadow-card-dark dark:backdrop-blur-73 overflow-hidden mb-5">
                <img src={token.chartUrl} alt="Chart" className="w-full h-full object-cover" />
            </div>
        </div>

        {/* Mobile Order: 4, Desktop Order: 4 */}
        <div className="desktop:w-[calc(100%-525px)] order-4">
            <p className="text-lg font-normal text-light-text dark:text-dark-text">
                {token.fullDescription}
            </p>
        </div>

      </div>
    </div>
  );
};

export default TokenDetail;
