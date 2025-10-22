// src/pages/NotFound/NotFound.tsx
// 
// PURPOSE: 404 error page for non-existent routes
// RESPONSIBILITY: Displays friendly error message with navigation option
// IMPLEMENTS: Error page specifications from design system
// 
// KEY FEATURES:
// - Friendly 404 error message
// - Translated content
// - Navigation back to dashboard
// - Consistent styling with rest of application
// 
// SPECIFICATION COMPLIANCE:
// - Centered content layout
// - Green accent color for branding
// - Standard button styling
// - Responsive design

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-center px-4">
      <h1 className="text-6xl font-bold text-primary-green dark:text-dark-accent mb-4">404</h1>
      <h2 className="text-2xl mobile:text-xl font-semibold text-light-text dark:text-dark-text mb-4">
        {t('notFound.title')}
      </h2>
      <p className="text-base text-light-text50 dark:text-dark-text50 mb-8">
        {t('notFound.description')}
      </p>
      <button
        onClick={() => navigate('/')}
        className="w-[200px] h-[50px] bg-primary-green rounded-30 flex items-center justify-center"
      >
        <span className="text-sm font-semibold text-white">
          {t('notFound.button')}
        </span>
      </button>
    </div>
  );
};

export default NotFound;