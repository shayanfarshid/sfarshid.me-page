
import { useEffect, useState, useRef } from 'react';

interface TerminalTextProps {
  text: string;
  typingSpeed?: number;
  className?: string;
  onComplete?: () => void;
}

const TerminalText = ({ 
  text,
  typingSpeed = 60,
  className = "",
  onComplete
}: TerminalTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      intervalRef.current = setInterval(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);
      
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    } else if (currentIndex === text.length && onComplete) {
      onComplete();
    }
    
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearInterval(cursorInterval);
    };
  }, [currentIndex, text, typingSpeed, onComplete]);
  
  return (
    <div className={`terminal-text font-mono ${className}`}>
      {displayedText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>▋</span>
    </div>
  );
};

export default TerminalText;
