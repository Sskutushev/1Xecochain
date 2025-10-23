// src/pages/AddLiquidity/AddLiquidity.tsx
//
// НАЗНАЧЕНИЕ: Страница добавления ликвидности к токену
// ОТВЕТСТВЕННОСТЬ: Предоставляет форму для добавления ликвидности токена
// РЕАЛИЗУЕТ: Интерфейс для добавления X1 и NKT токенов в пул ликвидности
//
// ОСНОВНЫЕ ЭЛЕМЕНТЫ:
// - Форма с полями для ввода количества токенов
// - Поля для указания цены токена в USD и X1
// - Кнопка создания токена
// - Кнопка пропуска с переходом к списку токенов
//
// АРХИТЕКТУРА: Использует кастомные компоненты полей ввода и кнопки

import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/lib/i18n';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';

// Этот компонент можно вынести в common, если он будет переиспользоваться
const CustomInput = ({ label, ...props }: any) => (
  <div>
    {label && <label className="block text-xs font-regular mb-1 text-black/50 dark:text-white/50">{label}</label>}
    <input 
      {...props}
      className="w-full h-[48px] md:h-[48px] rounded-20 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 text-black dark:text-white placeholder:text-black/50 focus:border-2 focus:border-[#5B9D07] outline-none transition-all duration-200" 
    />
  </div>
);

const AddLiquidity: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex justify-center items-start pt-[132px] relative z-1">
      {/* Decorative Backgrounds */}
      <img
        src="/1Xecochain/assets/Vector.svg"
        alt="Vector Background"
        className="fixed top-[100px] left-[590px] w-[1660px] h-[900px] pointer-events-none z-[-30] dark:brightness-[0.22] dark:contrast-[1.2] dark:saturate-[1.5]"
      />
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-50px)] max-w-[1870px] h-[1000px] bg-transparent z-[-10] pointer-events-none overflow-hidden">
        <img
          src="/1Xecochain/assets/Create token.svg"
          alt="Create Token Background"
          className="absolute bottom-0 left-0 w-full h-auto dark:opacity-[.46]"
        />
      </div>
      
      {/* Main Container */}
      <div className="w-full max-w-[350px] md:max-w-[480px]">
        <h1 className={`${i18n.language === 'ru' ? 'text-lg md:text-xl' : 'text-xl md:text-3xl'} font-semibold text-[#5B9D07] dark:text-white text-center mb-[25px]`}>
          {t('addLiquidity.title', 'Add token liquidity')}
        </h1>

        {/* Content Card */}
        <div className="w-full bg-white dark:bg-white/5 rounded-10 dark:backdrop-blur-[73.2px] px-[15px] py-[25px] md:px-[20px] md:py-[25px] ring-1 ring-inset ring-white">
          <div className="flex flex-col gap-[10px]">
            
            {/* Form Fields */}
            <CustomInput name="x1_amount" label="X1 Token Amount" placeholder="100 000" />
            <CustomInput name="nkt_amount" label="NKT Token Amount" placeholder="NTK" />
            <CustomInput name="price_usd" label="Token Price (USD)" placeholder="$0,004" />
            <CustomInput name="price_x1" label="Token Price (X1)" placeholder="4" />

            {/* Submit Button */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              className="!h-[50px] !rounded-30 !text-sm !font-semibold mt-[5px]"
            >
              {t('addLiquidity.createButton', 'Create token')}
            </Button>
          </div>
        </div>

        {/* Skip Button */}
        <button 
          onClick={() => navigate('/listing')}
          className="w-full bg-transparent border-none text-xl font-regular text-black dark:text-white/70 hover:text-black/70 dark:hover:text-white transition-colors duration-200 mt-5 text-center"
        >
          {t('addLiquidity.skipButton', 'Skip')}
        </button>
      </div>
    </div>
  );
};

export default AddLiquidity;
