import { create } from 'zustand';
import type { Token, TokenFilters } from '@/types/token';

interface TokenState {
  tokens: Token[];
  filters: TokenFilters;
  isLoading: boolean;
  error: string | null;
  setTokens: (tokens: Token[]) => void;
  addTokens: (tokens: Token[]) => void;
  setFilters: (filters: Partial<TokenFilters>) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTokenStore = create<TokenState>((set) => ({
  tokens: [],
  filters: {
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  isLoading: false,
  error: null,
  setTokens: (tokens) => set({ tokens }),
  addTokens: (newTokens) =>
    set((state) => ({ tokens: [...state.tokens, ...newTokens] })),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
