// src/hooks/useMediaQuery.ts
//
// НАЗНАЧЕНИЕ: Кастомный хук для проверки медиа-запросов CSS
// ОТВЕТСТВЕННОСТЬ: Предоставляет информацию о соответствии текущего размера экрана заданному медиа-запросу
// РЕАЛИЗУЕТ: Адаптивный дизайн на основе медиа-запросов CSS
//
// ОСНОВНЫЕ ФУНКЦИИ:
// - Отслеживание изменений размера экрана
// - Возврат значения соответствия медиа-запросу
// - Управление обработчиками событий resize
//
// АРХИТЕКТУРА: Использует window.matchMedia для проверки медиа-запросов

import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};
