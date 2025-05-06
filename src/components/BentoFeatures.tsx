
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  ArrowRight,
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

  // Testimonials data for carousel
  const testimonials = [
    {
      name: "Prof. Azad",
      position: "Professor at Islamic University of Technology",
      content: "Throughout my career, there were only a handful of students who amazed me with their skills and professionalism; Shayan Farshid was one of them. I am pleased to recommend him, who is an excellent student and a great person."
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

  // Projects data
  const projects = [
    {
      title: "Valentines Day Trends",
      description: "Data visualization project analyzing consumer behavior during Valentine's season",
      skills: ["Python", "Jupyter", "Data Visualization"],
      color: "from-purple-500/20 to-blue-500/20",
      link: "https://github.com/shayanfarshid"
    },
    {
      title: "Bay Area Collision Analysis",
      description: "Geospatial analysis of traffic collision patterns in the Bay Area",
      skills: ["Tableau", "Geospatial", "Dashboard"],
      color: "from-cyan-500/20 to-blue-500/20",
      link: "https://github.com/shayanfarshid"
    },
    {
      title: "Job Market Exploration",
      description: "Comprehensive analysis of job market trends and opportunities",
      skills: ["Python", "Data Analysis", "Visualization"],
      color: "from-blue-400/20 to-purple-400/20",
      link: "https://github.com/shayanfarshid"
    },
    {
      title: "Bank Churn Prediction",
      description: "Machine learning model to predict and reduce customer churn",
      skills: ["Python", "ML", "Random Forest"],
      color: "from-green-400/20 to-cyan-400/20",
      link: "https://github.com/shayanfarshid"
    }
  ];

  // Certifications data
  const certifications = [
    {
      title: "Lean Six Sigma Green Belt",
      organization: "University of California, Davis",
      date: "Dec 2024"
    },
    {
      title: "Associate Certified Analytics Professional",
      organization: "INFORMS",
      date: "Jun 2024"
    },
    {
      title: "Certified Supply Chain Analyst",
      organization: "ISCEA",
      date: "Dec 2021"
    }
  ];

  return (
    <div ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Projects Card - Large */}
          <div 
            className={`glass-morphism rounded-2xl p-6 col-span-1 md:col-span-2 row-span-1 hover-scale transition-all duration-300 ${
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
                    className={`bg-gradient-to-br ${project.color} p-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/10 group`}
                  >
                    <h4 className="text-lg font-medium mb-1 group-hover:text-purple-300 transition-colors">{project.title}</h4>
                    <p className="text-sm text-white/70 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.skills.map(skill => (
                        <span key={skill} className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-white/80">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={`mt-auto pt-4 flex justify-end transition-opacity duration-300 ${
                activeCard === 'projects' ? 'opacity-100' : 'opacity-0'
              }`}>
                <ArrowRight size={18} className="text-purple-400" />
              </div>
            </div>
          </div>
          
          {/* Testimonials Card */}
          <div 
            className={`glass-morphism rounded-2xl p-6 transition-all duration-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '200ms' }}
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
            className={`glass-morphism rounded-2xl p-6 transition-all duration-300 hover-scale col-span-1 md:col-span-2 ${
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
                <div className="glass-morphism bg-opacity-50 p-4 rounded-xl">
                  <h4 className="font-medium">Graduate Research Fellow</h4>
                  <p className="text-sm text-white/70 mb-2">SDSU Research Foundation</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="bg-purple-900/30 text-purple-300 px-2 py-0.5 text-xs rounded-full">
                      Research
                    </span>
                    <span className="bg-purple-900/30 text-purple-300 px-2 py-0.5 text-xs rounded-full">
                      Data Analysis
                    </span>
                  </div>
                </div>
                
                <div className="glass-morphism bg-opacity-50 p-4 rounded-xl">
                  <h4 className="font-medium">Clinical Operations Analyst</h4>
                  <p className="text-sm text-white/70 mb-2">MedSer</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="bg-purple-900/30 text-purple-300 px-2 py-0.5 text-xs rounded-full">
                      Healthcare Analytics
                    </span>
                  </div>
                </div>
              </div>
              
              <div className={`mt-auto pt-4 flex justify-end transition-opacity duration-300 ${
                activeCard === 'experience' ? 'opacity-100' : 'opacity-0'
              }`}>
                <ArrowRight size={18} className="text-purple-400" />
              </div>
            </div>
          </div>
          
          {/* Certifications */}
          <div 
            className={`glass-morphism rounded-2xl p-6 transition-all duration-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '400ms' }}
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
                  <div key={cert.title} className="border-b border-white/10 pb-3 last:border-0">
                    <p className="font-medium text-sm">{cert.title}</p>
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
