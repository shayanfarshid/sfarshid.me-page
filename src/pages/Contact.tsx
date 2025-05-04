
import { useEffect, useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import CustomCursor from '@/components/CustomCursor';
import { MessageSquare, ArrowLeft, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    // Change page title and description
    document.title = "Contact | Shayan Farshid";
    
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate sending a message
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setName('');
      setEmail('');
      setMessage('');
      
      // Reset the success message after a delay
      setTimeout(() => {
        setIsSent(false);
      }, 3000);
    }, 1500);
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
          className={`glass-morphism rounded-3xl p-8 transition-all duration-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-8">
            <p className="text-white/80">I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.</p>
          </div>
          
          {isSent ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={28} className="text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
              <p className="text-white/70">Thank you for reaching out. I'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="How can I help you?"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-purple-900 transition-all duration-300 flex items-center justify-center"
                >
                  {isSending ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
