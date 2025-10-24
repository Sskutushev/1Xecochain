import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TokenCard from './TokenCard';
import type { Token } from '@/types/token';

// Mock токен для тестов
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

// Обертка для тестирования с BrowserRouter
const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('TokenCard', () => {
  it('renders token information correctly', () => {
    renderWithRouter(<TokenCard token={mockToken} />);
    
    // В текущей реализации компонента TokenCard не отображает name, а только символ
    // Согласно структуре компонента, проверим отображение ключевых элементов:
    expect(screen.getByText('TTK')).toBeInTheDocument();
    expect(screen.getByText('$1,000,000')).toBeInTheDocument(); // market cap
    expect(screen.getByText('50')).toBeInTheDocument(); // replies
    expect(screen.getByText('test-user')).toBeInTheDocument(); // creator
  });

  it('renders with different token data', () => {
    const differentToken = {
      ...mockToken,
      symbol: 'DIFF',
      marketCap: '$5,000,000',
      replies: 150,
    };
    
    renderWithRouter(<TokenCard token={differentToken} />);
    
    expect(screen.getByText('DIFF')).toBeInTheDocument();
    expect(screen.getByText('$5,000,000')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
  });
});