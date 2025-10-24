import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWallet } from '@/hooks/web3/useWallet';

// Мок для useUserStore
const mockSetUser = vi.fn();
const mockClearUser = vi.fn();

// Правильная мокировка хука
vi.mock('@/store/useUserStore', async () => {
  const actual = await vi.importActual('@/store/useUserStore');
  return {
    ...actual,
    useUserStore: vi.fn(() => ({
      setUser: mockSetUser,
      clearUser: mockClearUser,
    })),
  };
});

describe('useWallet', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('connects wallet successfully', async () => {
    const { result } = renderHook(() => useWallet());

    await act(async () => {
      await result.current.connectWallet();
    });

    // Ожидаем, что состояние подключения изменится на false
    // и что setUser был вызван
    expect(result.current.isConnecting).toBe(false);
    expect(mockSetUser).toHaveBeenCalled();
  });

  it('disconnects wallet', async () => {
    const { result } = renderHook(() => useWallet());

    await act(async () => {
      result.current.disconnectWallet();
    });

    expect(mockClearUser).toHaveBeenCalled();
  });
});