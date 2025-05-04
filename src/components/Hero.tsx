
import { useEffect, useState, useRef } from 'react';
import AvailabilityStatus from './AvailabilityStatus';

const Hero = () => {
  const [showContent, setShowContent] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add a slight delay before showing content
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="space-y-8">
            <div className="flex justify-center">
              <AvailabilityStatus />
            </div>
            
            <div>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gradient transition-all duration-1000 ${
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
                Obsessed with creating <span className="text-purple-400">timeless</span> <br className="hidden sm:block" />
                data-driven insights.
              </h2>
              
              <p className="text-lg max-w-2xl mx-auto mb-8 text-space-text/90">
                Transforming complex data into strategic insights that drive business decisions and enhance operational efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* What makes me different section */}
      <div className="w-full mt-20 px-4 py-16 bg-space-light/10 backdrop-blur-sm border-t border-b border-white/5">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-2/5">
              <div className="relative w-64 h-64 mx-auto hover-scale">
                <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-pulse"></div>
                <div className="absolute inset-2 rounded-full overflow-hidden">
                  <img 
                    src="/lovable-uploads/61ab4242-137f-4380-92e1-2105e1bd5721.png" 
                    alt="Shayan Farshid" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  SF
                </div>
              </div>
            </div>
            
            <div className="md:w-3/5 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold">
                What makes me <span className="text-purple-400">different</span>?
              </h2>
              
              <p className="text-space-text/90">
                By merging analytical expertise with strategic thinking, I craft solutions that not only 
                reveal patterns but drive actionable strategies for growth and optimization.
              </p>
              
              <ul className="space-y-3 mt-4">
                {[
                  "Transforming raw data into actionable business strategies",
                  "Creating interactive dashboards that tell compelling stories",
                  "Building predictive models that drive decision-making"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
