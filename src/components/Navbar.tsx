
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass-morphism py-3' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 md:px-8">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 mx-auto">
          {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-space-text hover:text-purple-300 transition-colors relative after:content-[''] after:absolute after:w-0 after:h-px after:bg-purple-300 after:bottom-0 after:left-0 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </a>
          ))}
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-purple-300 border border-purple-300/30 rounded-full px-4 py-1 hover:bg-purple-300/10 transition-all"
          >
            Resume
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-space-text focus:outline-none mx-auto"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-space bg-opacity-95 z-40 flex flex-col justify-center items-center md:hidden transition-all transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col space-y-8 items-center">
          {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-space-text hover:text-purple-300 text-xl transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-purple-300 border border-purple-300 rounded-full px-6 py-2 hover:bg-purple-300/10 transition-all"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
