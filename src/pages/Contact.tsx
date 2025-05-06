
import { useEffect, useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import CustomCursor from '@/components/CustomCursor';
import { MessageSquare, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import MinimalNavbar from '@/components/MinimalNavbar';
import Footer from '@/components/Footer';

const Contact = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  useEffect(() => {
    // Change page title
    document.title = "Contact | Shayan Farshid";
    
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast.success("Thank you! I'll be in touch soon.", {
      description: "Your message has been received.",
      position: "bottom-center"
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };
  
  return (
    <div className="min-h-screen bg-space">
      <AnimatedBackground />
      <CustomCursor />
      
      <div className="container mx-auto pt-16 pb-24 px-4 max-w-3xl">
        <div className="py-8 flex items-center">
          <Link 
            to="/"
            className="bg-white/5 hover:bg-white/10 rounded-full p-2 mr-4 transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          
          <div className="flex items-center">
            <MessageSquare className="text-purple-400 mr-3" size={24} />
            <h1 className="text-3xl sm:text-4xl font-bold text-gradient">
              Let's Connect
            </h1>
          </div>
        </div>
        
        <div 
          className={`glass-morphism rounded-3xl p-8 md:p-10 mt-8 transition-all duration-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-8">
            <h2 className="text-xl font-medium text-purple-300 mb-2">
              Have a project in mind or just want to chat?
            </h2>
            <p className="text-white/70">
              I'm always open to discussing data projects, creative collaborations, or new opportunities.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
                placeholder="Tell me about your project or inquiry..."
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="group relative bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-300 flex items-center overflow-hidden"
              >
                <span className="relative z-10">Send Message</span>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={16} />
                </span>
              </button>
            </div>
          </form>
        </div>
        
        <div 
          className={`mt-10 text-center transition-all duration-500 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-white/60 text-sm">
            Prefer email? Reach me directly at <a href="mailto:shayanfarshid48@gmail.com" className="text-purple-300 hover:text-purple-200 transition-colors">shayanfarshid48@gmail.com</a>
          </p>
        </div>
      </div>
      
      <MinimalNavbar />
      <Footer />
    </div>
  );
};

export default Contact;
