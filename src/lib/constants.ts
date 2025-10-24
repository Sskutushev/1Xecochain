/**
 * Breakpoints для адаптивного дизайна
 */
export const BREAKPOINTS = {
  MOBILE: 360,
  TABLET: 768,
  DESKTOP: 1240,
  XL: 1920,
} as const;

/**
 * Адаптивные размеры для хедера на разных разрешениях
 */
export const HEADER_RESPONSIVE = {
  MOBILE: {
    width: 'calc(100% - 50px)',
    maxWidth: 350,
    height: 36,
    padding: 16,
  },
  TABLET: {
    width: 'calc(100% - 50px)',
    maxWidth: 768,
    height: 'clamp(40px, 5vw, 60px)',
    padding: 'clamp(10px, 2.5vw, 20px)',
  },
  DESKTOP: {
    width: 'calc(100% - 50px)',
    maxWidth: 1870,
    height: 'clamp(50px, 3.5vw, 70px)',
    padding: 'clamp(20px, 3.5vw, 50px)',
  },
} as const;

/**
 * Размеры контейнеров на разных разрешениях
 */
export const CONTAINER_SIZES = {
  MOBILE: 350,
  TABLET: 900,
  DESKTOP: 1295,
} as const;

/**
 * Размеры header на разных разрешениях
 */
export const HEADER_SIZES = {
  DESKTOP: { width: 1870, height: 70 },
  MOBILE: { width: 350, height: 36 },
} as const;

/**
 * Размеры Dashboard карточек
 */
export const DASHBOARD_CARD = {
  DESKTOP: { width: 401, height: 508 },
  TABLET: { width: 425, height: 480 },
  MOBILE: { width: 350, height: 'auto' },
  IMAGE: { width: 250, height: 130 },
  CONTENT_BOX: { width: 369, height: 221 },
} as const;

/**
 * Размеры карточек токенов
 */
export const TOKEN_CARD = {
  DESKTOP: { width: 408, height: 114 },
  TABLET: { width: 425, height: 105 },
  MOBILE: { width: 350, height: 114 },
  AVATAR: { width: 81, height: 81 },
  TIME_BADGE: { width: 65, height: 24 },
} as const;

/**
 * Цветовая палитра проекта
 */
export const COLORS = {
  primary: {
    green: '#5B9D07',
    purple: '#8247E5',
    yellow: '#F0B90B',
    darkGreen: '#05521A',
  },
  light: {
    bg: '#F1F1F1',
    bgSecondary: '#FFFFFF',
    text: '#1C4430',
    text50: 'rgba(28, 68, 48, 0.5)',
    avatar: '#D9D9D9',
  },
  dark: {
    bg: '#0F0F16',
    bgSecondary: 'rgba(217, 217, 217, 0.05)',
    text: '#FFFFFF',
    text50: 'rgba(255, 255, 255, 0.5)',
    accent: '#58FF84',
  },
  sell: {
    red: '#FF5858',
    hover: '#E04848',
  },
} as const;

/**
 * Transition timing для анимаций
 */
export const TRANSITIONS = {
  fast: '0.2s ease',
  normal: '0.3s ease-out',
  slow: '0.4s ease-out',
} as const;

/**
 * Z-index hierarchy
 */
export const Z_INDEX = {
  base: 1,
  elevated: 10,
  dropdown: 100,
  drawer: 500,
  overlay: 998,
  modal: 999,
  notification: 1000,
} as const;

/**
 * Отступы между элементами
 */
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 40,
  '5xl': 50,
  '6xl': 60,
  '7xl': 80,
} as const;

/**
 * Routes приложения
 */
export const ROUTES = {
  DASHBOARD: '/',
  LISTING: '/listing',
  MY_TOKENS: '/my-tokens',
  CREATE_TOKEN: '/create-token',
  ADD_LIQUIDITY: '/add-liquidity',
  TOKEN_DETAIL: '/token/:id',
  NOT_FOUND: '*',
} as const;

/**
 * Локали для i18n
 */
export const LOCALES = {
  EN: 'en',
  RU: 'ru',
} as const;

/**
 * Темы приложения
 */
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;
