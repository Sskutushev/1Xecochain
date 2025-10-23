// src/hooks/web3/useWallet.ts

import { useState, useCallback } from 'react';
import { useUserStore } from '@/store/useUserStore';

export const useWallet = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, clearUser } = useUserStore();

  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // TODO: Реальная Web3 интеграция
      // const provider = await detectEthereumProvider();
      // const accounts = await provider.request({ method: 'eth_requestAccounts' });

      // ЗАГЛУШКА: имитация подключения
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser = {
        address: '0x2...006728',
        name: 'Noname',
        balance: '1,234.56 USDT',
        isConnected: true,
      };

      setUser(mockUser);
      setIsConnecting(false);
      return mockUser;
    } catch (err) {
      setError('Failed to connect wallet');
      setIsConnecting(false);
      throw err;
    }
  }, [setUser]);

  const disconnectWallet = useCallback(() => {
    clearUser();
    // TODO: Отключение от Web3 провайдера
  }, [clearUser]);

  return {
    connectWallet,
    disconnectWallet,
    isConnecting,
    error,
  };
};