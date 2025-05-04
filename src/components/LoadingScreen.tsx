
import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 150);
    
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
      className={`fixed inset-0 z-50 bg-space flex flex-col items-center justify-center transition-opacity duration-500 ${
        isComplete ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="max-w-md w-full px-4">
        <div className="mb-4 text-xl font-mono text-space-text/70">
          Loading experience...
        </div>
        
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-purple-400 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="mt-2 text-right text-sm text-space-text/50">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
