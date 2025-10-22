import { useLocation } from 'react-router-dom';

const INCUBATOR_BG = '/assets/INCUBATOR.svg';
const VECTOR_BG = '/assets/Vector.svg';

const PageBackground = () => {
  const location = useLocation();

  // Don't show backgrounds on token detail page
  const isTokenDetailPage = location.pathname.startsWith('/token/');

  return (
    <>
      {/* Vector Background - appears at x=994px from left, y=100px from top */}
      <div
        className="fixed top-[100px] left-[994px] w-[1200px] h-[900px] bg-no-repeat bg-contain z-[-2] opacity-40"
        style={{ 
          backgroundImage: `url(${VECTOR_BG})`,
          backgroundBlendMode: 'soft-light',
          backgroundColor: '#D9D9D9',
          width: '2000px',
          height: '1200px'
        }}
      />

      {/* Incubator Background - at bottom of page, full width with side margins, flush with bottom */}
      {!isTokenDetailPage && (
        <div
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1870px] h-[1000px] bg-bottom bg-no-repeat bg-contain z-[-1]"
          style={{ 
            backgroundImage: `url(${INCUBATOR_BG})`,
            backgroundBlendMode: 'overlay',
            backgroundColor: '#FFFFFF'
          }}
        />
      )}
    </>
  );
};

export default PageBackground;
