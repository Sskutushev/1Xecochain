// src/pages/Dashboard/Dashboard.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '@/components/features/Dashboard/DashboardCard';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="max-w-[1295px] mx-auto px-[25px] pt-[80px] relative z-1">
      <div className="grid grid-cols-3 gap-[45px]">
        <DashboardCard 
          imageLight="/assets/images/token-cards/card-1-light.png" 
          imageDark="/assets/images/token-cards/card-1-dark.png" 
        />
        <DashboardCard 
          imageLight="/assets/images/token-cards/card-2-light.png" 
          imageDark="/assets/images/token-cards/card-2-dark.png" 
        />
        <DashboardCard 
          imageLight="/assets/images/token-cards/card-3-light.png" 
          imageDark="/assets/images/token-cards/card-3-dark.png" 
        />
      </div>
    </div>
  );
};

export default Dashboard;