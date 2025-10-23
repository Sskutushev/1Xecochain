// src/pages/Dashboard/Dashboard.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '@/components/features/Dashboard/DashboardCard';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="relative z-1">
      
      {/* Vector Background - appears at x=590px from left, y=100px from top */}
      <img
        src="/assets/Vector.svg"
        alt="Vector Background"
        className="fixed top-[100px] left-[590px] w-[1660px] h-[900px] pointer-events-none z-[-30] dark:brightness-[0.22] dark:contrast-[1.2] dark:saturate-[1.5]"
      />
      
      {/* Cards Container - centered and responsive with flex-wrap */}
      <div className="w-full flex justify-center pt-[195px] pb-20 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-10 max-w-screen-xl">
          <DashboardCard 
            imageLight="/assets/Rectangle 1.svg" 
            imageDark="/assets/Rectangle 1.png" 
            title="New Tokens"
            description="Discover, Create, and Manage ERC20 Polygon based tokens with X1 no code solution"
            buttonText="Discover all tokens"
            onButtonClick={() => navigate('/listing')}
          />
          <DashboardCard 
            imageLight="/assets/Rectangle 1 (1).svg" 
            imageDark="/assets/Rectangle 1 (1).png" 
            title="Create tokens"
            description="Create, Manage, and Distribute ERC20 Polygon based tokens with X1 no code solution"
            buttonText="Create new token"
            onButtonClick={() => {/* Открыть попап создания токена */}}
          />
          <DashboardCard 
            imageLight="/assets/Rectangle 1 (2).svg" 
            imageDark="/assets/Rectangle 1 (2).png" 
            title="My tokens"
            description="Create, Manage, and Distribute BEP20 based tokens with X1 no code solution"
            buttonText="Manage my tokens"
            onButtonClick={() => navigate('/my-tokens')}
          />
        </div>
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