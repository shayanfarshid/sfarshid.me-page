
import { useEffect, useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import LoadingScreen from '@/components/LoadingScreen';
import MinimalNavbar from '@/components/MinimalNavbar';
import Hero from '@/components/Hero';
import BentoFeatures from '@/components/BentoFeatures';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Change page title and description
  useEffect(() => {
    document.title = "Shayan Farshid | Portfolio";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Shayan Farshid - Transforming raw data into actionable business insights through advanced analytics, data visualization, and machine learning.');
    }
    
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3500);
    
    return () => clearTimeout(timer);
  }, []);

  // Add custom CSS for social icon hover effects
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes glow-pulse {
        0% { box-shadow: 0 0 5px rgba(111, 76, 255, 0.3); }
        50% { box-shadow: 0 0 15px rgba(111, 76, 255, 0.5); }
        100% { box-shadow: 0 0 5px rgba(111, 76, 255, 0.3); }
      }
      
      .social-icon {
        position: relative;
        z-index: 1;
      }
      
      .social-icon:hover {
        animation: glow-pulse 1.5s ease-in-out;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-space">
      {!isLoaded && <LoadingScreen />}
      
      <AnimatedBackground />
      <MinimalNavbar />
      
      <main className="relative z-10 space-y-8">
        <Hero />
        <BentoFeatures />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
