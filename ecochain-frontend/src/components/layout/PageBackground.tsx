import { useLocation } from 'react-router-dom';

const INCUBATOR_BG = '/assets/INCUBATOR.svg';
const CREATE_TOKEN_BG = '/assets/Create token.svg';
const VECTOR_BG = '/assets/Vector.svg';

const PageBackground = () => {
  const location = useLocation();

  const isCreatePage = location.pathname === '/create-token' || location.pathname === '/add-liquidity';
  const isTokenDetailPage = location.pathname.startsWith('/token/');

  let mainBgImage = null;
  if (isCreatePage) {
    mainBgImage = CREATE_TOKEN_BG;
  } else if (!isTokenDetailPage) {
    mainBgImage = INCUBATOR_BG;
  }

  return (
    <>
      {/* Vector Background (BEHIND) */}
      <div
        className="fixed top-0 right-0 h-[900px] w-1/2 max-w-[960px] bg-right-top bg-no-repeat bg-contain z-[-2] dark:opacity-[0.22]"
        style={{ backgroundImage: `url(${VECTOR_BG})` }}
      />

      {/* Main Background (IN FRONT) */}
      {mainBgImage && (
        <div
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1870px] h-[1000px] bg-bottom bg-no-repeat bg-contain z-[-1] dark:opacity-[0.22]"
          style={{ backgroundImage: `url(${mainBgImage})` }}
        />
      )}
    </>
  );
};

export default PageBackground;
