
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  GalleryHorizontal,
  MessageSquare,
  ArrowRight,
  Heart
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
      name: "Prof. A.",
      position: "Professor at IUT",
      content: "Throughout my career, Shayan has amazed me with his analytical skills. His ability to transform complex data into meaningful insights is truly exceptional."
    },
    {
      name: "Jarin T.",
      position: "Marketing Strategist",
      content: "Shayan is an exceptionally talented data professional. His sharp analytical skills, innovative thinking, and dedication have consistently impressed me."
    },
    {
      name: "Riaz M.",
      position: "Communication Specialist",
      content: "Shayan's work ethic and problem-solving skills truly stand out. He finds innovative solutions to complex data challenges."
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
  const projectItems = [
    {
      title: "Data Visualization",
      description: "Interactive dashboards that tell compelling data stories",
      color: "from-purple-500/20 to-blue-500/20",
      size: "row-span-1 col-span-1 md:col-span-1",
      link: "/projects"
    },
    {
      title: "Machine Learning",
      description: "Predictive models that drive business decisions",
      color: "from-cyan-500/20 to-blue-500/20",
      size: "row-span-1 col-span-1 md:col-span-1",
      link: "/projects"
    }
  ];
  
  // Experience data
  const experienceItems = [
    {
      company: "MedSer",
      position: "Clinical Operations Analyst",
      skills: ["Data Analysis", "Trend Analysis"],
    },
    {
      company: "Siemens",
      position: "Business Analyst",
      skills: ["Process Optimization", "EDA"],
    }
  ];

  return (
    <div ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gradient text-center">My Expertise</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Projects Card - Large */}
          <div 
            className={`glass-morphism rounded-3xl p-6 col-span-1 md:col-span-2 row-span-1 hover-scale transition-all duration-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '100ms' }}
            onClick={() => navigate('/projects')}
            onMouseEnter={() => setActiveCard('projects')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center mb-4">
                <GalleryHorizontal className="text-purple-400 mr-3" size={22} />
                <h3 className="text-xl font-semibold text-purple-300">Projects</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {projectItems.map((item, i) => (
                  <div 
                    key={item.title} 
                    className={`bg-gradient-to-br ${item.color} p-4 rounded-xl ${item.size}`}
                  >
                    <h4 className="text-lg font-medium mb-1">{item.title}</h4>
                    <p className="text-sm text-white/70">{item.description}</p>
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
          
          {/* Experience Card */}
          <div 
            className={`glass-morphism rounded-3xl p-6 transition-all duration-300 hover-scale ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '200ms' }}
            onClick={() => navigate('/experience')}
            onMouseEnter={() => setActiveCard('experience')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center mb-4">
                <Briefcase className="text-purple-400 mr-3" size={22} />
                <h3 className="text-xl font-semibold text-purple-300">Experience</h3>
              </div>
              
              <div className="space-y-4">
                {experienceItems.slice(0, 2).map((exp, i) => (
                  <div key={exp.company} className="border-b border-white/10 pb-3 last:border-0">
                    <p className="font-medium">{exp.position}</p>
                    <p className="text-sm text-white/70">{exp.company}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {exp.skills.slice(0, 2).map(skill => (
                        <span key={skill} className="bg-purple-900/30 text-purple-300 px-2 py-0.5 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={`mt-auto pt-4 flex justify-end transition-opacity duration-300 ${
                activeCard === 'experience' ? 'opacity-100' : 'opacity-0'
              }`}>
                <ArrowRight size={18} className="text-purple-400" />
              </div>
            </div>
          </div>
          
          {/* Testimonials Card */}
          <div 
            className={`glass-morphism rounded-3xl p-6 transition-all duration-300 col-span-1 md:col-span-2 hover-scale ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Heart className="text-purple-400 mr-3" size={22} />
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
              
              <div className="relative h-[180px]">
                {testimonials.map((testimonial, i) => (
                  <div 
                    key={testimonial.name} 
                    className={`absolute w-full transition-all duration-500 ${
                      i === currentTestimonialIndex 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 translate-x-8 pointer-events-none'
                    }`}
                  >
                    <p className="text-white/80 mb-4">"{testimonial.content}"</p>
                    <div>
                      <p className="font-medium text-purple-300">{testimonial.name}</p>
                      <p className="text-sm text-white/60">{testimonial.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact Card */}
          <div 
            className={`glass-morphism rounded-3xl p-6 transition-all duration-300 hover-scale ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '400ms' }}
            onClick={() => navigate('/contact')}
            onMouseEnter={() => setActiveCard('contact')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center mb-4">
                <MessageSquare className="text-purple-400 mr-3" size={22} />
                <h3 className="text-xl font-semibold text-purple-300">Connect</h3>
              </div>
              
              <p className="text-white/70 mb-4">Let's discuss how data can transform your business operations.</p>
              
              <div className={`mt-auto pt-4 flex justify-end transition-opacity duration-300 ${
                activeCard === 'contact' ? 'opacity-100' : 'opacity-0'
              }`}>
                <ArrowRight size={18} className="text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoFeatures;
