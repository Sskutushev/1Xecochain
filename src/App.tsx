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


import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/pages/Dashboard';
import Listing from '@/pages/Listing';
import MyTokens from '@/pages/MyTokens';
import CreateToken from '@/pages/CreateToken';
import AddLiquidity from '@/pages/AddLiquidity';
import TokenDetail from '@/pages/TokenDetail';
import NotFound from '@/pages/NotFound';
import '@/assets/ru-styles.css';

const basename = import.meta.env.DEV ? '/' : '/1Xecochain';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Устанавливаем атрибут data-lang на body для определения текущего языка
    document.body.setAttribute('data-lang', i18n.language);
    
    // Следим за изменением языка
    const handleLanguageChange = () => {
      document.body.setAttribute('data-lang', i18n.language);
      console.log('App.tsx: Language changed to', i18n.language);
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return (
    <BrowserRouter basename={basename}>
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
