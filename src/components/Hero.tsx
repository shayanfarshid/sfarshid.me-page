
import { useEffect, useState } from 'react';
import AvailabilityStatus from './AvailabilityStatus';
import TypeWriter from './TypeWriter';

const Hero = () => {
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    // Add a slight delay before showing content
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const typewriterTexts = [
    "transform raw data into actionable strategies",
    "create engaging data visualizations",
    "build predictive models for business growth",
    "optimize operations through data insights",
    "craft compelling data narratives"
  ];
  
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-12">
            {/* Top availability status */}
            <div className="flex justify-center">
              <AvailabilityStatus />
            </div>
            
            {/* Main heading with first and last name styled differently */}
            <div>
              <h1 className={`text-6xl sm:text-7xl md:text-8xl font-bold mb-4 transition-all duration-1000 ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <span className="font-normal">Shayan</span>{" "}
                <span className="font-light italic" style={{ fontFamily: 'Playfair Display, serif' }}>Farshid</span>
              </h1>
              
              <h2 className={`text-xl sm:text-2xl md:text-3xl text-purple-300 font-light transition-all duration-1000 delay-100 ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Data Analytics & BizOps Professional
              </h2>
            </div>
            
            {/* Typewriter effect */}
            <div className={`text-lg sm:text-xl md:text-2xl text-space-text/90 transition-all duration-1000 delay-200 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              I <TypeWriter 
                texts={typewriterTexts} 
                typingSpeed={80} 
                deletingSpeed={40} 
                className="text-purple-400"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Social links at bottom */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center space-x-8">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors text-lg">𝕏</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors text-lg">𝕀𝕘</a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors text-lg">𝔽𝕓</a>
      </div>
    </section>
  );
};

export default Hero;
