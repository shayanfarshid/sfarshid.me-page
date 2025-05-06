
import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, [role="button"]') || 
                          target.tagName === 'BUTTON' || 
                          target.tagName === 'A' ||
                          window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(!!isClickable);
    };
    
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  
  // Skip rendering on server
  if (typeof window === 'undefined') return null;
  
  return (
    <>
      <style>
        {`
          body {
            cursor: none;
          }
          
          a, button, [role="button"], [class*="hover\\:"], input, textarea, select, [class*="cursor-"] {
            cursor: none !important;
          }
        `}
      </style>
      
      <div
        className={`fixed pointer-events-none z-[9999] transition-all duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : isClicking ? 0.8 : 1})`,
          transition: 'transform 0.15s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.15s ease'
        }}
      >
        <div 
          className={`rounded-full transition-all duration-200 ${
            isPointer 
              ? 'w-8 h-8 border border-purple-400/70 bg-purple-400/5' 
              : 'w-6 h-6 border border-white/50 bg-transparent'
          }`}
        />
      </div>
    </>
  );
};

export default CustomCursor;
