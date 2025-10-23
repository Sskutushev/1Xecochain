// src/App.tsx
// 
// PURPOSE: Main application component with routing configuration
// RESPONSIBILITY: Sets up React Router and defines all application routes
// IMPLEMENTS: Single-page application with client-side routing
// 
// ROUTE DEFINITION:
// - / (index) -> Dashboard page
// - /listing -> Token listing page
// - /my-tokens -> User's tokens page
// - /create-token -> Token creation form
// - /add-liquidity -> Liquidity addition form
// - /token/:id -> Token detail page (dynamic route)
// - * (wildcard) -> Not found page
// 
// ARCHITECTURE: All routes are wrapped in Layout component for consistent UI


import { BrowserRouter, Routes, Route } from 'react-router-dom';
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