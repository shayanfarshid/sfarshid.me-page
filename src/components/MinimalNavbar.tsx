
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MinimalNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
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
      className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="flex items-center">
        <nav className="glass-morphism rounded-full px-3 py-1.5 flex items-center">
          <Link 
            to="/work" 
            className="text-space-text hover:text-purple-300 transition-colors px-4 py-1.5 text-sm inline-block"
          >
            Work
          </Link>
          <span className="text-white/20">|</span>
          <Link 
            to="/experience" 
            className="text-space-text hover:text-purple-300 transition-colors px-4 py-1.5 text-sm inline-block"
          >
            Experience
          </Link>
          <span className="text-white/20">|</span>
          <Link 
            to="/contact" 
            className="text-space-text hover:text-purple-300 transition-colors px-4 py-1.5 text-sm inline-block"
          >
            Connect
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default MinimalNavbar;
