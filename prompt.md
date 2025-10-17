# УПРОЩЕННАЯ СБОРКА ФРОНТЕНДА - ПОЛНОЕ РУКОВОДСТВО

## КОНЦЕПЦИЯ ПРОЕКТА

**Задача:** Создать чистую верстку-скелет без бэкенда, который потом легко интегрировать с любым стеком.

**Принцип:** Минимализм, универсальность, без сложных зависимостей Web3 на старте.

---

## СТЕК ТЕХНОЛОГИЙ (УПРОЩЕННЫЙ)

```
✅ React 18 + TypeScript
✅ Vite 5
✅ Tailwind CSS 4 (новая версия без PostCSS конфликтов)
✅ React Router v6
✅ Zustand (легкое управление состоянием)
✅ Axios (для будущих API запросов)
❌ БЕЗ RainbowKit (пока)
❌ БЕЗ Wagmi (пока)
❌ БЕЗ Web3 библиотек (пока)
```

---

## РЕШЕНИЕ ПРОБЛЕМЫ С TAILWIND

**Проблема:** Конфликт Tailwind CSS 3 с PostCSS в Vite

**Решение:** Используем Tailwind CSS 4 (PostCSS-free версию)

---

## ПОШАГОВАЯ УСТАНОВКА ПРОЕКТА

### ШАГ 1: Удаляем старый проект и создаем новый

```bash
# Удаляем node_modules и package-lock.json
rm -rf node_modules package-lock.json

# Создаем новый проект
npm create vite@latest ecochain-frontend -- --template react-ts
cd ecochain-frontend
```

---

### ШАГ 2: Устанавливаем зависимости

```bash
# Основные зависимости
npm install react-router-dom zustand axios

# Tailwind CSS 4 (новая версия)
npm install tailwindcss@next @tailwindcss/vite@next

# Иконки
npm install lucide-react
```

**package.json будет выглядеть так:**

```json
{
  "name": "ecochain-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.6.0",
    "lucide-react": "^0.400.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "zustand": "^4.5.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0-alpha.25",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "tailwindcss": "^4.0.0-alpha.25",
    "typescript": "^5.2.0",
    "vite": "^5.1.0"
  }
}
```

---

### ШАГ 3: Настройка Vite (vite.config.ts)

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
```

---

### ШАГ 4: Настройка Tailwind (БЕЗ postcss.config.js!)

**Создаем файл: `tailwind.config.ts`**

```typescript
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Светлая тема
        "brand-green": "#5B9D07",
        "brand-purple": "#8247E5",
        "brand-yellow": "#F0B90B",
        "bg-light": "#FFFFFF",
        "bg-light-secondary": "#F1F1F1",
        "text-light": "#1C4430",
        "avatar-light": "#D9D9D9",
        "sell-red": "#FF5858",

        // Темная тема
        "bg-dark": "#0F0F16",
        "text-dark": "#FFFFFF",
        "text-accent-dark": "#58FF84",
        "sell-bg-dark": "#00000040",
        "sell-hover-dark": "#862323",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      maxWidth: {
        desktop: "1295px",
        mobile: "320px",
      },
    },
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;
```

---

### ШАГ 5: Создаем структуру проекта

```
ecochain-frontend/
├── public/
├── src/
│   ├── assets/                    # Изображения, иконки
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx         # Хедер с навигацией
│   │   │   ├── Footer.tsx         # Футер
│   │   │   └── Container.tsx      # Адаптивный контейнер
│   │   ├── ui/
│   │   │   ├── Button.tsx         # Кнопки
│   │   │   ├── Input.tsx          # Поля ввода
│   │   │   ├── Card.tsx           # Карточки
│   │   │   └── Modal.tsx          # Модальные окна
│   │   └── token/
│   │       ├── TokenCard.tsx      # Карточка токена
│   │       └── TokenGrid.tsx      # Сетка токенов
│   ├── pages/
│   │   ├── Dashboard.tsx          # Главная страница
│   │   ├── TokenListing.tsx       # Список токенов
│   │   ├── TokenDetail.tsx        # Детальная страница токена
│   │   ├── CreateToken.tsx        # Создание токена
│   │   └── MyTokens.tsx           # Мои токены
│   ├── store/
│   │   └── useStore.ts            # Zustand store
│   ├── styles/
│   │   └── globals.css            # Глобальные стили
│   ├── types/
│   │   └── index.ts               # TypeScript типы
│   ├── utils/
│   │   ├── constants.ts           # Константы
│   │   └── helpers.ts             # Вспомогательные функции
│   ├── App.tsx                    # Главный компонент
│   ├── main.tsx                   # Входная точка
│   └── router.tsx                 # Настройка роутинга
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── vite.config.ts
```

---

## ОСНОВНЫЕ ФАЙЛЫ С КОДОМ

### 1. src/main.tsx

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

### 2. src/styles/globals.css

```css
@import "tailwindcss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Плавные переходы для темы */
* {
  transition: background-color 0.2s ease, color 0.2s ease,
    border-color 0.2s ease;
}

/* Скролл */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.dark ::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
```

---

### 3. src/App.tsx

```typescript
import { BrowserRouter } from "react-router-dom";
import { useStore } from "./store/useStore";
import AppRouter from "./router";
import Header from "./components/layout/Header";

function App() {
  const theme = useStore((state) => state.theme);

  return (
    <div className={theme}>
      <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
        <BrowserRouter>
          <Header />
          <main>
            <AppRouter />
          </main>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
```

---

### 4. src/router.tsx

```typescript
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TokenListing from "./pages/TokenListing";
import TokenDetail from "./pages/TokenDetail";
import CreateToken from "./pages/CreateToken";
import MyTokens from "./pages/MyTokens";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/listing" element={<TokenListing />} />
      <Route path="/token/:id" element={<TokenDetail />} />
      <Route path="/create" element={<CreateToken />} />
      <Route path="/my-tokens" element={<MyTokens />} />
    </Routes>
  );
}
```

---

### 5. src/store/useStore.ts (Zustand)

```typescript
import { create } from "zustand";

interface AppState {
  // Тема
  theme: "light" | "dark";
  toggleTheme: () => void;

  // Модальные окна
  isModalOpen: boolean;
  modalType: "create" | "liquidity" | null;
  openModal: (type: "create" | "liquidity") => void;
  closeModal: () => void;

  // Кошелек (заглушка)
  walletAddress: string | null;
  setWalletAddress: (address: string | null) => void;

  // Токены (моковые данные)
  tokens: any[];
  selectedToken: any | null;
  setSelectedToken: (token: any) => void;
}

export const useStore = create<AppState>((set) => ({
  // Тема
  theme: "light",
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),

  // Модальные окна
  isModalOpen: false,
  modalType: null,
  openModal: (type) => set({ isModalOpen: true, modalType: type }),
  closeModal: () => set({ isModalOpen: false, modalType: null }),

  // Кошелек
  walletAddress: null,
  setWalletAddress: (address) => set({ walletAddress: address }),

  // Токены
  tokens: [],
  selectedToken: null,
  setSelectedToken: (token) => set({ selectedToken: token }),
}));
```

---

### 6. src/components/layout/Container.tsx

```typescript
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`
      mx-auto w-full px-4
      max-w-[320px] sm:max-w-full
      lg:max-w-[1295px]
      ${className}
    `}
    >
      {children}
    </div>
  );
}
```

---

### 7. src/components/layout/Header.tsx

```typescript
import { Link, useNavigate } from "react-router-dom";
import { Search, Settings, Sun, Moon } from "lucide-react";
import { useStore } from "@/store/useStore";
import Button from "@/components/ui/Button";

export default function Header() {
  const navigate = useNavigate();
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const walletAddress = useStore((state) => state.walletAddress);

  return (
    <header className="sticky top-0 z-50 bg-bg-light dark:bg-bg-dark border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 lg:max-w-[1295px]">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold">
              <span className="text-brand-green">ECO</span>
              <span className="text-text-light dark:text-text-dark">CHAIN</span>
            </div>
          </Link>

          {/* Навигация - скрываем на мобилке */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-brand-green transition-colors">
              Dashboard
            </Link>
            <Link
              to="/listing"
              className="hover:text-brand-green transition-colors"
            >
              Listing
            </Link>
            <Link
              to="/my-tokens"
              className="hover:text-brand-green transition-colors"
            >
              My token
            </Link>
          </nav>

          {/* Поиск - скрываем на мобилке */}
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-bg-light-secondary dark:bg-gray-800 w-[360px]">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск токенов"
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          {/* Правая часть */}
          <div className="flex items-center gap-4">
            {/* Кнопка создания токена */}
            <Button
              onClick={() => navigate("/create")}
              className="hidden md:flex"
            >
              Create new token
            </Button>

            {/* Адрес кошелька (заглушка) */}
            <div className="hidden md:block px-3 py-2 bg-bg-light-secondary dark:bg-gray-800 rounded-lg text-sm">
              {walletAddress || "0x2...006728"}
            </div>

            {/* Переключатель темы */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-bg-light-secondary dark:hover:bg-gray-800 transition-colors"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {/* Настройки */}
            <button className="p-2 rounded-lg hover:bg-bg-light-secondary dark:hover:bg-gray-800 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
```

---

### 8. src/components/ui/Button.tsx

```typescript
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:transform hover:-translate-y-0.5";

  const variants = {
    primary: "bg-brand-green text-white hover:bg-brand-green/90",
    secondary:
      "bg-bg-light-secondary dark:bg-gray-800 text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700",
    outline:
      "border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

---

### 9. src/components/ui/Card.tsx

```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = "", onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white dark:bg-gray-900 
        rounded-2xl p-6 
        border border-gray-200 dark:border-gray-800
        hover:shadow-lg transition-shadow duration-200
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
```

---

### 10. src/pages/Dashboard.tsx (ПРИМЕР СТРАНИЦЫ)

```typescript
import Container from "@/components/layout/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "New tokens",
      description:
        "Create, Manage, and Distribute X1 based tokens with X1 no code solution",
      buttonText: "Discover all tokens",
      gradient: "from-green-500/20 to-green-800/5",
      onClick: () => navigate("/listing"),
    },
    {
      title: "Create tokens",
      description:
        "Create, Manage, and Distribute ERC20 Polygon based tokens with X1 no code solution",
      buttonText: "Create new token",
      gradient: "from-purple-500/20 to-purple-800/5",
      onClick: () => navigate("/create"),
    },
    {
      title: "My tokens",
      description:
        "Create, Manage, and Distribute BEP20 based tokens with X1 no code solution",
      buttonText: "Manage my tokens",
      gradient: "from-yellow-500/20 to-yellow-800/5",
      onClick: () => navigate("/my-tokens"),
    },
  ];

  return (
    <Container className="py-12">
      {/* Hero секция */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card
            key={index}
            className="relative overflow-hidden min-h-[300px] flex flex-col justify-between"
          >
            {/* Градиентный фон */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`}
            />

            {/* Контент */}
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-brand-green dark:text-text-accent-dark">
                  {card.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {card.description}
                </p>
              </div>

              <Button
                variant="outline"
                onClick={card.onClick}
                className="w-full md:w-auto"
              >
                {card.buttonText}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}
```

---

## ЧТО ДЕЛАТЬ ДАЛЬШЕ (ДЛЯ ПОЛЬЗОВАТЕЛЯ)

### ✅ ШАГ 1: Установка проекта

```bash
cd ecochain-frontend
npm install
npm run dev
```

Проект должен запуститься на `http://localhost:5173`

---

### ✅ ШАГ 2: Проверка работоспособности

1. Откройте браузер
2. Переключите тему (светлая/темная)
3. Проверьте навигацию по страницам
4. Проверьте адаптивность (сузьте окно браузера)

---

### ✅ ШАГ 3: Добавление моковых данных

В будущем, когда будет бэкенд, замените моковые данные на реальные API запросы через Axios.

**Пример мокового токена:**

```typescript
// src/types/index.ts
export interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: string;
  volume: string;
  holders: number;
  createdBy: string;
  createdAt: string;
  image?: string;
}

// src/utils/mockData.ts
export const mockTokens: Token[] = [
  {
    id: "1",
    name: "Newtoken01",
    symbol: "NTK",
    price: 0.0048,
    marketCap: "$4.4k",
    volume: "$385,069,594",
    holders: 6845,
    createdBy: "noname",
    createdAt: "20s ago",
  },
  // ... добавить больше токенов
];
```

---

## РЕГИСТРАЦИИ И API (КОГДА ПОНАДОБЯТСЯ)

### Вариант 1: WalletConnect Cloud (РЕКОМЕНДУЮ)

**Ваш Project ID:** `e3b30f7c5f48563ed2317f3928ba0481`

✅ Уже готово, используйте этот ID когда будете подключать WalletConnect

**Где использовать:**

```typescript
// Когда будете добавлять Web3
import { WagmiConfig, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";

const config = createConfig({
  // ...
  projectId: "e3b30f7c5f48563ed2317f3928ba0481",
});
```

---

### Вариант 2: Infura (ВМЕСТО ALCHEMY)

**Сайт:** https://infura.io

**Шаги:**

1. Регистрация через email (без дрочева)
2. Create New API Key
3. Выбираете сеть (Ethereum Mainnet, Polygon, BSC и т.д.)
4. Получаете API Key

**Пример API Key:**

```
https://mainnet.infura.io/v3/YOUR_API_KEY
```

**Где использовать:**

```typescript
// В будущем для Web3 провайдера
const provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/YOUR_API_KEY"
);
```

---

### Вариант 3: QuickNode (ЕЩЕ ПРОЩЕ)

**Сайт:** https://www.quicknode.com

**Шаги:**

1. Регистрация через GitHub или email
2. Create an endpoint
3. Выбираете блокчейн (Ethereum, Polygon, BSC)
4. Получаете HTTP URL

**Пример:**

```
https://example.quiknode.pro/abc123/
```

---

## ПОЛНЫЙ ПРОМПТ ДЛЯ ДАЛЬНЕЙШЕЙ РАБОТЫ

```
КОНТЕКСТ:
Ты работаешь над проектом веб-приложения для создания и управления токенами на блокчейне. Сейчас создан базовый скелет на React + TypeScript + Vite + Tailwind CSS 4.

СТРУКТУРА ПРОЕКТА:
- 3 основные страницы: Dashboard, Token Listing, Token Detail
- 3 попапа: Create Token Modal, Add Liquidity Modal, Settings
- Header с навигацией и переключателем темы
- Адаптивный контейнер (1295px на десктопе, 320px на мобилке)

ТРЕБОВАНИЯ К АДАПТИВНОСТИ:
- Десктоп (1920px): контейнер 1295px, 3 карточки в ряд
- Планшет (768-1294px): контейнер сужается через clamp(), 2 карточки в ряд
- Мобильный (320-767px): контейнер 320px, 1 карточка в столбец
- Все элементы масштабируются плавно через clamp()

ЦВЕТОВАЯ СХЕМА:
Светлая тема:
- Зеленый: #5B9D07
- Фиолетовый: #8247E5
- Желтый: #F0B90B
- Фон: #FFFFFF
- Вторичный фон: #F1F1F1
- Текст: #1C4430

Темная тема:
- Фон: #0F0F16
- Текст: #FFFFFF
- Акцент: #58FF84
- Красный: #FF5858

ТЕКУЩАЯ ЗАДАЧА:
[ЗДЕСЬ ОПИСЫВАЕШЬ КОНКРЕТНУЮ ЗАДАЧУ]

Например:
"Создай компонент TokenCard для страницы листинга. Карточка должна содержать:
- Круглый аватар 81x81px
- Имя создателя (зеленый текст)
- Капитализацию ($4.4k)
- Количество ответов (1728)
- Название токена
- Время создания (20s ago серым)

Требования:
- Адаптивность под 3 колонки на десктопе, 2 на планшете, 1 на мобилке
- Ховер эффект: transform translateY(-4px) + тень
- Темная/светлая тема
- TypeScript типизация
- Используй Tailwind CSS классы

Напиши полный код компонента с примером использования."
```

---

## ЧЕКЛИСТ ПЕРЕД СТАРТОМ

- [x] Удалены старые node_modules
- [x] Установлен Tailwind CSS 4 (без PostCSS)
- [x] Настроен vite.config.ts
- [x] Создан tailwind.config.ts
- [x] Настроен роутинг
- [x] Создан Zustand store
- [x] Базовые компоненты (Button, Card, Container)
- [x] Header с переключателем темы
- [x] Одна рабочая страница (Dashboard)

---

## СЛЕДУЮЩИЕ ШАГИ

1. **Создать оставшиеся страницы** (Token Listing, Token Detail, Create Token)
2. **Добавить модальные окна** (Create, Liquidity)
3. **Детализировать компоненты** (размеры, отступы, анимации)
4. **Добавить моковые данные** для токенов
5. **Тестировать адаптивность** на разных разрешениях
6. **Полировка UI** (анимации, переходы, ховер эффекты)

---

## КОГДА ПОНАДОБИТСЯ WEB3

### Установка зависимостей

```bash
npm install wagmi viem @tanstack/react-query
npm install @rainbow-me/rainbowkit
```

### Настройка провайдера

```typescript
import { WagmiConfig, createConfig } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

const config = getDefaultConfig({
  appName: "ECOCHAIN",
  projectId: "e3b30f7c5f48563ed2317f3928ba0481",
  chains: [mainnet, polygon],
});
```

---

---

## БЕЗОПАСНОСТЬ (МИНИМАЛЬНЫЕ МЕРЫ)

### 1. Защита от XSS (Cross-Site Scripting)

**React делает это автоматически**, но проверь:

```typescript
// ❌ ПЛОХО - опасно
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ ХОРОШО - безопасно
<div>{userInput}</div>
```

**Правило:** Никогда не вставляй пользовательский ввод через `dangerouslySetInnerHTML`

---

### 2. Защита от CSRF (для будущих форм)

Установи helmet для мета-тегов:

```bash
npm install react-helmet-async
```

**Использование:**

```typescript
// src/main.tsx
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
```

---

### 3. Валидация форм (React Hook Form + Zod)

```bash
npm install react-hook-form zod @hookform/resolvers
```

**Пример валидации формы создания токена:**

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const tokenSchema = z.object({
  name: z.string().min(3, "Минимум 3 символа").max(50, "Максимум 50 символов"),
  symbol: z
    .string()
    .min(2, "Минимум 2 символа")
    .max(10, "Максимум 10 символов"),
  emission: z
    .number()
    .positive("Должно быть положительное число")
    .max(1000000000),
});

type TokenFormData = z.infer<typeof tokenSchema>;

export default function CreateTokenForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TokenFormData>({
    resolver: zodResolver(tokenSchema),
  });

  const onSubmit = (data: TokenFormData) => {
    console.log("Валидные данные:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      {errors.name && (
        <span className="text-red-500">{errors.name.message}</span>
      )}

      <input {...register("symbol")} />
      {errors.symbol && (
        <span className="text-red-500">{errors.symbol.message}</span>
      )}

      <input type="number" {...register("emission", { valueAsNumber: true })} />
      {errors.emission && (
        <span className="text-red-500">{errors.emission.message}</span>
      )}

      <button type="submit">Создать токен</button>
    </form>
  );
}
```

---

### 4. Защита переменных окружения

**Создай файл `.env`:**

```bash
# .env
VITE_APP_NAME=ECOCHAIN
VITE_WALLETCONNECT_PROJECT_ID=e3b30f7c5f48563ed2317f3928ba0481
VITE_INFURA_API_KEY=your_infura_key_here
```

**Добавь в `.gitignore`:**

```
.env
.env.local
.env.production
```

**Использование:**

```typescript
// src/utils/constants.ts
export const WALLETCONNECT_PROJECT_ID = import.meta.env
  .VITE_WALLETCONNECT_PROJECT_ID;
export const INFURA_API_KEY = import.meta.env.VITE_INFURA_API_KEY;
```

---

### 5. Content Security Policy (CSP)

**Добавь в `index.html`:**

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Content Security Policy -->
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; 
                   script-src 'self' 'unsafe-inline' 'unsafe-eval'; 
                   style-src 'self' 'unsafe-inline'; 
                   img-src 'self' data: https:; 
                   font-src 'self' data:;"
    />

    <title>ECOCHAIN - Token Platform</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## SEO ОПТИМИЗАЦИЯ (МИНИМАЛЬНАЯ)

### 1. React Helmet для динамических мета-тегов

**Создай компонент SEO:**

```typescript
// src/components/SEO.tsx
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title = "ECOCHAIN - Token Platform",
  description = "Create, Manage, and Distribute tokens with X1 no code solution",
  image = "/og-image.jpg",
  url = "https://ecochain.io",
}: SEOProps) {
  return (
    <Helmet>
      {/* Основные мета-теги */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph (Facebook, Discord) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Дополнительно */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
```

**Использование на странице:**

```typescript
// src/pages/Dashboard.tsx
import SEO from "@/components/SEO";

export default function Dashboard() {
  return (
    <>
      <SEO
        title="Dashboard - ECOCHAIN"
        description="Manage your tokens and view market statistics"
      />

      <Container className="py-12">{/* Контент страницы */}</Container>
    </>
  );
}
```

---

### 2. Robots.txt

**Создай файл `public/robots.txt`:**

```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml

# Блокируем индексацию админки (если будет)
Disallow: /admin/
```

---

### 3. Sitemap.xml

**Создай файл `public/sitemap.xml`:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2024-01-15</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/listing</loc>
    <lastmod>2024-01-15</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/create</loc>
    <lastmod>2024-01-15</lastmod>
    <priority>0.6</priority>
  </url>
</urlset>
```

---

### 4. Оптимизация изображений

**Добавь в `public/` Open Graph изображение:**

- Размер: 1200x630px
- Формат: JPG или PNG
- Имя: `og-image.jpg`

**Используй WebP для остальных изображений:**

```bash
# Конвертация изображений в WebP
npm install -g webp-converter
```

---

### 5. Structured Data (JSON-LD)

**Добавь в компонент страницы токена:**

```typescript
// src/pages/TokenDetail.tsx
export default function TokenDetail() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Token Name",
    description: "Token description",
    offers: {
      "@type": "Offer",
      price: "0.0048",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Контент */}
    </>
  );
}
```

---

### 6. Базовые мета-теги в index.html

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- SEO -->
    <meta
      name="description"
      content="Create, Manage, and Distribute tokens with ECOCHAIN no code solution"
    />
    <meta
      name="keywords"
      content="crypto, tokens, blockchain, web3, ecochain"
    />
    <meta name="author" content="ECOCHAIN" />
    <meta name="robots" content="index, follow" />

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <!-- Theme Color -->
    <meta name="theme-color" content="#5B9D07" />

    <title>ECOCHAIN - Token Platform</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## ТЕСТИРОВАНИЕ (ПРОСТОЕ)

### 1. Установка Vitest (для юнит-тестов)

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

**Настройка vite.config.ts:**

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
```

**Создай файл `src/test/setup.ts`:**

```typescript
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
});
```

---

### 2. Пример теста для Button

**Создай файл `src/components/ui/Button.test.tsx`:**

```typescript
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button компонент", () => {
  it("рендерится с текстом", () => {
    render(<Button>Нажми меня</Button>);
    expect(screen.getByText("Нажми меня")).toBeInTheDocument();
  });

  it("вызывает onClick при клике", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Кликни</Button>);

    fireEvent.click(screen.getByText("Кликни"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("применяет правильный класс для primary варианта", () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByText("Primary");
    expect(button).toHaveClass("bg-brand-green");
  });

  it("отключается когда disabled", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByText("Disabled");
    expect(button).toBeDisabled();
  });
});
```

---

### 3. Пример теста для Store

**Создай файл `src/store/useStore.test.ts`:**

```typescript
import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useStore } from "./useStore";

describe("useStore", () => {
  beforeEach(() => {
    // Сброс стора перед каждым тестом
    useStore.setState({ theme: "light" });
  });

  it("начинается со светлой темой", () => {
    const { result } = renderHook(() => useStore());
    expect(result.current.theme).toBe("light");
  });

  it("переключает тему", () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("dark");
  });

  it("открывает и закрывает модалку", () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.openModal("create");
    });

    expect(result.current.isModalOpen).toBe(true);
    expect(result.current.modalType).toBe("create");

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.isModalOpen).toBe(false);
    expect(result.current.modalType).toBe(null);
  });
});
```

---

### 4. Запуск тестов

**Добавь в `package.json`:**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

**Запуск:**

```bash
# Запустить все тесты
npm test

# Запустить тесты с UI
npm run test:ui

# Проверить покрытие кода
npm run test:coverage
```

---

### 5. E2E тесты с Playwright (опционально)

```bash
npm install -D @playwright/test
npx playwright install
```

**Создай файл `e2e/basic.spec.ts`:**

```typescript
import { test, expect } from "@playwright/test";

test("главная страница загружается", async ({ page }) => {
  await page.goto("http://localhost:5173");

  // Проверяем наличие заголовка
  await expect(page.locator("text=ECOCHAIN")).toBeVisible();
});

test("переключение темы работает", async ({ page }) => {
  await page.goto("http://localhost:5173");

  // Кликаем на переключатель темы
  await page.click('button[aria-label="Toggle theme"]');

  // Проверяем что класс dark добавился
  const html = page.locator("html");
  await expect(html).toHaveClass(/dark/);
});

test("навигация работает", async ({ page }) => {
  await page.goto("http://localhost:5173");

  // Кликаем на Listing
  await page.click("text=Listing");

  // Проверяем URL
  await expect(page).toHaveURL(/.*listing/);
});
```

**Запуск E2E тестов:**

```bash
npx playwright test
```

---

### 6. Простой чеклист для ручного тестирования

**Создай файл `TESTING_CHECKLIST.md`:**

```markdown
# Чеклист тестирования ECOCHAIN

## Функциональность

- [ ] Главная страница загружается
- [ ] Навигация между страницами работает
- [ ] Переключение темы (светлая/темная)
- [ ] Поиск токенов (хотя бы UI)
- [ ] Кнопка "Create new token" ведет на форму
- [ ] Форма создания токена валидируется
- [ ] Модальные окна открываются/закрываются

## Адаптивность

- [ ] Десктоп (1920px) - 3 колонки карточек
- [ ] Планшет (768px) - 2 колонки карточек
- [ ] Мобильный (320px) - 1 колонка карточек
- [ ] Контейнер центрируется на всех разрешениях
- [ ] Header адаптируется (меню, поиск)

## Безопасность

- [ ] Нет ошибок в консоли
- [ ] Формы валидируются
- [ ] XSS защита работает
- [ ] .env не в git

## SEO

- [ ] Мета-теги присутствуют
- [ ] robots.txt доступен
- [ ] sitemap.xml доступен
- [ ] Open Graph теги есть

## Производительность

- [ ] Lighthouse Score > 90
- [ ] Страницы загружаются быстро
- [ ] Изображения оптимизированы
- [ ] Нет лишних ререндеров
```

---

## ДОПОЛНИТЕЛЬНЫЕ ПАКЕТЫ ДЛЯ БЕЗОПАСНОСТИ

```bash
# Sanitize пользовательский ввод (если будет rich text)
npm install dompurify
npm install -D @types/dompurify

# Rate limiting (если будут формы)
npm install express-rate-limit
```

**Пример использования DOMPurify:**

```typescript
import DOMPurify from "dompurify";

// Очистка HTML от XSS
const cleanHTML = DOMPurify.sanitize(dirtyHTML);
```

---

## ЧЕКЛИСТ БЕЗОПАСНОСТИ

```markdown
# Security Checklist

- [ ] XSS защита (не использую dangerouslySetInnerHTML)
- [ ] Валидация всех форм (React Hook Form + Zod)
- [ ] .env файл в .gitignore
- [ ] CSP мета-тег настроен
- [ ] HTTPS будет использован в продакшене
- [ ] Никаких секретных ключей в коде
- [ ] CORS правильно настроен (на бэкенде)
- [ ] Rate limiting для форм (на бэкенде)
```

---

## PRODUCTION BUILD CHECKLIST

```bash
# Перед деплоем проверь:
npm run build     # Проект собирается без ошибок
npm run test      # Все тесты проходят
npm run preview   # Production сборка работает локально
```

**Оптимизация production сборки в `vite.config.ts`:**

```typescript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          ui: ["lucide-react"],
        },
      },
    },
  },
});
```

---

## ИТОГО - ПОЛНЫЙ ЧЕКЛИСТ

### ✅ Установка

- [x] Vite + React + TypeScript
- [x] Tailwind CSS 4
- [x] React Router
- [x] Zustand

### ✅ Безопасность

- [x] React Helmet для CSP
- [x] React Hook Form + Zod для валидации
- [x] .env для переменных окружения
- [x] XSS защита через React

### ✅ SEO

- [x] React Helmet Async
- [x] Мета-теги (title, description, OG)
- [x] robots.txt
- [x] sitemap.xml
- [x] Structured Data (JSON-LD)

### ✅ Тестирование

- [x] Vitest для юнит-тестов
- [x] Testing Library для компонентов
- [x] Playwright для E2E (опционально)
- [x] Ручной чеклист

---

## БЫСТРЫЙ СТАРТ (ОБНОВЛЕННЫЙ)

```bash
# 1. Создание проекта
npm create vite@latest ecochain-frontend -- --template react-ts
cd ecochain-frontend

# 2. Установка всех зависимостей
npm install react-router-dom zustand axios lucide-react
npm install tailwindcss@next @tailwindcss/vite@next
npm install react-helmet-async react-hook-form zod @hookform/resolvers

# 3. Dev зависимости
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
npm install -D @playwright/test

# 4. Запуск
npm run dev

# 5. Тестирование
npm test
```

**ГОТОВО! Теперь у тебя безопасный, SEO-оптимизированный и протестированный скелет!**

Задача: Создать однофайловое React-приложение "EcoChain"

Цель:
Создать единый, самодостаточный HTML-файл, используя React (через CDN) и Tailwind CSS (через CDN), для сборки полнофункционального предпросмотра фронтенда для Web3-приложения "EcoChain". Приложение должно быть полностью адаптивным и включать переключение тем (светлая/тёмная). Все компоненты, логика и стили должны находиться в одном файле.

Основные требования:

Фреймворки (через CDN):

React 18

ReactDOM 18

Babel (для JSX-транспиляции в браузере)

Tailwind CSS 3 (JIT CDN)

Глобальное управление состоянием (с использованием хуков React):

Тема: Глобальное состояние для управления текущей темой ('light' или 'dark'). Это состояние должно добавлять/удалять класс dark у корневого элемента <html>.

Маршрутизация: Глобальное состояние для управления отображаемой страницей (например, 'dashboard', 'listing', 'my-tokens', 'create').

Адрес кошелька: Использовать статичный мок-адрес кошелька.

Цветовая палитра (для настройки в Tailwind):

Светлая тема:

brand-green: #5B9D07

bg-light: #FFFFFF

bg-light-secondary: #F1F1F1

text-light: #1C4430

Тёмная тема:

bg-dark: #0F0F16

text-dark: #FFFFFF

text-accent-dark: #58FF84

Реализация компонентов:

App (Корневой компонент):

Управляет состоянием темы и маршрутизации.

Отображает Header и текущую активную страницу (Dashboard, TokenListing и т.д.).

Применяет классы для тёмного/светлого режима к основному контейнеру.

Header (Шапка сайта):

Закреплена вверху страницы.

Содержит логотип "ECOCHAIN".

Навигационные ссылки ("Dashboard", "Listing", "My token"), которые обновляют состояние маршрутизации. Скрыты на экранах меньше md.

Мок-поле поиска. Скрыто на экранах меньше lg.

Кнопка "Create new token", ведущая на страницу 'create'. Скрыта на экранах меньше md.

Отображение мок-адреса кошелька. Скрыто на экранах меньше md.

Кнопка переключения темы (иконки Солнца/Луны), которая изменяет глобальное состояние темы.

Кнопка с иконкой настроек.

Иконки: Использовать встроенные SVG для иконок (Солнце, Луна, Поиск, Настройки).

Dashboard (Главная страница):

Отображает сетку из 3-х колонок с компонентами Card на десктопе, 2-х колонок на планшете и 1-й колонки на мобильных устройствах.

Каждая карточка должна иметь заголовок, описание, кнопку и уникальный фоновый градиент, как указано в плане.

Кнопки на карточках должны симулировать навигацию на соответствующие страницы.

TokenListing, MyTokens, CreateToken (Страницы-заглушки):

Создать простые компоненты-заглушки для этих страниц с заголовком, указывающим, какая это страница (например, <h1>Страница листинга токенов</h1>).

Переиспользуемые UI-компоненты:

Button: Компонент с вариантами (primary, secondary, outline), стилизованный с помощью Tailwind CSS в соответствии с предоставленным кодом.

Card: Стилизованный компонент-контейнер с эффектом при наведении (тень и лёгкий подъём).

Адаптивность:

Основная область контента должна иметь max-width: 1295px на больших экранах и быть отцентрирована.

Макеты и компоненты должны плавно адаптироваться от мобильных устройств (320px) до настольных экранов, следуя указанным брейкпоинтам (например, скрытие элементов, изменение количества колонок в сетке).

Финальный результат:
Единый, полный и готовый к запуску файл index.html.
