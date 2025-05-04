
import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';

interface Testimonial {
  name: string;
  position: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Prof. Dr. Azad A.",
    position: "Professor at Islamic University of Technology",
    content: "Throughout my career, Shayan has amazed me with his analytical skills. His ability to transform complex data into meaningful insights is truly exceptional."
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
  }
];

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div 
      ref={sectionRef}
      className="py-12"
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className={`glass-morphism rounded-3xl p-8 sm:p-10 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
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
          
          <div className="relative h-[200px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`transition-all duration-700 absolute w-full ${
                  index === currentIndex 
                    ? 'opacity-100 translate-x-0 z-10' 
                    : index < currentIndex
                      ? 'opacity-0 -translate-x-16 z-0 pointer-events-none'
                      : 'opacity-0 translate-x-16 z-0 pointer-events-none'
                }`}
              >
                <div className="flex flex-col items-center">
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
  );
};

export default Testimonials;
