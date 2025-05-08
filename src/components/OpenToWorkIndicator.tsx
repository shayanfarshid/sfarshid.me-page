
import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const OpenToWorkIndicator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4500); // Show after preloader
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div className={`fixed ${isMobile ? 'top-4 right-4' : 'top-6 right-6'} z-50 flex items-center space-x-2 bg-[rgba(10,10,22,0.7)] backdrop-blur-sm px-3 py-1.5 rounded-full animate-fade-in`}>
      <span className="text-sm text-green-400 font-medium">Open to Work</span>
      <div className="h-2.5 w-2.5 bg-green-500 rounded-full animate-pulse"></div>
    </div>
  );
};

export default OpenToWorkIndicator;
