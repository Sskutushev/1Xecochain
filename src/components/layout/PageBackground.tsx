import { useLocation } from 'react-router-dom';

const PageBackground = () => {
  const location = useLocation();

  // Don't show backgrounds on token detail page
  const isTokenDetailPage = location.pathname.startsWith('/token/');

  return (
    <div className="fixed inset-0 -z-30 pointer-events-none overflow-hidden">
      {/* Incubator Background - at bottom of page, full width with side margins, flush with bottom */}
      {!isTokenDetailPage && (
        <img
          src="/assets/INCUBATOR.svg"
          alt="Incubator Background"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          style={{
            width: 'calc(100% - 50px)',
            maxWidth: '1870px',
            height: '260px',
            backgroundColor: 'transparent', // Changed to transparent as requested
            zIndex: -10
          }}
        />
      )}
    </div>
  );
};

export default PageBackground;
