// src/store/useThemeStore.ts
//
// НАЗНАЧЕНИЕ: Хранилище Zustand для управления темой приложения
// ОТВЕТСТВЕННОСТЬ: Сохраняет и управляет состоянием темы (светлая/темная)
// РЕАЛИЗУЕТ: Персистентное хранение выбранной темы в localStorage
//
// ОСНОВНЫЕ ФУНКЦИИ:
// - Хранение текущей темы (light/dark)
// - Переключение между темами
// - Установка темы с обновлением класса в HTML элементе
// - Сохранение выбора темы в localStorage
//
// АРХИТЕКТУРА: Использует Zustand с middleware persist для сохранения состояния

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => {
        set({ theme });
        // Применить класс к HTML элементу
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { theme: newTheme };
        }),
    }),
    {
      name: 'theme-storage', // Ключ в localStorage
      migrate: (persistedState: any) => {
        // Migration function to handle state changes
        if (typeof persistedState === 'string') {
          try {
            return JSON.parse(persistedState);
          } catch {
            return { theme: 'light' };
          }
        }
        return persistedState || { theme: 'light' };
      },
      version: 1,
    }
  )
);

// Initialize theme on app startup
if (typeof window !== 'undefined') {
  const storedTheme = localStorage.getItem('theme-storage');
  if (storedTheme) {
    try {
      const parsed = JSON.parse(storedTheme);
      if (parsed.state?.theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {
      // Fallback to light theme
      document.documentElement.classList.remove('dark');
    }
  }
}
