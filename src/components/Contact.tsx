
import { useEffect, useState, useRef } from 'react';
import { ExternalLink } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative z-10 py-20 px-4 sm:py-28 overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-gradient-to-b from-space-purple/30 to-space/60 z-0"
        style={{ 
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
        }}
      />
      
      <div className="container relative z-10 mx-auto max-w-4xl">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-4">
            Connect With Me
          </h2>
          <p className="text-lg text-space-text/80 max-w-2xl mx-auto">
            I'm currently available for new opportunities. If you'd like to discuss a project or have any questions, feel free to reach out.
          </p>
        </div>
        
        <div className={`glass-morphism rounded-2xl p-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gradient-purple">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <p className="flex items-center">
                  <span className="w-24 text-space-text/60">Email:</span>
                  <a 
                    href="mailto:shayanfarshid48@gmail.com" 
                    className="text-purple-300 hover:text-purple-200 transition-colors"
                  >
                    shayanfarshid48@gmail.com
                  </a>
                </p>
                
                <p className="flex items-center">
                  <span className="w-24 text-space-text/60">LinkedIn:</span>
                  <a 
                    href="https://www.linkedin.com/in/sfarshid/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:text-purple-200 transition-colors flex items-center"
                  >
                    <span>linkedin.com/in/sfarshid</span>
                    <ExternalLink className="ml-1" size={14} />
                  </a>
                </p>
                
                <p className="flex items-center">
                  <span className="w-24 text-space-text/60">Location:</span>
                  <span>San Francisco, CA</span>
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gradient-purple">
                Send a Message
              </h3>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-space-text/60 mb-1">
                    Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm text-space-text/60 mb-1">
                    Email
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm text-space-text/60 mb-1">
                    Message
                  </label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 transition-colors"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg text-white font-medium hover:from-purple-700 hover:to-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/20"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
