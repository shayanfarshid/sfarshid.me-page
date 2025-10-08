
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Heart,
  Github
} from 'lucide-react';

const BentoFeatures = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  // Testimonials data for carousel, now properly sorted
  const testimonials = [
    {
      name: "Prof. Azad",
      position: "Professor at Islamic University of Technology",
      content: "Throughout my career, there were only a handful of students who amazed me with their skills and professionalism; Shayan Farshid was one of them. I am pleased to recommend him, who is an excellent student and a great person."
    },
    {
      name: "Jarin T.",
      position: "Marketing Strategist",
      content: "Shayan is an exceptionally talented data professional. His sharp analytical skills, innovative thinking, and unwavering dedication to excellence have consistently impressed me."
    },
    {
      name: "Riaz M.",
      position: "Communication Specialist",
      content: "Shayan's strong work ethic and problem-solving skills truly stand out. He consistently goes above and beyond to find innovative solutions to complex data challenges."
    },
    {
      name: "Md. Abtab Karim",
      position: "Marketing Strategist",
      content: "Shayan is a passionate and dedicated person who has a keen interest in tech products and business case competitions. He always impressed me with his creativity and analytical skills, as well as his ability to work well in a team."
    },
    {
      name: "Liso Nyandu",
      position: "Data Engineer",
      content: "I worked alongside Shayan during the one-week CFTE Global Internship Experience. He is a very reliable team player and on top of that, he has very good research skills and knowledge about financial technology."
    }
  ];
  
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  
  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Projects data with updated gradient classes
  const projects = [
    {
      title: "Valentines Day Trends",
      description: "Data visualization project analyzing consumer behavior during Valentine's season",
      skills: [
        { name: "Python", class: "tag-python" }, 
        { name: "Jupyter", class: "tag-jupyter" }, 
        { name: "Data Visualization", class: "tag-data-viz" }
      ],
      gradientClass: "project-gradient-valentine",
      link: "https://github.com/shayanfarshid"
    },
    {
      title: "Bay Area Collision Analysis",
      description: "Geospatial analysis of traffic collision patterns in the Bay Area",
      skills: [
        { name: "Tableau", class: "tag-tableau" }, 
        { name: "Geospatial", class: "tag-geospatial" }, 
        { name: "Dashboard", class: "tag-dashboard" }
      ],
      gradientClass: "project-gradient-bay",
      link: "https://github.com/shayanfarshid"
    },
    {
      title: "Job Market Exploration",
      description: "Comprehensive analysis of job market trends and opportunities",
      skills: [
        { name: "Python", class: "tag-python" }, 
        { name: "Data Analysis", class: "tag-data-analysis" }, 
        { name: "Data Visualization", class: "tag-data-viz" }
      ],
      gradientClass: "project-gradient-job",
      link: "https://github.com/shayanfarshid"
    },
    {
      title: "Bank Churn Prediction",
      description: "Machine learning model to predict and reduce customer churn",
      skills: [
        { name: "Python", class: "tag-python" }, 
        { name: "ML", class: "tag-ml" }, 
        { name: "Random Forest", class: "tag-random-forest" }
      ],
      gradientClass: "project-gradient-bank",
      link: "https://github.com/shayanfarshid"
    }
  ];

  // Updated experience data with 4 entries
  const experiences = [
    {
      position: "Expediting Analyst",
      company: "AIR Silicon Valley",
      skills: ["Supply Chain", "Procurement"]
    },
    {
      position: "Graduate Research Fellow",
      company: "SDSU Research Foundation",
      skills: ["Research", "Data Analysis"]
    },
    {
      position: "Clinical Operations Analyst",
      company: "MedSer",
      skills: ["Healthcare Analytics"]
    },
    {
      position: "Project Manager",
      company: "ExPrep",
      skills: ["SQL", "Azure"]
    }
  ];

  // Certifications data with links
  const certifications = [
    {
      title: "Lean Six Sigma Green Belt",
      organization: "University of California, Davis",
      date: "2024",
      link: "https://leansixsigma.ucdavis.edu/"
    },
    {
      title: "Associate Certified Analytics Professional",
      organization: "INFORMS",
      date: "2024",
      link: "https://certifiedanalytics.org/acap"
    },
    {
      title: "Certified Supply Chain Analyst",
      organization: "ISCEA",
      date: "2021",
      link: "https://www.iscea.org/csca"
    }
  ];

  return (
    <div ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Projects Card - Large */}
          <div 
            className={`glass-morphism rounded-[16px] p-6 col-span-1 md:col-span-2 row-span-1 hover-scale project-card-hover transition-all duration-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '100ms' }}
            onClick={() => navigate('/projects')}
            onMouseEnter={() => setActiveCard('projects')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center mb-4">
                <Github className="text-purple-400 mr-3" size={20} />
                <h3 className="text-xl font-semibold text-purple-300">Projects</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {projects.map((project, i) => (
                  <div 
                    key={project.title} 
                    className={`${project.gradientClass} p-4 rounded-[16px] transition-all duration-300 hover:shadow-[0_0_10px_rgba(102,51,153,0.1)] group`}
                  >
                    <h4 className="text-lg font-medium mb-1 group-hover:text-purple-300 transition-colors">{project.title}</h4>
                    <p className="text-sm text-white/70 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.skills.map(skill => (
                        <span key={skill.name} className={`text-xs ${skill.class} px-2 py-1 rounded-full`}>
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Testimonials Card with hover effect */}
          <div 
            className={`glass-morphism rounded-[16px] p-6 transition-all duration-300 hover-scale project-card-hover ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '200ms' }}
            onMouseEnter={() => setActiveCard('testimonials')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Heart className="text-purple-400 mr-3" size={20} />
                  <h3 className="text-xl font-semibold text-purple-300">Testimonials</h3>
                </div>
                <div className="flex space-x-1">
                  {testimonials.map((_, i) => (
                    <button 
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentTestimonialIndex ? 'bg-purple-400 w-4' : 'bg-white/30'
                      }`}
                      onClick={() => setCurrentTestimonialIndex(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="relative h-[220px]">
                {testimonials.map((testimonial, i) => (
                  <div 
                    key={testimonial.name} 
                    className={`absolute w-full transition-all duration-500 ${
                      i === currentTestimonialIndex 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 translate-x-8 pointer-events-none'
                    }`}
                  >
                    <p className="text-white/80 text-sm mb-4">"{testimonial.content}"</p>
                    <div>
                      <p className="font-medium text-purple-300">{testimonial.name}</p>
                      <p className="text-xs text-white/60">{testimonial.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Second row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Experience preview card */}
          <div 
            className={`glass-morphism rounded-[16px] p-6 transition-all duration-300 hover-scale project-card-hover col-span-1 md:col-span-2 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '300ms' }}
            onClick={() => navigate('/experience')}
            onMouseEnter={() => setActiveCard('experience')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center mb-4">
                <Briefcase className="text-purple-400 mr-3" size={20} />
                <h3 className="text-xl font-semibold text-purple-300">Experience</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {experiences.map((exp, index) => (
                  <div key={`${exp.position}-${exp.company}`} className="glass-morphism bg-opacity-50 p-4 rounded-[16px]">
                    <h4 className="font-medium">{exp.position}</h4>
                    <p className="text-sm text-white/70 mb-2">{exp.company}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {exp.skills.map(skill => (
                        <span key={skill} className={`tag-${skill.toLowerCase().replace(/\s+/g, '-')} px-2 py-0.5 text-xs rounded-full`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Certifications with hover effect */}
          <div 
            className={`glass-morphism rounded-[16px] p-6 transition-all duration-300 hover-scale project-card-hover ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '400ms' }}
            onMouseEnter={() => setActiveCard('certifications')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center mb-4">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                </svg>
                <h3 className="text-xl font-semibold text-purple-300">Certifications</h3>
              </div>
              
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.title} className="border-b border-white/10 pb-3 last:border-0 transition-all duration-300 hover:bg-white/5 hover:border-purple-400/30 rounded-md p-2 -mx-2">
                    <a 
                      href={cert.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-medium text-sm hover:text-purple-300 transition-colors"
                    >
                      {cert.title}
                    </a>
                    <p className="text-xs text-white/70">{cert.organization}</p>
                    <p className="text-xs text-white/60 mt-1">{cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoFeatures;
