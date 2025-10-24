/**
 * Данные пользователя
 */
export interface User {
  address: string;
  name: string;
  balance: string;
  avatar?: string;
  isConnected: boolean;
}

/**
 * Состояние подключения кошелька
 */
export interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}
