
import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button') || 
                          target.tagName === 'BUTTON' || 
                          target.tagName === 'A' ||
                          window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isClickable);
    };
    
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  if (typeof window === 'undefined') return null;
  
  return (
    <>
      <style jsx global>{`
        body {
          cursor: none;
        }
        
        a, button, [role="button"], [class*="hover\\:"], [class*="cursor-"] {
          cursor: none !important;
        }
      `}</style>
      
      <div
        className={`fixed pointer-events-none z-[9999] transition-transform duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.2 : 1})`,
        }}
      >
        <div className={`rounded-full border ${isPointer ? 'w-8 h-8 border-purple-400 border-2' : 'w-6 h-6 border-white/70 border'} transition-all duration-300`}>
          {isPointer && (
            <div className="absolute inset-0 bg-purple-400/20 rounded-full"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
