
import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const loadingTexts = [
    'Initializing...',
    'Loading assets...',
    'Preparing particles...',
    'Loading experience...'
  ];
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 8;
        
        // Change loading text based on progress
        if (newProgress > 25 && newProgress < 50) {
          setLoadingText(loadingTexts[1]);
        } else if (newProgress > 50 && newProgress < 75) {
          setLoadingText(loadingTexts[2]);
        } else if (newProgress > 75) {
          setLoadingText(loadingTexts[3]);
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
      }, 600);
    }, 2000);
    
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
        <div className="mb-4 text-2xl font-mono font-bold text-gradient">
          <span className="text-4xl text-purple-400">S</span>F
        </div>
        
        <div className="mb-2 text-xl font-mono text-space-text/70">
          {loadingText}
        </div>
        
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-purple-300 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="mt-2 text-right text-sm text-space-text/50">
          {Math.round(progress)}%
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="w-[40vw] h-[40vw] border border-purple-300/20 rounded-full animate-ping"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
