// src/components/features/Dashboard/DashboardCard.tsx
// 
// НАЗНАЧЕНИЕ: Компонент карточки дашборда, отображающий токены/сервисы
// ОТВЕТСТВЕННОСТЬ: Отображает карточку с изображением, заголовком, описанием и кнопкой действия
// РЕАЛИЗУЕТ: Спецификации дизайна для карточек дашборда (401px × 508px на десктопе)
// 
// ОСНОВНЫЕ ФУНКЦИИ:
// - Отображение изображений с учетом темы (разные изображения для светлой/темной тем)
// - Анимации при наведении (перемещение по Y и усиление тени)
// - Адаптивный размер для разных размеров экранов
// - Поддержка перевода контента
// - Кнопка действия с навигацией
// 
// СООТВЕТСТВИЕ СПЕЦИФИКАЦИЯМ:
// - Размер: 401px × 508px (десктоп), адаптивный для планшета/мобильного
// - Border-radius: 20px
// - Макет контента с наложением изображения
// - Эффекты при наведении с трансформацией и тенью

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '@/store/useThemeStore';

interface DashboardCardProps {
  imageLight: string;  // Изображение для отображения в светлой теме
  imageDark: string;   // Изображение для отображения в темной теме
  title: string;       // Заголовок карточки
  description: string; // Описание карточки
  buttonText: string;  // Текст на кнопке
  onButtonClick: () => void; // Обработчик клика по кнопке
}

export default function DashboardCard({ 
  imageLight, 
  imageDark, 
  title, 
  description, 
  buttonText,
  onButtonClick 
}: DashboardCardProps) {
  const { t } = useTranslation();
  const theme = useThemeStore((state) => state.theme);

  // Switch image based on current theme
  const currentImage = theme === 'dark' ? imageDark : imageLight;

  return (
    <div className="relative w-full desktop:w-[401px] desktop:h-[508px] tablet:w-[min(100vw-50px,350px)] tablet:h-[508px] mobile:w-[min(100vw-50px,350px)] mobile:h-[508px] rounded-20 bg-white dark:bg-[rgba(217,217,217,0.05)] dark:shadow-card-dark dark:backdrop-blur-[73.2px] p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Выступающая картинка - Absolutely positioned over other elements */}
      <div className="absolute -top-[125px] left-1/2 -translate-x-1/2 w-[350px] h-[230px] rounded-[500px] overflow-hidden bg-transparent z-20">
        <img
          src={currentImage}
          alt="Dashboard card"
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      </div>

      {/* Content Container - Positioned with proper margins */}
      <div className="pt-[0px]">
        {/* Content Box - With fixed margins for desktop, adaptive for mobile/tablet */}
        <div className="w-full h-[221px] rounded-10 bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(0,0,0,0.05)] mb-[50px] mx-[0px] mt-[0px] tablet:mb-[25px] mobile:mb-[25px]" />

        {/* Заголовок - Card title */}
        <h3 className="text-xl tablet:text-lg mobile:text-lg font-semibold text-primary-green dark:text-dark-accent mb-[50px] tablet:mb-[50px] mobile:mb-[50px] mx-[16px]">
          {title}
        </h3>

        {/* Описание - Card description */}
        <p className="text-base tablet:text-sm mobile:text-sm font-light leading-[1.4] text-light-text dark:text-dark-text mb-auto tablet:mb-[50px] mobile:mb-[50px] mx-[16px]">
          {description}
        </p>

        {/* Кнопка - Action button that navigates to token listing */}
        <button
          onClick={onButtonClick}
          className="w-[250px] tablet:w-[217px] mobile:w-[217px] h-[54px] tablet:h-[47px] mobile:h-[47px] bg-primary-green dark:bg-white rounded-20 flex items-center gap-2 pl-[34px] tablet:pl-[20px] mobile:pl-[20px] hover:bg-primary-darkGreen dark:hover:bg-[rgba(255,255,255,0.9)] transition-colors mx-[16px]"
        >
          <span className="text-sm font-bold text-white dark:text-black">
            {buttonText}
          </span>
          <img 
            src="/assets/Icon.svg" 
            alt="arrow" 
            className="w-3 h-3 tablet:w-2.5 tablet:h-2.5 mobile:w-2.5 mobile:h-2.5 text-white dark:text-black brightness-100 dark:brightness-0" 
          />
        </button>
      </div>
    </div>
  );
}