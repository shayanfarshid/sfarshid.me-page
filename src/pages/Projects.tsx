
import { useEffect, useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import CustomCursor from '@/components/CustomCursor';
import { GalleryHorizontal, ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import MinimalNavbar from '@/components/MinimalNavbar';
import Footer from '@/components/Footer';

interface Project {
  title: string;
  description: string;
  skills: string[];
  highlight: string;
  color: string;
  link: string;
  category: string;
}

const Projects = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Projects data with updated details
  const projects: Project[] = [
    {
      title: "Valentines Day Trends",
      description: "A comprehensive analysis of consumer behavior and spending patterns during Valentine's Day season.",
      skills: ["Python", "Jupyter", "Data Visualization"],
      highlight: "Revealed key market insights by analyzing 5+ years of seasonal data with interactive visualizations.",
      color: "from-purple-500/20 to-blue-500/20",
      link: "https://github.com/shayanfarshid",
      category: "Data Visualization"
    },
    {
      title: "Bay Area Collision Analysis",
      description: "Geospatial visualization and prediction project to identify high-risk traffic areas.",
      skills: ["Tableau", "Geospatial", "Dashboard"],
      highlight: "Predicted collision chances with 85%+ accuracy using machine learning models integrated with mapping.",
      color: "from-cyan-500/20 to-blue-500/20",
      link: "https://github.com/shayanfarshid",
      category: "Geospatial/Dashboard"
    },
    {
      title: "Job Market Exploration",
      description: "Data-driven exploration of job market trends, salary distributions, and skill demands.",
      skills: ["Python", "Data Analysis", "Visualization"],
      highlight: "Analyzed 100,000+ job postings to identify emerging trends and in-demand skills across industries.",
      color: "from-blue-400/20 to-purple-400/20",
      link: "https://github.com/shayanfarshid",
      category: "Data Analysis/Python"
    },
    {
      title: "Bank Churn Prediction",
      description: "Machine learning model to predict and reduce customer churn in banking sector.",
      skills: ["Random Forest", "Python", "ML"],
      highlight: "Implemented models achieving 87.05% accuracy, deployed into customer service workflows.",
      color: "from-green-400/20 to-cyan-400/20",
      link: "https://github.com/shayanfarshid",
      category: "Machine Learning/Python"
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
              <div className={`bg-gradient-to-br ${project.color} p-6 relative`}>
                <span className="absolute top-3 right-3 text-xs bg-white/10 px-2 py-1 rounded-full">
                  {project.category}
                </span>
                <h2 className="text-2xl font-bold text-white/90 mt-2">{project.title}</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <p className="text-white/80">{project.description}</p>
                <p className="text-white/90 italic">"{project.highlight}"</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="bg-purple-900/30 text-purple-300 px-2 py-1 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center text-purple-300 hover:text-purple-200 text-sm transition-colors"
                >
                  <Github size={16} className="mr-2" />
                  View project
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <MinimalNavbar />
      <Footer />
    </div>
  );
};

export default Projects;
