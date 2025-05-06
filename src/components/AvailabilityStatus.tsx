
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
        {/* Strong pulsating dot with multiple layers for enhanced glow effect */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-[pulse_2s_ease-in-out_infinite]"></span>
        
        {/* Inner glow layer */}
        <span className="absolute inset-[-3px] rounded-full bg-green-500 animate-[pulse_2s_ease-in-out_infinite] opacity-60 blur-[1px]"></span>
        
        {/* Middle glow layer */}
        <span className="absolute inset-[-6px] rounded-full bg-green-500 animate-[pulse_2s_ease-in-out_infinite] opacity-40 blur-[2px]"></span>
        
        {/* Outer glow layer */}
        <span className="absolute inset-[-10px] rounded-full bg-green-500 animate-[pulse_2s_ease-in-out_infinite] opacity-20 blur-[4px]"></span>
        
        {/* Extreme outer glow */}
        <span className="absolute inset-[-14px] rounded-full bg-green-500 animate-[pulse_2s_ease-in-out_infinite] opacity-10 blur-[6px]"></span>
      </div>
      <span className="text-green-300 text-xs font-medium">Open To Work</span>
    </div>
  );
};

export default AvailabilityStatus;
