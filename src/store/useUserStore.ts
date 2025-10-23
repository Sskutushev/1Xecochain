import { create } from 'zustand';
import type { User } from '@/types/user';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  updateBalance: (balance: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  updateBalance: (balance) =>
    set((state) => (state.user ? { user: { ...state.user, balance } } : state)),
}));