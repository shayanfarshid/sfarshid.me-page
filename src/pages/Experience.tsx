
import { useEffect, useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import CustomCursor from '@/components/CustomCursor';
import { Briefcase, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ExperienceItem {
  company: string;
  position: string;
  skills: string[];
  highlight: string;
}

const Experience = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Experience data
  const experiences: ExperienceItem[] = [
    {
      company: 'MedSer',
      position: 'Clinical Operations Analyst',
      skills: ['Data Analysis', 'Trend Analysis', 'Market Research'],
      highlight: 'Drove strategic enhancements with robust analytical frameworks, expanding customer base by 15%.'
    },
    {
      company: 'ExPrep',
      position: 'Business Analyst',
      skills: ['Agile Methodologies', 'SQL', 'Power BI'],
      highlight: 'Optimized SQL query times by 20% and implemented performance visualization dashboards.'
    },
    {
      company: 'Siemens Healthineers',
      position: 'Business Analyst',
      skills: ['Process Optimization', 'EDA', 'Support Systems'],
      highlight: 'Maintained 95% error-free service rate and reduced customs clearance time by 20%.'
    }
  ];

  useEffect(() => {
    // Change page title and description
    document.title = "Experience | Shayan Farshid";
    
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
            <Briefcase className="text-purple-400 mr-3" size={24} />
            <h1 className="text-3xl sm:text-4xl font-bold text-gradient">
              Experience
            </h1>
          </div>
        </div>
        
        <div className="space-y-8 mt-8">
          {experiences.map((exp, index) => (
            <div
              key={exp.company}
              className={`glass-morphism rounded-3xl p-8 transition-all duration-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="md:flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-purple-300 mb-2">{exp.position}</h2>
                  <h3 className="text-xl text-white/80 mb-4">{exp.company}</h3>
                  <p className="text-white/70 mb-4">{exp.highlight}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {exp.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="bg-purple-900/30 text-purple-300 px-3 py-1.5 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
