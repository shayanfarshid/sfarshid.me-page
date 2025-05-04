
import { useState } from 'react';
import { Briefcase } from 'lucide-react';

interface ExperienceItem {
  company: string;
  position: string;
  skills: string[];
  highlight: string;
}

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

const Experience = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  
  const handleMouseEnter = (index: number) => {
    setActiveItem(index);
  };
  
  const handleMouseLeave = () => {
    setActiveItem(null);
  };
  
  return (
    <section id="experience" className="section-padding relative z-10 bg-space-light/20">
      <div className="container mx-auto">
        <div className="flex items-center mb-8">
          <Briefcase className="text-purple-400 mr-3" size={24} />
          <h2 className="text-3xl font-bold text-gradient inline-block">Experience</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((exp, index) => (
            <div 
              key={`${exp.company}-${exp.position}`}
              className={`glass-morphism rounded-2xl p-6 transition-all duration-300 border border-white/5 hover:border-purple-400/30 ${
                activeItem === index ? 'transform scale-[1.02] bg-white/5' : ''
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-purple-300">{exp.position}</h3>
                <p className="text-space-text/90 text-lg">{exp.company}</p>
                
                <p className="text-space-text/70">{exp.highlight}</p>
                
                <div className="flex flex-wrap gap-2 pt-3">
                  {exp.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="bg-purple-900/20 text-purple-200 px-2 py-1 rounded-full text-xs"
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
    </section>
  );
};

export default Experience;
