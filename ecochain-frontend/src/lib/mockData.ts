// src/lib/mockData.ts

import type { Token, TokenDetail } from '@/types/token';

export const mockTokens: Token[] = [
  {
    id: '1',
    name: 'My New Token',
    symbol: 'MNT',
    imageUrl: '/assets/placeholders/token-placeholder.svg',
    price: 0.048,
    marketCap: '$4.4k',
    volume: '$385,069,594',
    holders: 6845,
    blockchain: 'X1',
    createdBy: 'noname',
    createdAt: new Date(Date.now() - 20000), // 20 секунд назад
    description: 'Join us in building a better, decentralized future.',
    replies: 1728,
  },
  {
    id: '2',
    name: 'EcoChain Token',
    symbol: 'ECO',
    imageUrl: '/assets/placeholders/token-placeholder.svg',
    price: 0.125,
    marketCap: '$12.8k',
    volume: '$520,450,123',
    holders: 3421,
    blockchain: 'X1',
    createdBy: 'crypto_dev',
    createdAt: new Date(Date.now() - 120000), // 2 минуты назад
    description: 'Sustainable blockchain for a greener tomorrow.',
    replies: 845,
  },
  {
    id: '3',
    name: 'Green Energy Coin',
    symbol: 'GEC',
    imageUrl: '/assets/placeholders/token-placeholder.svg',
    price: 0.0025,
    marketCap: '$2.1k',
    volume: '$98,234,567',
    holders: 1256,
    blockchain: 'X1',
    createdBy: 'eco_warrior',
    createdAt: new Date(Date.now() - 3600000), // 1 час назад
    description: 'Powering the future with clean energy.',
    replies: 432,
  },
  {
    id: '4',
    name: 'Blockchain Revolution',
    symbol: 'BRV',
    imageUrl: '/assets/placeholders/token-placeholder.svg',
    price: 0.087,
    marketCap: '$8.7k',
    volume: '$150,234,789',
    holders: 4230,
    blockchain: 'X1',
    createdBy: 'blockchain_guru',
    createdAt: new Date(Date.now() - 7200000), // 2 часа назад
    description: 'Revolutionizing how we think about decentralized systems.',
    replies: 2156,
  },
  {
    id: '5',
    name: 'NFT Gaming Coin',
    symbol: 'NGC',
    imageUrl: '/assets/placeholders/token-placeholder.svg',
    price: 0.234,
    marketCap: '$23.4k',
    volume: '$420,123,456',
    holders: 8765,
    blockchain: 'X1',
    createdBy: 'gamer_one',
    createdAt: new Date(Date.now() - 10800000), // 3 часа назад
    description: 'The future of gaming is decentralized and tokenized.',
    replies: 3421,
  },
  {
    id: '6',
    name: 'DeFi Pioneer',
    symbol: 'DFP',
    imageUrl: '/assets/placeholders/token-placeholder.svg',
    price: 0.156,
    marketCap: '$15.6k',
    volume: '$280,654,321',
    holders: 5678,
    blockchain: 'X1',
    createdBy: 'defi_master',
    createdAt: new Date(Date.now() - 14400000), // 4 часа назад
    description: 'Leading the charge in decentralized finance.',
    replies: 2789,
  },
  {
    id: '7',
    name: 'Metaverse Token',
    symbol: 'MVT',
    imageUrl: '/assets/placeholders/token-placeholder.svg',
    price: 0.034,
    marketCap: '$3.4k',
    volume: '$65,987,654',
    holders: 2345,
    blockchain: 'X1',
    createdBy: 'metaverse_explorer',
    createdAt: new Date(Date.now() - 18000000), // 5 часов назад
    description: 'Building the next generation virtual reality.',
    replies: 1567,
  },
  {
    id: '8',
    name: 'AI Coin',
    symbol: 'AIC',
    imageUrl: '/assets/placeholders/token-placeholder.svg',
    price: 0.321,
    marketCap: '$32.1k',
    volume: '$520,345,678',
    holders: 9876,
    blockchain: 'X1',
    createdBy: 'ai_researcher',
    createdAt: new Date(Date.now() - 21600000), // 6 часов назад
    description: 'Integrating artificial intelligence with blockchain.',
    replies: 4321,
  },
  {
    id: '9',
    name: 'Green Coin',
    symbol: 'GRC',
    imageUrl: '/assets/placeholders/token-placeholder.svg',
    price: 0.012,
    marketCap: '$1.2k',
    volume: '$35,123,456',
    holders: 1234,
    blockchain: 'X1',
    createdBy: 'eco_friendly',
    createdAt: new Date(Date.now() - 25200000), // 7 часов назад
    description: 'Supporting eco-friendly blockchain initiatives.',
    replies: 987,
  },
  {
    id: '10',
    name: 'Crypto Innovator',
    symbol: 'CIN',
    imageUrl: '/assets/placeholders/token-placeholder.svg',
    price: 0.456,
    marketCap: '$45.6k',
    volume: '$780,987,654',
    holders: 11223,
    blockchain: 'X1',
    createdBy: 'crypto_innovator',
    createdAt: new Date(Date.now() - 28800000), // 8 часов назад
    description: 'Pushing boundaries in cryptocurrency development.',
    replies: 5678,
  },
  {
    id: '11',
    name: 'Social Token',
    symbol: 'SOT',
    imageUrl: '/assets/placeholders/token-placeholder.svg',
    price: 0.067,
    marketCap: '$6.7k',
    volume: '$125,456,789',
    holders: 3456,
    blockchain: 'X1',
    createdBy: 'social_media',
    createdAt: new Date(Date.now() - 32400000), // 9 часов назад
    description: 'Building communities through tokenization.',
    replies: 2109,
  },
  {
    id: '12',
    name: 'Privacy Coin',
    symbol: 'PRV',
    imageUrl: '/assets/placeholders/token-placeholder.svg',
    price: 0.189,
    marketCap: '$18.9k',
    volume: '$340,234,567',
    holders: 6789,
    blockchain: 'X1',
    createdBy: 'privacy_advocate',
    createdAt: new Date(Date.now() - 36000000), // 10 часов назад
    description: 'Ensuring privacy in the digital age.',
    replies: 3210,
  },
  {
    id: '13',
    name: 'Stable Coin',
    symbol: 'STB',
    imageUrl: '/assets/placeholders/token-placeholder.svg',
    price: 0.999,
    marketCap: '$99.9k',
    volume: '$1,500,123,456',
    holders: 15678,
    blockchain: 'X1',
    createdBy: 'stable_holder',
    createdAt: new Date(Date.now() - 39600000), // 11 часов назад
    description: 'Stable value in a volatile market.',
    replies: 6789,
  },
  {
    id: '14',
    name: 'DeSci Token',
    symbol: 'DSC',
    imageUrl: '/assets/placeholders/token-placeholder.svg',
    price: 0.078,
    marketCap: '$7.8k',
    volume: '$145,789,012',
    holders: 4567,
    blockchain: 'X1',
    createdBy: 'science_fan',
    createdAt: new Date(Date.now() - 43200000), // 12 часов назад
    description: 'Decentralizing scientific research and funding.',
    replies: 2345,
  },
  {
    id: '15',
    name: 'Web3 Token',
    symbol: 'W3T',
    imageUrl: '/assets/placeholders/token-placeholder.svg',
    price: 0.234,
    marketCap: '$23.4k',
    volume: '$420,345,678',
    holders: 8765,
    blockchain: 'X1',
    createdBy: 'web3_dev',
    createdAt: new Date(Date.now() - 46800000), // 13 часов назад
    description: 'The next generation of internet technology.',
    replies: 3456,
  },
];

export const mockTokenDetail: TokenDetail = {
  ...mockTokens[0],
  fullDescription: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
    Adipisci architecto commodi consectetur consequatur corporis cum cumque 
    cupiditate deleniti dignissimos distinctio dolore dolorem dolores doloribus 
    ea eaque earum enim error est et eum eveniet ex excepturi exercitationem 
    expedita explicabo facere facilis fugiat fugit harum hic id illum impedit 
    in incidunt inventore ipsa ipsam ipsum iste itaque iure iusto labore 
    laboriosam laborum laudantium libero magnam magni maiores maxime minima 
    minus modi molestiae mollitia nam necessitatibus nemo neque nesciunt nihil 
    nisi nobis non nostrum nulla numquam obcaecati odit officia officiis omnis 
    optio pariatur perferendis placeat porro possimus praesentium provident 
    quae quam quas quasi qui quia quibusdam quidem quis quisquam quod 
    quos ratione recusandae rem repellat repellendus reprehenderit repudiandae 
    rerum saepe sapiente sequi similique sit soluta sunt suscipit tempora 
    tempore temporibus tenetur totam ullam unde ut vel veniam veritatis vero 
    voluptas voluptate voluptatem voluptates voluptatum.`,
  chartUrl: '/assets/placeholders/chart-placeholder.png',
  raised: '$7.5K',
  raiseTarget: '$2,400,000',
  raisePercentage: '150%',
};

export const mockUser = {
  address: '0x2...006728',
  name: 'Noname',
  balance: '1,234.56 USDT',
  avatar: '/assets/avatars/avatar-placeholder-36.svg',
  isConnected: false,
};