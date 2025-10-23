/**
 * Основной тип токена
 */
export interface Token {
  id: string;
  name: string;
  symbol: string;
  imageUrl: string | null;
  price: number;
  marketCap: string;
  volume: string;
  holders: number;
  blockchain: string;
  createdBy: string;
  createdAt: Date;
  description: string;
  replies: number; // Количество комментариев/ответов
}

/**
 * Расширенная информация о токене для страницы деталей
 */
export interface TokenDetail extends Token {
  fullDescription: string;
  chartUrl: string;
  raised: string; // Текущая собранная сумма (например "$7.5K")
  raiseTarget: string; // Целевая сумма (например "$2,400,000")
  raisePercentage: string; // Процент выполнения (например "150%")
}

/**
 * Данные для создания нового токена
 */
export interface CreateTokenData {
  name: string;
  symbol: string;
  emission: number;
  info: string;
  image: File | null;
}

/**
 * Данные для добавления ликвидности
 */
export interface AddLiquidityData {
  x1TokenAmount: number;
  nktTokenAmount: string;
  tokenPriceUSD: number;
  tokenPriceX1: number;
}

/**
 * Фильтры для списка токенов
 */
export interface TokenFilters {
  search: string;
  sortBy: 'price' | 'marketCap' | 'volume' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}