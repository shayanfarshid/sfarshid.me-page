
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
  skills: {
    name: string;
    class: string;
  }[];
  highlight: string;
  gradientClass: string;
  link: string;
  category: string;
}

const Projects = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Projects data with updated GitHub links
  const projects: Project[] = [
    {
      title: "Valentines Day Trends",
      description: "A comprehensive analysis of consumer behavior and spending patterns during Valentine's Day season.",
      skills: [
        { name: "Python", class: "tag-python" },
        { name: "Jupyter", class: "tag-jupyter" },
        { name: "Data Visualization", class: "tag-data-viz" }
      ],
      highlight: "Revealed key market insights by analyzing 5+ years of seasonal data with interactive visualizations.",
      gradientClass: "project-gradient-valentine",
      link: "https://github.com/shayanfarshid/Valentines-Day-Trends",
      category: "Data Visualization"
    },
    {
      title: "Bay Area Collision Analysis",
      description: "Geospatial visualization and prediction project to identify high-risk traffic areas.",
      skills: [
        { name: "Tableau", class: "tag-tableau" },
        { name: "Geospatial", class: "tag-geospatial" },
        { name: "Dashboard", class: "tag-dashboard" }
      ],
      highlight: "Predicted collision chances with 85%+ accuracy using machine learning models integrated with mapping.",
      gradientClass: "project-gradient-bay",
      link: "https://github.com/shayanfarshid/Bay-Area-Collision-Analysis",
      category: "Geospatial/Dashboard"
    },
    {
      title: "Job Market Exploration",
      description: "Data-driven exploration of job market trends, salary distributions, and skill demands.",
      skills: [
        { name: "Python", class: "tag-python" },
        { name: "Data Analysis", class: "tag-data-analysis" },
        { name: "Data Visualization", class: "tag-data-viz" }
      ],
      highlight: "Analyzed 100,000+ job postings to identify emerging trends and in-demand skills across industries.",
      gradientClass: "project-gradient-job",
      link: "https://github.com/shayanfarshid/Job-Market-Exploration",
      category: "Data Analysis/Python"
    },
    {
      title: "Bank Churn Prediction",
      description: "Machine learning model to predict and reduce customer churn in banking sector.",
      skills: [
        { name: "Random Forest", class: "tag-random-forest" },
        { name: "Python", class: "tag-python" },
        { name: "ML", class: "tag-ml" }
      ],
      highlight: "Implemented models achieving 87.05% accuracy, deployed into customer service workflows.",
      gradientClass: "project-gradient-bank",
      link: "https://github.com/shayanfarshid/bank-churn",
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
              className={`glass-morphism rounded-[16px] overflow-hidden transition-all duration-500 project-card-hover ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`${project.gradientClass} p-6 relative`}>
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
                      key={skill.name} 
                      className={`${skill.class} px-2 py-1 rounded-full text-xs`}
                    >
                      {skill.name}
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
