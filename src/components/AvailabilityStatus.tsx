
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
      className={`inline-flex items-center transition-all duration-500 px-2.5 py-1 rounded-full border border-green-500/20 bg-green-500/10 opacity-75 hover:opacity-100 ${
        isVisible ? 'opacity-75 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="relative mr-2 flex h-2 w-2">
        {/* Enhanced glowing dot with stronger pulse effect */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-[pulse_3s_ease-in-out_infinite] opacity-100"></div>
        {/* Stronger glow effect with two layers */}
        <div className="absolute inset-[-4px] rounded-full bg-green-500 animate-[pulse_3s_ease-in-out_infinite] opacity-40 blur-[2px]"></div>
        <div className="absolute inset-[-8px] rounded-full bg-green-500 animate-[pulse_3s_ease-in-out_infinite] opacity-20 blur-[4px]"></div>
      </div>
      <span className="text-green-300 text-xs font-medium">Open To Work</span>
    </div>
  );
};

export default AvailabilityStatus;
