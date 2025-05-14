
import { useState } from 'react';
import { Briefcase } from 'lucide-react';

interface ExperienceItem {
  company: string;
  position: string;
  skills: {
    name: string;
    class: string;
  }[];
  highlight: string;
}

const experiences: ExperienceItem[] = [
  {
    company: 'MedSer',
    position: 'Clinical Operations Analyst',
    skills: [
      { name: 'Data Analysis', class: 'tag-data-analysis' },
      { name: 'Trend Analysis', class: 'tag-data-viz' },
      { name: 'Market Research', class: 'tag-data-analysis' }
    ],
    highlight: 'Drove strategic enhancements with robust analytical frameworks, expanding customer base by 15%.'
  },
  {
    company: 'ExPrep',
    position: 'Project Manager',
    skills: [
      { name: 'Agile Methodologies', class: 'tag-data-analysis' },
      { name: 'SQL', class: 'tag-data-analysis' },
      { name: 'Power BI', class: 'tag-dashboard' }
    ],
    highlight: 'Optimized SQL query times by 20% and implemented performance visualization dashboards.'
  },
  {
    company: 'Siemens Healthineers',
    position: 'Business Analyst',
    skills: [
      { name: 'Process Optimization', class: 'tag-data-analysis' },
      { name: 'EDA', class: 'tag-data-viz' },
      { name: 'Support Systems', class: 'tag-dashboard' }
    ],
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
              className={`glass-morphism rounded-[16px] p-6 project-card-hover transition-all duration-300 border border-white/5 ${
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
                      key={skill.name} 
                      className={`${skill.class} px-3 py-1.5 rounded-full text-xs font-medium shadow-sm`}
                    >
                      {skill.name}
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
