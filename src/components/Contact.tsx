
import { useState } from 'react';
import { Send, Mail, Linkedin, Github } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setSubmitted(false);
      }, 4000);
    }, 1500);
  };
  
  return (
    <section id="contact" className="section-padding relative z-10">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">
              Let's Connect
            </h2>
            <p className="text-space-text/70 max-w-2xl mx-auto">
              Interested in working together? Drop me a message and I'll get back to you as soon as possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Contact Form */}
            <div className="lg:col-span-2 glass-morphism rounded-2xl p-8">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm text-space-text/70">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-space-light/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm text-space-text/70">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-space-light/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                    />
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <label htmlFor="message" className="block text-sm text-space-text/70">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-space-light/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={submitting || submitted}
                  className={`w-full md:w-auto px-8 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                    submitted
                      ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                      : submitting
                      ? 'bg-purple-500/20 border border-purple-500/50 text-purple-300'
                      : 'bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30'
                  }`}
                >
                  {submitted ? (
                    <>
                      <span>Message Sent!</span>
                    </>
                  ) : submitting ? (
                    <>
                      <span>Sending...</span>
                      <span className="animate-spin">
                        <Send size={16} />
                      </span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="glass-morphism rounded-2xl p-8 space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-gradient-purple">
                  Contact Information
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <Mail size={18} className="text-purple-400" />
                    <a href="mailto:contact@example.com" className="hover:text-purple-300">
                      contact@example.com
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-gradient-purple">
                  Connect with Me
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-space-light/30 flex items-center justify-center hover:bg-purple-500/30 transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-space-light/30 flex items-center justify-center hover:bg-purple-500/30 transition-colors"
                  >
                    <Github size={18} />
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-gradient-purple">
                  Response Time
                </h3>
                <p className="text-space-text/70">
                  I typically respond within 24-48 hours on business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-40 left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Contact;
