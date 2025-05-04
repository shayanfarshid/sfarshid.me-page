
import { useEffect, useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import TerminalText from './TerminalText';
import AvailabilityStatus from './AvailabilityStatus';

const Hero = () => {
  const [terminalComplete, setTerminalComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  
  useEffect(() => {
    // Add a slight delay before showing content
    if (terminalComplete) {
      const timer = setTimeout(() => {
        setShowContent(true);
        
        // Show scroll indicator after content appears
        setTimeout(() => {
          setShowScrollIndicator(true);
        }, 1000);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [terminalComplete]);
  
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col space-y-12">
            <div className="space-y-2">
              <AvailabilityStatus />
              
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-2 text-gradient transition-all duration-1000 ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Shayan Farshid
              </h1>
              
              <h2 className={`text-xl sm:text-2xl md:text-3xl text-purple-300 font-light transition-all duration-1000 delay-100 ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Data Analytics & BizOps Professional
              </h2>
            </div>
            
            <div className={`transition-all duration-1000 delay-200 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gradient">
                Obsessed with creating <span className="italic text-gradient-purple">timeless</span> <br />
                data-driven insights.
              </h2>
              
              <p className="text-lg max-w-2xl mb-8 text-space-text/90">
                Results-driven analytics professional transforming complex data into strategic insights 
                that drive business decisions and enhance operational efficiency.
              </p>
            </div>
            
            <div className={`flex flex-wrap gap-4 transition-all duration-1000 delay-300 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <a 
                href="#work" 
                className="glass-morphism px-6 py-3 rounded-full text-space-text hover:bg-white/10 transition-all"
              >
                View My Work
              </a>
              
              <a 
                href="/resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-purple-800/50 border border-purple-500/30 px-6 py-3 rounded-full text-space-text hover:bg-purple-700/50 transition-all"
              >
                <span>Resume</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* What makes me different section */}
      <div className="w-full mt-32 px-4 py-16 bg-space-light/20">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-2/5">
              <div className="relative w-64 h-64 mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-pulse"></div>
                <div className="absolute inset-2 rounded-full overflow-hidden">
                  <img 
                    src="/lovable-uploads/0fb1940f-cf91-499d-944c-bff6335e0a92.png" 
                    alt="Shayan Farshid" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className="md:w-3/5 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold">
                What makes me <span className="italic text-gradient-purple">different</span>?
              </h2>
              
              <p className="text-space-text/90">
                I create data-driven solutions tailored to your business needs. By merging
                analytical expertise with strategic thinking, I ensure every insight not only 
                reveals patterns but also drives actionable strategies for growth and optimization.
              </p>
              
              <a 
                href="#about" 
                className="inline-flex items-center space-x-2 text-purple-300 hover:text-purple-200 transition-colors"
              >
                <span>Learn more about me</span>
                <ChevronDown size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <a 
        href="#about" 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center transition-all duration-1000 ${
          showScrollIndicator ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-8'
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
