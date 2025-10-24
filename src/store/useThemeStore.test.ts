import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useThemeStore } from '@/store/useThemeStore';

// Мокаем localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  key: vi.fn(),
  length: 0,
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Мокаем document.documentElement.classList
Object.defineProperty(document, 'documentElement', {
  value: {
    classList: {
      add: vi.fn(),
      remove: vi.fn(),
    },
  },
});

describe('useThemeStore', () => {
  beforeEach(() => {
    // Очищаем mock перед каждым тестом
    vi.clearAllMocks();
    
    // Устанавливаем начальное состояние
    const { result } = renderHook(() => useThemeStore());
    act(() => {
      result.current.setTheme('light');
    });
  });

  it('initializes with default theme', () => {
    const { result } = renderHook(() => useThemeStore());
    
    expect(result.current.theme).toBe('light');
  });

  it('toggles theme correctly', () => {
    const { result } = renderHook(() => useThemeStore());
    
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(result.current.theme).toBe('dark');
    
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(result.current.theme).toBe('light');
  });

  it('sets theme correctly', () => {
    const { result } = renderHook(() => useThemeStore());
    
    act(() => {
      result.current.setTheme('dark');
    });
    
    expect(result.current.theme).toBe('dark');
  });
});