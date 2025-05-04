
import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';

interface Testimonial {
  name: string;
  position: string;
  content: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Prof. Dr. Azad A.",
    position: "Professor at Islamic University of Technology",
    content: "Throughout my career, there were only a handful of students who amazed me with their analytical skills and professionalism; Shayan was one of them. His ability to transform complex data into meaningful insights is truly exceptional.",
    image: "/lovable-uploads/94624b1e-0201-4a79-885b-567d53161585.png"
  },
  {
    name: "Jarin T.",
    position: "Marketing Strategist | Digital & Social Media Marketing",
    content: "I am delighted to recommend Shayan as an exceptionally talented data professional. His sharp analytical skills, innovative thinking, and unwavering dedication to excellence have consistently impressed me throughout our collaboration.",
    image: "/lovable-uploads/d6c0d878-abf7-40c0-8cfd-2b9dfd0da24a.png"
  },
  {
    name: "Riaz M.",
    position: "Business Graduate | Strong Communication & Leadership Skills",
    content: "Shayan's strong work ethic and problem-solving skills truly stand out. He consistently goes above and beyond to meet deadlines and find innovative solutions to complex data challenges.",
    image: "/lovable-uploads/0fb1940f-cf91-499d-944c-bff6335e0a92.png"
  }
];

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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
  
  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="section-padding relative z-10 bg-space-light/30"
    >
      <div className="container mx-auto">
        <div className="flex items-center mb-12">
          <Heart className="text-purple-400 mr-3" size={24} />
          <h2 className="text-3xl font-bold text-gradient inline-block">
            Testimonials
          </h2>
        </div>
        
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="glass-morphism rounded-2xl p-6 sm:p-10 max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="flex">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 mx-1 rounded-full transition-all ${
                      index === currentIndex ? 'bg-purple-400 scale-110' : 'bg-white/30'
                    }`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="relative h-full">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className={`transition-all duration-500 absolute w-full ${
                    index === currentIndex 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-16 pointer-events-none'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500/30 mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <p className="text-xl text-center mb-6 text-space-text italic">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="text-center">
                      <h4 className="font-medium text-purple-300">{testimonial.name}</h4>
                      <p className="text-space-text/70 text-sm">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
