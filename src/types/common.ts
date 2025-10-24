/**
 * Общий тип для компонентов с children
 */
export interface WithChildren {
  children: React.ReactNode;
}

/**
 * Общий тип для компонентов с className
 */
export interface WithClassName {
  className?: string;
}

/**
 * Состояния загрузки
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Темы приложения
 */
export type Theme = 'light' | 'dark';

/**
 * Языки приложения
 */
export type Locale = 'en' | 'ru';

/**
 * Размеры компонентов
 */
export type ComponentSize = 'sm' | 'md' | 'lg';

/**
 * Варианты кнопок
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'sell';
