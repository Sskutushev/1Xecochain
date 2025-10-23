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
    (set) => ({
      locale: 'en',
      setLocale: (locale) => {
        set({ locale });
        i18n.changeLanguage(locale);
      },
    }),
    {
      name: 'language-storage',
      migrate: (persistedState: any) => {
        // Migration function to handle state changes
        if (typeof persistedState === 'string') {
          try {
            return JSON.parse(persistedState);
          } catch {
            return { locale: 'en' };
          }
        }
        return persistedState || { locale: 'en' };
      },
      version: 1,
    }
  )
);

// Initialize language on app startup
if (typeof window !== 'undefined') {
  const storedLanguage = localStorage.getItem('language-storage');
  if (storedLanguage) {
    try {
      const parsed = JSON.parse(storedLanguage);
      if (parsed.state?.locale) {
        i18n.changeLanguage(parsed.state.locale);
      }
    } catch (e) {
      // Fallback to English
      i18n.changeLanguage('en');
    }
  }
}