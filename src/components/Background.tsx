
import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleDelay: number;
}

const Background = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const stars: Star[] = [];
    const starCount = 150;
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      const star: Star = {
        x: Math.random() * 100, // percent
        y: Math.random() * 100, // percent
        size: Math.random() * 2 + 0.5, // px
        opacity: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 3 + 2, // seconds
        twinkleDelay: Math.random() * 5 // seconds
      };
      
      stars.push(star);
      
      // Create star element
      const starElement = document.createElement('div');
      starElement.classList.add('star');
      starElement.style.left = `${star.x}%`;
      starElement.style.top = `${star.y}%`;
      starElement.style.width = `${star.size}px`;
      starElement.style.height = `${star.size}px`;
      starElement.style.opacity = `${star.opacity}`;
      starElement.style.animation = `twinkle ${star.twinkleSpeed}s ease-in-out infinite`;
      starElement.style.animationDelay = `${star.twinkleDelay}s`;
      
      container.appendChild(starElement);
    }
    
    // Create a few larger stars with glow
    for (let i = 0; i < 10; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = `${Math.random() * 3 + 2}px`;
      star.style.height = star.style.width;
      star.style.opacity = '0.9';
      star.style.boxShadow = '0 0 10px 2px rgba(255, 255, 255, 0.4)';
      star.style.animation = `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite`;
      
      container.appendChild(star);
    }
    
    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-gradient-space overflow-hidden z-0"
      aria-hidden="true"
    />
  );
};

export default Background;
