
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="section-padding border-t border-white/10 mt-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col mb-6 md:mb-0">
            <p className="text-gradient font-mono text-lg">Shayan Farshid</p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com/shayanfarshid" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-space-text hover:text-purple-300 transition-colors social-icon"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com/in/sfarshid" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-space-text hover:text-purple-300 transition-colors social-icon"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:shayanfarshid48@gmail.com" 
              className="text-space-text hover:text-purple-300 transition-colors social-icon"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Shayan Farshid. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
