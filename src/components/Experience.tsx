
import { useState } from 'react';
import { Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ExperienceItem {
  company: string;
  position: string;
  skills: {
    name: string;
    class: string;
  }[];
  highlight: string;
  isCurrent?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    company: 'AIR Silicon Valley',
    position: 'Expediting Analyst',
    skills: [
      { name: 'Supply Chain', class: 'tag-data-analysis' },
      { name: 'Procurement', class: 'tag-dashboard' },
      { name: 'Vendor Management', class: 'tag-data-viz' },
      { name: 'Component Sourcing', class: 'tag-tableau' },
      { name: 'Project Coordination', class: 'tag-ml' }
    ],
    highlight: 'Working as an Expediting Analyst to secure critical OEM and custom automation components for F-500 rollouts and prototypes for venture-scale disruptors.',
    isCurrent: true
  },
  {
    company: 'SDSU Research Foundation',
    position: 'Graduate Research Fellow',
    skills: [
      { name: 'Research', class: 'tag-data-analysis' },
      { name: 'Data Analysis', class: 'tag-data-analysis' },
      { name: 'Community Engagement', class: 'tag-data-viz' },
      { name: 'URM Programs', class: 'tag-tableau' },
      { name: 'Public Health', class: 'tag-ml' }
    ],
    highlight: 'Worked on P2PH-Empower project to promote interest among URM communities in Public Health programs.',
    isCurrent: false
  },
  {
    company: 'MedSer',
    position: 'Clinical Operations Analyst',
    skills: [
      { name: 'Data Analysis', class: 'tag-data-analysis' },
      { name: 'Trend Analysis', class: 'tag-data-viz' },
      { name: 'Market Research', class: 'tag-data-analysis' },
      { name: 'Healthcare Analytics', class: 'tag-tableau' },
      { name: 'Lead Generation', class: 'tag-dashboard' }
    ],
    highlight: 'Drove strategic enhancements with robust analytical frameworks, expanding customer base by 15%.',
    isCurrent: false
  },
  {
    company: 'ExPrep',
    position: 'Project Manager',
    skills: [
      { name: 'Agile Methodologies', class: 'tag-data-analysis' },
      { name: 'SQL', class: 'tag-data-analysis' },
      { name: 'Power BI', class: 'tag-dashboard' },
      { name: 'Azure', class: 'tag-ml' },
      { name: 'Salesforce', class: 'tag-data-viz' }
    ],
    highlight: 'Optimized SQL query times by 20% and implemented performance visualization dashboards.',
    isCurrent: false
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, index) => (
            <div 
              key={`${exp.company}-${exp.position}`}
              className={`glass-morphism rounded-[16px] p-6 project-card-hover transition-all duration-300 border ${
                exp.isCurrent ? 'border-purple-500/50' : 'border-white/5'
              } ${
                activeItem === index ? 'transform scale-[1.02] bg-white/5' : ''
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className={`text-xl font-medium ${exp.isCurrent ? 'text-purple-300 font-semibold' : 'text-purple-300'}`}>
                    {exp.position}
                    {exp.isCurrent && (
                      <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    )}
                  </h3>
                  {exp.isCurrent && (
                    <Badge variant="outline" className="bg-purple-900/30 text-purple-300 border-purple-500/30 text-xs">
                      Current
                    </Badge>
                  )}
                </div>
                
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
