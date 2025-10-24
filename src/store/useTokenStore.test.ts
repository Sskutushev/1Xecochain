import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTokenStore } from '@/store/useTokenStore';
import type { Token } from '@/types/token';

const mockToken: Token = {
  id: '1',
  name: 'Test Token',
  symbol: 'TTK',
  imageUrl: null,
  price: 100.50,
  marketCap: '$1,000,000',
  volume: '$500,000',
  holders: 1000,
  blockchain: 'Ethereum',
  createdBy: 'test-user',
  createdAt: new Date(),
  description: 'Test token description',
  replies: 50,
};

describe('useTokenStore', () => {
  beforeEach(() => {
    // Сброс состояния перед каждым тестом
    const { result } = renderHook(() => useTokenStore());
    act(() => {
      result.current.setTokens([]);
    });
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useTokenStore());
    
    expect(result.current.tokens).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.filters.search).toBe('');
  });

  it('adds tokens correctly', () => {
    const { result } = renderHook(() => useTokenStore());
    
    act(() => {
      result.current.setTokens([mockToken]);
    });
    
    expect(result.current.tokens).toHaveLength(1);
    expect(result.current.tokens[0]).toEqual(mockToken);
  });

  it('sets filters correctly', () => {
    const { result } = renderHook(() => useTokenStore());
    
    act(() => {
      result.current.setFilters({ search: 'test', sortBy: 'price' });
    });
    
    expect(result.current.filters.search).toBe('test');
    expect(result.current.filters.sortBy).toBe('price');
  });
});