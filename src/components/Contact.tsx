
import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="section-padding relative z-10"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-gradient inline-block">
          Get In Touch
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-2xl font-bold mb-6 text-purple-300">Let's Connect</h3>
            <p className="text-space-text/80 mb-8 max-w-lg">
              I'm always interested in new opportunities, collaborations, and connections. Feel free to reach out if you have any questions or just want to say hello!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="glass-morphism p-3 rounded-full mr-4">
                  <Mail size={20} className="text-purple-300" />
                </div>
                <div>
                  <h4 className="font-medium text-space-text">Email</h4>
                  <a 
                    href="mailto:shayanfarshid48@gmail.com" 
                    className="text-purple-300 hover:underline"
                  >
                    shayanfarshid48@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="glass-morphism p-3 rounded-full mr-4">
                  <Phone size={20} className="text-purple-300" />
                </div>
                <div>
                  <h4 className="font-medium text-space-text">Phone</h4>
                  <a 
                    href="tel:+14153123491" 
                    className="text-purple-300 hover:underline"
                  >
                    (415) 312-3491
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="glass-morphism p-3 rounded-full mr-4">
                  <MapPin size={20} className="text-purple-300" />
                </div>
                <div>
                  <h4 className="font-medium text-space-text">Location</h4>
                  <p className="text-space-text/80">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="glass-morphism p-6 sm:p-8 rounded-xl">
              <h3 className="text-xl font-medium mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-space-text mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-space-text focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-space-text mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-space-text focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-space-text mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-space-text resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center bg-purple-800/70 hover:bg-purple-700/70 text-white py-3 px-6 rounded-lg transition-colors ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2" />
                    ) : (
                      <Send size={18} className="mr-2" />
                    )}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
