
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
    <section id="connect" className="section-padding relative z-10">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gradient mb-2">Let's Connect</h2>
          </div>
          
          <div className="glass-morphism rounded-3xl p-8 bg-gradient-to-b from-purple-900/20 to-space">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="w-full px-4 py-3 bg-space border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400/50 glass-morphism"
                  />
                </div>
                
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full px-4 py-3 bg-space border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400/50 glass-morphism"
                  />
                </div>
                
                <div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-space border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400/50 glass-morphism"
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glass-morphism flex items-center justify-center hover:bg-purple-500/30 transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glass-morphism flex items-center justify-center hover:bg-purple-500/30 transition-colors"
                  >
                    <Github size={18} />
                  </a>
                </div>
                
                <button
                  type="submit"
                  disabled={submitting || submitted}
                  className={`px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                    submitted
                      ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                      : submitting
                      ? 'bg-purple-500/20 border border-purple-500/50 text-purple-300'
                      : 'glass-morphism border border-purple-500/30 text-purple-300 hover:bg-purple-500/30'
                  }`}
                >
                  {submitted ? (
                    <>
                      <span>Sent</span>
                    </>
                  ) : submitting ? (
                    <>
                      <span>Sending</span>
                      <span className="animate-spin">
                        <Send size={16} />
                      </span>
                    </>
                  ) : (
                    <>
                      <span>Send</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
