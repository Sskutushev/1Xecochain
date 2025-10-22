// src/pages/Dashboard/Dashboard.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '@/components/features/Dashboard/DashboardCard';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-20 relative z-1">

      
      {/* Vector Background - appears at x=590px from left, y=100px from top */}
      <img
        src="/assets/Vector.svg"
        alt="Vector Background"
        className="fixed top-[100px] left-[590px] w-[1660px] h-[900px] pointer-events-none z-[-30] dark:brightness-[0.22] dark:contrast-[1.2] dark:saturate-[1.5]"
      />
      
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-x-[45px] gap-y-20">
        <DashboardCard 
          imageLight="/assets/Rectangle 1.png" 
          imageDark="/assets/Rectangle 1 (1).png" 
        />
        <DashboardCard 
          imageLight="/assets/Rectangle 1 (2).png" 
          imageDark="/assets/Rectangle 1 (1).svg" 
        />
        <DashboardCard 
          imageLight="/assets/Rectangle 1 (2).svg" 
          imageDark="/assets/Rectangle 1.svg" 
        />
      </div>
      
      {/* Incubator Element - full width with 25px margins, size 1870x260, flush with bottom */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-50px)] max-w-[1870px] h-[260px] bg-transparent z-[-10] pointer-events-none overflow-hidden">
        <img
          src="/assets/INCUBATOR.svg"
          alt="Incubator Background"
          className="absolute bottom-0 left-0 w-full h-auto dark:brightness-[0.22] dark:contrast-[1.2]"
        />
      </div>
    </div>
  );
};

export default Dashboard;