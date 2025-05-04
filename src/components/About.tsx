
import { useEffect, useRef, useState } from 'react';
import { User, Code, BookOpen } from 'lucide-react';

const About = () => {
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
        threshold: 0.3,
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
      id="about" 
      ref={sectionRef}
      className="section-padding relative z-10"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-gradient inline-block">
          About Me
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Image Column */}
          <div className={`transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="aspect-square relative rounded-full overflow-hidden border-4 border-purple-500/20">
              <img 
                src="/lovable-uploads/6f68e2ff-59f6-419a-a022-af4711b18387.png" 
                alt="Shayan Farshid" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Text Column */}
          <div className={`col-span-1 md:col-span-2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-lg mb-6">
              I'm a results-driven analytics professional with expertise in optimizing operations and driving growth through targeted market research and analytics. With a Master's degree in Business Analytics from UC Davis, I combine technical skills with business acumen to deliver actionable insights.
            </p>
            
            <p className="text-lg mb-8">
              My approach combines analytical rigor with creative problem-solving, allowing me to identify patterns, extract meaningful insights, and develop data-driven strategies that drive business outcomes.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div className="glass-morphism p-6 rounded-lg">
                <User size={24} className="text-purple-400 mb-3" />
                <h3 className="text-lg font-medium mb-2">Background</h3>
                <p className="text-sm text-space-text/80">San Francisco-based professional with experience across healthcare, education, and technology sectors.</p>
              </div>
              
              <div className="glass-morphism p-6 rounded-lg">
                <Code size={24} className="text-purple-400 mb-3" />
                <h3 className="text-lg font-medium mb-2">Tech Stack</h3>
                <p className="text-sm text-space-text/80">R, SQL, Python, Tableau, Power BI, Advanced Excel with a focus on data analysis and visualization.</p>
              </div>
              
              <div className="glass-morphism p-6 rounded-lg">
                <BookOpen size={24} className="text-purple-400 mb-3" />
                <h3 className="text-lg font-medium mb-2">Education</h3>
                <p className="text-sm text-space-text/80">MS in Business Analytics from UC Davis with specialized coursework in data management and ML.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
