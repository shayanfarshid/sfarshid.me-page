
import { useEffect, useState, useRef } from 'react';

interface BentoItem {
  title: string;
  description: string;
  icon?: string;
  size?: 'sm' | 'md' | 'lg';
  content?: React.ReactNode;
}

interface BentoGridProps {
  title: string;
  subtitle?: string;
  items: BentoItem[];
}

const BentoGrid = ({ title, subtitle, items }: BentoGridProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Define size classes for grid items
  const sizeClasses = {
    sm: 'col-span-1 row-span-1',
    md: 'col-span-1 md:col-span-2 row-span-1',
    lg: 'col-span-1 md:col-span-2 row-span-2'
  };
  
  return (
    <div ref={sectionRef} className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-gradient">{title}</h2>
        {subtitle && <p className="text-space-text/70 mb-8">{subtitle}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, i) => (
            <div 
              key={i}
              className={`glass-morphism rounded-3xl overflow-hidden ${sizeClasses[item.size || 'sm']} transition-all duration-300 hover:transform hover:scale-[1.02] ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: `${i * 100}ms`,
                transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
              }}
            >
              <div className="h-full p-6 flex flex-col">
                <h3 className="text-xl font-medium mb-2 text-purple-300">{item.title}</h3>
                <p className="text-space-text/70 text-sm mb-4">{item.description}</p>
                {item.content && <div className="mt-auto">{item.content}</div>}
              </div>
              
              {/* Shine effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
