
import { useEffect, useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import LoadingScreen from '@/components/LoadingScreen';
import MinimalNavbar from '@/components/MinimalNavbar';
import Hero from '@/components/Hero';
import BentoFeatures from '@/components/BentoFeatures';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Change page title and description
  useEffect(() => {
    document.title = "Shayan Farshid | Portfolio";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Shayan Farshid - Transforming raw data into actionable business insights through advanced analytics, data visualization, and machine learning.');
    }
    
    // Simulate page loading with smooth transition
    const loadTimer = setTimeout(() => {
      setIsTransitioning(true);
      
      // Add a small delay before fully removing the loading screen
      const transitionTimer = setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
      
      return () => clearTimeout(transitionTimer);
    }, 3500);
    
    return () => clearTimeout(loadTimer);
  }, []);

  return (
    <div className="min-h-screen bg-space">
      {/* Loading screen with transition */}
      {!isLoaded && (
        <LoadingScreen 
          isTransitioning={isTransitioning} 
        />
      )}
      
      {/* The starfield background - placed here for z-index control */}
      <AnimatedBackground />
      
      <MinimalNavbar />
      
      <main className="relative z-10 space-y-4">
        <Hero />
        <BentoFeatures />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
