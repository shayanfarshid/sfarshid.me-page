
import { useEffect, useState, useRef } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [loadingText, setLoadingText] = useState('Initializing neural pathways...');
  
  const loadingTexts = [
    'Initializing neural pathways...',
    'Parsing quantitative algorithms...',
    'Extracting insights from data fragments...',
    'Calibrating analytical frameworks...',
    'Synthesizing business intelligence...',
    'Revealing brilliance...'
  ];
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 6;
        
        // Change loading text based on progress
        if (newProgress > 20 && newProgress < 40) {
          setLoadingText(loadingTexts[1]);
        } else if (newProgress > 40 && newProgress < 60) {
          setLoadingText(loadingTexts[2]);
        } else if (newProgress > 60 && newProgress < 80) {
          setLoadingText(loadingTexts[3]);
        } else if (newProgress > 80 && newProgress < 95) {
          setLoadingText(loadingTexts[4]);
        } else if (newProgress > 95) {
          setLoadingText(loadingTexts[5]);
        }
        
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 120);
    
    // Handle completion and hiding
    const completeTimeout = setTimeout(() => {
      setProgress(100);
      setIsComplete(true);
      
      // Add delay before hiding
      setTimeout(() => {
        setIsHidden(true);
      }, 800);
    }, 3000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(completeTimeout);
    };
  }, []);
  
  if (isHidden) return null;
  
  return (
    <div 
      className={`fixed inset-0 z-[100] bg-space flex flex-col items-center justify-center transition-opacity duration-500 ${
        isComplete ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="max-w-md w-full px-4 relative z-10">
        <div className="mb-8 text-center">
          <span className="text-6xl font-bold" style={{ 
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "2px",
            backgroundImage: 'linear-gradient(135deg, #fff 10%, #9b87f5 50%, #6E59A5 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>SF</span>
        </div>
        
        <div className="mb-2 text-xl font-light text-space-text/70 text-center font-mono">
          {loadingText}
        </div>
        
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-purple-300 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="mt-2 text-right text-sm text-space-text/50">
          {Math.round(progress)}%
        </div>
      </div>
      
      {/* Decorative particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div 
          key={i} 
          className="absolute bg-purple-400/20 rounded-full animate-pulse"
          style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 2}s`
          }}
        ></div>
      ))}
    </div>
  );
};

export default LoadingScreen;
