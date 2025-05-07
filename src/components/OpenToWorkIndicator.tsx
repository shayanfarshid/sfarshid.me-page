
import { useEffect, useState } from 'react';

const OpenToWorkIndicator = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4500); // Show after preloader
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed top-6 right-6 z-50 flex items-center space-x-2 animate-fade-in">
      <span className="text-xs text-purple-200">OPEN TO WORK</span>
      <div className="relative flex items-center">
        <div className="h-2.5 w-2.5 bg-green-500 rounded-full"></div>
        {/* Reduced glow radius */}
        <div
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            backgroundColor: 'transparent',
            boxShadow: '0 0 6px 1px rgba(74, 222, 128, 0.5)',
            animation: 'pulse 2s ease-in-out infinite'
          }}
        ></div>
      </div>
    </div>
  );
};

export default OpenToWorkIndicator;
