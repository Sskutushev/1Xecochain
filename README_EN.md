# EcoChain Web3 Platform

## Project Description

EcoChain is a modern Web3 platform for creating tokens on the X1 blockchain. The platform provides users with the ability to create, manage, and distribute tokens without programming knowledge.

## Technology Stack

- **React 19** - Library for creating user interfaces
- **TypeScript** - Typed programming language
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling framework
- **React Router DOM** - Navigation management
- **Zustand** - State management
- **i18next** - Internationalization and localization
- **Lucide React** - Icon library
- **Date-fns** - Working with dates
- **Axios** - HTTP client for API requests
- **Vitest** - Testing framework
- **React Testing Library** - Library for testing React components
- **Storybook** - Tool for developing and documenting components
- **OpenAPI/Swagger** - API documentation

## Project Architecture

### Folder Structure

```
src/
├── assets/           # Static resources (images, icons)
├── components/       # Reusable components
│   ├── common/       # Common components (Button, Input, etc.)
│   ├── features/     # Business logic components
│   └── layout/       # Layout components (header, navigation, etc.)
├── hooks/            # Custom hooks
├── lib/              # Helper libraries and constants
├── locales/          # Localization files
├── pages/            # Application pages
├── store/            # Global state (Zustand)
├── types/            # TypeScript types
├── test/             # Testing files
├── App.tsx           # Main application component
├── main.tsx          # Application entry point
└── index.css         # Global styles
```

### File Descriptions

#### Components (components/)

- **common/Button** - Common button component with different display options
- **common/Input** - Input field with label support and styling
- **common/Modal** - Modal window for displaying information and forms
- **common/Switch** - Theme switch (light/dark)
- **features/Dashboard/DashboardCard** - Dashboard card with various functions
- **features/TokenCard** - Token card with information display
- **layout/Header** - Main application header with responsive design
- **layout/DesktopHeader** - Header for desktop devices
- **layout/MobileHeader** - Header for mobile devices
- **layout/MobileMenu** - Mobile navigation menu
- **layout/PageBackground** - Page background component

#### Pages (pages/)

- **AddLiquidity** - Token liquidity addition page
- **CreateToken** - New token creation page
- **Dashboard** - Main page with function cards
- **Listing** - Page with a list of all tokens
- **MyTokens** - User's tokens page
- **NotFound** - 404 error page
- **TokenDetail** - Token detail information page

#### Stores (store/)

- **useLanguageStore** - Language settings management
- **useModalStore** - Modal windows management
- **useThemeStore** - Theme management (light/dark)
- **useTokenStore** - Token information management
- **useUserStore** - User information management

#### Hooks (hooks/)

- **useClickOutside** - Hook for detecting clicks outside an element
- **useKeyPress** - Hook for tracking key presses
- **useMediaQuery** - Hook for responsive design
- **web3/useTokenContract** - Hook for working with token contracts (stub)
- **web3/useWallet** - Hook for wallet connection (stub)

#### Tests (test/)

- **setup.ts** - Test setup file
- **Button.test.tsx** - Tests for Button component
- **Input.test.tsx** - Tests for Input component
- **TokenCard.test.tsx** - Tests for TokenCard component
- **useTokenStore.test.ts** - Tests for token Zustand store
- **useThemeStore.test.ts** - Tests for theme Zustand store
- **useWallet.test.ts** - Tests for wallet connection hook
- **useMediaQuery.test.ts** - Tests for media query hook

#### API Documentation (api-docs/)

- **openapi.yaml** - Complete API specification in OpenAPI format
- **mock-server.js** - Mock server for development

#### Configurations

- **.storybook/main.ts** - Storybook configuration
- **.storybook/preview.ts** - Storybook preview settings
- **vite.config.ts** - Vite configuration with testing settings

## Installation and Local Launch

### Prerequisites

- Installed [Node.js](https://nodejs.org/) (version 18 or higher)
- Installed [Git](https://git-scm.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sskutushev/1Xecochain.git
   cd 1Xecochain
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application in development mode:
   ```bash
   npm run dev
   ```

The application will be available at http://localhost:5173

### Production Build

To build the application for production:
```bash
npm run build
```

To run the built application locally:
```bash
npm run serve
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests with UI
```bash
npm run test:ui
```

### Run tests with coverage
```bash
npm run test:coverage
```

## Running Storybook

To run Storybook:
```bash
npm run storybook
```

Storybook will be available at http://localhost:6006

## Generating API Types

To generate TypeScript types from OpenAPI specification:
```bash
npm run generate:api-types
```

## Running API Mock Server

To run the API mock server:
```bash
node api-docs/mock-server.js
```

Mock server will be available at http://localhost:3000/v1

## CI/CD Pipeline

### GitHub Actions

The project is configured with GitHub Actions:
- `.github/workflows/ci.yml` - Pipeline for code checking (lint, test, build)
- `.github/workflows/preview.yml` - Pipeline for preview deployment

### Pre-commit Hooks

The project uses husky and lint-staged for automatic code checking and formatting before committing.

## Environment Variables

The application uses the following environment variables:

- `VITE_API_URL` - API URL (default: http://localhost:3000/v1 for mock server)

## Replacing Stubs with Real API

### Mock Data

Stubs (mock data) are located in `src/lib/mockData.ts`. They can be replaced with real API calls:

1. Replace mock data imports with real API calls
2. Update stores to use real data
3. Use API client from `src/lib/api/client.ts`

### Using API Client

The API client is located in `src/lib/api/client.ts` and provides the following methods:
- `getTokens()` - Get list of tokens
- `getTokenById(id)` - Get token by ID
- `createToken(data)` - Create new token
- `addLiquidity(id, data)` - Add liquidity
- `connectWallet(data)` - Connect wallet
- `getMyTokens()` - Get user's tokens

## Localization

The application supports Russian and English languages:

- Localization files are in `src/locales/`
- Russian: `src/locales/ru/translation.json`
- English: `src/locales/en/translation.json`

To add new languages:
1. Add a new file to `src/locales/`
2. Update `src/lib/i18n.ts` with the new language

## Styling and Customization

The project uses Tailwind CSS for styling:

- Tailwind configuration in `tailwind.config.js`
- Global styles in `src/index.css`
- Custom classes can be added to `src/App.css`

## State Management

The project uses Zustand for state management:

- Stores are in `src/store/`
- Global data (users, tokens, settings) are managed through Zustand
- All stores have TypeScript typing

## Rights and Contact Information

Author of implementation: Kutushev Sergey
Telegram: @sskutushev
Email: sskutushev@gmail.com