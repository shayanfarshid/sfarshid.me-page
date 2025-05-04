
import { useEffect, useState } from 'react';

const AvailabilityStatus = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Add a slight delay for the animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div 
      className={`inline-flex items-center transition-all duration-500 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="relative mr-2 flex">
        <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30"></div>
      </div>
      <span className="text-green-300 text-sm font-medium">open to work</span>
    </div>
  );
};

export default AvailabilityStatus;
