import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '@/components/features/Dashboard/DashboardCard';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative z-1">
      <img
        src="/assets/Vector.svg"
        alt="Vector Background"
        className="fixed top-[100px] left-[590px] w-[1660px] h-[900px] pointer-events-none z-[-30] dark:brightness-[0.22] dark:contrast-[1.2] dark:saturate-[1.5]"
      />
      <div className="w-full flex justify-center pt-[195px] pb-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center max-w-screen-xl">
          <DashboardCard 
            imageLight="/assets/Rectangle 1.svg" 
            imageDark="/assets/Rectangle 1.png" 
            titleKey="dashboard.newTokens"
            descriptionKey="dashboard.newTokensDescription"
            buttonTextKey="dashboard.discoverButton"
            onButtonClick={() => navigate('/listing')}
          />
          <DashboardCard 
            imageLight="/assets/Rectangle 1 (1).svg" 
            imageDark="/assets/Rectangle 1 (1).png" 
            titleKey="dashboard.createTokens"
            descriptionKey="dashboard.createTokensDescription"
            buttonTextKey="dashboard.createButton"
            onButtonClick={() => {/* Открыть попап создания токена */}}
          />
          <DashboardCard 
            imageLight="/assets/Rectangle 1 (2).svg" 
            imageDark="/assets/Rectangle 1 (2).png" 
            titleKey="dashboard.myTokens"
            descriptionKey="dashboard.myTokensDescription"
            buttonTextKey="dashboard.manageButton"
            onButtonClick={() => navigate('/my-tokens')}
          />
        </div>
      </div>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-50px)] max-w-[1870px] h-[260px] bg-transparent z-[-10] pointer-events-none overflow-hidden">
        <img
          src="/assets/INCUBATOR.svg"
          alt="Incubator Background"
          className="absolute bottom-0 left-0 w-full h-auto dark:opacity-[.46]"
        />
      </div>
    </div>
  );
};

export default Dashboard;
