import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import TokenCard from './TokenCard';
import type { Token } from '@/types/token';

// Обертка для BrowserRouter
const withRouter = (Story: React.ComponentType) => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
);

const meta = {
  title: 'Features/TokenCard',
  component: TokenCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Нет интерактивных пропсов для TokenCard
  },
  decorators: [withRouter],
} satisfies Meta<typeof TokenCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockToken: Token = {
  id: '1',
  name: 'EcoChain Token',
  symbol: 'ECO',
  imageUrl: null,
  price: 1.25,
  marketCap: '$125,340,230',
  volume: '$23,450,123',
  holders: 12500,
  blockchain: 'X1',
  createdBy: 'user1',
  createdAt: new Date(),
  description: 'EcoChain Token for sustainable blockchain solutions',
  replies: 125,
};

export const Default: Story = {
  args: {
    token: mockToken,
  },
};

export const WithPositiveChange: Story = {
  args: {
    token: {
      ...mockToken,
      id: '2',
      name: 'Green Energy Coin',
      symbol: 'GEC',
      price: 0.87,
    },
  },
};

export const WithNegativeChange: Story = {
  args: {
    token: {
      ...mockToken,
      id: '3',
      name: 'Sustainable Tech Token',
      symbol: 'STT',
      price: 3.45,
    },
  },
};

export const HighMarketCap: Story = {
  args: {
    token: {
      ...mockToken,
      id: '4',
      name: 'Large Cap Token',
      symbol: 'LCT',
      price: 123.45,
      marketCap: '$1,234,567,890',
      volume: '$123,456,789',
    },
  },
};

export const NewToken: Story = {
  args: {
    token: {
      ...mockToken,
      id: '5',
      name: 'New Token',
      symbol: 'NTK',
      price: 0.1,
      marketCap: '$1,000,000',
      volume: '$100,000',
      holders: 100,
      createdAt: new Date(Date.now() - 3600000), // 1 час назад
    },
  },
};

// Отдельный компонент для грид-примера
const TokenCardGridComponent: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
      <TokenCard token={mockToken} />
      <TokenCard token={{
        ...mockToken,
        id: '2',
        name: 'Green Energy Coin',
        symbol: 'GEC',
        price: 0.87,
      }} />
      <TokenCard token={{
        ...mockToken,
        id: '3',
        name: 'Sustainable Tech Token',
        symbol: 'STT',
        price: 3.45,
      }} />
    </div>
  );
};

export const Grid: Story = {
  render: () => <TokenCardGridComponent />,
};