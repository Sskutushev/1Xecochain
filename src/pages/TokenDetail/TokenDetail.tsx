// src/pages/TokenDetail/TokenDetail.tsx
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mockTokens, mockTokenDetail } from '@/lib/mockData';
import { useThemeStore } from '@/store/useThemeStore';

// ==================================================================================================
// ГЛАВНЫЙ КОМПОНЕНТ СТРАНИЦЫ ДЕТАЛЬНОГО ПРОСМОТРА ТОКЕНА
// ==================================================================================================

// --------------------------------------------------------------------------------------------------
// 1. ИНФО-БЛОК (ВЕРХНЯЯ ЧАСТЬ)
// Отображает аватар, название и символ токена.
// --------------------------------------------------------------------------------------------------
const TokenInfoHeader = ({ token }: any) => (
  <div className="w-full flex items-center h-[70px] md:h-[74px]">
    <img 
      src={token.imageUrl} 
      alt={token.name} 
      className="w-[60px] h-[60px] md:w-[74px] md:h-[74px] rounded-full bg-[#D9D9D9] mr-[12px] md:mr-[20px] flex-shrink-0"
    />
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white">{token.name}</h1>
      <p className="text-xs md:text-sm font-regular text-black/50 dark:text-white/50">{token.symbol}</p>
    </div>
  </div>
);

// --------------------------------------------------------------------------------------------------
// 2. ГРАФИК TRADINGVIEW
// Динамически подгружает и отображает виджет графика с TradingView.
// Адаптируется под светлую/темную тему.
// --------------------------------------------------------------------------------------------------
const TokenChart = ({ symbol }: { symbol: string }) => {
  const container = useRef<HTMLDivElement>(null);
  const { theme } = useThemeStore();

  useEffect(() => {
    if (!container.current || container.current.querySelector('script')) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "BITSTAMP:${symbol}USD",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "${theme}",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "hide_side_toolbar": true,
        "allow_symbol_change": false,
        "container_id": "tradingview-chart-container-${symbol}"
      }`;
    
    container.current.id = `tradingview-chart-container-${symbol}`;
    container.current.appendChild(script);

  }, [symbol, theme]);

  return (
    <div className="w-full h-[300px] md:h-[480px] rounded-10 overflow-hidden bg-transparent">
      <div ref={container} className="w-full h-full"></div>
    </div>
  );
};

// --------------------------------------------------------------------------------------------------
// 3. ПАНЕЛЬ ПОКУПКИ (ПРАВАЯ КОЛОНКА)
// Содержит информацию о цене, сборах, сводку по токену и кнопки покупки/продажи.
// --------------------------------------------------------------------------------------------------
const TokenPurchasePanel = ({ token }: any) => {
  const { t } = useTranslation();
  return (
    <div className="w-full h-auto bg-white dark:bg-white/5 rounded-10 p-[15px] md:p-[20px]">
      {/* Информация о сборах */}
      <div>
        <p className="text-3xl md:text-5xl font-bold text-[#5B9D07] dark:text-[#58FF84]">{token.raised}</p>
        <p className="mt-1">
          <span className="text-base md:text-xl font-bold text-black dark:text-white">{token.raisePercentage}</span>
          <span className="text-base md:text-xl font-regular text-black/50 dark:text-white/50"> of {token.raiseTarget} Raised</span>
        </p>
      </div>

      {/* Сводка по токену */}
      <div className="mt-[30px]">
        <h3 className="text-xl md:text-3xl font-bold text-[#5B9D07] dark:text-[#58FF84]">
          {t('tokenDetail.summary', 'Token summary')}
        </h3>
        <div className="flex flex-col gap-[12px] mt-4 text-sm md:text-xl">
          <div className="flex justify-between items-center">
            <span className="text-black/50 dark:text-white/50">Symbol</span>
            <span className="font-medium text-black dark:text-white">{token.symbol}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-black/50 dark:text-white/50">Blockchain</span>
            <span className="font-medium text-black dark:text-white">{token.blockchain}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-black/50 dark:text-white/50">Price</span>
            <span className="font-medium text-black dark:text-white">${token.price}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-black/50 dark:text-white/50">Holders</span>
            <span className="font-medium text-black dark:text-white">{token.holders}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-black/50 dark:text-white/50">Volume</span>
            <span className="font-medium text-black dark:text-white">{token.volume}</span>
          </div>
        </div>
      </div>

      {/* Секция покупки/продажи */}
      <div className="mt-[20px]">
        <input 
          type="number"
          placeholder={t('tokenDetail.quantity', 'Quantity of tokens')}
          className="w-full h-[35px] md:h-[50px] rounded-10 bg-[#F5F5F5] dark:bg-white/5 border-none px-3 text-black dark:text-white placeholder:text-[#05521A]/20 outline-none text-center"
        />
        <div className="flex flex-col items-center gap-[10px] mt-[5px]">
          <button className="w-full h-[35px] md:h-[50px] rounded-10 bg-[#5B9D07] hover:bg-[#23863D] text-white transition-colors">
            {t('tokenDetail.buy', 'Buy')}
          </button>
          <button className="w-full h-[35px] md:h-[50px] rounded-10 bg-[#FF5858] hover:bg-[#862323] text-white transition-colors">
            {t('tokenDetail.sell', 'Sell')}
          </button>
        </div>
      </div>
    </div>
  );
};

// --------------------------------------------------------------------------------------------------
// 4. ПОЛНОЕ ОПИСАНИЕ ТОКЕНА (НИЖНЯЯ ЧАСТЬ)
// --------------------------------------------------------------------------------------------------
const TokenFullDescription = ({ description }: any) => (
  <div className="w-full max-h-[300px] overflow-y-auto text-sm md:text-lg font-regular text-black dark:text-white leading-relaxed">
    {description}
  </div>
);


// ==================================================================================================
// ОСНОВНАЯ ЛОГИКА СТРАНИЦЫ
// ==================================================================================================
const TokenDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  
  // --------------------------------------------------------------------------------------------------
  // ЛОГИКА ПОЛУЧЕНИЯ ДАННЫХ
  // В реальном приложении здесь будет асинхронный запрос на сервер по `id`.
  // Сейчас мы ищем токен в моковом массиве и объединяем с детальной информацией.
  // --------------------------------------------------------------------------------------------------
  const baseTokenInfo = mockTokens.find(t => t.id === id);

  if (!baseTokenInfo) {
    return <div className="text-center py-20">{t('tokenDetail.notFound', 'Token not found')}</div>;
  }

  const token = {
    ...mockTokenDetail,
    ...baseTokenInfo,
  };

  if (!token) {
    return <div>{t('tokenDetail.notFound', 'Token not found')}</div>;
  }

  return (
    <div className="w-full flex justify-center pt-[168px] px-4 relative z-1">
      <div className="w-full max-w-[1295px]">
        {/* Основной контейнер с адаптивной GRID раскладкой */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_495px] gap-4 lg:gap-[60px]">
          
          {/* Порядок элементов в JSX соответствует мобильной версии */}
          
          {/* 1. Инфо-блок */}
          <div className="lg:col-start-1 lg:row-start-1">
            <TokenInfoHeader token={token} />
          </div>

          {/* 2. График */}
          <div className="mt-[20px] lg:mt-0 lg:col-start-1 lg:row-start-2">
            <TokenChart symbol={token.symbol} />
          </div>

          {/* 3. Панель покупки (правая колонка на десктопе) */}
          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-3">
            <TokenPurchasePanel token={token} />
          </div>

          {/* 4. Описание */}
          <div className="mt-[15px] lg:mt-0 lg:col-start-1 lg:row-start-3">
            <TokenFullDescription description={token.fullDescription} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default TokenDetail;