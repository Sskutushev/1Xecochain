// src/components/features/Dashboard/DashboardCard.tsx
// 
// PURPOSE: Dashboard card component displaying featured tokens/services
// RESPONSIBILITY: Displays card with image, title, description, and action button
// IMPLEMENTS: Design specifications for dashboard cards (401px × 508px desktop)
// 
// KEY FEATURES:
// - Theme-aware image display (different images for light/dark themes)
// - Hover animations (translate Y and shadow enhancement)
// - Responsive sizing for different screen sizes
// - Translated content support
// - Action button with navigation
// 
// SPECIFICATION COMPLIANCE:
// - Size: 401px × 508px (desktop), responsive for tablet/mobile
// - Border-radius: 20px
// - Content layout with image overlay
// - Hover effects with transform and shadow

import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '@/store/useThemeStore';
import Button from '@/components/common/Button';

interface DashboardCardProps {
  imageLight: string;  // Image to display in light theme
  imageDark: string;   // Image to display in dark theme
}

function DashboardCard({ imageLight, imageDark }: DashboardCardProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useThemeStore((state) => state.theme);

  // Switch image based on current theme
  const currentImage = theme === 'dark' ? imageDark : imageLight;

  return (
    <div className="relative w-[401px] h-[508px] tablet:w-full mobile:w-full mobile:h-auto rounded-20 bg-white dark:bg-[rgba(217,217,217,0.05)] dark:shadow-card-dark dark:backdrop-blur-[73.2px] p-5 mobile:p-[14px] overflow-visible transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Выступающая картинка - Overlapping image at top */}
      <div className="absolute -top-10 mobile:-top-[30px] left-1/2 -translate-x-1/2 w-[250px] h-[130px] mobile:w-[180px] mobile:h-[100px] rounded-[500px] overflow-hidden bg-light-avatar z-10">
        <img
          src={currentImage}
          alt="Dashboard card"
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      </div>

      {/* Отступ под картинку - Space for the overlapping image */}
      <div className="h-[90px] mobile:h-[70px]" />

      {/* Content Box - Placeholder for content */}
      <div className="w-full h-[221px] mobile:h-[150px] rounded-10 bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(0,0,0,0.2)] dark:backdrop-blur-[73.2px] mb-[50px] mobile:mb-8" />

      {/* Заголовок - Card title */}
      <h3 className="text-xl mobile:text-lg font-semibold text-primary-green dark:text-dark-accent mb-[30px] mobile:mb-5">
        {t('dashboard.newTokens')}
      </h3>

      {/* Описание - Card description */}
      <p className="text-base mobile:text-sm font-normal leading-[1.4] text-light-text dark:text-dark-text mb-auto mobile:mb-[30px]">
        {t('dashboard.description')}
      </p>

      {/* Кнопка - Action button that navigates to token listing */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={() => navigate('/listing')}
        className="mt-auto mobile:!h-11 mobile:!text-sm"
      >
        {t('dashboard.discoverButton')}
        <ArrowRight className="ml-1.5 w-3 h-3 mobile:w-2.5 mobile:h-2.5" />
      </Button>
    </div>
  );
}

export default DashboardCard;