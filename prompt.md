**Shake animation (для полей с ошибкой):**

```css
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
}
```

- Duration: `0.4s ease`
- Применяется к контейнеру поля при validation error

**Pulse animation (для важных элементов):**

```css
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
```

- Duration: `0.6s ease`, infinite (или 2-3 раза)

---

### 2.9 ACCESSIBILITY (A11Y) И UX ДЕТАЛИ

#### 2.9.1 Focus states

**Все интерактивные элементы при Tab-навигации:**

- Outline: `2px solid #5B9D07` (light) / `2px solid #58FF84` (dark)
- Outline-offset: `2px`
- Border-radius: наследуется от элемента
- Transition: `outline 0.2s ease`

**Порядок focus (tab-index):**

1. Header навигация (Dashboard, Listing, My Tokens)
2. Поисковая строка
3. Кнопка "Create new token"
4. Блок профиля
5. Контент страницы (карточки, формы)
6. Кнопки в footer (если есть)

#### 2.9.2 Keyboard navigation

**ESC:**

- Закрывает открытые modal/dropdown/drawer
- Возвращает focus на trigger элемент

**Enter:**

- Активирует кнопки
- Отправляет формы
- Открывает dropdown (если в focus)

**Space:**

- Активирует кнопки
- Toggle для switch/checkbox

**Arrow keys:**

- Навигация внутри dropdown меню (вверх/вниз)
- Переключение между radio buttons

**Tab / Shift+Tab:**

- Навигация между интерактивными элементами
- Пропускает disabled элементы

#### 2.9.3 ARIA attributes

**Кнопки:**

- `aria-label`: описание для кнопок-иконок
- `aria-disabled`: для disabled состояний
- `aria-busy`: для loading состояний

**Modal:**

- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby`: ссылка на заголовок modal
- `aria-describedby`: ссылка на описание (если есть)

**Dropdown:**

- `role="menu"` на контейнере
- `role="menuitem"` на пунктах
- `aria-expanded`: состояние открыт/закрыт
- `aria-haspopup="true"` на trigger

**Input fields:**

- `aria-label` или связанный `<label>` с `for`
- `aria-invalid="true"` при ошибке
- `aria-describedby`: ссылка на error message

**Images:**

- `alt` атрибут с описанием
- `role="img"` для SVG
- Декоративные изображения: `alt=""` или `aria-hidden="true"`

#### 2.9.4 Loading states и feedback

**Индикаторы загрузки:**

- Skeleton loaders для контента
- Spinner для кнопок
- Progress bar для длительных операций
- Текст "Loading..." для screen readers: `aria-live="polite"`

**Success feedback:**

- Зеленый checkmark icon
- Success message: "Token created successfully!"
- Toast notification (3-5 секунд)
- Auto-redirect после успеха (опционально)

**Error feedback:**

- Красный error icon
- Error message под полем/в toast
- Shake animation для привлечения внимания
- Focus автоматически на поле с ошибкой

**Empty states:**

- Placeholder текст/иллюстрация когда нет данных
- Примеры: "No tokens found", "Your token list is empty"
- Кнопка action: "Create your first token"

#### 2.9.5 Responsive images

**Image loading:**

- Lazy loading: `loading="lazy"` для изображений вне viewport
- Placeholder: blur-up или solid color пока грузится
- Error fallback: default placeholder если изображение не загрузилось

**Srcset для retina displays:**

```html
<img src="image.png" srcset="image.png 1x, image@2x.png 2x" alt="Description" />
```

---

### 2.10 WEB3 ИНТЕГРАЦИЯ (ЗАГЛУШКИ)

#### 2.10.1 useWallet hook

```typescript
// src/hooks/web3/useWallet.ts

import { useState, useCallback } from "react";
import { useUserStore } from "@/store/useUserStore";

export const useWallet = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, clearUser } = useUserStore();

  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // TODO: Реальная Web3 интеграция
      // const provider = await detectEthereumProvider();
      // const accounts = await provider.request({ method: 'eth_requestAccounts' });

      // ЗАГЛУШКА: имитация подключения
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser = {
        address: "0x2...006728",
        name: "Noname",
        balance: "1,234.56 USDT",
        isConnected: true,
      };

      setUser(mockUser);
      setIsConnecting(false);
      return mockUser;
    } catch (err) {
      setError("Failed to connect wallet");
      setIsConnecting(false);
      throw err;
    }
  }, [setUser]);

  const disconnectWallet = useCallback(() => {
    clearUser();
    // TODO: Отключение от Web3 провайдера
  }, [clearUser]);

  return {
    connectWallet,
    disconnectWallet,
    isConnecting,
    error,
  };
};
```

#### 2.10.2 useTokenContract hook

```typescript
// src/hooks/web3/useTokenContract.ts

import { useState, useCallback } from "react";
import type { CreateTokenData, AddLiquidityData } from "@/types/token";

export const useTokenContract = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createToken = useCallback(async (data: CreateTokenData) => {
    setIsCreating(true);
    setError(null);

    try {
      // TODO: Реальная Web3 интеграция
      // const contract = new ethers.Contract(address, abi, signer);
      // const tx = await contract.createToken(data);
      // await tx.wait();

      // ЗАГЛУШКА: имитация создания токена
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockTokenId = `token-${Date.now()}`;
      console.log("Token created:", { id: mockTokenId, ...data });

      setIsCreating(false);
      return { success: true, tokenId: mockTokenId };
    } catch (err) {
      setError("Failed to create token");
      setIsCreating(false);
      throw err;
    }
  }, []);

  const addLiquidity = useCallback(async (data: AddLiquidityData) => {
    setIsCreating(true);
    setError(null);

    try {
      // TODO: Реальная Web3 интеграция
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Liquidity added:", data);
      setIsCreating(false);
      return { success: true };
    } catch (err) {
      setError("Failed to add liquidity");
      setIsCreating(false);
      throw err;
    }
  }, []);

  const buyToken = useCallback(async (tokenId: string, amount: number) => {
    // TODO: Реальная Web3 интеграция
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Buy token:", { tokenId, amount });
    return { success: true };
  }, []);

  const sellToken = useCallback(async (tokenId: string, amount: number) => {
    // TODO: Реальная Web3 интеграция
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Sell token:", { tokenId, amount });
    return { success: true };
  }, []);

  return {
    createToken,
    addLiquidity,
    buyToken,
    sellToken,
    isCreating,
    error,
  };
};
```

#### 2.10.3 Mock Data

```typescript
// src/lib/mockData.ts

import type { Token, TokenDetail } from "@/types/token";

export const mockTokens: Token[] = [
  {
    id: "1",
    name: "My New Token",
    symbol: "MNT",
    imageUrl: "/assets/placeholders/token-placeholder.svg",
    price: 0.048,
    marketCap: "$4.4k",
    volume: "$385,069,594",
    holders: 6845,
    blockchain: "X1",
    createdBy: "noname",
    createdAt: new Date(Date.now() - 20000), // 20 секунд назад
    description: "Join us in building a better, decentralized future.",
    replies: 1728,
  },
  {
    id: "2",
    name: "EcoChain Token",
    symbol: "ECO",
    imageUrl: "/assets/placeholders/token-placeholder.svg",
    price: 0.125,
    marketCap: "$12.8k",
    volume: "$520,450,123",
    holders: 3421,
    blockchain: "X1",
    createdBy: "crypto_dev",
    createdAt: new Date(Date.now() - 120000), // 2 минуты назад
    description: "Sustainable blockchain for a greener tomorrow.",
    replies: 845,
  },
  {
    id: "3",
    name: "Green Energy Coin",
    symbol: "GEC",
    imageUrl: "/assets/placeholders/token-placeholder.svg",
    price: 0.0025,
    marketCap: "$2.1k",
    volume: "$98,234,567",
    holders: 1256,
    blockchain: "X1",
    createdBy: "eco_warrior",
    createdAt: new Date(Date.now() - 3600000), // 1 час назад
    description: "Powering the future with clean energy.",
    replies: 432,
  },
  // ... добавить ещё 12+ токенов для полного grid
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
  chartUrl: "/assets/placeholders/chart-placeholder.png",
  raised: "$7.5K",
  raiseTarget: "$2,400,000",
  raisePercentage: "150%",
};

export const mockUser = {
  address: "0x2...006728",
  name: "Noname",
  balance: "1,234.56 USDT",
  avatar: "/assets/avatars/avatar-placeholder-36.svg",
  isConnected: false,
};
```

---

### 2.11 INTERNATIONALIZATION (i18n)

#### 2.11.1 i18n конфигурация

```typescript
// src/lib/i18n.ts

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "@/locales/en/translation.json";
import ruTranslation from "@/locales/ru/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    ru: { translation: ruTranslation },
  },
  lng: "en", // Язык по умолчанию
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React уже защищает от XSS
  },
});

export default i18n;
```

#### 2.11.2 Переводы (примеры)

```json
// src/locales/en/translation.json
{
  "header": {
    "dashboard": "Dashboard",
    "listing": "Listing",
    "myTokens": "My Tokens",
    "createToken": "Create new token",
    "search": "Search tokens"
  },
  "dropdown": {
    "profile": "Profile Settings",
    "language": "Language",
    "theme": "Theme",
    "balance": "Balance",
    "logout": "Logout"
  },
  "dashboard": {
    "newTokens": "New tokens",
    "description": "Create, Manage, and Distribute X1 based tokens with X1 no code solution",
    "discoverButton": "Discover all tokens"
  },
  "listing": {
    "title": "All tokens",
    "createdBy": "Created by:",
    "marketCap": "market cap:",
    "replies": "replies:",
    "showMore": "Show More"
  },
  "createToken": {
    "title": "Create new token",
    "uploadImage": "Upload your token image",
    "uploadButton": "Upload",
    "namePlaceholder": "Newtoken01",
    "symbolPlaceholder": "NTK",
    "emissionPlaceholder": "300 000 000",
    "infoPlaceholder": "Your token description",
    "createButton": "Create token"
  },
  "addLiquidity": {
    "title": "Add token liquidity",
    "x1Amount": "X1 Token Amount",
    "nktAmount": "NKT Token Amount",
    "priceUSD": "Token Price (USD)",
    "priceX1": "Token Price (X1)",
    "createButton": "Create token",
    "skipButton": "Skip"
  },
  "tokenDetail": {
    "summary": "Token summary",
    "symbol": "Symbol",
    "blockchain": "Blockchain",
    "price": "Price",
    "holders": "Holders",
    "volume": "Volume",
    "quantityPlaceholder": "Quantity of tokens",
    "buyButton": "Buy",
    "sellButton": "Sell"
  },
  "modal": {
    "createTitle": "Create new token",
    "withoutLiquidity": "Launch without liquidity",
    "withLiquidity": "Launch with own liquidity"
  }
}
```

```json
// src/locales/ru/translation.json
{
  "header": {
    "dashboard": "Панель",
    "listing": "Список",
    "myTokens": "Мои токены",
    "createToken": "Создать токен",
    "search": "Поиск токенов"
  },
  "dropdown": {
    "profile": "Настройки профиля",
    "language": "Язык",
    "theme": "Тема",
    "balance": "Баланс",
    "logout": "Выход"
  },
  "dashboard": {
    "newTokens": "Новые токены",
    "description": "Создавайте, управляйте и распределяйте токены на базе X1 без кода",
    "discoverButton": "Открыть все токены"
  },
  "listing": {
    "title": "Все токены",
    "createdBy": "Создал:",
    "marketCap": "капитализация:",
    "replies": "ответов:",
    "showMore": "Показать ещё"
  },
  "createToken": {
    "title": "Создать новый токен",
    "uploadImage": "Загрузите изображение вашего токена",
    "uploadButton": "Загрузить",
    "namePlaceholder": "Новый токен",
    "symbolPlaceholder": "НТК",
    "emissionPlaceholder": "300 000 000",
    "infoPlaceholder": "Описание вашего токена",
    "createButton": "Создать токен"
  },
  "addLiquidity": {
    "title": "Добавить ликвидность токена",
    "x1Amount": "Количество X1 токенов",
    "nktAmount": "Количество НТК токенов",
    "priceUSD": "Цена токена (USD)",
    "priceX1": "Цена токена (X1)",
    "createButton": "Создать токен",
    "skipButton": "Пропустить"
  },
  "tokenDetail": {
    "summary": "Сводка по токену",
    "symbol": "Символ",
    "blockchain": "Блокчейн",
    "price": "Цена",
    "holders": "Держателей",
    "volume": "Объём",
    "quantityPlaceholder": "Количество токенов",
    "buyButton": "Купить",
    "sellButton": "Продать"
  },
  "modal": {
    "createTitle": "Создать новый токен",
    "withoutLiquidity": "Запустить без ликвидности",
    "withLiquidity": "Запустить со своей ликвидностью"
  }
}
```

#### 2.11.3 Использование в компонентах

```typescript
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();

  return (
    <nav>
      <button>{t("header.dashboard")}</button>
      <button>{t("header.listing")}</button>
      <button>{t("header.myTokens")}</button>
    </nav>
  );
}
```

---

### 2.12 ZUSTAND STORES (ДЕТАЛИЗАЦИЯ)

#### 2.12.1 Theme Store

```typescript
// src/store/useThemeStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => {
        set({ theme });
        // Применить класс к HTML элементу
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light";
          if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          return { theme: newTheme };
        }),
    }),
    {
      name: "theme-storage", // Ключ в localStorage
    }
  )
);
```

#### 2.12.2 User Store

```typescript
// src/store/useUserStore.ts

import { create } from "zustand";
import type { User } from "@/types/user";

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
```

#### 2.12.3 Token Store

```typescript
// src/store/useTokenStore.ts

import { create } from "zustand";
import type { Token, TokenFilters } from "@/types/token";

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
    search: "",
    sortBy: "createdAt",
    sortOrder: "desc",
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
```

#### 2.12.4 Modal Store

```typescript
// src/store/useModalStore.ts

import { create } from "zustand";

interface ModalState {
  isCreateTokenModalOpen: boolean;
  openCreateTokenModal: () => void;
  closeCreateTokenModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isCreateTokenModalOpen: false,
  openCreateTokenModal: () => set({ isCreateTokenModalOpen: true }),
  closeCreateTokenModal: () => set({ isCreateTokenModalOpen: false }),
}));
```

#### 2.12.5 Language Store

```typescript
// src/store/useLanguageStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import i18n from "@/lib/i18n";

type Locale = "en" | "ru";

interface LanguageState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      locale: "en",
      setLocale: (locale) => {
        set({ locale });
        i18n.changeLanguage(locale);
      },
    }),
    {
      name: "language-storage",
    }
  )
);
```

---

### 2.13 ROUTING (React Router)

#### 2.13.1 Конфигурация роутов

```typescript
// src/App.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import Listing from "@/pages/Listing";
import MyTokens from "@/pages/MyTokens";
import CreateToken from "@/pages/CreateToken";
import AddLiquidity from "@/pages/AddLiquidity";
import TokenDetail from "@/pages/TokenDetail";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="listing" element={<Listing />} />
          <Route path="my-tokens" element={<MyTokens />} />
          <Route path="create-token" element={<CreateToken />} />
          <Route path="add-liquidity" element={<AddLiquidity />} />
          <Route path="token/:id" element={<TokenDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

#### 2.13.2 Layout компонент

```typescript
// src/components/layout/Layout.tsx

import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import PageBackground from "@/components/layout/PageBackground";
import CreateTokenModal from "@/components/features/CreateTokenModal";

function Layout() {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <PageBackground />
      <Header />
      <main className="relative z-1">
        <Outlet />
      </main>
      <CreateTokenModal />
    </div>
  );
}

export default Layout;
```

#### 2.13.3 Навигация между страницами

```typescript
import { useNavigate } from "react-router-dom";

function SomeComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/listing");
    // или
    navigate("/token/123");
    // или с replace (не добавляет в history)
    navigate("/dashboard", { replace: true });
  };

  return <button onClick={handleClick}>Go to Listing</button>;
}
```

---

## ЧАСТЬ 3: ФИНАЛЬНЫЙ ЧЕКЛИСТ РАЗРАБОТКИ

### 3.1 Инициализация проекта

- [ ] Создать проект с Vite: `npm create vite@latest ecochain-frontend -- --template react-ts`
- [ ] Установить зависимости: `npm install`
- [ ] Установить Tailwind CSS 3.4.x: `npm install -D tailwindcss@^3.4.0 postcss autoprefixer`
- [ ] Инициализировать Tailwind: `npx tailwindcss init -p`
- [ ] Установить доп. зависимости:
  ```bash
  npm install zustand axios react-i18next i18next lucide-react clsx date-fns react-router-dom
  ```
- [ ] Настроить `tailwind.config.js` (см. раздел 1.3)
- [ ] Создать структуру папок (см. раздел 1.2)
- [ ] Настроить `tsconfig.json` с path aliases (`@/`)

### 3.2 Базовая конфигурация

- [ ] Настроить Tailwind глобальные стили в `src/index.css`
- [ ] Создать `constants.ts` с breakpoints, colors, spacing
- [ ] Создать TypeScript типы (token.ts, user.ts, web3.ts, common.ts)
- [ ] Настроить i18n (en/ru переводы)
- [ ] Создать mock data для разработки

### 3.3 Zustand Stores

- [ ] useThemeStore (light/dark theme с persist)
- [ ] useUserStore (данные пользователя, balance)
- [ ] useTokenStore (список токенов, filters, pagination)
- [ ] useModalStore (состояние модальных окон)
- [ ] useLanguageStore (EN/RU с persist)

### 3.4 Custom Hooks

- [ ] useTheme (работа с темой)
- [ ] useMediaQuery (responsive breakpoints)
- [ ] useClickOutside (закрытие dropdown/modal)
- [ ] useDebounce (для поиска)
- [ ] useKeyPress (ESC, Enter, etc.)
- [ ] useLocalStorage (сохранение настроек)
- [ ] useWallet (Web3 заглушка)
- [ ] useTokenContract (Web3 заглушка)

### 3.5 Common Components

- [ ] Button (variants: primary, secondary, outline, sell; sizes: sm, md, lg)
- [ ] Input (text, number, email; с validation states)
- [ ] Card (базовая карточка с dark/light themes)
- [ ] Modal (overlay + container, animations)
- [ ] Dropdown (trigger + menu items, keyboard navigation)
- [ ] Switch/Toggle (для theme switcher)

### 3.6 Layout Components

- [ ] Header (Desktop версия 1870px)
- [ ] MobileHeader (Mobile версия 350px)
- [ ] SearchBar (поисковая строка с иконкой)
- [ ] ProfileBlock (аватарка + имя + адрес)
- [ ] HeaderDropdown (профиль, язык, тема, баланс, выход)
- [ ] LanguageSelector (EN/RU вложенный dropdown)
- [ ] ThemeToggle (switch для dark/light)
- [ ] MobileMenu (drawer с анимацией)
- [ ] Container (responsive wrapper 350-1295px)
- [ ] PageBackground (управление фоновыми элементами)
- [ ] Layout (общий wrapper с Header + Outlet)

### 3.7 Feature Components - Dashboard

- [ ] DashboardCard (401x508px карточка)
- [ ] DashboardCardImage (250x130px выступающая картинка)
- [ ] DashboardCardContent (Content Box 369x221px)
- [ ] DashboardGrid (grid из 3 карточек)

### 3.8 Feature Components - Listing

- [ ] TokenCard (408x114px карточка токена)
- [ ] TokenCardAvatar (81x81px круглая аватарка)
- [ ] TokenCardInfo (текстовая информация с 4 строками)
- [ ] TokenCardTimeBadge (65x24px плашка времени)
- [ ] TokenGrid (grid 5 колонок, responsive)
- [ ] ShowMoreButton (кнопка пагинации)

### 3.9 Feature Components - Create Token

- [ ] CreateTokenModal (модальное окно с 2 вариантами)
- [ ] CreateTokenForm (форма с 4 полями + upload)
- [ ] ImageUploadBlock (аватарка + текст + кнопка)
- [ ] FormInput (переиспользуемое поле ввода)
- [ ] FormTextarea (textarea для описания)

### 3.10 Feature Components - Add Liquidity

- [ ] AddLiquidityForm (форма с 4 числовыми полями)
- [ ] LiquidityInputs (группа из 4 полей)
- [ ] SkipButton (кнопка "Skip" под формой)

### 3.11 Feature Components - Token Detail

- [ ] TokenDetailView (главный контейнер страницы)
- [ ] TokenDetailLeft (левая колонка 764px)
- [ ] TokenDetailRight (правая колонка 493px, sticky)
- [ ] TokenInfoBlock (логотип + название + описание)
- [ ] TokenChart (контейнер графика 764x479px)
- [ ] TokenDescription (Lorem ipsum с скроллом)
- [ ] TokenSummary (5 строк информации)
- [ ] TokenActions (input + Buy/Sell кнопки)

### 3.12 Страницы (Pages)

- [ ] Dashboard (3 карточки в ряд)
- [ ] Listing (grid токенов + пагинация)
- [ ] MyTokens (аналогично Listing, но с фильтром по user)
- [ ] CreateToken (форма создания)
- [ ] AddLiquidity (форма добавления ликвидности)
- [ ] TokenDetail (детальная информация, 2 колонки)
- [ ] NotFound (404 страница)

### 3.13 Routing

- [ ] Настроить React Router v6
- [ ] Создать Layout wrapper с Outlet
- [ ] Настроить все routes (/, /listing, /my-tokens, /create-token, /add-liquidity, /token/:id)
- [ ] Настроить 404 redirect
- [ ] Добавить page transitions (fade)

### 3.14 Функциональность

- [ ] Переключение темы (light/dark) с сохранением в localStorage
- [ ] Переключение языка (EN/RU) с сохранением
- [ ] Поиск токенов (с debounce)
- [ ] Пагинация (Show More, загрузка по 15 токенов)
- [ ] Открытие/закрытие модальных окон
- [ ] Открытие/закрытие dropdown меню
- [ ] Открытие/закрытие mobile drawer
- [ ] Навигация между страницами
- [ ] Валидация форм (CreateToken, AddLiquidity)
- [ ] Upload изображения (preview)
- [ ] Форматирование чисел (с пробелами для тысяч)
- [ ] Форматирование времени (20s ago, 2m ago, etc.)
- [ ] Web3 заглушки (connect wallet, create token, buy/sell)

### 3.15 Адаптивность (Responsive)

- [ ] Desktop (1240px+): все компоненты в полном размере
- [ ] Tablet (768px-1239px): сжатие grid (5→2 колонки), масштабирование
- [ ] Mobile (360px-767px): 1 колонка, мобильное меню, сжатые размеры
- [ ] Header: desktop версия (1870px) / mobile версия (350px)
- [ ] Dashboard: 3 → 2 → 1 карточка
- [ ] Listing: 5 → 2 → 1 карточка токена
- [ ] TokenDetail: 2 колонки → 1 колонка (вертикальный стек)
- [ ] Формы: масштабирование полей на мобильных
- [ ] Нет горизонтального скролла на всех разрешениях

### 3.16 Анимации и Transitions

- [ ] Hover эффекты для кнопок (translateY, shadow)
- [ ] Hover эффекты для карточек (translateY, shadow)
- [ ] Focus states для accessibility (outline)
- [ ] Modal animations (scaleIn/scaleOut)
- [ ] Drawer animations (slideInLeft/slideOutLeft)
- [ ] Dropdown animations (scaleY)
- [ ] Page transitions (fade между страницами)
- [ ] Loading states (spinner, skeleton loaders)
- [ ] Error animations (shake для validation)

### 3.17 Accessibility (A11Y)

- [ ] Focus states для Tab навигации
- [ ] Keyboard navigation (ESC, Enter, Space, Arrows)
- [ ] ARIA attributes (labels, roles, states)
- [ ] Alt текст для изображений
- [ ] Screen reader support
- [ ] Color contrast проверка (WCAG AA)

### 3.18 Styling и Design

- [ ] Tailwind CSS 3.4.x конфигурация
- [ ] Custom colors (primary, light, dark, sell)
- [ ] Custom spacing (25px, 30px, 45px, 50px, 80px)
- [ ] Custom border-radius (8px, 10px, 20px, 30px, 35px, 500px)
- [ ] Custom backdrop-blur (30.3px, 73.2px)
- [ ] Custom box-shadows (card-light, card-dark, header, modal, dropdown)
- [ ] Typography (Nunito Sans: 300, 400, 600, 700)
- [ ] Dark theme полностью реализована
- [ ] Light theme полностью реализована
- [ ] Фоновые элементы (incubator.svg, vector.svg, create-token.svg)

### 3.19 Assets

- [ ] Логотипы (logo-full.svg 200x27, logo-mobile.svg 120x18)
- [ ] Иконки (search, arrow-right, burger-menu, close, chevron-down, moon, sun, wallet, settings, logout, upload)
- [ ] Фоновые изображения (incubator.svg, vector.svg, create-token.svg)
- [ ] Картинки для Dashboard карточек (light/dark версии, 6 файлов)
- [ ] Placeholder аватарки (36x36, 74x74)
- [ ] Chart placeholder
- [ ] Token placeholder

### 3.20 Testing и Optimization

- [ ] Проверка всех страниц на desktop (1920px)
- [ ] Проверка всех страниц на tablet (768px)
- [ ] Проверка всех страниц на mobile (360px)
- [ ] Проверка переключения темы на всех страницах
- [ ] Проверка переключения языка
- [ ] Проверка всех форм (validation, submit)
- [ ] Проверка модальных окон (открытие/закрытие)
- [ ] Проверка dropdown меню
- [ ] Проверка mobile drawer
- [ ] Проверка навигации между страницами
- [ ] Проверка анимаций и transitions
- [ ] Performance audit (Lighthouse)
- [ ] Accessibility audit (WAVE, axe)

### 3.21 Documentation

- [ ] README.md с инструкциями запуска
- [ ] Комментарии в коде для сложной логики
- [ ] TODO комментарии для Web3 интеграции
- [ ] JSDoc для функций и компонентов (опционально)

---

## ЧАСТЬ 4: ПРИМЕРЫ КОДА КЛЮЧЕВЫХ КОМПОНЕНТОВ

### 4.1 Button Component (полный пример)

```typescript
// src/components/common/Button/Button.tsx

import { forwardRef } from "react";
import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "sell";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

    const variantStyles = {
      primary:
        "bg-primary-green text-white hover:bg-[#4a7a06] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(91,157,7,0.3)]",
      secondary:
        "bg-white dark:bg-dark-bgSecondary text-light-text dark:text-dark-text border border-light-text dark:border-dark-text hover:bg-light-bg dark:hover:bg-dark-bg",
      outline:
        "bg-transparent border-2 border-primary-green dark:border-white text-primary-green dark:text-white hover:bg-[rgba(91,157,7,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)]",
      sell: "bg-sell-red text-white hover:bg-sell-hover hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,88,88,0.3)]",
    };

    const sizeStyles = {
      sm: "h-[30px] px-3 text-xs rounded-10",
      md: "h-[44px] px-4 text-sm rounded-20",
      lg: "h-[50px] px-6 text-sm rounded-30",
    };

    const widthStyles = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyles,
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
```

### 4.2 Input Component (полный пример)

```typescript
// src/components/common/Input/Input.tsx

import { forwardRef, useState } from "react";
import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const containerStyles = clsx(
      "flex items-center",
      "h-[48px] px-3",
      "rounded-20",
      "border transition-all duration-200",
      "bg-white dark:bg-[rgba(255,255,255,0.05)]",
      {
        "border-[rgba(28,68,48,0.1)] dark:border-[rgba(255,255,255,0.1)]":
          !error && !isFocused,
        "border-[#5B9D07] dark:border-[#58FF84] border-2": isFocused && !error,
        "border-[#FF5858] border-2": error,
        "opacity-50 cursor-not-allowed": disabled,
        "w-full": fullWidth,
      }
    );

    const inputStyles = clsx(
      "w-full bg-transparent outline-none",
      "font-sans text-sm",
      "text-light-text dark:text-dark-text",
      "placeholder:text-light-text50 dark:placeholder:text-dark-text50"
    );

    return (
      <div className={clsx("flex flex-col", fullWidth && "w-full")}>
        {label && (
          <label className="mb-2 text-xs font-normal text-light-text50 dark:text-dark-text50">
            {label}
          </label>
        )}
        <div className={containerStyles}>
          <input
            ref={ref}
            disabled={disabled}
            className={inputStyles}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
        </div>
        {(error || helperText) && (
          <p
            className={clsx(
              "mt-1 text-xs",
              error
                ? "text-sell-red"
                : "text-light-text50 dark:text-dark-text50"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
```

### 4.3 Modal Component (полный пример)

```typescript
// src/components/common/Modal/Modal.tsx

import { useEffect } from "react";
import { X } from "lucide-react";
import clsx from "clsx";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useKeyPress } from "@/hooks/useKeyPress";
import type { WithChildren } from "@/types/common";

interface ModalProps extends WithChildren {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg";
  showCloseButton?: boolean;
}

function Modal({
  isOpen,
  onClose,
  title,
  size = "md",
  showCloseButton = true,
  children,
}: ModalProps) {
  const modalRef = useClickOutside<HTMLDivElement>(onClose);
  useKeyPress("Escape", onClose);

  // Блокировка скролла body при открытии modal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeStyles = {
    sm: "max-w-md",
    md: "max-w-[522px]",
    lg: "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center animate-fade-in">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[rgba(255,255,255,0.2)] dark:bg-[rgba(0,0,0,0.4)] backdrop-blur-[30.3px]"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className={clsx(
          "relative z-[1000] w-[calc(100%-40px)]",
          sizeStyles[size],
          "bg-white dark:bg-[rgba(217,217,217,0.05)]",
          "rounded-20 shadow-modal",
          "dark:backdrop-blur-[73.2px]",
          "p-10 mobile:p-[30px]",
          "animate-scale-in"
        )}
      >
        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-light-text dark:text-dark-text opacity-50 hover:opacity-100 transition-opacity" />
          </button>
        )}

        {/* Title */}
        {title && (
          <h2
            id="modal-title"
            className="text-2xl font-semibold text-center mb-20 mobile:mb-[50px] text-primary-green dark:text-white"
          >
            {title}
          </h2>
        )}

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
```

### 4.4 DashboardCard Component (полный пример)

```typescript
// src/components/features/Dashboard/DashboardCard.tsx

import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "@/store/useThemeStore";
import Button from "@/components/common/Button";

interface DashboardCardProps {
  imageLight: string;
  imageDark: string;
}

function DashboardCard({ imageLight, imageDark }: DashboardCardProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useThemeStore((state) => state.theme);

  const currentImage = theme === "dark" ? imageDark : imageLight;

  return (
    <div className="relative w-[401px] h-[508px] tablet:w-full mobile:w-full mobile:h-auto rounded-20 bg-white dark:bg-[rgba(217,217,217,0.05)] dark:shadow-card-dark dark:backdrop-blur-[73.2px] p-5 mobile:p-[14px] overflow-visible transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Выступающая картинка */}
      <div className="absolute -top-10 mobile:-top-[30px] left-1/2 -translate-x-1/2 w-[250px] h-[130px] mobile:w-[180px] mobile:h-[100px] rounded-[500px] overflow-hidden bg-light-avatar z-10">
        <img
          src={currentImage}
          alt="Dashboard card"
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      </div>

      {/* Отступ под картинку */}
      <div className="h-[90px] mobile:h-[70px]" />

      {/* Content Box */}
      <div className="w-full h-[221px] mobile:h-[150px] rounded-10 bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(0,0,0,0.2)] dark:backdrop-blur-[73.2px] mb-[50px] mobile:mb-8" />

      {/* Заголовок */}
      <h3 className="text-xl mobile:text-lg font-semibold text-primary-green dark:text-dark-accent mb-[30px] mobile:mb-5">
        {t("dashboard.newTokens")}
      </h3>

      {/* Описание */}
      <p className="text-base mobile:text-sm font-normal leading-[1.4] text-light-text dark:text-dark-text mb-auto mobile:mb-[30px]">
        {t("dashboard.description")}
      </p>

      {/* Кнопка */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={() => navigate("/listing")}
        className="mt-auto mobile:!h-11 mobile:!text-sm"
      >
        {t("dashboard.discoverButton")}
        <ArrowRight className="ml-1.5 w-3 h-3 mobile:w-2.5 mobile:h-2.5" />
      </Button>
    </div>
  );
}

export default DashboardCard;
```

### 4.5 TokenCard Component (полный пример)

```typescript
// src/components/features/TokenCard/TokenCard.tsx

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
import { enUS, ru } from "date-fns/locale";
import type { Token } from "@/types/token";
import { useLanguageStore } from "@/store/useLanguageStore";

interface TokenCardProps {
  token: Token;
}

function TokenCard({ token }: TokenCardProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const locale = useLanguageStore((state) => state.locale);

  const timeAgo = formatDistanceToNow(token.createdAt, {
    addSuffix: true,
    locale: locale === "ru" ? ru : enUS,
  });

  return (
    <div
      onClick={() => navigate(`/token/${token.id}`)}
      className="relative w-full h-[114px] rounded-10 bg-white dark:bg-[rgba(217,217,217,0.05)] shadow-card-light dark:shadow-card-dark dark:backdrop-blur-[73.2px] p-3 flex items-center gap-2.5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-[rgba(91,157,7,0.02)] dark:hover:bg-[rgba(88,255,132,0.03)]"
    >
      {/* Аватарка */}
      <div className="flex-shrink-0 w-[81px] h-[81px] mobile:w-[70px] mobile:h-[70px] rounded-full bg-light-avatar overflow-hidden">
        <img
          src={token.imageUrl || "/assets/placeholders/token-placeholder.svg"}
          alt={token.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Текстовая информация */}
      <div className="flex-1 h-[81px] mobile:h-[70px] flex flex-col justify-between pr-2.5">
        <div className="flex items-center gap-1 text-sm mobile:text-xs">
          <span className="text-light-text50 dark:text-dark-text50">
            {t("listing.createdBy")}
          </span>
          <span className="text-primary-green dark:text-dark-accent">
            {token.createdBy}
          </span>
        </div>

        <div className="flex items-center gap-1 text-sm mobile:text-xs">
          <span className="text-light-text50 dark:text-dark-text50">
            {t("listing.marketCap")}
          </span>
          <span className="text-light-text dark:text-dark-text">
            {token.marketCap}
          </span>
        </div>

        <div className="flex items-center gap-1 text-sm mobile:text-xs">
          <span className="text-light-text50 dark:text-dark-text50">
            {t("listing.replies")}
          </span>
          <span className="text-light-text dark:text-dark-text">
            {token.replies}
          </span>
        </div>

        <div className="text-sm mobile:text-xs text-light-text dark:text-dark-text">
          {token.symbol}
        </div>
      </div>

      {/* Time Badge */}
      <div className="absolute top-2 right-2 mobile:top-1.5 mobile:right-1.5 w-[65px] h-6 mobile:w-[55px] mobile:h-[22px] rounded-20 bg-[#E2E2E2] dark:bg-[rgba(217,217,217,0.05)] flex items-center justify-center">
        <span className="text-xs mobile:text-[11px] text-light-text dark:text-dark-text">
          {timeAgo.replace("about ", "").replace(" ago", "")}
        </span>
      </div>
    </div>
  );
}

export default TokenCard;
```

---

## ЗАКЛЮЧЕНИЕ

Это **полная и детализированная спецификация** для разработки ECOCHAIN frontend приложения. Документ содержит:

✅ **Техническую архитектуру** - стек, структуру проекта, конфигурации
✅ **Полную UI/UX спецификацию** - размеры, цвета, шрифты, отступы для каждого элемента
✅ **Детальное описание компонентов** - от Header до TokenDetail
✅ **Адаптивность** - breakpoints и поведение на всех разрешениях
✅ **Анимации и transitions** - все эффекты и timing
✅ **Accessibility** - keyboard navigation, ARIA, focus states
✅ **Web3 заглушки** - hooks для будущей интеграции
✅ **i18n** - мультиязычность EN/RU
✅ **State management** - Zustand stores
✅ **Примеры кода** - готовые компоненты для старта
✅ **Чеклист разработки** - пошаговый план выполнения

**Используя эту спецификацию, любой разработчик сможет создать pixel-perfect копию дизайна с полной функциональностью.**# ECOCHAIN: ПОЛНАЯ UI/UX СПЕЦИФИКАЦИЯ v2.0

## ЧАСТЬ 1: ТЕХНИЧЕСКАЯ АРХИТЕКТУРА

### 1.1 Стек технологий (финальный)

**Core:**

- React 18.2+
- TypeScript 5.3+ (strict mode)
- Vite 5.x
- **Tailwind CSS 3.4.x** (НЕ используем 4.0 - только стабильная 3.x ветка)
- React Router v6.20+

**State & Data:**

- Zustand 4.4+ (глобальное состояние)
- Axios 1.6+ (HTTP клиент для будущего API)
- React Query 5.x (опционально, для кэширования)

**Утилиты:**

- react-i18next 13.4+ (интернационализация EN/RU)
- lucide-react 0.263.1 (иконки)
- clsx 2.0+ (условные классы)
- date-fns 3.0+ (работа с датами)

**Точные версии (package.json):**

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "typescript": "^5.3.0",
    "zustand": "^4.4.7",
    "axios": "^1.6.2",
    "react-i18next": "^13.4.0",
    "i18next": "^23.7.0",
    "lucide-react": "^0.263.1",
    "clsx": "^2.0.0",
    "date-fns": "^3.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@types/node": "^20.10.4",
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

---

### 1.2 Структура проекта (детализированная)

```
ecochain-frontend/
├── public/
│   └── assets/
│       ├── icons/                    # SVG иконки
│       │   ├── search.svg            # 16x16, #5B9D07
│       │   ├── arrow-right.svg       # 5x12 (header), 3.5x8.5 (кнопки)
│       │   ├── burger-menu.svg       # 24x24
│       │   ├── close.svg             # 24x24 (крестик для закрытия)
│       │   ├── chevron-down.svg      # 16x16 (dropdown)
│       │   ├── moon.svg              # 20x20 (dark theme icon)
│       │   ├── sun.svg               # 20x20 (light theme icon)
│       │   ├── wallet.svg            # 20x20
│       │   ├── settings.svg          # 20x20
│       │   ├── logout.svg            # 20x20
│       │   └── upload.svg            # 16x16 (загрузка файла)
│       │
│       ├── images/
│       │   ├── backgrounds/
│       │   │   ├── incubator.svg     # 1000px высота, фоновый элемент
│       │   │   ├── vector.svg        # 900px высота, правая половина
│       │   │   └── create-token.svg  # 1000px высота, для CreateToken/AddLiquidity
│       │   │
│       │   └── token-cards/
│       │       ├── card-1-light.png  # Картинка для DashboardCard №1 (light theme)
│       │       ├── card-1-dark.png   # Картинка для DashboardCard №1 (dark theme)
│       │       ├── card-2-light.png
│       │       ├── card-2-dark.png
│       │       ├── card-3-light.png
│       │       └── card-3-dark.png
│       │
│       ├── logos/
│       │   ├── logo-full.svg         # 200x27 для desktop header
│       │   └── logo-mobile.svg       # 120x18 для mobile header
│       │
│       ├── avatars/
│       │   ├── avatar-placeholder-36.svg  # 36x36 для header
│       │   └── avatar-placeholder-74.svg  # 74x74 для форм и карточек
│       │
│       └── placeholders/
│           ├── chart-placeholder.png      # График для TokenDetail
│           └── token-placeholder.svg      # Placeholder для токенов без картинки
│
├── src/
│   ├── components/
│   │   ├── common/                   # Переиспользуемые базовые компоненты
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.types.ts   # TypeScript типы для пропсов
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── Input/
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Input.types.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── Card/
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Card.types.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── Modal/
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── ModalOverlay.tsx
│   │   │   │   ├── Modal.types.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── Dropdown/
│   │   │   │   ├── Dropdown.tsx
│   │   │   │   ├── DropdownItem.tsx
│   │   │   │   ├── Dropdown.types.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── Switch/
│   │   │       ├── Switch.tsx        # Toggle для темы
│   │   │       ├── Switch.types.ts
│   │   │       └── index.ts
│   │   │
│   │   ├── layout/                   # Компоненты структуры
│   │   │   ├── Header/
│   │   │   │   ├── Header.tsx        # Главный header компонент
│   │   │   │   ├── DesktopHeader.tsx # Desktop версия (1240px+)
│   │   │   │   ├── MobileHeader.tsx  # Mobile версия (<1240px)
│   │   │   │   ├── SearchBar.tsx     # Поисковая строка
│   │   │   │   ├── ProfileBlock.tsx  # Блок профиля с аватаркой
│   │   │   │   ├── HeaderDropdown.tsx # Dropdown меню профиля
│   │   │   │   ├── LanguageSelector.tsx # Выбор языка
│   │   │   │   ├── ThemeToggle.tsx   # Переключатель темы
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── MobileMenu/
│   │   │   │   ├── MobileMenu.tsx    # Drawer для мобильного меню
│   │   │   │   ├── MobileMenuOverlay.tsx
│   │   │   │   ├── MobileNavLinks.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── Container/
│   │   │   │   ├── Container.tsx     # Responsive контейнер (350-1295px)
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── PageBackground/
│   │   │   │   ├── PageBackground.tsx # Управляет фоновыми элементами
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── Layout.tsx            # Общий layout wrapper для всех страниц
│   │   │
│   │   └── features/                 # Специфичные компоненты фич
│   │       ├── Dashboard/
│   │       │   ├── DashboardCard.tsx          # 401x508 карточка
│   │       │   ├── DashboardCardImage.tsx     # Картинка в карточке (250x130)
│   │       │   ├── DashboardCardContent.tsx   # Контент карточки
│   │       │   ├── DashboardGrid.tsx          # Grid из 3 карточек
│   │       │   └── index.ts
│   │       │
│   │       ├── TokenCard/
│   │       │   ├── TokenCard.tsx              # 408x114 карточка токена
│   │       │   ├── TokenCardAvatar.tsx        # Аватарка токена 81x81
│   │       │   ├── TokenCardInfo.tsx          # Текстовая информация
│   │       │   ├── TokenCardTimeBadge.tsx     # Плашка времени 65x24
│   │       │   └── index.ts
│   │       │
│   │       ├── TokenGrid/
│   │       │   ├── TokenGrid.tsx              # Grid карточек токенов (5 колонок)
│   │       │   ├── ShowMoreButton.tsx         # Кнопка "Show More"
│   │       │   └── index.ts
│   │       │
│   │       ├── CreateTokenModal/
│   │       │   ├── CreateTokenModal.tsx       # Модальное окно выбора типа создания
│   │       │   ├── ModalButton.tsx            # Кнопки внутри модалки
│   │       │   └── index.ts
│   │       │
│   │       ├── CreateTokenForm/
│   │       │   ├── CreateTokenForm.tsx        # Основная форма создания
│   │       │   ├── ImageUploadBlock.tsx       # Блок загрузки изображения
│   │       │   ├── FormInput.tsx              # Поле ввода формы
│   │       │   ├── FormTextarea.tsx           # Textarea для описания
│   │       │   └── index.ts
│   │       │
│   │       ├── AddLiquidityForm/
│   │       │   ├── AddLiquidityForm.tsx       # Форма добавления ликвидности
│   │       │   ├── LiquidityInputs.tsx        # 4 поля ввода
│   │       │   ├── SkipButton.tsx             # Кнопка "Skip"
│   │       │   └── index.ts
│   │       │
│   │       └── TokenDetail/
│   │           ├── TokenDetailView.tsx        # Основной компонент страницы
│   │           ├── TokenDetailLeft.tsx        # Левая колонка (406px)
│   │           ├── TokenDetailRight.tsx       # Правая колонка (493px)
│   │           ├── TokenInfoBlock.tsx         # Блок с логотипом и названием
│   │           ├── TokenChart.tsx             # Контейнер графика
│   │           ├── TokenDescription.tsx       # Lorem ipsum описание
│   │           ├── TokenSummary.tsx           # Summary информация (справа)
│   │           ├── TokenActions.tsx           # Поле ввода + кнопки Buy/Sell
│   │           └── index.ts
│   │
│   ├── pages/                        # Страницы приложения
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── Listing/
│   │   │   ├── Listing.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── MyTokens/
│   │   │   ├── MyTokens.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── CreateToken/
│   │   │   ├── CreateToken.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── AddLiquidity/
│   │   │   ├── AddLiquidity.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── TokenDetail/
│   │   │   ├── TokenDetail.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── NotFound/
│   │       ├── NotFound.tsx          # 404 страница
│   │       └── index.ts
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useTheme.ts               # Hook для работы с темой
│   │   ├── useMediaQuery.ts          # Hook для responsive логики
│   │   ├── useClickOutside.ts        # Hook для закрытия dropdown/modal
│   │   ├── useDebounce.ts            # Debounce для поиска
│   │   ├── useKeyPress.ts            # Hook для ESC и других клавиш
│   │   ├── useLocalStorage.ts        # Сохранение настроек локально
│   │   │
│   │   └── web3/                     # Web3 hooks (заглушки)
│   │       ├── useWallet.ts          # Подключение кошелька
│   │       ├── useTokenContract.ts   # Взаимодействие с контрактом токенов
│   │       └── useBalance.ts         # Получение баланса
│   │
│   ├── store/                        # Zustand stores
│   │   ├── useThemeStore.ts          # Состояние темы (light/dark)
│   │   ├── useUserStore.ts           # Данные пользователя (адрес, имя, баланс)
│   │   ├── useTokenStore.ts          # Данные токенов (список, фильтры)
│   │   ├── useModalStore.ts          # Состояние модальных окон
│   │   └── useLanguageStore.ts       # Состояние языка (EN/RU)
│   │
│   ├── types/                        # TypeScript типы
│   │   ├── token.ts                  # Типы для токенов
│   │   ├── user.ts                   # Типы для пользователя
│   │   ├── web3.ts                   # Типы для Web3
│   │   ├── common.ts                 # Общие типы
│   │   └── index.ts                  # Экспорт всех типов
│   │
│   ├── lib/                          # Утилиты и конфигурация
│   │   ├── i18n.ts                   # react-i18next конфигурация
│   │   ├── constants.ts              # Размеры, breakpoints, цвета
│   │   ├── mockData.ts               # Моковые данные для разработки
│   │   ├── helpers.ts                # Вспомогательные функции
│   │   └── web3/                     # Web3 утилиты (заглушки)
│   │       ├── contracts.ts          # АБИ контрактов
│   │       └── utils.ts              # Web3 утилиты
│   │
│   ├── locales/                      # Файлы переводов
│   │   ├── en/
│   │   │   └── translation.json      # Английские переводы
│   │   └── ru/
│   │       └── translation.json      # Русские переводы
│   │
│   ├── styles/                       # Глобальные стили
│   │   ├── index.css                 # Tailwind импорты + глобальные стили
│   │   └── animations.css            # CSS анимации (опционально)
│   │
│   ├── App.tsx                       # Главный компонент приложения
│   ├── main.tsx                      # Entry point
│   └── vite-env.d.ts                 # Vite типы
│
├── .env.example                      # Пример конфигурации
├── .gitignore
├── index.html
├── tailwind.config.js                # Tailwind конфигурация
├── postcss.config.js                 # PostCSS конфигурация
├── vite.config.ts                    # Vite конфигурация
├── tsconfig.json                     # TypeScript конфигурация
├── tsconfig.node.json                # TypeScript для Node.js
├── package.json
├── package-lock.json
└── README.md
```

---

### 1.3 Tailwind CSS 3.4.x Конфигурация

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Используем class-based dark mode
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          green: "#5B9D07",
          purple: "#8247E5",
          yellow: "#F0B90B",
          darkGreen: "#05521A",
        },
        // Light theme colors
        light: {
          bg: "#F1F1F1",
          bgSecondary: "#FFFFFF",
          text: "#1C4430",
          text50: "rgba(28, 68, 48, 0.5)",
          avatar: "#D9D9D9",
          inputBg: "#FFFFFF",
          inputBorder: "rgba(28, 68, 48, 0.1)",
        },
        // Dark theme colors
        dark: {
          bg: "#0F0F16",
          bgSecondary: "rgba(217, 217, 217, 0.05)",
          text: "#FFFFFF",
          text50: "rgba(255, 255, 255, 0.5)",
          accent: "#58FF84",
          cardBg: "rgba(217, 217, 217, 0.05)",
          inputBg: "rgba(255, 255, 255, 0.05)",
          inputBorder: "rgba(255, 255, 255, 0.1)",
        },
        // Sell button color
        sell: {
          red: "#FF5858",
          hover: "#E04848",
        },
      },
      spacing: {
        18: "4.5rem", // 72px
        25: "6.25rem", // 100px (для отступов от края)
        30: "7.5rem", // 120px
        45: "11.25rem", // 180px
        50: "12.5rem", // 200px
        80: "20rem", // 320px
      },
      maxWidth: {
        mobile: "350px",
        container: "1295px",
      },
      minHeight: {
        "screen-header": "calc(100vh - 120px)", // Высота экрана минус header
      },
      borderRadius: {
        8: "8.32px",
        10: "10px",
        20: "20px",
        30: "30px",
        35: "35px",
        500: "500px", // Для круглых элементов
      },
      backdropBlur: {
        30: "30.3px",
        73: "73.2px",
      },
      boxShadow: {
        "card-light": "0 2px 8px rgba(0, 0, 0, 0.05)",
        "card-dark":
          "0 0 0 1px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.3)",
        header: "0 2px 8px rgba(0, 0, 0, 0.1)",
        modal: "0 8px 32px rgba(0, 0, 0, 0.2)",
        dropdown: "0 4px 12px rgba(0, 0, 0, 0.15)",
      },
      screens: {
        mobile: "360px",
        tablet: "768px",
        desktop: "1240px",
        xl: "1920px",
      },
      fontSize: {
        // Кастомные размеры для проекта
        xs: ["12px", { lineHeight: "1.4" }],
        sm: ["14px", { lineHeight: "1.5" }],
        base: ["18px", { lineHeight: "1.6" }],
        lg: ["20px", { lineHeight: "1.4" }],
        xl: ["24px", { lineHeight: "1.3" }],
        "2xl": ["30px", { lineHeight: "1.2" }],
        "3xl": ["50px", { lineHeight: "1.2" }],
      },
      fontFamily: {
        sans: ["Nunito Sans", "system-ui", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        semibold: "600",
        bold: "700",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      transitionDuration: {
        400: "400ms",
      },
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "fade-out": "fadeOut 0.3s ease-out",
        "slide-in-left": "slideInLeft 0.3s ease-out",
        "slide-out-left": "slideOutLeft 0.3s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "scale-out": "scaleOut 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOutLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        scaleOut: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.9)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
```

---

### 1.4 Основные константы (детализированные)

```typescript
// src/lib/constants.ts

/**
 * Breakpoints для адаптивного дизайна
 */
export const BREAKPOINTS = {
  MOBILE: 360,
  TABLET: 768,
  DESKTOP: 1240,
  XL: 1920,
} as const;

/**
 * Размеры контейнеров на разных разрешениях
 */
export const CONTAINER_SIZES = {
  MOBILE: 350,
  TABLET: 900,
  DESKTOP: 1295,
} as const;

/**
 * Размеры header на разных разрешениях
 */
export const HEADER_SIZES = {
  DESKTOP: { width: 1870, height: 70 },
  MOBILE: { width: 350, height: 36 },
} as const;

/**
 * Размеры Dashboard карточек
 */
export const DASHBOARD_CARD = {
  DESKTOP: { width: 401, height: 508 },
  TABLET: { width: 425, height: 480 },
  MOBILE: { width: 350, height: "auto" },
  IMAGE: { width: 250, height: 130 },
  CONTENT_BOX: { width: 369, height: 221 },
} as const;

/**
 * Размеры карточек токенов
 */
export const TOKEN_CARD = {
  DESKTOP: { width: 408, height: 114 },
  TABLET: { width: 425, height: 105 },
  MOBILE: { width: 350, height: 114 },
  AVATAR: { width: 81, height: 81 },
  TIME_BADGE: { width: 65, height: 24 },
} as const;

/**
 * Цветовая палитра проекта
 */
export const COLORS = {
  primary: {
    green: "#5B9D07",
    purple: "#8247E5",
    yellow: "#F0B90B",
    darkGreen: "#05521A",
  },
  light: {
    bg: "#F1F1F1",
    bgSecondary: "#FFFFFF",
    text: "#1C4430",
    text50: "rgba(28, 68, 48, 0.5)",
    avatar: "#D9D9D9",
  },
  dark: {
    bg: "#0F0F16",
    bgSecondary: "rgba(217, 217, 217, 0.05)",
    text: "#FFFFFF",
    text50: "rgba(255, 255, 255, 0.5)",
    accent: "#58FF84",
  },
  sell: {
    red: "#FF5858",
    hover: "#E04848",
  },
} as const;

/**
 * Transition timing для анимаций
 */
export const TRANSITIONS = {
  fast: "0.2s ease",
  normal: "0.3s ease-out",
  slow: "0.4s ease-out",
} as const;

/**
 * Z-index hierarchy
 */
export const Z_INDEX = {
  base: 1,
  elevated: 10,
  dropdown: 100,
  drawer: 500,
  overlay: 998,
  modal: 999,
  notification: 1000,
} as const;

/**
 * Отступы между элементами
 */
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 40,
  "5xl": 50,
  "6xl": 60,
  "7xl": 80,
} as const;

/**
 * Routes приложения
 */
export const ROUTES = {
  DASHBOARD: "/",
  LISTING: "/listing",
  MY_TOKENS: "/my-tokens",
  CREATE_TOKEN: "/create-token",
  ADD_LIQUIDITY: "/add-liquidity",
  TOKEN_DETAIL: "/token/:id",
  NOT_FOUND: "*",
} as const;

/**
 * Локали для i18n
 */
export const LOCALES = {
  EN: "en",
  RU: "ru",
} as const;

/**
 * Темы приложения
 */
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
} as const;
```

---

### 1.5 TypeScript типы (полные)

```typescript
// src/types/token.ts

/**
 * Основной тип токена
 */
export interface Token {
  id: string;
  name: string;
  symbol: string;
  imageUrl: string | null;
  price: number;
  marketCap: string;
  volume: string;
  holders: number;
  blockchain: string;
  createdBy: string;
  createdAt: Date;
  description: string;
  replies: number; // Количество комментариев/ответов
}

/**
 * Расширенная информация о токене для страницы деталей
 */
export interface TokenDetail extends Token {
  fullDescription: string;
  chartUrl: string;
  raised: string; // Текущая собранная сумма (например "$7.5K")
  raiseTarget: string; // Целевая сумма (например "$2,400,000")
  raisePercentage: string; // Процент выполнения (например "150%")
}

/**
 * Данные для создания нового токена
 */
export interface CreateTokenData {
  name: string;
  symbol: string;
  emission: number;
  info: string;
  image: File | null;
}

/**
 * Данные для добавления ликвидности
 */
export interface AddLiquidityData {
  x1TokenAmount: number;
  nktTokenAmount: string;
  tokenPriceUSD: number;
  tokenPriceX1: number;
}

/**
 * Фильтры для списка токенов
 */
export interface TokenFilters {
  search: string;
  sortBy: "price" | "marketCap" | "volume" | "createdAt";
  sortOrder: "asc" | "desc";
}

// src/types/user.ts

/**
 * Данные пользователя
 */
export interface User {
  address: string;
  name: string;
  balance: string;
  avatar?: string;
  isConnected: boolean;
}

/**
 * Состояние подключения кошелька
 */
export interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}

// src/types/web3.ts

/**
 * Конфигурация Web3 провайдера (заглушка)
 */
export interface Web3Config {
  chainId: number;
  rpcUrl: string;
  contractAddress: string;
}

/**
 * Результат транзакции
 */
export interface TransactionResult {
  hash: string;
  success: boolean;
  error?: string;
}

// src/types/common.ts

/**
 * Общий тип для компонентов с children
 */
export interface WithChildren {
  children: React.ReactNode;
}

/**
 * Общий тип для компонентов с className
 */
export interface WithClassName {
  className?: string;
}

/**
 * Состояния загрузки
 */
export type LoadingState = "idle" | "loading" | "success" | "error";

/**
 * Темы приложения
 */
export type Theme = "light" | "dark";

/**
 * Языки приложения
 */
export type Locale = "en" | "ru";

/**
 * Размеры компонентов
 */
export type ComponentSize = "sm" | "md" | "lg";

/**
 * Варианты кнопок
 */
export type ButtonVariant = "primary" | "secondary" | "outline" | "sell";
```

---

## ЧАСТЬ 2: ДЕТАЛЬНАЯ UI/UX СПЕЦИФИКАЦИЯ

### 2.0 ГЛОБАЛЬНЫЕ ПРАВИЛА ДИЗАЙНА

#### 2.0.1 Цветовая схема (финальная)

**Светлая тема (default):**

- Фон страницы: `#F1F1F1`
- Карточки/контейнеры: `#FFFFFF`
- Текст основной: `#1C4430`
- Текст вторичный (50%): `rgba(28, 68, 48, 0.5)`
- Аккент зелёный: `#5B9D07`
- Красный (sell): `#FF5858`
- Аватарки: `#D9D9D9`
- Фон input: `#FFFFFF`
- Border input: `rgba(28, 68, 48, 0.1)`

**Тёмная тема:**

- Фон страницы: `#0F0F16`
- Карточки/контейнеры: `rgba(217, 217, 217, 0.05)` + `backdrop-blur(73.2px)` + shadow
- Текст основной: `#FFFFFF`
- Текст вторичный (50%): `rgba(255, 255, 255, 0.5)`
- Аккент зелёный: `#58FF84` (ярче чем в light)
- Красный (sell): `#FF5858` (не меняется)
- Аватарки: `#D9D9D9` (не меняется)
- Фон input: `rgba(255, 255, 255, 0.05)`
- Border input: `rgba(255, 255, 255, 0.1)`

#### 2.0.2 Фоновые элементы (все страницы кроме TokenDetail)

**Нижний фоновый элемент:**

- Файл: `incubator.svg` (Dashboard, Listing, MyTokens) или `create-token.svg` (CreateToken, AddLiquidity)
- Позиция: `position: fixed`, `bottom: 0`, `left: 0`, `right: 0`
- Z-index: `-2` (за всем контентом)
- Высота: `1000px`
- Ширина: `calc(100% - 50px)` (25px отступ с каждой стороны)
- Горизонтальное выравнивание: центр (`margin: 0 auto`)
- Выходит за нижнюю границу viewport
- На TokenDetail странице: полностью убирается

**Правый фоновый вектор:**

- Файл: `vector.svg`
- Позиция: `position: fixed`, `top: 0`, `right: 0`
- Z-index: `-1` (перед нижним элементом, но за контентом)
- Высота: `900px`
- Ширина: `50vw` (половина ширины экрана, максимум 960px)
- Opacity: `0.6` на light theme, `0.4` на dark theme
- На всех страницах включая TokenDetail

#### 2.0.3 Типография (Nunito Sans)

**Загрузка шрифта:**

```html
<!-- В index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700&display=swap"
  rel="stylesheet"
/>
```

**Использование:**
| Элемент | Размер | Вес | Line-height | Применение |
|---------|--------|-----|-------------|------------|
| H1 | 30px | 600 (Semibold) | 1.2 | Заголовки страниц |
| H2 | 24px | 700 (Bold) | 1.3 | Заголовки карточек |
| H3 | 20px | 600 (Semibold) | 1.4 | Подзаголовки |
| Body Large | 18px | 400 (Regular) | 1.6 | Основной текст |
| Body | 14px | 400 (Regular) | 1.5 | Вторичный текст |
| Small | 12px | 400 (Regular) | 1.4 | Мелкий текст, labels |
| Caption | 12px | 300 (Light) | 1.3 | Timestamps, hints |
| Button Large | 14px | 700 (Bold) | 1.2 | Крупные кнопки |
| Button Small | 12.6px | 700 (Bold) | 1.2 | Мелкие кнопки |

---

### 2.1 HEADER (ВСЕ СТРАНИЦЫ)

#### 2.1.1 Desktop версия (1240px и выше)

**Контейнер Header:**

- Размер: `1870px × 70px`
- Позиция: фиксированная, `top: 25px`, горизонтально центрирован
- Border-radius: `8.32px`
- Фон: `#FFFFFF` (light) / `rgba(217, 217, 217, 0.05)` (dark)
- Box-shadow: `0 2px 8px rgba(0, 0, 0, 0.1)` (light) / dark shadow (dark)
- Backdrop-blur: `none` (light) / `73.2px` (dark)
- Z-index: `100`
- Display: `flex`, `items-center`, `justify-between`
- Padding: `0 30px`

**Элементы слева направо:**

1. **Логотип:**

   - Размер: `200px × 27px`
   - Файл: `logo-full.svg`
   - Margin-right: `50px`
   - Cursor: `pointer`
   - На клик: навигация на `/` (Dashboard)
   - Transition: `opacity 0.2s ease`
   - На hover: `opacity: 0.8`

2. **Навигационные кнопки (flex, gap: 50px):**

   **Кнопка "Dashboard":**

   - Текст: "Dashboard" (или перевод из i18n)
   - Font: Nunito Sans, Semibold, 14px
   - Цвет: `#1C4430` (неактивная) / `#5B9D07` (активная) на light
   - Цвет: `#FFFFFF` (неактивная) / `#58FF84` (активная) на dark
   - Активное состояние: подчёркивание `2px solid` снизу, цвет как у текста
   - Padding: `8px 0`
   - Cursor: `pointer`
   - Transition: `color 0.2s ease`
   - На hover (неактивная): цвет меняется на accent green
   - На клик: навигация на `/`

   **Кнопка "Listing":**

   - Аналогично Dashboard
   - На клик: навигация на `/listing`

   **Кнопка "My Tokens":**

   - Аналогично Dashboard
   - На клик: навигация на `/my-tokens`

3. **Поисковая строка:**

   - Размер: `480px × 36px`
   - Border-radius: `20px`
   - Фон: `#F1F1F1` (light) / `rgba(255, 255, 255, 0.05)` (dark)
   - Padding: `0 12px`
   - Display: `flex`, `items-center`
   - Margin-left: `50px`

   **Содержимое:**

   - **Иконка поиска** (SVG):

     - Размер: `16px × 16px`
     - Цвет: `#5B9D07` (light) / `#58FF84` (dark)
     - Margin-right: `8px`

   - **Input:**
     - Width: `100%`
     - Font: Nunito Sans, Regular, 14px
     - Placeholder: "Поиск токенов" (или перевод)
     - Placeholder color: `rgba(28, 68, 48, 0.5)` (light) / `rgba(255, 255, 255, 0.5)` (dark)
     - Text color: `#1C4430` (light) / `#FFFFFF` (dark)
     - Border: `none`
     - Background: `transparent`
     - Outline: `none`

   **Состояния:**

   - На hover контейнера: фон светлеет на 10%
   - На focus input: контейнер получает border `2px solid #5B9D07` (light) / `#58FF84` (dark)
   - Transition: `all 0.2s ease`

4. **Spacer:** margin-left: auto (отодвигает правые элементы в конец)

5. **Кнопка "Create new token":**

   - Размер: `160px × 36px`
   - Border-radius: `20px`
   - Фон: `#5B9D07`
   - Display: `flex`, `items-center`, `justify-center`, `gap: 6px`
   - Cursor: `pointer`
   - Margin-right: `30px`

   **Содержимое:**

   - Текст: "Create new token" (Nunito Sans, Bold, 12.6px, white)
   - Иконка стрелки: `3.5px × 8.5px`, white, SVG

   **Состояния:**

   - На hover: background `#4a7a06` (темнее на 20%), transform `translateY(-1px)`
   - На active: transform `translateY(0)`
   - Transition: `all 0.2s ease`
   - На клик: открывает модальное окно CreateTokenModal

6. **Блок профиля:**

   - Размер: `170px × 36px`
   - Display: `flex`, `items-center`, `gap: 10px`
   - Padding: `0 8px`
   - Border-radius: `20px`
   - Фон: `transparent`
   - Cursor: `pointer`
   - Transition: `background 0.2s ease`
   - На hover: фон `rgba(0, 0, 0, 0.02)` (light) / `rgba(255, 255, 255, 0.05)` (dark)

   **Содержимое:**

   - **Текстовый блок** (flex column):

     - **Имя:** "Noname" (Nunito Sans, Bold, 14px, `#1C4430` / `#FFFFFF`)
     - **Адрес:** "0x2...006728" (Nunito Sans, Regular, 12px, 50% opacity)

   - **Аватарка:**

     - Размер: `36px × 36px`
     - Border-radius: `50%`
     - Фон: `#D9D9D9`
     - Изображение: `avatar-placeholder-36.svg`
     - Object-fit: `cover`

   - **Иконка dropdown:**
     - Размер: `16px × 16px`
     - Цвет: `#1C4430` (light) / `#FFFFFF` (dark)
     - SVG: chevron-down

   **На клик:** открывает HeaderDropdown меню

#### 2.1.2 Mobile версия (до 1240px)

**Контейнер Header:**

- Размер: `350px × 36px` (на мобильных) / `calc(100% - 50px)` (на планшетах, max 900px)
- Позиция: фиксированная, `top: 25px`, горизонтально центрирован
- Border-radius: `8.32px`
- Фон: `#FFFFFF` (light) / `rgba(217, 217, 217, 0.05)` (dark)
- Box-shadow: аналогично desktop
- Z-index: `100`
- Display: `flex`, `items-center`, `justify-between`
- Padding: `0 8px`

**Элементы слева направо:**

1. **Кнопка бургер-меню:**

   - Размер: `24px × 24px`
   - SVG иконка (3 линии)
   - Цвет: `#1C4430` (light) / `#FFFFFF` (dark)
   - Cursor: `pointer`
   - Transition: `transform 0.2s ease`
   - На hover: transform `scale(1.1)`
   - На клик: открывает MobileMenu drawer

2. **Логотип (центр):**

   - Размер: `120px × 18px`
   - Файл: `logo-mobile.svg`
   - Position: `absolute`, `left: 50%`, `transform: translateX(-50%)`
   - Cursor: `pointer`
   - На клик: навигация на `/`

3. **Кнопка "Create new token" (иконка):**

   - Размер: `63px × 30px`
   - Border-radius: `20px`
   - Фон: `#5B9D07`
   - Display: `flex`, `items-center`, `justify-center`
   - Cursor: `pointer`

   **Содержимое:**

   - Иконка стрелки: `12px × 6px`, white, SVG (без текста)

   **Состояния:**

   - На hover: background темнеет
   - Transition: `all 0.2s ease`
   - На клик: открывает CreateTokenModal

#### 2.1.3 HeaderDropdown меню (Desktop)

**Trigger:** клик на блок профиля в desktop header

**Контейнер:**

- Размер: `250px × auto`
- Position: `absolute`, `top: 100%`, `right: 0`, `margin-top: 8px`
- Border-radius: `10px`
- Фон: `#FFFFFF` (light) / `rgba(217, 217, 217, 0.05)` (dark)
- Box-shadow: `0 4px 12px rgba(0, 0, 0, 0.15)`
- Backdrop-blur: `none` (light) / `30.3px` (dark)
- Padding: `12px 0`
- Z-index: `101`
- Animation: `scaleY(0) → scaleY(1)` за `0.2s ease-out`, `transform-origin: top`

**Пункты меню (вертикальный список):**

1. **Настройки профиля:**

   - Height: `44px`
   - Padding: `0 16px`
   - Display: `flex`, `items-center`, `gap: 12px`
   - Cursor: `pointer`
   - Transition: `background 0.2s ease`

   **Содержимое:**

   - Иконка (settings.svg): `20px × 20px`, цвет `#1C4430` / `#FFFFFF`
   - Текст: "Настройки профиля" (Regular, 14px)

   **Состояния:**

   - На hover: фон `#F1F1F1` (light) / `rgba(255, 255, 255, 0.05)` (dark)
   - На клик: навигация на `/profile` (TODO: создать страницу)

2. **Выбор языка:**

   - Структура аналогична п.1
   - Иконка: флаг текущего языка
   - Текст: "Language" / "Язык"
   - На клик: открывает вложенный LanguageSelector dropdown

   **Вложенный LanguageSelector:**

   - Размер: `120px × auto`
   - Position: `absolute`, `left: -130px` (слева от основного) или `right: 100%`
   - Стили: аналогичны основному dropdown
   - Padding: `8px 0`

   **Пункты:**

   - **English:**

     - Height: `36px`
     - Padding: `0 12px`
     - Display: `flex`, `items-center`, `gap: 8px`
     - Флаг 🇬🇧: `16px × 16px`
     - Текст: "English" (Regular, 14px)
     - На hover: фон светлеет
     - На клик: меняет язык на EN, закрывает dropdown
     - Если активен: цвет текста `#5B9D07` / `#58FF84`, checkmark справа

   - **Русский:**
     - Аналогично English
     - Флаг 🇷🇺
     - Текст: "Русский"
     - На клик: меняет язык на RU

3. **Выбор темы:**

   - Height: `44px`
   - Padding: `0 16px`
   - Display: `flex`, `items-center`, `justify-between`

   **Содержимое слева:**

   - Иконка (moon.svg / sun.svg): `20px × 20px`
   - Текст: "Theme" / "Тема" (Regular, 14px)

   **Справа - Switch/Toggle:**

   - Размер: `40px × 24px`
   - Border-radius: `12px` (полукруг)
   - Фон (off/light): `#E0E0E0`
   - Фон (on/dark): `#5B9D07`
   - Transition: `background 0.3s ease`

   **Thumb (кружок):**

   - Размер: `20px × 20px`
   - Border-radius: `50%`
   - Фон: `#FFFFFF`
   - Position: `absolute`
   - Left (light theme): `2px`
   - Left (dark theme): `18px` (справа)
   - Transition: `left 0.3s ease`

   **Логика:**

   - Клик на switch: toggle между light/dark темой
   - Сохраняет выбор в localStorage
   - Применяет класс `dark` к `<html>` элементу

4. **Баланс:**

   - Height: `44px`
   - Padding: `0 16px`
   - Display: `flex`, `items-center`, `justify-between`
   - Cursor: `default` (не кликабельный, только информация)

   **Содержимое:**

   - Слева:
     - Иконка (wallet.svg): `20px × 20px`
     - Текст label: "Balance:" (Regular, 14px, 50% opacity)
   - Справа:
     - Значение: "1,234.56 USDT" (Bold, 14px, `#5B9D07` / `#58FF84`)

5. **Divider (разделитель):**

   - Height: `1px`
   - Width: `100%`
   - Фон: `rgba(28, 68, 48, 0.1)` (light) / `rgba(255, 255, 255, 0.1)` (dark)
   - Margin: `8px 0`

6. **Выход:**

   - Height: `44px`
   - Padding: `0 16px`
   - Display: `flex`, `items-center`, `gap: 12px`
   - Cursor: `pointer`

   **Содержимое:**

   - Иконка (logout.svg): `20px × 20px`, цвет `#FF5858`
   - Текст: "Logout" / "Выход" (Regular, 14px, `#FF5858`)

   **Состояния:**

   - На hover: фон `rgba(255, 88, 88, 0.1)`
   - На клик: отключает кошелёк (если подключен), очищает user store, перезагружает страницу или редирект на Dashboard

**Закрытие dropdown:**

- Клик вне dropdown
- Клик на любой пункт (кроме Theme toggle)
- Нажатие ESC
- При навигации на другую страницу

#### 2.1.4 MobileMenu Drawer

**Trigger:** клик на бургер-меню в mobile header

**Overlay (Backdrop):**

- Position: `fixed`, fullscreen (`top: 0`, `left: 0`, `right: 0`, `bottom: 0`)
- Фон: `rgba(0, 0, 0, 0.3)`
- Backdrop-filter: `blur(10px)`
- Z-index: `998`
- Animation: `fadeIn 0.3s ease-out`
- На клик: закрывает drawer

**Drawer Container:**

- Размер: `280px × 100vh`
- Position: `fixed`, `top: 0`, `left: 0`
- Фон: `#FFFFFF` (light) / `rgba(217, 217, 217, 0.05)` (dark)
- Backdrop-blur: `none` (light) / `30.3px` (dark)
- Box-shadow: `4px 0 24px rgba(0, 0, 0, 0.2)`
- Z-index: `999`
- Animation: `slideInLeft 0.3s ease-out`
- Padding: `20px`
- Overflow-y: `auto`

**Содержимое (сверху вниз):**

1. **Header drawer:**

   - Height: `60px`
   - Display: `flex`, `items-center`, `justify-between`
   - Border-bottom: `1px solid rgba(28, 68, 48, 0.1)` (light) / `rgba(255, 255, 255, 0.1)` (dark)
   - Margin-bottom: `30px`

   **Слева - Логотип:**

   - Размер: `140px × 20px`
   - Файл: `logo-mobile.svg`

   **Справа - Кнопка закрытия:**

   - Размер: `24px × 24px`
   - SVG: close.svg (крестик)
   - Цвет: `#1C4430` (light) / `#FFFFFF` (dark)
   - Cursor: `pointer`
   - Transition: `transform 0.2s ease`
   - На hover: transform `rotate(90deg)`
   - На клик: закрывает drawer

2. **Поисковая строка:**

   - Размер: `240px × 36px`
   - Border-radius: `20px`
   - Фон: `#F1F1F1` (light) / `rgba(255, 255, 255, 0.05)` (dark)
   - Стили: аналогичны desktop версии
   - Margin-bottom: `30px`

3. **Навигационные ссылки (вертикальный список):**

   **Каждая ссылка:**

   - Height: `44px`
   - Width: `100%`
   - Display: `flex`, `items-center`
   - Padding: `0 12px`
   - Border-radius: `8px`
   - Margin-bottom: `15px`
   - Cursor: `pointer`
   - Transition: `all 0.2s ease`

   **Текст:**

   - Font: Nunito Sans, Semibold, 16px
   - Цвет: `#1C4430` (light) / `#FFFFFF` (dark)

   **Активное состояние:**

   - Цвет текста: `#5B9D07` (light) / `#58FF84` (dark)
   - Border-left: `3px solid` (тот же цвет)
   - Фон: `rgba(91, 157, 7, 0.05)`

   **На hover (неактивная):**

   - Фон: `#F1F1F1` (light) / `rgba(255, 255, 255, 0.05)` (dark)

   **Ссылки:**

   - Dashboard
   - Listing
   - My Tokens

4. **Divider:**

   - Height: `1px`
   - Width: `100%`
   - Фон: `rgba(28, 68, 48, 0.1)` (light) / `rgba(255, 255, 255, 0.1)` (dark)
   - Margin: `30px 0`

5. **Блок профиля:**

   - Display: `flex`, `flex-col`, `items-center`, `gap: 12px`
   - Margin-bottom: `30px`

   **Содержимое:**

   - **Аватарка:**

     - Размер: `50px × 50px`
     - Border-radius: `50%`
     - Фон: `#D9D9D9`

   - **Имя:**

     - Font: Nunito Sans, Bold, 16px
     - Цвет: `#1C4430` (light) / `#FFFFFF` (dark)
     - Text-align: `center`

   - **Адрес:**

     - Font: Nunito Sans, Regular, 12px
     - Цвет: 50% opacity
     - Text-align: `center`

   - **Кнопка dropdown:**
     - Размер: `24px × 24px`
     - SVG: chevron-down
     - Cursor: `pointer`
     - На клик: открывает HeaderDropdown меню (адаптированное для мобильной версии)

6. **Пункты меню профиля (встроенные):**
   - Можно разместить прямо в drawer вместо dropdown
   - Структура аналогична HeaderDropdown
   - Без вложенных меню (Language selector разворачивается inline)

**Закрытие drawer:**

- Клик на overlay
- Клик на кнопку закрытия (крестик)
- Нажатие ESC
- Выбор любой навигационной ссылки
- Свайп влево (опционально, через touch events)

**Анимация закрытия:**

- Drawer: `slideOutLeft 0.3s ease-out`
- Overlay: `fadeOut 0.3s ease-out`

---

### 2.2 DASHBOARD СТРАНИЦА

#### 2.2.1 Layout и структура

**Общий контейнер страницы:**

- Max-width: `1295px` (desktop)
- Margin: `0 auto`
- Padding: `0 25px` (предотвращает касание краёв)
- Min-height: `calc(100vh - 120px)` (высота экрана минус header с отступами)
- Position: `relative`
- Z-index: `1` (над фоновыми элементами)

**Отступ от header:**

- Margin-top: `80px` (desktop)
- Margin-top: `60px` (mobile)

#### 2.2.2 DashboardCard компонент (401px × 508px)

**Общий контейнер карточек (DashboardGrid):**

- Display: `grid`
- Grid-template-columns: `repeat(3, 1fr)` (desktop)
- Gap: `45px` (между карточками)
- Width: `100%`

**Каждая карточка (DashboardCard):**

- Размер: `401px × 508px`
- Border-radius: `20px`
- Background: `#FFFFFF` (light) / `rgba(217, 217, 217, 0.05)` (dark)
- Box-shadow: `none` (light) / `0 0 0 1px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.3)` (dark)
- Backdrop-filter: `none` (light) / `blur(73.2px)` (dark)
- Padding: `20px`
- Position: `relative`
- Overflow: `visible` (чтобы картинка выходила за край)
- Transition: `all 0.3s ease-out`
- Cursor: `default`

**Hover состояние:**

- Transform: `translateY(-4px)`
- Box-shadow усиливается на 50%

**Содержимое карточки (сверху вниз):**

1. **Контейнер картинки (DashboardCardImage):**

   - Размер: `250px × 130px`
   - Position: `absolute`, `top: -40px`, `left: 50%`, `transform: translateX(-50%)`
   - Border-radius: `500px` (полный круг)
   - Overflow: `hidden`
   - Background: `#D9D9D9` (fallback)
   - Z-index: `10`

   **Изображение:**

   - Width: `100%`, Height: `100%`
   - Object-fit: `cover`
   - Src: `card-1-light.png` (light theme) / `card-1-dark.png` (dark theme)
   - Alt: "Dashboard card image"

   **Логика смены картинки:**

   - При переключении темы картинка меняется плавно (fade transition)
   - Transition: `opacity 0.3s ease`

2. **Отступ сверху:** `90px` (чтобы контент не перекрывался с выступающей картинкой)

3. **Контейнер контента картинки (Content Box):**

   - Размер: `369px × 221px`
   - Border-radius: `10px`
   - Background: `rgba(0, 0, 0, 0.05)` (light) / `rgba(0, 0, 0, 0.2)` (dark)
   - Backdrop-filter: `none` (light) / `blur(73.2px)` (dark)
   - Box-shadow: `none` (light) / `inset 0 0 0 1px rgba(255, 255, 255, 0.05)` (dark)
   - Position: `relative`
   - Margin: `0 auto 50px`

   **Placeholder контент:**

   - Display: `flex`, `items-center`, `justify-center`
   - Текст: "Coming soon" или иконка (опционально)
   - Font: Nunito Sans, Regular, 14px, 50% opacity
   - Или просто пустой контейнер

4. **Заголовок карточки:**

   - Текст: "New tokens" (одинаковый для всех трёх карточек)
   - Font: Nunito Sans, Semibold, 24px
   - Color: `#5B9D07` (light) / `#58FF84` (dark)
   - Line-height: 1.3
   - Margin-bottom: `30px`
   - Text-align: `left`

5. **Описательный текст:**

   - Текст: "Create, Manage, and Distribute X1 based tokens with X1 no code solution"
   - Font: Nunito Sans, Regular, 18px
   - Line-height: 1.4
   - Color: `#1C4430` (light) / `#FFFFFF` (dark)
   - Margin-bottom: `auto` (push кнопку вниз)
   - Text-align: `left`

6. **Кнопка "Discover all tokens":**

   - Размер: `250px × 54px`
   - Border-radius: `20px`
   - Background: `#5B9D07`
   - Display: `flex`, `items-center`, `justify-center`, `gap: 6px`
   - Cursor: `pointer`
   - Margin-top: `auto` (прижата к низу карточки)
   - Transition: `all 0.2s ease`

   **Содержимое:**

   - Текст: "Discover all tokens" (Nunito Sans, Semibold, 19px, white)
   - Иконка стрелки: `5px × 12px`, white, SVG

   **Состояния:**

   - На hover:
     - Background: `#4a7a06` (темнее на 20%)
     - Transform: `translateY(-2px)`
     - Box-shadow: `0 4px 12px rgba(91, 157, 7, 0.3)`
   - На active: Transform: `translateY(0)`
   - На клик: навигация на `/listing`

#### 2.2.3 Адаптивность Dashboard

**Tablet (768px - 1239px):**

- Контейнер: max-width `900px`
- Grid: `grid-template-columns: repeat(2, 1fr)`
- Gap: `30px`
- Карточка: масштабируется пропорционально контейнеру (~425px × 480px)
- Картинка: `220px × 115px`, top `-35px`
- Content box: `393px × 200px`
- Заголовок: `22px`
- Описание: `16px`
- Кнопка: `230px × 50px`, текст `17px`

**Mobile (360px - 767px):**

- Контейнер: max-width `350px`
- Grid: `grid-template-columns: 1fr` (одна колонка)
- Gap: `20px`
- Карточка: `350px × auto` (высота зависит от контента)
- Padding: `14px`
- Картинка: `180px × 100px`, top `-30px`
- Content box: `318px × 150px`
- Margin-top под картинку: `70px`
- Заголовок: `20px`, margin-bottom `20px`
- Описание: `14px`, line-height `1.5`, margin-bottom `30px`
- Кнопка: `100%` width, `44px` height, текст `14px`, иконка `4px × 10px`

---

### 2.3 LISTING СТРАНИЦА (и MY TOKENS)

#### 2.3.1 Layout и структура

**Общий контейнер:**

- Max-width: `1295px`
- Margin: `0 auto`
- Padding: `0 25px`
- Margin-top: `80px` (desktop) / `60px` (mobile)
- Position: `relative`

#### 2.3.2 Заголовок страницы

**Контейнер заголовка:**

- Margin-bottom: `80px` (desktop) / `40px` (mobile)

**Текст заголовка:**

- Текст: "All tokens" (Listing) / "My tokens" (MyTokens)
- Font: Nunito Sans, Semibold, 30px (desktop) / 24px (mobile)
- Color: `#5B9D07` (light и dark темы одинаково)
- Line-height: 1.2
- Text-align: `left`

#### 2.3.3 TokenGrid компонент

**Контейнер grid:**

- Display: `grid`
- Grid-template-columns: `repeat(5, 1fr)` (desktop - 5 колонок)
- Gap: `30px` (вертикально и горизонтально)
- Margin-bottom: `50px`

**Максимум видимых карточек:** 15 (3 ряда × 5 колонок)

**Логика пагинации:**

- При первой загрузке: показать 15 карточек
- При клике "Show More": добавить ещё 15 карточек
- Кнопка "Show More" скрывается когда все токены загружены

#### 2.3.4 TokenCard компонент (408px × 114px)

**Карточка токена:**

- Размер: `408px × 114px`
- Border-radius: `10px`
- Background: `#FFFFFF` (light) / `rgba(217, 217, 217, 0.05)` (dark)
- Box-shadow: `0 2px 8px rgba(0, 0, 0, 0.05)` (light) / dark shadow (dark)
- Backdrop-filter: `none` (light) / `blur(73.2px)` (dark)
- Padding: `12px`
- Display: `flex`, `items-center`, `gap: 10px`
- Position: `relative`
- Cursor: `pointer`
- Transition: `all 0.2s ease`

**Hover состояние:**

- Transform: `translateY(-2px)`
- Box-shadow усиливается
- Background светлеет: `rgba(91, 157, 7, 0.02)` (light) / `rgba(88, 255, 132, 0.03)` (dark)

**На клик:**

- Навигация на `/token/:id` (страница TokenDetail)

**Содержимое карточки (слева направо):**

1. **Аватарка токена (TokenCardAvatar):**

   - Размер: `81px × 81px`
   - Border-radius: `50%`
   - Background: `#D9D9D9`
   - Overflow: `hidden`
   - Flex-shrink: `0` (не сжимается)

   **Изображение:**

   - Width: `100%`, Height: `100%`
   - Object-fit: `cover`
   - Src: из данных токена или placeholder
   - Alt: название токена

2. **Текстовая информация (TokenCardInfo):**

   - Flex: `1` (занимает оставшееся пространство)
   - Display: `flex`, `flex-col`, `justify-between`
   - Height: `81px`
   - Padding-right: `10px` (отступ от Time Badge)

   **Строка 1 - Created by:**

   - Display: `flex`, `items-center`, `gap: 4px`
   - Font: Nunito Sans, Regular, 14px
   - Line-height: 1.3

   **Label:**

   - Text: "Created by:"
   - Color: `rgba(28, 68, 48, 0.5)` (light) / `rgba(255, 255, 255, 0.5)` (dark)

   **Value (имя автора):**

   - Text: "noname" (из данных)
   - Color: `#5B9D07` (light) / `#58FF84` (dark)
   - Font-weight: `400` (Regular)

   **Строка 2 - Market Cap:**

   - Структура аналогична строке 1
   - Label: "market cap:" (50% opacity)
   - Value: "$4.4k" (100% opacity, основной цвет текста)

   **Строка 3 - Replies:**

   - Структура аналогична
   - Label: "replies:" (50% opacity)
   - Value: "1728" (100% opacity)

   **Строка 4 - Token Symbol:**

   - Text: "nametokens" (символ токена)
   - Font: Nunito Sans, Regular, 14px
   - Color: `#1C4430` (light) / `#FFFFFF` (dark)
   - Font-weight: `400`

3. **Time Badge (TokenCardTimeBadge):**

   - Размер: `65px × 24px`
   - Position: `absolute`, `top: 8px`, `right: 8px`
   - Border-radius: `20px`
   - Background: `#E2E2E2` (light) / `rgba(217, 217, 217, 0.05)` (dark)
   - Display: `flex`, `items-center`, `justify-center`
   - Z-index: `2`

   **Текст:**

   - Text: "20s ago" (динамически вычисляется из createdAt)
   - Font: Nunito Sans, Regular, 12px
   - Color: `#1C4430` (light) / `#FFFFFF` (dark)
   - Text-align: `center`

   **Логика времени:**

   - Использовать date-fns для форматирования
   - Примеры: "5s ago", "2m ago", "1h ago", "2d ago"
   - Обновляется каждую минуту (опционально)

#### 2.3.5 ShowMoreButton компонент

**Условие отображения:**

- Показывается только если есть ещё токены для загрузки
- Скрывается когда все токены отображены

**Кнопка:**

- Размер: `200px × 44px`
- Border-radius: `20px`
- Background: `#5B9D07`
- Display: `flex`, `items-center`, `justify-center`
- Margin: `50px auto 0` (центрирована)
- Cursor: `pointer`
- Transition: `all 0.2s ease`

**Текст:**

- Text: "Show More"
- Font: Nunito Sans, Semibold, 14px, white

**Состояния:**

- На hover:
  - Background: `#4a7a06`
  - Transform: `translateY(-2px)`
  - Box-shadow: `0 4px 12px rgba(91, 157, 7, 0.3)`
- На active: Transform: `translateY(0)`
- На клик:
  - Показать loading состояние (опционально: spinner или "Loading...")
  - Загрузить ещё 15 токенов
  - Добавить их в grid
  - Если токенов больше нет: скрыть кнопку

**Loading состояние:**

- Text: "Loading..."
- Cursor: `default`
- Opacity: `0.7`
- Pointer-events: `none`

#### 2.3.6 Адаптивность Listing

**Tablet (768px - 1239px):**

- Контейнер: max-width `900px`
- Grid: `grid-template-columns: repeat(2, 1fr)` (2 колонки)
- Gap: `25px`
- Карточка: масштабируется (~425px × 105px)
- Аватарка: `70px × 70px`
- Текст: `12px`
- Time Badge: `60px × 22px`, текст `11px`
- ShowMore button: `180px × 40px`, текст `13px`

**Mobile (360px - 767px):**

- Контейнер: max-width `350px`
- Grid: `grid-template-columns: 1fr` (1 колонка)
- Gap: `15px`
- Карточка: `350px × 114px`
- Padding: `10px`
- Аватарка: `70px × 70px`
- Текстовая информация: height `70px`
- Текст: `12px`, line-height `1.4`
- Time Badge: `55px × 22px`, текст `11px`, top `6px`, right `6px`
- ShowMore button: `100%` width, `44px` height, текст `14px`
- Margin-top button: `30px`

---

### 2.4 МОДАЛЬНОЕ ОКНО "CREATE NEW TOKEN"

#### 2.4.1 Trigger (открытие модального окна)

**Элементы-триггеры:**

- Кнопка "Create new token" в desktop header
- Кнопка-иконка в mobile header

**При клике на триггер:**

1. Устанавливается состояние `isModalOpen = true` в modal store
2. Применяется класс `overflow-hidden` к `<body>` (блокирует скролл страницы)
3. Запускается анимация появления overlay и modal

#### 2.4.2 Overlay (Backdrop)

**Контейнер overlay:**

- Position: `fixed`
- Top: `0`, Left: `0`, Right: `0`, Bottom: `0` (fullscreen)
- Background: `rgba(255, 255, 255, 0.2)` (light) / `rgba(0, 0, 0, 0.4)` (dark)
- Backdrop-filter: `blur(30.3px)`
- Z-index: `998`
- Display: `flex`, `items-center`, `justify-center`
- Animation: `fadeIn 0.3s ease-out`

**Логика закрытия:**

- На клик по overlay (не по modal): закрывает modal
- Использовать `event.target === event.currentTarget` для проверки

#### 2.4.3 Modal Container

**Контейнер modal:**

- Max-width: `522px` (desktop) / `calc(100% - 40px)` (mobile, max 400px)
- Background: `#FFFFFF` (light) / `rgba(217, 217, 217, 0.05)` (dark)
- Border-radius: `20px`
- Box-shadow: `0 8px 32px rgba(0, 0, 0, 0.2)`
- Backdrop-filter: `none` (light) / `blur(73.2px)` (dark)
- Padding: `40px` (desktop) / `30px` (mobile)
- Position: `relative`
- Z-index: `999`
- Animation: `scaleIn 0.3s ease-out`

**Содержимое modal (сверху вниз):**

1. **Заголовок:**

   - Text: "Create new token"
   - Font: Nunito Sans, Semibold, 30px (desktop) / 24px (mobile)
   - Color: `#5B9D07` (light) / `#FFFFFF` (dark)
   - Text-align: `center`
   - Line-height: 1.2
   - Margin-bottom: `80px` (desktop) / `50px` (mobile)

2. **Первая кнопка (Launch without liquidity):**

   - Размер: `442px × 50px` (desktop) / `100% × 48px` (mobile)
   - Border-radius: `35px`
   - Background: `#5B9D07`
   - Display: `flex`, `items-center`, `justify-center`
   - Cursor: `pointer`
   - Transition: `all 0.2s ease`
   - Margin-bottom: `35px` (desktop) / `25px` (mobile)

   **Текст:**

   - Text: "Launch without liquidity"
   - Font: Nunito Sans, Semibold, 14px, white

   **Состояния:**

   - На hover:
     - Background: `#4a7a06`
     - Transform: `translateY(-2px)`
     - Box-shadow: `0 4px 12px rgba(91, 157, 7, 0.3)`
   - На active: Transform: `translateY(0)`
   - На клик:
     - Закрывает modal
     - Навигация на `/create-token`

3. **Вторая кнопка (Launch with own liquidity):**

   - Размер: `442px × 50px` (desktop) / `100% × 48px` (mobile)
   - Border-radius: `35px`
   - Background: `transparent`
   - Border: `2px solid #5B9D07` (light) / `2px solid #FFFFFF` (dark)
   - Display: `flex`, `items-center`, `justify-center`
   - Cursor: `pointer`
   - Transition: `all 0.2s ease`

   **Текст:**

   - Text: "Launch with own liquidity"
   - Font: Nunito Sans, Semibold, 14px
   - Color: `#5B9D07` (light) / `#FFFFFF` (dark)

   **Состояния:**

   - На hover:
     - Background: `rgba(91, 157, 7, 0.05)` (light) / `rgba(255, 255, 255, 0.05)` (dark)
   - На active: Transform: `scale(0.98)`
   - На клик:
     - Закрывает modal
     - Навигация на `/add-liquidity`

4. **Кнопка закрытия (опционально, крестик в углу):**
   - Размер: `24px × 24px`
   - Position: `absolute`, `top: 16px`, `right: 16px`
   - SVG: close.svg
   - Color: `#1C4430` (light) / `#FFFFFF` (dark)
   - Cursor: `pointer`
   - Opacity: `0.5`
   - Transition: `all 0.2s ease`
   - На hover: Opacity: `1`, Transform: `rotate(90deg)`
   - На клик: Закрывает modal

#### 2.4.4 Логика закрытия modal

**Способы закрытия:**

1. Клик на overlay (вне modal)
2. Клик на кнопку закрытия (крестик)
3. Нажатие клавиши ESC
4. Выбор одной из двух кнопок (навигация)

**При закрытии:**

1. Animation: `scaleOut 0.3s ease-out` (modal), `fadeOut 0.3s ease-out` (overlay)
2. После завершения анимации:
   - Устанавливается `isModalOpen = false`
   - Удаляется класс `overflow-hidden` с `<body>`
   - Компонент размонтируется

#### 2.4.5 Адаптивность modal

**Desktop (1240px+):**

- Контейнер: `522px × auto`
- Padding: `40px`
- Заголовок: `30px`
- Кнопки: `442px × 50px`, текст `14px`
- Gap между кнопками: `35px`

**Tablet (768px - 1239px):**

- Контейнер: `450px × auto`
- Padding: `35px`
- Заголовок: `26px`
- Кнопки: `380px × 48px`, текст `13px`
- Gap: `30px`

**Mobile (360px - 767px):**

- Контейнер: `calc(100% - 40px)`, max-width `350px`
- Padding: `30px 20px`
- Заголовок: `24px`, margin-bottom `50px`
- Кнопки: `100% × 48px`, текст `14px`
- Gap: `25px`

---

### 2.5 CREATE TOKEN СТРАНИЦА

#### 2.5.1 Layout и фоновые элементы

**Фоновый элемент:**

- Файл: `create-token.svg` вместо `incubator.svg`
- Позиция и стили: аналогичны Dashboard, но другое изображение
- Transition при смене страницы: fade `0.3s ease`

**Общий контейнер:**

- Max-width: `480px` (desktop) / `350px` (mobile)
- Margin: `0 auto`
- Margin-top: `80px` (desktop) / `60px` (mobile)
- Position: `relative`
- Z-index: `1`

#### 2.5.2 Заголовок страницы

**Заголовок:**

- Text: "Create new token"
- Font: Nunito Sans, Semibold, 30px (desktop) / 24px (mobile)
- Color: `#5B9D07` (light) / `#58FF84` (dark)
- Text-align: `center`
- Line-height: 1.2
- Margin-bottom: `60px` (desktop) / `40px` (mobile)

#### 2.5.3 Форма создания токена (CreateTokenForm)

**Контейнер формы:**

- Размер: `480px × auto` (desktop) / `350px × auto` (mobile)
- Border-radius: `10px`
- Background: `#FFFFFF` (light) / `rgba(217, 217, 217, 0.05)` (dark)
- Box-shadow: `0 2px 8px rgba(0, 0, 0, 0.05)` (light) / dark shadow (dark)
- Backdrop-filter: `none` (light) / `blur(73.2px)` (dark)
- Padding: `20px` (desktop) / `16px` (mobile)

**Элементы формы (сверху вниз):**

1. **Блок загрузки изображения (ImageUploadBlock):**

   - Размер: `442px × 74px` (desktop) / `100% × 70px` (mobile)
   - Display: `flex`, `items-center`, `gap: 10px`
   - Margin-bottom: `20px`

   **Контейнер аватарки (слева):**

   - Размер: `74px × 74px` (desktop) / `60px × 60px` (mobile)
   - Border-radius: `50%`
   - Background: `#D9D9D9`
   - Display: `flex`, `items-center`, `justify-center`
   - Cursor: `pointer`
   - Transition: `all 0.2s ease`
   - Position: `relative`
   - Overflow: `hidden`

   **Содержимое (если изображение не загружено):**

   - SVG иконка: upload.svg или folder icon
   - Размер: `24px × 24px`
   - Color: `rgba(28, 68, 48, 0.3)` (light) / `rgba(255, 255, 255, 0.3)` (dark)

   **После загрузки изображения:**

   - Img элемент: width `100%`, height `100%`, object-fit `cover`
   - Hover эффект: overlay с opacity `0.3` и иконка "change"

   **Input file (скрытый):**

   - Display: `none`
   - Accept: `image/png, image/jpeg, image/svg+xml`
   - OnChange: обрабатывает загрузку файла, показывает preview

   **Текст-подсказка (центр):**

   - Flex: `1`
   - Text: "Загрузите изображение вашего токена"
   - Font: Nunito Sans, Regular, 12px
   - Color: `#1C4430` (light) / `#FFFFFF` (dark)
   - Line-height: 1.4
   - Opacity: `0.7`

   **Кнопка "Загрузить" (справа):**

   - Размер: `100px × 30px` (desktop) / `80px × 28px` (mobile)
   - Border-radius: `10px`
   - Background: `#FFFFFF` (light) / `rgba(255, 255, 255, 0.1)` (dark)
   - Border: `1px solid #5B9D07` (light) / `1px solid #FFFFFF` (dark)
   - Display: `flex`, `items-center`, `justify-center`, `gap: 4px`
   - Cursor: `pointer`
   - Transition: `all 0.2s ease`

   **Содержимое кнопки:**

   - Text: "Загрузить" (Nunito Sans, Bold, 12px, `#5B9D07` / `#FFFFFF`)
   - Иконка стрелки: `6px × 4px`, same color

   **На hover:**

   - Background: `rgba(91, 157, 7, 0.05)` (light) / `rgba(255, 255, 255, 0.15)` (dark)

   **На клик:** Открывает file picker (trigger скрытого input)

2. **Поле ввода Name:**

   - Размер: `442px × 48px` (desktop) / `100% × 44px` (mobile)
   - Border-radius: `20px`
   - Background: `#FFFFFF` (light) / `rgba(255, 255, 255, 0.05)` (dark)
   - Border: `1px solid rgba(28, 68, 48, 0.1)` (light) / `1px solid rgba(255, 255, 255, 0.1)` (dark)
   - Padding: `0 12px`
   - Margin-top: `20px` (первое поле) / `12px` (остальные)
   - Transition: `all 0.2s ease`

   **Input:**

   - Width: `100%`
   - Font: Nunito Sans, Regular, 14px
   - Color: `#1C4430` (light) / `#FFFFFF` (dark)
   - Placeholder: "Newtoken01"
   - Placeholder color: 50% opacity
   - Border: `none`
   - Background: `transparent`
   - Outline: `none`

   **Состояния:**

   - На focus контейнера: Border `2px solid #5B9D07` (light) / `#58FF84` (dark)
   - На hover (не в focus): Border color темнеет на 10%
   - Validation error: Border `2px solid #FF5858`, shake animation

3. **Поле ввода Symbol (Ticker):**

   - Структура и стили: идентичны полю Name
   - Placeholder: "NTK"
   - Max-length: `10` символов (ограничение на длину тикера)
   - Transform: `uppercase` (автоматически преобразует в верхний регистр)

4. **Поле ввода Emission:**

   - Структура и стили: идентичны предыдущим
   - Placeholder: "300 000 000"
   - Type: `number` или `text` с маской для форматирования чисел
   - Pattern: только цифры и пробелы
   - Min: `1`

   **Форматирование:**

   - Автоматически добавляет пробелы для разделения тысяч
   - Пример: `300000000` → `300 000 000`

5. **Поле ввода Info (Textarea):**

   - Размер: `442px × 221px` (desktop) / `100% × 180px` (mobile)
   - Border-radius: `20px`
   - Background, Border, Padding: как у обычных input
   - Margin-top: `12px`
   - Resize: `vertical` (можно растягивать по вертикали)
   - Max-height: `300px` (ограничение на растягивание)
   - Min-height: `221px` (минимальная высота)
   - Overflow-y: `auto` (скролл если текст не помещается)
   - Transition: `all 0.2s ease`

   **Textarea:**

   - Width: `100%`
   - Height: `100%`
   - Font: Nunito Sans, Regular, 14px
   - Line-height: 1.5
   - Color: `#1C4430` (light) / `#FFFFFF` (dark)
   - Placeholder: "Описание вашего токена"
   - Placeholder color: 50% opacity
   - Border: `none`
   - Background: `transparent`
   - Outline: `none`
   - Padding: `12px`

   **Состояния:**

   - На focus: Border контейнера `2px solid #5B9D07` / `#58FF84`
   - Scrollbar стилизован под тему (тонкий, с закруглениями)

6. **Кнопка "Create token":**

   - Размер: `442px × 50px` (desktop) / `100% × 48px` (mobile)
   - Border-radius: `30px`
   - Background: `#5B9D07`
   - Display: `flex`, `items-center`, `justify-center`
   - Cursor: `pointer`
   - Margin-top: `20px`
   - Transition: `all 0.2s ease`

   **Текст:**

   - Text: "Create token"
   - Font: Nunito Sans, Semibold, 14px, white

   **Состояния:**

   - Disabled (если форма невалидна):

     - Cursor: `not-allowed`
     - Opacity: `0.5`
     - Pointer-events: `none`

   - На hover (если enabled):

     - Background: `#4a7a06`
     - Transform: `translateY(-2px)`
     - Box-shadow: `0 4px 12px rgba(91, 157, 7, 0.3)`

   - На active: Transform: `translateY(0)`

   - Loading состояние:
     - Text: "Creating..." или spinner
     - Cursor: `wait`
     - Pointer-events: `none`

   **На клик:**

   - Валидация формы (все поля заполнены, корректные значения)
   - Если ошибки: показать сообщения под полями, shake animation
   - Если OK:
     - Показать loading состояние
     - Отправить данные (TODO: Web3 интеграция)
     - При успехе: навигация на `/listing` или `/token/:newTokenId`
     - При ошибке: показать toast с сообщением об ошибке

#### 2.5.4 Валидация формы

**Правила валидации:**

**Name:**

- Обязательное поле
- Минимум 3 символа
- Максимум 50 символов
- Только буквы, цифры, пробелы

**Symbol:**

- Обязательное поле
- Минимум 2 символа
- Максимум 10 символов
- Только буквы (заглавные)
- Без пробелов и специальных символов

**Emission:**

- Обязательное поле
- Только положительные числа
- Минимум 1
- Максимум 1 000 000 000 000 (1 триллион)

**Info:**

- Обязательное поле
- Минимум 10 символов
- Максимум 1000 символов

**Image:**

- Опциональное (можно создать без картинки)
- Если загружается: только PNG, JPEG, SVG
- Максимум 5MB

**Отображение ошибок:**

- Под каждым полем при ошибке: красный текст (12px, #FF5858)
- Border поля с ошибкой: красный
- Shake animation при попытке submit с ошибками

#### 2.5.5 Адаптивность CreateToken

**Desktop (1240px+):**

- Контейнер формы: `480px × auto`
- Все поля: `442px` width
- Padding: `20px`

**Tablet (768px - 1239px):**

- Контейнер: `420px × auto`
- Поля: `380px` width
- Все остальное масштабируется

**Mobile (360px - 767px):**

- Контейнер: `350px × auto` (или `calc(100% - 40px)`)
- Все поля: `100%` width
- Padding контейнера: `16px`
- Блок загрузки: `100% × 70px`
- Аватарка: `60px × 60px`
- Кнопка "Загрузить": `80px × 28px`, текст `11px`
- Input height: `44px`
- Textarea height: `180px`
- Submit button: `100% × 48px`
- Margin между элементами: `10px` (вместо 12px)

---

### 2.6 ADD LIQUIDITY СТРАНИЦА

#### 2.6.1 Layout и заголовок

**Layout:**

- Идентичен странице CreateToken
- Фоновый элемент: `create-token.svg` (тот же)
- Контейнер: max-width `480px` (desktop) / `350px` (mobile)

**Заголовок:**

- Text: "Add token liquidity" (вместо "Create new token")
- Font: Nunito Sans, Semibold, 30px (desktop) / 24px (mobile)
- Color: `#5B9D07` (light) / `#58FF84` (dark)
- Text-align: `center`
- Margin-bottom: `60px` (desktop) / `40px` (mobile)

#### 2.6.2 Форма добавления ликвидности (AddLiquidityForm)

**Контейнер формы:**

- Структура и стили: идентичны CreateTokenForm
- Размер: `480px × auto` (desktop) / `350px × auto` (mobile)

**Элементы формы (4 поля ввода):**

1. **X1 Token Amount:**

   - Размер, стили: как поля в CreateTokenForm
   - Placeholder: "100 000"
   - Type: `number` с форматированием
   - Label (опционально над полем): "X1 Token Amount" (Regular, 12px, 50% opacity)
   - Margin-top: `0` (первое поле)

2. **NKT Token Amount:**

   - Структура: идентична
   - Placeholder: "NTK"
   - Margin-top: `12px`

3. **Token Price (USD):**

   - Структура: идентична
   - Placeholder: "$0,004"
   - Type: `number` с prefix "$"
   - Step: `0.0001` (4 знака после запятой)
   - Margin-top: `12px`

4. **Token Price (X1):**
   - Структура: идентична
   - Placeholder: "4"
   - Type: `number`
   - Margin-top: `12px`

**Все поля:**

- Height: `48px` (desktop) / `44px` (mobile)
- Border-radius: `20px`
- Validation: обязательные, положительные числа
- Error handling: аналогично CreateTokenForm

5. **Кнопка "Create token":**

   - Размер: `442px × 50px` (desktop) / `100% × 48px` (mobile)
   - Стили: идентичны кнопке в CreateTokenForm
   - Text: "Create token" (не "Add liquidity" - по спецификации)
   - Margin-top: `20px`
   - На клик:
     - Валидация
     - Loading состояние
     - Отправка данных (TODO: Web3)
     - Навигация на успешную страницу

6. **Кнопка "Skip":**

   - Position: под кнопкой "Create token"
   - Margin-top: `30px`
   - Display: `block`
   - Text-align: `center`
   - Background: `transparent`
   - Border: `none`
   - Cursor: `pointer`
   - Transition: `all 0.2s ease`

   **Текст:**

   - Text: "Skip"
   - Font: Nunito Sans, Regular, 20px (desktop) / 18px (mobile)
   - Color: `#FFFFFF` (dark theme) / `#1C4430` (light theme)
   - Text-decoration: `none`

   **Состояния:**

   - На hover:
     - Text-decoration: `underline`
     - Opacity: `0.8`
   - На клик: Навигация на `/listing` (пропуск добавления ликвидности)

#### 2.6.3 Валидация AddLiquidity формы

**Правила:**

- Все поля обязательные
- X1 Token Amount: положительное число, минимум 1
- NKT Token Amount: положительное число, минимум 1
- Token Price (USD): положительное число, минимум 0.0001
- Token Price (X1): положительное число, минимум 0.01

**Error messages:**

- Под каждым полем при ошибке
- Красный цвет (#FF5858), размер 12px
- Примеры: "Amount must be greater than 0", "Invalid price format"

#### 2.6.4 Адаптивность AddLiquidity

**Структура адаптивности:**

- Полностью идентична CreateToken странице
- Desktop: `480px` контейнер, `442px` поля
- Tablet: `420px` контейнер, `380px` поля
- Mobile: `350px` контейнер, `100%` поля, `44px` height

---

### 2.7 TOKEN DETAIL СТРАНИЦА

#### 2.7.1 Layout и фоновые элементы

**Фоновые элементы:**

- Нижний элемент (incubator/create-token): **полностью убирается**
- Правый вектор: **остаётся видимым** (vector.svg)

**Общий контейнер:**

- Max-width: `1295px`
- Margin: `0 auto`
- Padding: `0 25px`
- Margin-top: `80px` (desktop) / `60px` (mobile)
- Position: `relative`
- Z-index: `1`

**Макет:**

- Display: `flex` (desktop) / `block` (mobile)
- Flex-direction: `row` (desktop)
- Gap: `60px` (desktop)
- Justify-content: `space-between`

#### 2.7.2 Левая колонка (TokenDetailLeft)

**Контейнер:**

- Width: `764px` (desktop) / `100%` (mobile)
- Display: `flex`, `flex-col`
- Gap: `50px` (desktop) / `30px` (mobile)

**Элементы сверху вниз:**

1. **Блок информации о токене (TokenInfoBlock):**

   - Height: `74px` (desktop) / `70px` (mobile)
   - Display: `flex`, `items-center`, `gap: 12px`

   **Логотип токена:**

   - Размер: `74px × 74px` (desktop) / `60px × 60px` (mobile)
   - Border-radius: `50%`
   - Background: `#D9D9D9`
   - Overflow: `hidden`
   - Flex-shrink: `0`

   **Изображение:**

   - Width: `100%`, Height: `100%`
   - Object-fit: `cover`

   **Текстовая информация:**

   - Flex: `1`
   - Display: `flex`, `flex-col`, `justify-center`
   - Gap: `4px`

   **Название токена:**

   - Text: "My New Token" (из данных)
   - Font: Nunito Sans, Bold, 30px (desktop) / 24px (mobile)
   - Color: `#1C4430` (light) / `#FFFFFF` (dark)
   - Line-height: 1.2

   **Описание:**

   - Text: "Join us in building a better, decentralized future."
   - Font: Nunito Sans, Regular, 14px (desktop) / 12px (mobile)
   - Color: `#1C4430` (light) / `#FFFFFF` (dark)
   - Line-height: 1.4
   - Opacity: `1` (100%)

2. **Контейнер графика (TokenChart):**

   - Размер: `764px × 479px` (desktop) / `100% × 300px` (mobile)
   - Border-radius: `10px`
   - Background: `#FFFFFF` (light) / `rgba(217, 217, 217, 0.05)` (dark)
   - Box-shadow: `0 2px 8px rgba(0, 0, 0, 0.05)` (light) / dark shadow (dark)
   - Backdrop-filter: `none` (light) / `blur(73.2px)` (dark)
   - Overflow: `hidden`
   - Position: `relative`

   **Placeholder изображение:**

   - Width: `100%`, Height: `100%`
   - Object-fit: `cover`
   - Src: `chart-placeholder.png` или реальный график

   **Если используется Chart.js:**

   - Canvas: `width: 100%`, `height: 100%`
   - Padding: `20px`
   - Responsive: `true`
   - MaintainAspectRatio: `false`

3. **Блок описания (TokenDescription):**

   - Max-width: `764px`
   - Background: `transparent`
   - Padding: `0`

   **Текст (Lorem ipsum):**

   - Font: Nunito Sans, Regular, 18px (desktop) / 14px (mobile)
   - Line-height: 1.6
   - Color: `#1C4430` (light) / `#FFFFFF` (dark)
   - Text-align: `left`
   - Max-height: `300px` (если очень длинный)
   - Overflow-y: `auto` (скролл если нужен)

   **Scrollbar:**

   - Width: `4px`
   - Track: `transparent`
   - Thumb: `rgba(91, 157, 7, 0.3)` (light) / `rgba(88, 255, 132, 0.3)` (dark)
   - Thumb border-radius: `2px`

#### 2.7.3 Правая колонка (TokenDetailRight)

**Контейнер:**

- Width: `493px` (desktop) / `100%` (mobile)
- Background: `#FFFFFF` (light) / `rgba(217, 217, 217, 0.05)` (dark)
- Border-radius: `10px`
- Box-shadow: `0 2px 8px rgba(0, 0, 0, 0.05)` (light) / dark shadow (dark)
- Backdrop-filter: `none` (light) / `blur(73.2px)` (dark)
- Padding: `20px` (desktop) / `16px` (mobile)
- Display: `flex`, `flex-col`
- Align-self: `flex-start` (прилипает к верху, не растягивается)
- Position: `sticky` (desktop)
- Top: `100px` (прилипает при скролле)

**Содержимое (сверху вниз):**

1. **Цена токена:**

   - Text: "$7.5K" (из данных, форматированное)
   - Font: Nunito Sans, Bold, 50px (desktop) / 36px (mobile)
   - Color: `#5B9D07` (light) / `#58FF84` (dark)
   - Line-height: 1.2
   - Margin-bottom: `8px`

2. **Прогресс сбора:**

   - Display: `flex`, `items-baseline`, `gap: 4px`
   - Margin-bottom: `30px`

   **Процент:**

   - Text: "150%" (из данных)
   - Font: Nunito Sans, Regular, 16px
   - Color: `#1C4430` (light) / `#FFFFFF` (dark)
   - Opacity: `1` (100%)

   **Текст "of":**

   - Text: "of"
   - Font: Nunito Sans, Regular, 16px
   - Opacity: `0.5` (50%)

   **Целевая сумма:**

   - Text: "$2 400 000 Raised"
   - Font: Nunito Sans, Regular, 16px
   - Opacity: `0.5` (50%)

3. **Заголовок "Token summary":**

   - Text: "Token summary"
   - Font: Nunito Sans, Bold, 30px (desktop) / 24px (mobile)
   - Color: `#5B9D07` (light) / `#58FF84` (dark)
   - Line-height: 1.2
   - Margin-bottom: `20px`

4. **Строки информации (TokenSummary):**

   - Display: `flex`, `flex-col`, `gap: 12px`
   - Margin-bottom: `20px`

   **Каждая строка:**

   - Display: `flex`, `justify-content: space-between`, `items-center`
   - Height: `32px`

   **Label (слева):**

   - Font: Nunito Sans, Regular, 20px (desktop) / 16px (mobile)
   - Color: `#1C4430` (light) / `#FFFFFF` (dark)
   - Opacity: `0.5` (50%)

   **Value (справа):**

   - Font: Nunito Sans, Regular, 20px (desktop) / 16px (mobile)
   - Color: `#1C4430` (light) / `#FFFFFF` (dark)
   - Opacity: `1` (100%)

   **Строки:**

   - Symbol: "$MNT"
   - Blockchain: "X1"
   - Price: "$0,048"
   - Holders: "6 845"
   - Volume: "$385,069,594"

5. **Поле ввода количества:**

   - Размер: `100% × 50px` (desktop) / `100% × 44px` (mobile)
   - Border-radius: `10px`
   - Background: `#F5F5F5` (light) / `rgba(255, 255, 255, 0.05)` (dark)
   - Border: `none`
   - Padding: `0 12px`
   - Margin-bottom: `5px`
   - Transition: `all 0.2s ease`

   **Input:**

   - Width: `100%`
   - Font: Nunito Sans, Regular, 14px
   - Color: `#1C4430` (light) / `#FFFFFF` (dark)
   - Placeholder: "Quantity of tokens"
   - Placeholder color: `rgba(5, 82, 26, 0.2)` (light) / `rgba(255, 255, 255, 0.2)` (dark)
   - Type: `number`
   - Min: `0`
   - Border: `none`
   - Background: `transparent`
   - Outline: `none`

   **На focus:**

   - Border контейнера: `2px solid #5B9D07` (light) / `#58FF84` (dark)

6. **Контейнер кнопок (TokenActions):**

   - Display: `flex`, `gap: 10px`
   - Width: `100%`

   **Кнопка "Buy" (слева):**

   - Width: `calc(50% - 5px)`
   - Height: `50px` (desktop) / `44px` (mobile)
   - Border-radius: `10px`
   - Background: `#5B9D07`
   - Display: `flex`, `items-center`, `justify-center`
   - Cursor: `pointer`
   - Transition: `all 0.2s ease`

   **Текст:**

   - Text: "Buy"
   - Font: Nunito Sans, Semibold, 14px, white

   **Состояния:**

   - Disabled (если поле пустое):

     - Opacity: `0.5`
     - Cursor: `not-allowed`
     - Pointer-events: `none`

   - На hover (если enabled):

     - Background: `#4a7a06`
     - Transform: `translateY(-2px)`
     - Box-shadow: `0 4px 12px rgba(91, 157, 7, 0.3)`

   - На клик:
     - TODO: Web3 интеграция
     - Открыть confirmation modal
     - Выполнить транзакцию

   **Кнопка "Sell" (справа):**

   - Структура: идентична "Buy"
   - Background: `#FF5858`
   - Text: "Sell"

   **Состояния:**

   - На hover:

     - Background: `#E04848`
     - Transform: `translateY(-2px)`
     - Box-shadow: `0 4px 12px rgba(255, 88, 88, 0.3)`

   - На клик:
     - TODO: Web3 интеграция
     - Открыть confirmation modal
     - Выполнить транзакцию sell

#### 2.7.4 Адаптивность TokenDetail

**Desktop (1240px+):**

- Контейнер: `1295px`, flex row
- Левая колонка: `764px`
- Правая колонка: `493px`
- Gap: `60px`
- Правая колонка: sticky при скролле

**Tablet (768px - 1239px):**

- Контейнер: `900px`, flex row
- Левая колонка: `500px`
- Правая колонка: `350px`
- Gap: `40px`
- Все элементы масштабируются
- Шрифты: уменьшаются на 10-15%

**Mobile (360px - 767px):**

- Контейнер: `350px`, flex column (вертикальный стек)
- Левая и правая колонки: `100%` width
- Gap: `30px`
- Position: `relative` (не sticky)

**Порядок элементов на mobile:**

1. Блок информации о токене (логотип + название)
2. Контейнер графика
3. Правая колонка (summary, цена, кнопки) - идет после графика
4. Блок описания (Lorem ipsum) - в самом низу

**Размеры на mobile:**

- Логотип: `60px × 60px`
- Название: `24px`
- Описание под названием: `12px`
- График: `100% × 300px`
- Правая колонка: `100% × auto`
- Цена: `36px`
- Заголовок Summary: `24px`
- Строки Summary: `14px`
- Input: `100% × 44px`
- Кнопки: `calc(50% - 5px) × 44px`, текст `14px`
- Описание (Lorem): `14px`

---

### 2.8 ГЛОБАЛЬНЫЕ TRANSITIONS И ANIMATIONS

#### 2.8.1 Базовые transitions

**Для всех интерактивных элементов:**

```css
transition: all 0.2s ease;
```

**Для цветов (background, color):**

```css
transition: background-color 0.2s ease, color 0.2s ease;
```

**Для transform:**

```css
transition: transform 0.3s ease-out;
```

**Для opacity:**

```css
transition: opacity 0.3s ease;
```

#### 2.8.2 Hover эффекты

**Кнопки:**

- Transform: `translateY(-2px)`
- Box-shadow усиливается
- Background color темнеет на 10-20%
- Duration: `0.2s ease`

**Карточки (Dashboard, Token):**

- Transform: `translateY(-4px)` (Dashboard) / `translateY(-2px)` (Token)
- Box-shadow усиливается на 50%
- Background может слегка светлеть
- Duration: `0.3s ease-out`

**Links и текст:**

- Color меняется на accent
- Text-decoration может добавляться
- Opacity может меняться
- Duration: `0.2s ease`

**Input/Textarea на focus:**

- Border color меняется на accent
- Border width увеличивается до `2px`
- Duration: `0.2s ease`

#### 2.8.3 Click/Active эффекты

**Кнопки на active:**

```css
transform: translateY(0) scale(0.98);
transition: transform 0.1s ease;
```

**Карточки на active:**

```css
transform: translateY(0) scale(0.99);
transition: transform 0.1s ease;
```

#### 2.8.4 Анимации появления/исчезновения

**Modal (CreateTokenModal):**

- Вход: `opacity: 0, transform: scale(0.9)` → `opacity: 1, transform: scale(1)`
- Выход: `opacity: 1, transform: scale(1)` → `opacity: 0, transform: scale(0.9)`
- Duration: `0.3s ease-out`
- Animation name: `scaleIn` / `scaleOut`

**Overlay (backdrop):**

- Вход: `opacity: 0` → `opacity: 1`
- Выход: `opacity: 1` → `opacity: 0`
- Duration: `0.3s ease-out`
- Animation name: `fadeIn` / `fadeOut`

**Drawer (MobileMenu):**

- Вход: `transform: translateX(-100%)` → `transform: translateX(0)`
- Выход: `transform: translateX(0)` → `transform: translateX(-100%)`
- Duration: `0.3s ease-out`
- Animation name: `slideInLeft` / `slideOutLeft`

**Dropdown (HeaderDropdown):**

- Вход: `transform: scaleY(0)` → `transform: scaleY(1)`
- Transform-origin: `top`
- Duration: `0.2s ease-out`
- Animation name: `scaleYIn` / `scaleYOut`

#### 2.8.5 Page transitions (между страницами)

**Fade transition:**

- Текущая страница: `opacity: 1` → `opacity: 0` (0.2s)
- Новая страница: `opacity: 0` → `opacity: 1` (0.3s, delay 0.1s)

**Опционально (если нужно плавнее):**

- Добавить blur: `filter: blur(0px)` → `filter: blur(5px)` → `filter: blur(0px)`

#### 2.8.6 Loading states

**Кнопки с loading:**

- Spinner: `rotate(0deg)` → `rotate(360deg)`, infinite, 1s linear
- Opacity кнопки: `1` → `0.7`
- Cursor: `wait`

**Skeleton loaders (опционально):**

- Background: градиент с анимацией shimmer
- Animation: `shimmer 1.5s infinite linear`

#### 2.8.7 Error animations

**Shake animation (для полей с ошибкой):**

```css
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
}
```

- Duration: `0.4s ease`
- Применяется к контейнеру поля при validation error

**Pulse animation (для важных элементов):**

```css
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
```

- Duration: `0.6s ease`, infinite (или 2-3 раза)

---

### 2.9 ACCESSIBILITY (A11Y) И UX ДЕТАЛИ

#### 2.9.1 Focus states

**Все интерактивные элементы при Tab-навигации:**

- Outline: `2px solid #5B9D07` (light) / `2px solid #58FF84` (dark)
- Outline-offset: `2px`
- Border-radius: наследуется от элемента
- Transition: `outline 0.2s ease`

**Порядок focus (tab-index):**

1. Header навигация (Dashboard, Listing, My Tokens)
2. Поисковая строка
3. Кнопка "Create new token"
4. Блок профиля
5. Контент страницы (карточки, формы)
6. Кнопки в footer (если есть)

#### 2.9.2 Keyboard navigation

**ESC:**

- Закрывает открытые modal/dropdown/drawer
- Возвращает focus на trigger элемент

**Enter:**

- Активирует кнопки
- Отправляет формы
- Открывает dropdown (если в focus)

**Space:**

- Активирует кнопки
- Toggle для switch/checkbox

**Arrow keys:**

- Навигация внутри dropdown меню (вверх/вниз)
- Переключение между radio buttons

**Tab / Shift+Tab:**

- Навигация между интерактивными элементами
- Пропускает disabled элементы

#### 2.9.3 ARIA attributes

**Кнопки:**

- `aria-label`: описание для кнопок-иконок
- `aria-disabled`: для disabled состояний
- `aria-busy`: для loading состояний

**Modal:**

- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby`: ссылка на заголовок modal
- `aria-describedby`: ссылка на описание (если есть)

**Dropdown:**

- `role="menu"` на контейнере
- `role="menuitem"` на пунктах
- `aria-expanded`: состояние открыт/закрыт
- `aria-haspopup="true"` на trigger

**Input fields:**

- `aria-label` или связанный `<label>` с `for`
- `aria-invalid="true"` при ошибке
- `aria-describedby`: ссылка на error message

**Images:**

- `alt` атрибут с описанием
- `role="img"` для SVG
- Декоративные изображения: `alt=""` или `aria-hidden="true"`

#### 2.9.4 Loading states и feedback

**Индикаторы загрузки:**

- Skeleton loaders для контента
- Spinner для кнопок
- Progress bar для длительных операций
- Текст "Loading..." для screen readers: `aria-live="polite"`

**Success feedback:**

- Зеленый checkmark icon
- Success message: "Token created successfully!"
- Toast notification (3-5 секунд)
- Auto-redirect после успеха (опционально)

**Error feedback:**

- Красный error icon
- Error message под полем/в toast
- Shake animation для привлечения внимания
- Focus автоматически на поле с ошибкой

**Empty states:**

- Placeholder текст/иллюстрация когда нет данных
- Примеры: "No tokens found", "Your token list is empty"
- Кнопка action: "Create your first token"

#### 2.9.5 Responsive images

**Image loading:**

- Lazy loading: `loading="lazy"` для изображений вне viewport
- Placeholder: blur-up или solid color пока грузится
- Error fallback: default placeholder если изображение не загрузилось

**Srcset для retina displays:**

```html

```

---

### 2.10 WEB3 ИНТЕГРАЦИЯ (ЗАГЛУШКИ)

#### 2.10.1 useWallet hook

```typescript
// src/hooks/web3/useWallet.ts

import { useState, useCallback } from "react";
import { useUserStore } from "@/store/useUserStore";

export const useWallet = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const { setUser, clearUser } = useUserStore();

  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // TODO: Реальная Web3 интеграция
      // const provider = await detectEthereumProvider();
      // const accounts = await provider.request({ method: 'eth_requestAccounts' });

      // ЗАГЛУШКА: имитация подключения
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser = {
        address: "0x2...006728",
        name: "Noname",
        balance: "1,234.56 USDT",
        isConnected: true,
      };

      setUser(mockUser);
      setIsConnecting(false);
      return mockUser;
    } catch (err) {
      setError("Failed to connect wallet");
      setIsConnecting(false);
      throw err;
    }
  }, [setUser]);

  const disconnectWallet = useCallback(() => {
    clearUser();
    // TODO: Отключение от Web3 провайдера
  }, [clearUser]);

  return {
    connectWallet,
    disconnectWallet,
    isConnecting,
    error,
  };
};
```

#### 2.10.2 useTokenContract hook

```typescript
// src/hooks/web3/useTokenContract.ts

import { useState, useCallback } from "react";
import type { CreateTokenData, AddLiquidityData } from "@/types/token";

export const useTokenContract = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);

  const createToken = useCallback(async (data: CreateTokenData) => {
    setIsCreating(true);
    setError(null);

    try {
      // TODO: Реальная Web3 интеграция
      // const contract = new ethers.Contract(address, abi, signer);
      // const tx = await contract.createToken(data);
      // await tx.wait();

      // ЗАГЛУШКА: имитация создания токена
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockTokenId = `token-${Date.now()}`;
      console.log("Token created:", { id: mockTokenId, ...data });

      setIsCreating(false);
      return { success: true, tokenId: mockTokenId };
    } catch (err) {
      setError("Failed to create token");
      setIsCreating(false);
      throw err;
    }
  }, []);

  const addLiquidity = useCallback(async (data: AddLiquidityData) => {
    setIsCreating(true);
    setError(null);

    try {
      // TODO: Реальная Web3 интеграция
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Liquidity added:", data);
      setIsCreating(false);
      return { success: true };
    } catch (err) {
      setError("Failed to add liquidity");
      setIsCreating(false);
      throw err;
    }
  }, []);

  const buyToken = useCallback(async (tokenId: string, amount: number) => {
    // TODO: Реальная Web3 интеграция
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Buy token:", { tokenId, amount });
    return { success: true };
  }, []);

  const sellToken = useCallback(async (tokenId: string, amount: number) => {
    // TODO: Реальная Web3 интеграция
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Sell token:", { tokenId, amount });
    return { success: true };
  }, []);

  return {
    createToken,
    addLiquidity,
    buyToken,
    sellToken,
    isCreating,
    error,
  };
};
```

#### 2.10.3 Mock Data

```typescript
// src/lib/mockData.ts

import type { Token, TokenDetail } from "@/types/token";

export const mockTokens: Token[] = [
  {
    id: "1",
    name: "My New Token",
    symbol: "MNT",
    imageUrl: "/assets/placeholders/token-placeholder.svg",
    price: 0.048,
    marketCap: "$4.4k",
    volume: "$385,069,594",
    holders: 6845,
    blockchain: "X1",
    createdBy: "noname",
    createdAt: new Date(Date.now() - 20000), // 20 секунд назад
    description: "Join us in building a better, decentralized future.",
    replies: 1728,
  },
  {
    id: "2",
    name: "EcoChain Token",
    symbol: "ECO",
    imageUrl: "/assets/placeholders/token-placeholder.svg",
    price: 0.125,
    marketCap: "$12.8k",
    volume: "$520,450,123",
    holders: 3421,
    blockchain: "X1",
    createdBy: "crypto_dev",
    createdAt: new Date(Date.now() - 120000), // 2 минуты назад
    description: "Sustainable blockchain for a greener tomorrow.",
    replies: 845,
  },
  // ... добавить ещё 13+ токенов для полного grid (15 токенов на странице)
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
    optio pariatur perferendis placeat porro possimus praesentium provident.`,
  chartUrl: "/assets/placeholders/chart-placeholder.png",
  raised: "$7.5K",
  raiseTarget: "$2,400,000",
  raisePercentage: "150%",
};

export const mockUser = {
  address: "0x2...006728",
  name: "Noname",
  balance: "1,234.56 USDT",
  avatar: "/assets/avatars/avatar-placeholder-36.svg",
  isConnected: false,
};
```

---

## ЧАСТЬ 3: ФИНАЛЬНЫЙ ЧЕКЛИСТ РАЗРАБОТКИ

### 3.1 Инициализация проекта

- [ ] Создать проект с Vite: `npm create vite@latest ecochain-frontend -- --template react-ts`
- [ ] Установить зависимости: `npm install`
- [ ] Установить Tailwind CSS 3.4.x: `npm install -D tailwindcss@^3.4.0 postcss autoprefixer`
- [ ] Инициализировать Tailwind: `npx tailwindcss init -p`
- [ ] Установить доп. зависимости:

```bash
  npm install zustand axios react-i18next i18next lucide-react clsx date-fns react-router-dom
```

- [ ] Настроить `tailwind.config.js` (см. раздел 1.3)
- [ ] Создать структуру папок (см. раздел 1.2)
- [ ] Настроить `tsconfig.json` с path aliases (`@/`)

### 3.2 Базовая конфигурация

- [ ] Настроить Tailwind глобальные стили в `src/index.css`
- [ ] Создать `constants.ts` с breakpoints, colors, spacing
- [ ] Создать TypeScript типы (token.ts, user.ts, web3.ts, common.ts)
- [ ] Настроить i18n (en/ru переводы)
- [ ] Создать mock data для разработки

### 3.3 Zustand Stores

- [ ] useThemeStore (light/dark theme с persist)
- [ ] useUserStore (данные пользователя, balance)
- [ ] useTokenStore (список токенов, filters, pagination)
- [ ] useModalStore (состояние модальных окон)
- [ ] useLanguageStore (EN/RU с persist)

### 3.4 Custom Hooks

- [ ] useTheme (работа с темой)
- [ ] useMediaQuery (responsive breakpoints)
- [ ] useClickOutside (закрытие dropdown/modal)
- [ ] useDebounce (для поиска)
- [ ] useKeyPress (ESC, Enter, etc.)
- [ ] useLocalStorage (сохранение настроек)
- [ ] useWallet (Web3 заглушка)
- [ ] useTokenContract (Web3 заглушка)

### 3.5 Common Components

- [ ] Button (variants: primary, secondary, outline, sell; sizes: sm, md, lg)
- [ ] Input (text, number, email; с validation states)
- [ ] Card (базовая карточка с dark/light themes)
- [ ] Modal (overlay + container, animations)
- [ ] Dropdown (trigger + menu items, keyboard navigation)
- [ ] Switch/Toggle (для theme switcher)

### 3.6 Layout Components

- [ ] Header (Desktop + Mobile версии)
- [ ] SearchBar
- [ ] ProfileBlock
- [ ] HeaderDropdown
- [ ] LanguageSelector
- [ ] ThemeToggle
- [ ] MobileMenu (drawer)
- [ ] Container
- [ ] PageBackground
- [ ] Layout

### 3.7 Feature Components

- [ ] DashboardCard, DashboardGrid
- [ ] TokenCard, TokenGrid, ShowMoreButton
- [ ] CreateTokenModal, CreateTokenForm, ImageUploadBlock
- [ ] AddLiquidityForm
- [ ] TokenDetailView, TokenDetailLeft, TokenDetailRight

### 3.8 Страницы

- [ ] Dashboard
- [ ] Listing
- [ ] MyTokens
- [ ] CreateToken
- [ ] AddLiquidity
- [ ] TokenDetail
- [ ] NotFound

### 3.9 Тестирование

- [ ] Проверка всех страниц на всех разрешениях
- [ ] Проверка переключения темы
- [ ] Проверка переключения языка
- [ ] Проверка форм и validation
- [ ] Проверка модальных окон
- [ ] Проверка навигации
- [ ] Accessibility audit

---

**ЭТО ЗАВЕРШЕНИЕ СПЕЦИФИКАЦИИ. ДОКУМЕНТ ПОЛНЫЙ И ГОТОВ К ИСПОЛЬЗОВАНИЮ.**
