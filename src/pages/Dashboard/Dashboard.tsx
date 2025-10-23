// src/pages/Dashboard/Dashboard.tsx
//
// НАЗНАЧЕНИЕ: Страница дашборда с карточками основных функций
// ОТВЕТСТВЕННОСТЬ: Отображает основные функции платформы в виде карточек
// РЕАЛИЗУЕТ: Главную страницу приложения с навигацией по основным разделам
//
// ОСНОВНЫЕ БЛОКИ:
// - Векторный фон для визуального оформления
// - Карточки с функциями (новые токены, создание токенов, мои токены)
// - Фоновый элемент инкубатора в нижней части страницы
//
// АРХИТЕКТУРА: Использует компонент DashboardCard для отображения карточек

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DashboardCard from '@/components/features/Dashboard/DashboardCard';

const Dashboard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChanged = () => {
      setLanguage(i18n.language);
    };

    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  return (
    <div className="relative z-1">
      
      {/* Vector Background - appears at x=590px from left, y=100px from top */}
      <img
        src="/1Xecochain/assets/Vector.svg"
        alt="Vector Background"
        className="fixed top-[100px] left-[590px] w-[1660px] h-[900px] pointer-events-none z-[-30] dark:brightness-[0.22] dark:contrast-[1.2] dark:saturate-[1.5]"
      />
      
      {/* Cards Container - centered and responsive with flex-wrap */}
      <div className="w-full flex justify-center pt-[195px] pb-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center max-w-screen-xl">
          <DashboardCard 
            imageLight="/1Xecochain/assets/Rectangle 1.svg" 
            imageDark="/1Xecochain/assets/Rectangle 1.png" 
            title={t('dashboard.newTokens')}
            description={t('dashboard.newTokensDescription')}
            buttonText={t('dashboard.discoverButton')}
            onButtonClick={() => navigate('/listing')}
          />
          <DashboardCard 
            imageLight="/1Xecochain/assets/Rectangle 1 (1).svg" 
            imageDark="/1Xecochain/assets/Rectangle 1 (1).png" 
            title={t('dashboard.createTokens')}
            description={t('dashboard.createTokensDescription')}
            buttonText={t('dashboard.createButton')}
            onButtonClick={() => {/* Открыть попап создания токена */}}
          />
          <DashboardCard 
            imageLight="/1Xecochain/assets/Rectangle 1 (2).svg" 
            imageDark="/1Xecochain/assets/Rectangle 1 (2).png" 
            title={t('dashboard.myTokens')}
            description={t('dashboard.myTokensDescription')}
            buttonText={t('dashboard.manageButton')}
            onButtonClick={() => navigate('/my-tokens')}
          />
        </div>
      </div>
      
      {/* Incubator Element - full width with 25px margins, size 1870x260, flush with bottom */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-50px)] max-w-[1870px] h-[260px] bg-transparent z-[-10] pointer-events-none overflow-hidden">
        <img
          src="/1Xecochain/assets/INCUBATOR.svg"
          alt="Incubator Background"
          className="absolute bottom-0 left-0 w-full h-auto dark:opacity-[.46]"
        />
      </div>
    </div>
  );
};

export default Dashboard;