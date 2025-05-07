
import { useEffect, useState, useRef } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import LoadingScreen from '@/components/LoadingScreen';
import MinimalNavbar from '@/components/MinimalNavbar';
import Hero from '@/components/Hero';
import BentoFeatures from '@/components/BentoFeatures';
import Footer from '@/components/Footer';
import OpenToWorkIndicator from '@/components/OpenToWorkIndicator';

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
        console.log("Main content loaded, background should be visible");
      }, 1000);
      
      return () => clearTimeout(transitionTimer);
    }, 3500);
    
    return () => clearTimeout(loadTimer);
  }, []);
  
  return (
    <div className="min-h-screen relative">
      {/* AnimatedBackground with higher z-index but still behind content */}
      <AnimatedBackground />
      
      {!isLoaded && (
        <LoadingScreen isTransitioning={isTransitioning} />
      )}
      
      <OpenToWorkIndicator />
      
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
