
import { useEffect, useState } from 'react';
import TerminalText from './TerminalText';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const [terminalComplete, setTerminalComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    // Add a slight delay before showing content
    if (terminalComplete) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [terminalComplete]);
  
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Terminal window */}
          <div className="bg-black/80 rounded-lg border border-white/10 shadow-lg overflow-hidden mb-8 backdrop-blur">
            <div className="bg-gray-900 px-4 py-2 flex items-center border-b border-white/10">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-white/70 text-xs">shayanfarshid/README.md</div>
            </div>
            
            <div className="p-6">
              <TerminalText 
                text="👋 Hi, I'm @shayanfarshid
                
📊 Interested in Analytics and Data Science roles

🎓 Graduated MS in Business Analytics @ UC Davis

🔍 Open to opportunities!

📧 Reach me at shayanfarshid48@gmail.com

#OpenToWork #LetsConnect"
                typingSpeed={30}
                className="whitespace-pre-line text-sm sm:text-base"
                onComplete={() => setTerminalComplete(true)}
              />
            </div>
          </div>

          {/* Content that appears after terminal typing is complete */}
          <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gradient">
              Shayan Farshid
            </h1>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl text-purple-300 font-light mb-8">
              Data Analytics & BizOps Professional
            </h2>
            
            <p className="text-lg max-w-2xl mb-8 text-space-text/90">
              Results-driven aspiring analytics professional with extensive experience in optimizing operations and driving growth through targeted market research and analytics.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#about" 
                className="glass-morphism px-6 py-3 rounded-full text-space-text hover:bg-white/10 transition-all"
              >
                Learn more about me
              </a>
              
              <a 
                href="#contact" 
                className="bg-purple-800/50 border border-purple-500/30 px-6 py-3 rounded-full text-space-text hover:bg-purple-700/50 transition-all"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <a 
        href="#about" 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center transition-all duration-1000 ${
          showContent ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-8'
        } hover:opacity-100`}
        aria-label="Scroll down"
      >
        <span className="text-xs text-space-text/70 mb-2">Scroll Down</span>
        <ChevronDown className="animate-bounce text-space-text/70" size={20} />
      </a>
    </section>
  );
};

export default Hero;
