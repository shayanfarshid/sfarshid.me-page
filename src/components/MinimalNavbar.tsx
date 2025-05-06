
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MinimalNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Always show navbar
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

  // Determine active page
  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-500"
    >
      <div className="flex items-center">
        <nav className="backdrop-blur-xl bg-[rgba(25,25,40,0.3)] rounded-full px-3 py-1.5 flex items-center border border-white/5 shadow-lg">
          <Link 
            to="/" 
            className={`transition-colors px-4 py-1.5 text-sm inline-block relative ${
              isActive('/') 
                ? 'text-purple-300' 
                : 'text-space-text hover:text-purple-300'
            }`}
          >
            Home
            {isActive('/') && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-70"></span>
            )}
          </Link>
          <span className="text-white/20">|</span>
          <Link 
            to="/experience" 
            className={`transition-colors px-4 py-1.5 text-sm inline-block relative ${
              isActive('/experience') 
                ? 'text-purple-300' 
                : 'text-space-text hover:text-purple-300'
            }`}
          >
            Experience
            {isActive('/experience') && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-70"></span>
            )}
          </Link>
          <span className="text-white/20">|</span>
          <Link 
            to="/contact" 
            className={`transition-colors px-4 py-1.5 text-sm inline-block relative ${
              isActive('/contact') 
                ? 'text-purple-300' 
                : 'text-space-text hover:text-purple-300'
            }`}
          >
            Connect
            {isActive('/contact') && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-70"></span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default MinimalNavbar;
