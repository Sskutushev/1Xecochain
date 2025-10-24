/**
 * Конфигурация Web3 провайдера (заглушка)
 */
export interface Web3Config {
  chainId: number;
  rpcUrl: string;
  contractAddress: string;
}

/**
 * Результат транзакции
 */
export interface TransactionResult {
  hash: string;
  success: boolean;
  error?: string;
}
