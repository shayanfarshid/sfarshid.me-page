
import { useEffect, useState } from 'react';
import TypeWriter from './TypeWriter';
import { Github, Linkedin, Mail } from 'lucide-react';

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
    "craft compelling data narratives",
    "streamline supply chains through strategic procurement",
    "accelerate production timelines with precision component sourcing"
  ];
  
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-12">
            {/* Main heading with first and last name styled differently */}
            <div>
              <h1 className={`text-6xl sm:text-7xl md:text-8xl font-bold mb-4 transition-all duration-1000 ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <span className="font-normal shayan-glow">Shayan</span>{" "}
                <span className="font-light" style={{ fontFamily: 'Playfair Display, serif' }}>Farshid</span>
              </h1>
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
            
            {/* Social media links */}
            <div className={`flex justify-center space-x-8 transition-all duration-1000 delay-300 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <a 
                href="https://github.com/shayanfarshid" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-300 hover:-translate-y-1 social-icon"
                aria-label="GitHub"
              >
                <Github size={22} />
              </a>
              <a 
                href="https://linkedin.com/in/sfarshid" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-300 hover:-translate-y-1 social-icon"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} />
              </a>
              <a 
                href="mailto:shayanfarshid48@gmail.com" 
                className="text-white/70 hover:text-white transition-all duration-300 hover:-translate-y-1 social-icon"
                aria-label="Email"
              >
                <Mail size={22} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
