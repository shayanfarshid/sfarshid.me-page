
import { useEffect, useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import CustomCursor from '@/components/CustomCursor';
import { Briefcase, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import MinimalNavbar from '@/components/MinimalNavbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';

interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  description: string;
  skills: {
    name: string;
    class: string;
  }[];
  isCurrent?: boolean;
}

const Experience = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Experience data based on the screenshot
  const experiences: ExperienceItem[] = [
    {
      company: 'AIR Silicon Valley',
      position: 'Expediting Analyst',
      duration: 'Sep 2025 - Present',
      description: 'Working as an Expediting Analyst to secure critical OEM and custom automation components for F-500 rollouts and prototypes for venture-scale disruptors.',
      skills: [
        { name: 'Supply Chain', class: 'tag-data-analysis' },
        { name: 'Procurement', class: 'tag-dashboard' },
        { name: 'Vendor Management', class: 'tag-data-viz' },
        { name: 'Component Sourcing', class: 'tag-tableau' },
        { name: 'Project Coordination', class: 'tag-ml' }
      ],
      isCurrent: true
    },
    {
      company: 'SDSU Research Foundation',
      position: 'Graduate Research Fellow',
      duration: 'Apr 2025 - Aug 2025',
      description: 'Worked on the P2PH-Empower project, targeting and promoting interest among URM communities to inspire their enrollment in Public Health programs.',
      skills: [
        { name: 'Research', class: 'tag-data-analysis' },
        { name: 'Data Analysis', class: 'tag-data-analysis' },
        { name: 'Community Engagement', class: 'tag-data-viz' },
        { name: 'URM Programs', class: 'tag-tableau' },
        { name: 'Public Health', class: 'tag-ml' }
      ],
      isCurrent: false
    },
    {
      company: 'MedSer',
      position: 'Clinical Operations Analyst',
      duration: 'Sep 2024 - Mar 2025',
      description: 'Drove strategic enhancements within clinical operations by establishing robust analytical frameworks and leveraging market intelligence for precise high-value clinic identification. Implemented a comprehensive lead-tracking system that achieved substantial growth in qualified lead generation, resulting in a 15% expansion of the customer base and optimized conversion funnels.',
      skills: [
        { name: 'Data Analysis', class: 'tag-data-analysis' },
        { name: 'Trend Analysis', class: 'tag-data-viz' },
        { name: 'Healthcare Analytics', class: 'tag-tableau' },
        { name: 'Lead Generation', class: 'tag-dashboard' },
        { name: 'Market Intelligence', class: 'tag-ml' }
      ]
    },
    {
      company: 'ExPrep',
      position: 'Project Manager',
      duration: 'Sep 2023 - Jun 2024',
      description: 'Led improvements in system efficiency by refining SQL queries on Microsoft Azure, which boosted operational performance and reduced query times. Supported user growth by onboarding instructors and launching the Professor Satisfaction Score (PSS). Built dashboards in Power BI to give clear visibility into student performance.',
      skills: [
        { name: 'SQL', class: 'tag-data-analysis' },
        { name: 'Azure', class: 'tag-ml' },
        { name: 'Salesforce', class: 'tag-dashboard' },
        { name: 'Power BI', class: 'tag-dashboard' },
        { name: 'Agile Methodologies', class: 'tag-data-analysis' }
      ]
    },
    {
      company: 'Siemens Healthineers',
      position: 'Business Analyst',
      duration: 'Jan 2022 - Mar 2023',
      description: 'Coordinated import/export workflows to maintain a 95% error-free rate and cut customs delays. Used data analysis to highlight trends that improved decision-making accuracy, and enhanced the support ticket system with new technology solutions, leading to higher client satisfaction.',
      skills: [
        { name: 'Process Optimization', class: 'tag-data-analysis' },
        { name: 'EDA', class: 'tag-data-viz' },
        { name: 'Business Intelligence', class: 'tag-dashboard' },
        { name: 'Data Analysis', class: 'tag-data-analysis' },
        { name: 'Workflow Analysis', class: 'tag-geospatial' }
      ]
    }
  ];

  // Education data
  const education = {
    degree: "Master's in Business Analytics",
    institution: "University of California, Davis",
    date: "2024",
    courses: ["Data Management", "Data Visualization", "Machine Learning", "Big Data", "Operations"]
  };

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
              className={`glass-morphism rounded-[16px] p-8 transition-all project-card-hover duration-500 ${
                exp.isCurrent ? 'border border-purple-500/30' : 'border border-white/5'
              } ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="md:flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className={`text-2xl font-bold ${exp.isCurrent ? 'text-purple-300' : 'text-purple-300'} mb-2`}>
                      {exp.position}
                    </h2>
                    {exp.isCurrent && (
                      <Badge className="bg-green-700/30 text-green-300 border-green-500/30 text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl text-white/80 mb-4">{exp.company}</h3>
                </div>
                <div className="text-right text-white/60 text-sm md:mt-0 mt-2">
                  {exp.duration}
                </div>
              </div>
              
              <p className="text-white/70 mb-4">{exp.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {exp.skills.map((skill) => (
                  <span 
                    key={skill.name} 
                    className={`${skill.class} px-3 py-1.5 rounded-full text-sm font-medium shadow-sm`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
          
          {/* Education Section */}
          <div
            className={`glass-morphism rounded-[16px] p-8 project-card-hover transition-all duration-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${experiences.length * 100}ms` }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gradient-purple mb-8">Education</h2>
              
              <div className="mb-4">
                <h3 className="text-xl font-bold text-purple-300 mb-1">{education.degree}</h3>
                <div className="flex justify-between items-start">
                  <h4 className="text-lg text-white/80">{education.institution}</h4>
                  <span className="text-white/60 text-sm">{education.date}</span>
                </div>
                
                <div className="mt-4">
                  <p className="text-white/70 mb-2">Coursework:</p>
                  <div className="flex flex-wrap gap-2">
                    {education.courses.map(course => (
                      <span key={course} className="tag-tableau px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Certifications Section */}
            <div>
              <h2 className="text-2xl font-bold text-gradient-purple mb-6">Certifications</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="glass-morphism bg-opacity-30 p-5 rounded-xl project-card-hover">
                  <a 
                    href="https://leansixsigma.ucdavis.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium text-purple-300 mb-1 hover:text-purple-200 transition-colors"
                  >
                    Lean Six Sigma Green Belt
                  </a>
                  <p className="text-sm text-white/70">University of California, Davis</p>
                  <p className="text-xs text-white/50 mt-2">2024</p>
                </div>
                
                <div className="glass-morphism bg-opacity-30 p-5 rounded-xl project-card-hover">
                  <a 
                    href="https://certifiedanalytics.org/acap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium text-purple-300 mb-1 hover:text-purple-200 transition-colors"
                  >
                    Associate Certified Analytics Professional
                  </a>
                  <p className="text-sm text-white/70">INFORMS</p>
                  <p className="text-xs text-white/50 mt-2">2024</p>
                </div>
                
                <div className="glass-morphism bg-opacity-30 p-5 rounded-xl project-card-hover">
                  <a 
                    href="https://www.iscea.org/csca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium text-purple-300 mb-1 hover:text-purple-200 transition-colors"
                  >
                    Certified Supply Chain Analyst
                  </a>
                  <p className="text-sm text-white/70">ISCEA</p>
                  <p className="text-xs text-white/50 mt-2">2021</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <MinimalNavbar />
      <Footer />
    </div>
  );
};

export default Experience;
