
import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const OpenToWorkIndicator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000); // Show after preloader (adjusted to be faster)
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div className={`fixed ${isMobile ? 'top-4 right-4' : 'top-6 right-6'} z-50 flex items-center space-x-2 bg-[rgba(10,10,22,0.45)] backdrop-blur-sm px-3 py-1.5 rounded-full animate-fade-in opacity-55`}>
      <span className="text-sm text-green-400 font-medium">Open To Work</span>
      <div className="relative flex h-2.5 w-2.5">
        <span className="absolute inset-0 rounded-full bg-green-500"></span>
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75 duration-1000"></span>
      </div>
    </div>
  );
};

export default OpenToWorkIndicator;
