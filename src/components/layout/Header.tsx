// src/components/layout/Header/Header.tsx
// 
// НАЗНАЧЕНИЕ: Основной компонент шапки, адаптирующийся под десктоп, планшет и мобильные макеты
// ОТВЕТСТВЕННОСТЬ: Обеспечивает навигацию, поиск, профиль пользователя и управление темой
// РЕАЛИЗУЕТ: Адаптивный дизайн на основе контрольных точек (десктоп, планшет, мобильный)
// 
// КЛЮЧЕВЫЕ ФУНКЦИИ:
// - Переключение адаптивного макета в зависимости от ширины экрана
// - Десктоп: 1375px+ (полноценный интерфейс с поиском, навигацией, профилем)
// - Планшет: 578px-1374px (упрощенный интерфейс - меню, логотип, кнопка создания как на мобильном)
// - Мобильный: <578px (простой интерфейс - меню, логотип, кнопка создания)
// - Фиксированная высота 70px для десктопа, 40px для планшета/мобильного

import DesktopHeader from './DesktopHeader';
import TabletHeader from './TabletHeader';
import MobileHeader from './MobileHeader';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const Header: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 577px)');
  const isTablet = useMediaQuery('(min-width: 578px) and (max-width: 1374px)');

  return (
    <>
      {isMobile ? <MobileHeader /> : isTablet ? <TabletHeader /> : <DesktopHeader />}
    </>
  );
};

export default Header;
