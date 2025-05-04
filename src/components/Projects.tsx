
import { useEffect, useRef, useState } from 'react';
import { GalleryHorizontal } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  skills: string[];
  highlights: string[];
}

const projects: Project[] = [
  {
    title: 'Bay Area Collision Analysis',
    description: 'Visualization and prediction project to identify high-risk traffic areas in San Francisco.',
    image: '/lovable-uploads/063fded0-9556-48a2-a955-41d86d25ef3c.png',
    skills: ['Python', 'R', 'Data Visualization', 'Machine Learning'],
    highlights: [
      'Visualized collision density using heatmaps in R',
      'Utilized Python to predict collision chances with 85%+ accuracy',
      'Designed a monitoring dashboard to track collision trends and hotspots'
    ]
  },
  {
    title: 'Bank Churn Prediction and Retention Strategy',
    description: 'Predictive modeling project focused on identifying and reducing customer churn.',
    image: '/lovable-uploads/ac29ed1e-1851-4f4b-9056-9d6ce534acf8.png',
    skills: ['Random Forest', 'Customer Analytics', 'Predictive Modeling'],
    highlights: [
      'Analyzed customer demographics to identify high-risk churn groups',
      'Implemented predictive models achieving 87.05% accuracy',
      'Deployed Random Forest model into customer service workflows'
    ]
  },
  {
    title: 'Healthcare Operations Dashboard',
    description: 'Interactive analytics dashboard for clinical operations performance monitoring.',
    image: '/lovable-uploads/cc649a2c-4ca5-4bb3-af60-dc5c6c6882af.png',
    skills: ['Tableau', 'Power BI', 'Healthcare Analytics'],
    highlights: [
      'Developed KPI tracking system for clinical performance metrics',
      'Created interactive visualizations for executive decision-making',
      'Implemented real-time data integration with clinical systems'
    ]
  }
];

const Projects = () => {
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
      id="projects" 
      ref={sectionRef}
      className="section-padding relative z-10"
    >
      <div className="container mx-auto">
        <div className="flex items-center mb-12">
          <GalleryHorizontal className="text-purple-400 mr-3" size={24} />
          <h2 className="text-3xl font-bold text-gradient inline-block">
            Projects
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className={`glass-morphism rounded-2xl overflow-hidden transition-all duration-1000 delay-${index * 200} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } hover:transform hover:scale-[1.02] transition-transform`}
            >
              {/* Project Image */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-space opacity-60"></div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-purple-300">{project.title}</h3>
                <p className="text-space-text/80 mb-4">{project.description}</p>
                
                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="bg-purple-900/40 text-purple-200 px-2 py-1 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                {/* Highlights */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-space-text/70 mb-2">Key Highlights:</h4>
                  <ul className="list-disc ml-5 text-sm space-y-1">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="text-space-text/90">{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
