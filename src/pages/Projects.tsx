
import { useEffect, useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import CustomCursor from '@/components/CustomCursor';
import { GalleryHorizontal, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
  title: string;
  description: string;
  skills: string[];
  highlight: string;
  color: string;
}

const Projects = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Projects data
  const projects: Project[] = [
    {
      title: 'Bay Area Collision Analysis',
      description: 'Visualization and prediction project to identify high-risk traffic areas.',
      skills: ['Python', 'R', 'Data Visualization'],
      highlight: 'Predicted collision chances with 85%+ accuracy using machine learning models.',
      color: 'from-purple-500/20 to-blue-500/20'
    },
    {
      title: 'Bank Churn Prediction',
      description: 'Predictive modeling to identify and reduce customer churn.',
      skills: ['Random Forest', 'Customer Analytics'],
      highlight: 'Implemented models achieving 87.05% accuracy, deployed into customer service workflows.',
      color: 'from-cyan-500/20 to-blue-500/20'
    },
    {
      title: 'Healthcare Operations Dashboard',
      description: 'Interactive analytics for clinical performance monitoring.',
      skills: ['Tableau', 'Power BI'],
      highlight: 'Developed KPI tracking system with real-time data integration for executive decision-making.',
      color: 'from-blue-400/20 to-purple-400/20'
    },
    {
      title: 'Supply Chain Optimization',
      description: 'End-to-end analysis of supply chain inefficiencies.',
      skills: ['Python', 'Process Mining', 'Optimization'],
      highlight: 'Reduced inventory costs by 17% while maintaining service levels through data-driven strategies.',
      color: 'from-green-400/20 to-cyan-400/20'
    }
  ];

  useEffect(() => {
    // Change page title and description
    document.title = "Projects | Shayan Farshid";
    
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-space">
      <AnimatedBackground />
      <CustomCursor />
      
      <div className="container mx-auto pt-16 pb-24 px-4 max-w-6xl">
        <div className="py-8 flex items-center">
          <Link 
            to="/"
            className="bg-white/5 hover:bg-white/10 rounded-full p-2 mr-4 transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          
          <div className="flex items-center">
            <GalleryHorizontal className="text-purple-400 mr-3" size={24} />
            <h1 className="text-3xl sm:text-4xl font-bold text-gradient">
              Projects
            </h1>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`glass-morphism rounded-3xl overflow-hidden transition-all duration-500 hover-scale ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`bg-gradient-to-br ${project.color} h-24 flex items-center justify-center`}>
                <h2 className="text-2xl font-bold text-white/90">{project.title}</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <p className="text-white/80">{project.description}</p>
                <p className="text-white/90 italic">"{project.highlight}"</p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="bg-purple-900/30 text-purple-300 px-2 py-1 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
