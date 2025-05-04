
import { useEffect, useRef, useState } from 'react';
import { GalleryHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  skills: string[];
  highlight: string;
}

const projects: Project[] = [
  {
    title: 'Bay Area Collision Analysis',
    description: 'Visualization and prediction project to identify high-risk traffic areas.',
    skills: ['Python', 'R', 'Data Visualization'],
    highlight: 'Predicted collision chances with 85%+ accuracy using machine learning models.'
  },
  {
    title: 'Bank Churn Prediction',
    description: 'Predictive modeling to identify and reduce customer churn.',
    skills: ['Random Forest', 'Customer Analytics'],
    highlight: 'Implemented models achieving 87.05% accuracy, deployed into customer service workflows.'
  },
  {
    title: 'Healthcare Operations Dashboard',
    description: 'Interactive analytics for clinical performance monitoring.',
    skills: ['Tableau', 'Power BI'],
    highlight: 'Developed KPI tracking system with real-time data integration for executive decision-making.'
  }
];

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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
  
  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + projects.length) % projects.length);
  };
  
  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % projects.length);
  };
  
  return (
    <section 
      id="work" 
      ref={sectionRef}
      className="section-padding relative z-10"
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center">
            <GalleryHorizontal className="text-purple-400 mr-3" size={24} />
            <h2 className="text-3xl font-bold text-gradient inline-block">
              Work
            </h2>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={handlePrev}
              className="w-8 h-8 rounded-full glass-morphism flex items-center justify-center hover:bg-white/10"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={handleNext}
              className="w-8 h-8 rounded-full glass-morphism flex items-center justify-center hover:bg-white/10"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            className="transition-all duration-500 flex"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {projects.map((project, index) => (
              <div 
                key={project.title}
                className="min-w-full"
              >
                <div className={`glass-morphism rounded-3xl p-8 transition-all duration-500 h-[280px] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                  <div className="flex flex-col h-full">
                    <h3 className="text-2xl font-bold mb-3 text-purple-300">{project.title}</h3>
                    <p className="text-space-text/80 mb-4">{project.description}</p>
                    
                    <p className="text-space-text/90 mb-6 italic">"{project.highlight}"</p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.skills.map((skill) => (
                        <span 
                          key={skill} 
                          className="bg-purple-900/40 text-purple-200 px-2 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-6 gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeIndex ? 'bg-purple-400 w-6' : 'bg-white/30'
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
