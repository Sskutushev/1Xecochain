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

  const theme = useThemeStore((state) => state.theme);

  const currentImage = theme === 'dark' ? imageDark : imageLight;

  return (
    // КАРТОЧКА: Фиксированные размеры для десктопа и мобильных
    <div className="relative w-[350px] h-[442px] md:w-[401px] md:h-[508px] rounded-20 bg-white dark:bg-[rgba(217,217,217,0.05)] dark:shadow-card-dark dark:backdrop-blur-[73.2px] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden">
      
      {/* Цветная картинка сверху (абсолют) */}
      <div className="absolute -top-[125px] left-1/2 -translate-x-1/2 w-[350px] h-[250px] z-10">
        <img
          src={currentImage}
          alt="Decorative element"
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      </div>

      {/* Контейнер-обертка для позиционирования */}
      <div className="relative w-full h-full">
        
        {/* СЕРЫЙ КОНТЕЙНЕР: Адаптивные размеры */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[321px] h-[192px] md:w-[369px] md:h-[221px] rounded-[8.7px] bg-black/5 dark:bg-black/5 dark:ring-1 dark:ring-inset dark:ring-white/80" />

        {/* КОНТЕНТ: Адаптивные отступы и размеры шрифтов/кнопок */}
        <div className="absolute top-[calc(0px+192px+20px)] md:top-[calc(0px+221px+20px)] left-0 right-0 px-5">
          
          <h3 className="text-xl md:text-2xl font-bold text-primary-green dark:text-dark-accent mb-[15px]">
            {title}
          </h3>
          
          <p className="text-base md:text-lg font-light leading-[1.4] text-light-text dark:text-dark-text mb-[10px] md:mb-[40px]">
            {description}
          </p>

          <button
            onClick={onButtonClick}
            className="w-[217px] h-[47px] md:w-[250px] md:h-[55px] bg-primary-green dark:bg-white rounded-20 flex items-center gap-2 pl-6 hover:bg-primary-darkGreen dark:hover:bg-[rgba(255,255,255,0.9)] transition-colors"
          >
            <span className="text-base md:text-lg font-bold text-white dark:text-black">
              {buttonText}
            </span>
            <img 
              src="/1Xecochain/assets/Icon.svg" 
              alt="arrow" 
              className="w-3 h-3 text-white dark:text-black brightness-100 dark:brightness-0 transform translate-x-0.5" 
            />
          </button>
        </div>
      </div>
    </div>
  );
}