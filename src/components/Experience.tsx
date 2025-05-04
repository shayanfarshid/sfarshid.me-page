
import { useEffect, useRef, useState } from 'react';
import { Briefcase } from 'lucide-react';

interface ExperienceItem {
  company: string;
  position: string;
  date: string;
  location: string;
  description: string[];
  skills: string[];
  logo: string;
}

const experiences: ExperienceItem[] = [
  {
    company: 'MedSer',
    position: 'Clinical Operations Analyst',
    date: 'Sep 2024 - Mar 2025',
    location: 'Remote',
    description: [
      'Drove strategic enhancements within clinical operations for the healthcare startup by establishing robust analytical frameworks.',
      'Performed comprehensive market research, identifying and targeting high-value clinics and healthcare facilities in the San Francisco Bay Area, expanding the customer base by 15%.',
      'Developed and utilized a targeted lead-tracking system for tracking follow-up processes and increasing conversions.'
    ],
    skills: ['Data Analysis', 'Trend Analysis', 'Market Research'],
    logo: '/lovable-uploads/23899ee9-585b-44ed-942c-db3347b45c45.png'
  },
  {
    company: 'ExPrep | Excel Preparation',
    position: 'Business Analyst, Practicum Project',
    date: 'Jan 2024 - Jun 2024',
    location: 'Remote',
    description: [
      'Optimized SQL query times by 20% by refining the query structures.',
      'Implemented a suite of Salesforce templates and Microsoft Power BI dashboards to visualize student performance metrics and deliver actionable insights to instructors.',
      'Achieved 10% user base growth by onboarding instructors and introducing PSS (Professor Satisfaction Score).'
    ],
    skills: ['Agile Methodologies', 'SQL', 'Power BI'],
    logo: '/lovable-uploads/2229c3dc-4521-4fbc-b196-f2d938d448d8.png'
  },
  {
    company: 'Siemens Healthineers',
    position: 'Business Analyst',
    date: 'Jan 2023 - Apr 2023',
    location: 'On-site',
    description: [
      'Coordinated import and export operations to maintain an industry-standard 95% error-free service rate and achieve a 20% reduction in customs clearance time.',
      'Conducted Exploratory Data Analysis of the company database and extracted key insights to enhance decision-making accuracy by 15%.',
      'Initiated a refined support ticket system by leveraging technology management skills, measured by high growth in client satisfaction ratings.'
    ],
    skills: ['Data Analysis', 'Process Optimization', 'Support Systems'],
    logo: '/lovable-uploads/f9d67e85-0497-449b-9d82-d3039fe55606.png'
  }
];

const Experience = () => {
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
      id="experience" 
      ref={sectionRef}
      className="section-padding relative z-10 bg-space-light/30"
    >
      <div className="container mx-auto">
        <div className="flex items-center mb-12">
          <Briefcase className="text-purple-400 mr-3" size={24} />
          <h2 className="text-3xl font-bold text-gradient inline-block">
            Professional Experience
          </h2>
        </div>
        
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div 
              key={`${exp.company}-${exp.position}`}
              className={`glass-morphism rounded-lg p-6 sm:p-8 transition-all duration-1000 delay-${index * 200} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-lg flex items-center justify-center p-2">
                    <img 
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-purple-300">{exp.position}</h3>
                      <div className="flex items-center text-lg text-space-text">
                        <span>{exp.company}</span>
                        <span className="mx-2 text-space-text/40">•</span>
                        <span className="text-space-text/70">{exp.location}</span>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0 text-space-text/60 font-mono text-sm">
                      {exp.date}
                    </div>
                  </div>
                  
                  <ul className="list-disc ml-6 mb-4 space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-space-text/90">
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="bg-purple-900/40 text-purple-200 px-3 py-1 rounded-full text-xs"
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
    </section>
  );
};

export default Experience;
