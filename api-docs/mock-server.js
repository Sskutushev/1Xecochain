// api-docs/mock-server.js

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Включаем CORS
app.use(cors());
app.use(express.json());

// Моковые данные для токенов
const mockTokens = [
  {
    id: '1',
    name: 'EcoChain Token',
    symbol: 'ECO',
    imageUrl: 'https://example.com/eco-token.png',
    price: 1.25,
    change24h: 5.32,
    marketCap: '$125,340,230',
    volume24h: '$23,450,123',
    holders: 12500,
    blockchain: 'X1',
    createdBy: 'user1',
    createdAt: new Date().toISOString(),
    description: 'EcoChain Token for sustainable blockchain solutions',
    replies: 125,
  },
  {
    id: '2',
    name: 'Green Energy Coin',
    symbol: 'GEC',
    imageUrl: 'https://example.com/gec-token.png',
    price: 0.87,
    change24h: -2.15,
    marketCap: '$87,450,670',
    volume24h: '$12,340,567',
    holders: 8500,
    blockchain: 'X1',
    createdBy: 'user2',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 день назад
    description: 'Token for green energy projects',
    replies: 89,
  },
  {
    id: '3',
    name: 'Sustainable Tech Token',
    symbol: 'STT',
    imageUrl: 'https://example.com/stt-token.png',
    price: 3.45,
    change24h: 12.67,
    marketCap: '$345,670,890',
    volume24h: '$45,670,234',
    holders: 23000,
    blockchain: 'X1',
    createdBy: 'user3',
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 дня назад
    description: 'Token for sustainable technology initiatives',
    replies: 234,
  },
  {
    id: '4',
    name: 'Carbon Credit Coin',
    symbol: 'CCC',
    imageUrl: 'https://example.com/ccc-token.png',
    price: 0.56,
    change24h: 1.23,
    marketCap: '$56,780,120',
    volume24h: '$8,900,456',
    holders: 5600,
    blockchain: 'X1',
    createdBy: 'user4',
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 дня назад
    description: 'Token for carbon credit marketplace',
    replies: 67,
  },
  {
    id: '5',
    name: 'Water Conservation Token',
    symbol: 'WCT',
    imageUrl: 'https://example.com/wct-token.png',
    price: 2.12,
    change24h: 7.89,
    marketCap: '$212,340,560',
    volume24h: '$32,120,789',
    holders: 15600,
    blockchain: 'X1',
    createdBy: 'user5',
    createdAt: new Date(Date.now() - 345600000).toISOString(), // 4 дня назад
    description: 'Token for water conservation projects',
    replies: 178,
  }
];

// Маршрут для получения токенов с пагинацией
app.get('/v1/tokens', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const search = req.query.search || '';
  const sort = req.query.sort || 'createdAt';

  // Фильтруем токены по поисковому запросу
  let filteredTokens = [...mockTokens];
  if (search) {
    filteredTokens = mockTokens.filter(token => 
      token.name.toLowerCase().includes(search.toLowerCase()) ||
      token.symbol.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Сортируем токены
  filteredTokens.sort((a, b) => {
    if (sort === 'price') return b.price - a.price;
    if (sort === 'marketCap') return parseFloat(b.marketCap.replace(/[^0-9.]/g, '')) - parseFloat(a.marketCap.replace(/[^0-9.]/g, ''));
    if (sort === 'name') return a.name.localeCompare(b.name);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // по умолчанию сортировка по дате создания
  });

  // Пагинация
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedTokens = filteredTokens.slice(startIndex, endIndex);

  res.json({
    success: true,
    count: paginatedTokens.length,
    page: page,
    totalPages: Math.ceil(filteredTokens.length / limit),
    data: paginatedTokens
  });
});

// Маршрут для получения токена по ID
app.get('/v1/tokens/:id', (req, res) => {
  const token = mockTokens.find(t => t.id === req.params.id);
  
  if (!token) {
    return res.status(404).json({
      success: false,
      message: 'Token not found'
    });
  }
  
  // Возвращаем токен с дополнительными деталями
  const tokenDetails = {
    ...token,
    fullDescription: `Detailed description for ${token.name} token. This token is dedicated to sustainable and eco-friendly blockchain solutions. It offers innovative features for decentralized finance applications focused on environmental impact reduction.`,
    totalSupply: 1000000000,
    circulatingSupply: 850000000,
    creator: {
      id: token.createdBy,
      address: '0x' + Math.random().toString(36).substring(2, 10),
      username: `Creator_${token.createdBy}`,
      avatar: `https://example.com/avatar/${token.createdBy}.png`
    }
  };

  res.json({
    success: true,
    data: tokenDetails
  });
});

// Маршрут для создания токена
app.post('/v1/tokens', (req, res) => {
  const { name, symbol, description, totalSupply, logo } = req.body;

  // Валидация
  if (!name || !symbol || !totalSupply) {
    return res.status(400).json({
      success: false,
      message: 'Name, symbol, and totalSupply are required'
    });
  }

  if (name.length < 3 || name.length > 50) {
    return res.status(400).json({
      success: false,
      message: 'Name must be between 3 and 50 characters'
    });
  }

  if (symbol.length < 2 || symbol.length > 10) {
    return res.status(400).json({
      success: false,
      message: 'Symbol must be between 2 and 10 characters'
    });
  }

  // Проверяем, что символ токена уникален
  const existingToken = mockTokens.find(t => t.symbol.toLowerCase() === symbol.toLowerCase());
  if (existingToken) {
    return res.status(400).json({
      success: false,
      message: 'Token symbol already exists'
    });
  }

  // Создаем новый токен
  const newToken = {
    id: String(mockTokens.length + 1),
    name,
    symbol: symbol.toUpperCase(),
    imageUrl: logo || null,
    price: 0.1, // Начальная цена
    change24h: 0,
    marketCap: '$0',
    volume24h: '$0',
    holders: 1, // Создатель токена
    blockchain: 'X1',
    createdBy: 'current_user', // В реальном приложении это будет ID текущего пользователя
    createdAt: new Date().toISOString(),
    description: description || 'No description provided',
    replies: 0,
  };

  mockTokens.push(newToken);

  res.status(201).json({
    success: true,
    data: newToken
  });
});

// Маршрут для добавления ликвидности
app.post('/v1/tokens/:id/liquidity', (req, res) => {
  const { id } = req.params;
  const { amount, tokenAmount, tokenPriceUSD, tokenPriceX1 } = req.body;

  // Проверяем существование токена
  const token = mockTokens.find(t => t.id === id);
  if (!token) {
    return res.status(404).json({
      success: false,
      message: 'Token not found'
    });
  }

  // Валидация
  if (!amount || !tokenAmount) {
    return res.status(400).json({
      success: false,
      message: 'Amount and tokenAmount are required'
    });
  }

  // В реальном приложении здесь была бы логика проверки баланса пользователя
  // и взаимодействия со смарт-контрактом

  res.json({
    success: true,
    message: 'Liquidity added successfully',
    data: {
      transactionHash: '0x' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      x1Amount: amount,
      nktAmount: tokenAmount,
      tokenPriceUSD: tokenPriceUSD || 0,
      tokenPriceX1: tokenPriceX1 || 0
    }
  });
});

// Маршрут для подключения кошелька
app.post('/v1/wallet/connect', (req, res) => {
  const { address, signature } = req.body;

  // Валидация
  if (!address || !signature) {
    return res.status(400).json({
      success: false,
      message: 'Address and signature are required'
    });
  }

  // В реальном приложении здесь была бы проверка подписи
  // Для мок-сервера просто создаем токен

  const user = {
    id: 'current_user',
    address,
    username: `User_${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
    avatar: `https://example.com/avatar/${address.substring(0, 10)}.png`
  };

  res.json({
    success: true,
    message: 'Wallet connected successfully',
    data: {
      token: 'mock_jwt_token_for_development',
      user
    }
  });
});

// Маршрут для получения токенов пользователя
app.get('/v1/users/me/tokens', (req, res) => {
  // Возвращаем все токены (в реальном приложении фильтровали бы по пользователю)
  res.json({
    success: true,
    count: mockTokens.length,
    data: mockTokens
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}/v1`);
});