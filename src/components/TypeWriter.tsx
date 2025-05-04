
import { useState, useEffect } from 'react';

interface TypeWriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
  className?: string;
}

const TypeWriter = ({ 
  texts, 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  delayBetween = 2000, 
  className = "" 
}: TypeWriterProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDelayActive, setIsDelayActive] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    
    // If current operation is delay after finishing typing a word
    if (isDelayActive) {
      timeout = setTimeout(() => {
        setIsDelayActive(false);
        setIsDeleting(true);
      }, delayBetween);
      return () => clearTimeout(timeout);
    }
    
    // Current text from array
    const currentText = texts[currentIndex];
    
    // Calculate next state of displayed text
    if (isDeleting) {
      // We're in delete mode
      if (displayedText === '') {
        // Done deleting, switch to typing the next word
        setIsDeleting(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
      } else {
        // Continue deleting
        timeout = setTimeout(() => {
          setDisplayedText(currentText.substring(0, displayedText.length - 1));
        }, deletingSpeed);
      }
    } else {
      // We're in typing mode
      if (displayedText === currentText) {
        // Done typing current word, start delay before deleting
        setIsDelayActive(true);
      } else {
        // Continue typing
        timeout = setTimeout(() => {
          setDisplayedText(currentText.substring(0, displayedText.length + 1));
        }, typingSpeed);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentIndex, texts, typingSpeed, deletingSpeed, delayBetween, isDelayActive]);
  
  return (
    <span className={className}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypeWriter;
