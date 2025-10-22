import { create } from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';
import i18n from '@/lib/i18n';

type Locale = 'en' | 'ru';

interface LanguageState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

// Custom storage to handle migration
const createCustomStorage = (): StateStorage => ({
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    return item || null;
  },
  setItem: (name: string, value: string) => {
    localStorage.setItem(name, value);
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
});

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