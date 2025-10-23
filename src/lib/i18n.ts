// src/lib/i18n.ts
//
// НАЗНАЧЕНИЕ: Конфигурация библиотеки i18next для интернационализации
// ОТВЕТСТВЕННОСТЬ: Настройка и инициализация системы перевода приложения
// РЕАЛИЗУЕТ: Поддержку многоязычности с русским и английским языками
//
// ОСНОВНЫЕ ФУНКЦИИ:
// - Инициализация i18next с поддержкой React
// - Загрузка переводов для русского и английского языков
// - Установка языка по умолчанию и резервного языка
// - Настройка интерполяции текста
//
// АРХИТЕКТУРА: Подключает локализации из папки locales и настраивает переводы

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '@/locales/en/translation.json';
import ruTranslation from '@/locales/ru/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    ru: { translation: ruTranslation },
  },
  lng: 'en', // Язык по умолчанию
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React уже защищает от XSS
  },
});

export default i18n;