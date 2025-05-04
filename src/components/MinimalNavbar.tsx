
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const MinimalNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled 
          ? 'opacity-100' 
          : 'opacity-0'
      }`}
    >
      <div className="flex items-center">
        <nav className="glass-morphism rounded-full px-2 py-1">
          {['Work', 'Experience', 'Connect'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-space-text hover:text-purple-300 transition-colors px-4 py-2 text-sm inline-block"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default MinimalNavbar;
