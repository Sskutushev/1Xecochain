// src/components/features/TokenCard/TokenCard.tsx

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatDistanceToNow } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import type { Token } from '@/types/token';
import { useLanguageStore } from '@/store/useLanguageStore';

interface TokenCardProps {
  token: Token;
}

function TokenCard({ token }: TokenCardProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const locale = useLanguageStore((state) => state.locale);

  const timeAgo = formatDistanceToNow(token.createdAt, {
    addSuffix: true,
    locale: locale === 'ru' ? ru : enUS,
  });

  return (
    <div
      onClick={() => navigate(`/token/${token.id}`)}
      className="relative w-full h-[114px] rounded-10 bg-white dark:bg-[rgba(217,217,217,0.05)] shadow-card-light dark:shadow-card-dark dark:backdrop-blur-[73.2px] p-3 flex items-center gap-2.5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-[rgba(91,157,7,0.02)] dark:hover:bg-[rgba(88,255,132,0.03)]"
    >
      {/* Аватарка */}
      <div className="flex-shrink-0 w-[81px] h-[81px] mobile:w-[70px] mobile:h-[70px] rounded-full bg-light-avatar overflow-hidden">
        <img
          src={token.imageUrl || '/assets/placeholders/token-placeholder.svg'}
          alt={token.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Текстовая информация */}
      <div className="flex-1 h-[81px] mobile:h-[70px] flex flex-col justify-between pr-2.5">
        <div className="flex items-center gap-1 text-sm mobile:text-xs">
          <span className="text-light-text50 dark:text-dark-text50">
            {t('listing.createdBy')}
          </span>
          <span className="text-primary-green dark:text-dark-accent">
            {token.createdBy}
          </span>
        </div>

        <div className="flex items-center gap-1 text-sm mobile:text-xs">
          <span className="text-light-text50 dark:text-dark-text50">
            {t('listing.marketCap')}
          </span>
          <span className="text-light-text dark:text-dark-text">
            {token.marketCap}
          </span>
        </div>

        <div className="flex items-center gap-1 text-sm mobile:text-xs">
          <span className="text-light-text50 dark:text-dark-text50">
            {t('listing.replies')}
          </span>
          <span className="text-light-text dark:text-dark-text">
            {token.replies}
          </span>
        </div>

        <div className="text-sm mobile:text-xs text-light-text dark:text-dark-text">
          {token.symbol}
        </div>
      </div>

      {/* Time Badge */}
      <div className="absolute top-2 right-2 mobile:top-1.5 mobile:right-1.5 w-[65px] h-6 mobile:w-[55px] mobile:h-[22px] rounded-20 bg-[#E2E2E2] dark:bg-[rgba(217,217,217,0.05)] flex items-center justify-center">
        <span className="text-xs mobile:text-[11px] text-light-text dark:text-dark-text">
          {timeAgo.replace('about ', '').replace(' ago', '')}
        </span>
      </div>
    </div>
  );
}

export default TokenCard;