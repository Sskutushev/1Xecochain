// src/components/features/TokenCard/TokenCard.tsx
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, differenceInWeeks } from 'date-fns';
import type { Token } from '@/types/token';

// Утилита для короткого формата времени
const formatTimeShort = (date: Date): string => {
  const now = new Date();
  const seconds = differenceInSeconds(now, date);
  if (seconds < 60) return `${seconds}s`;

  const minutes = differenceInMinutes(now, date);
  if (minutes < 60) return `${minutes}m`;

  const hours = differenceInHours(now, date);
  if (hours < 24) return `${hours}h`;

  const days = differenceInDays(now, date);
  if (days < 7) return `${days}d`;

  const weeks = differenceInWeeks(now, date);
  return `${weeks}w`;
};

interface TokenCardProps {
  token: Token;
}

function TokenCard({ token }: TokenCardProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const timeAgo = formatTimeShort(token.createdAt);

  return (
    <div
      onClick={() => navigate(`/token/${token.id}`)}
      className="relative w-full h-[100px] md:h-[105px] lg:h-[114px] max-w-[350px] md:max-w-[425px] lg:max-w-[408px] mx-auto rounded-lg bg-white dark:bg-[rgba(217,217,217,0.05)] dark:backdrop-blur-[73.2px] p-3 cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex items-center w-[325px] h-[70px] md:w-[395px] md:h-[75px] lg:w-[377px] lg:h-[85px]">
          {/* Аватарка */}
          <div className="flex-shrink-0 w-[70px] h-[70px] lg:w-[81px] lg:h-[81px] rounded-full bg-light-avatar overflow-hidden mr-[10px]">
            <img
              src={token.imageUrl || '/assets/placeholders/token-placeholder.svg'}
              alt={token.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Текстовая информация */}
          <div className="flex-1 flex flex-col justify-center text-xs lg:text-sm font-regular">
            <p className="truncate">
              <span className="text-[#1C4430]/50 dark:text-white/50">{t('listing.createdBy', 'Created by:')} </span>
              <span className="text-[#5B9D07] dark:text-[#58FF84]">{token.createdBy}</span>
            </p>
            <p className="truncate">
              <span className="text-[#1C4430]/50 dark:text-white/50">{t('listing.marketCap', 'market cap:')} </span>
              <span className="text-[#1C4430] dark:text-white">{token.marketCap}</span>
            </p>
            <p className="truncate">
              <span className="text-[#1C4430]/50 dark:text-white/50">{t('listing.replies', 'replies:')} </span>
              <span className="text-[#1C4430] dark:text-white">{token.replies}</span>
            </p>
            <p className="text-[#1C4430] dark:text-white truncate">
              {token.symbol}
            </p>
          </div>
        </div>
      </div>

      {/* Time Badge */}
      <div className="absolute top-2 right-2 w-[55px] h-[20px] md:w-[60px] md:h-[22px] lg:w-[65px] lg:h-[24px] rounded-20 bg-[#E2E2E2] dark:bg-white/10 flex items-center justify-center">
        <span className="text-[10px] md:text-xs font-regular text-[#1C4430] dark:text-white">
          {timeAgo}
        </span>
      </div>
    </div>
  );
}

export default TokenCard;
