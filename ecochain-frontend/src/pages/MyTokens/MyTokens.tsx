import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTokenStore } from '@/store/useTokenStore';
import { myMockTokens } from '@/lib/mockData'; // Используем новые моковые данные
import TokenCard from '@/components/features/TokenCard/TokenCard';
import Button from '@/components/common/Button';

const LISTING_PAGE_SIZE = 15;

const MyTokens: React.FC = () => {
  const { t } = useTranslation();
  // Состояние для токенов теперь можно сделать локальным, если они не нужны в глобальном сторе
  const [tokens, setTokens] = useState<any[]>([]);
  const [visibleTokens, setVisibleTokens] = useState(LISTING_PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setTokens(myMockTokens); // Устанавливаем токены пользователя
  }, []);

  const handleShowMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleTokens(prev => prev + LISTING_PAGE_SIZE);
      setIsLoading(false);
    }, 500);
  };

  const tokensToDisplay = tokens.slice(0, visibleTokens);
  const hasMoreTokens = visibleTokens < tokens.length;

  return (
    <div className="w-full flex justify-center relative z-1">
      {/* Vector Background */}
      <img
        src="/assets/Vector.svg"
        alt="Vector Background"
        className="fixed top-[100px] left-[590px] w-[1660px] h-[900px] pointer-events-none z-[-30] dark:brightness-[0.22] dark:contrast-[1.2] dark:saturate-[1.5]"
      />
      
      {/* Incubator Element */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-50px)] max-w-[1870px] h-[260px] bg-transparent z-[-10] pointer-events-none overflow-hidden">
        <img
          src="/assets/INCUBATOR.svg"
          alt="Incubator Background"
          className="absolute bottom-0 left-0 w-full h-auto dark:opacity-[.46]"
        />
      </div>

      <div className="w-full max-w-[1295px] pt-[150px] px-4">
        <h1 className="text-xl md:text-3xl font-semibold text-[#5B9D07] dark:text-white mb-[30px]">
          {t('header.myTokens', 'My tokens')} { /* Измененный заголовок */}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px] mb-12">
          {tokensToDisplay.map(token => (
            <TokenCard key={token.id} token={token} />
          ))}
        </div>
        
        {hasMoreTokens && (
          <div className="flex justify-center pb-20">
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
      </div>
    </div>
  );
};

export default MyTokens;
