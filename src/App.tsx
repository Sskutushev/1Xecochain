// src/App.tsx
// 
// НАЗНАЧЕНИЕ: Главный компонент приложения с конфигурацией маршрутизации
// ОТВЕТСТВЕННОСТЬ: Настраивает React Router и определяет все маршруты приложения
// РЕАЛИЗУЕТ: Одностраничное приложение с клиентской маршрутизацией
// 
// ОПРЕДЕЛЕНИЕ МАРШРУТОВ:
// - / (главная) -> Страница дашборда
// - /listing -> Страница списка токенов
// - /my-tokens -> Страница токенов пользователя
// - /create-token -> Форма создания токена
// - /add-liquidity -> Форма добавления ликвидности
// - /token/:id -> Страница детального просмотра токена (динамический маршрут)
// - * (универсальный) -> Страница ошибки (не найдено)
// 
// АРХИТЕКТУРА: Все маршруты обернуты в компонент Layout для обеспечения единообразного интерфейса


import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/pages/Dashboard';
import Listing from '@/pages/Listing';
import MyTokens from '@/pages/MyTokens';
import CreateToken from '@/pages/CreateToken';
import AddLiquidity from '@/pages/AddLiquidity';
import TokenDetail from '@/pages/TokenDetail';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <HashRouter>
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
    </HashRouter>
  );
}

export default App;