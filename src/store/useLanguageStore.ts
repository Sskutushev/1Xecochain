// src/store/useLanguageStore.ts
//
// НАЗНАЧЕНИЕ: Хранилище Zustand для управления языковыми настройками
// ОТВЕТСТВЕННОСТЬ: Сохраняет и управляет состоянием выбранного языка
// РЕАЛИЗУЕТ: Персистентное хранение выбранного языка и изменение языка интерфейса
//
// ОСНОВНЫЕ ФУНКЦИИ:
// - Хранение текущего языка (en/ru)
// - Установка языка с обновлением интерфейса
// - Сохранение выбора языка в localStorage
// - Интеграция с i18next для изменения языка приложения
//
// АРХИТЕКТУРА: Использует Zustand с middleware persist для сохранения состояния

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '@/lib/i18n';

type Locale = 'en' | 'ru';

interface LanguageState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      locale: 'en',
      setLocale: (locale) => {
        console.log('useLanguageStore: Setting locale to', locale);
        set({ locale });
        i18n.changeLanguage(locale);
        console.log('useLanguageStore: i18n.changeLanguage called with', locale);
      },
    }),
    {
      name: 'language-storage',
    }
  )
);
