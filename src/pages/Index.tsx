
import { useEffect, useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import CustomCursor from '@/components/CustomCursor';
import LoadingScreen from '@/components/LoadingScreen';
import MinimalNavbar from '@/components/MinimalNavbar';
import Hero from '@/components/Hero';
import BentoFeatures from '@/components/BentoFeatures';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Change page title and description
  useEffect(() => {
    document.title = "Shayan Farshid | Data Analytics & BizOps Professional";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Shayan Farshid - Data Analytics & BizOps Professional with experience in optimizing operations and driving growth through targeted market research and analytics.');
    }
    
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-space">
      {!isLoaded && <LoadingScreen />}
      
      <AnimatedBackground />
      <CustomCursor />
      <MinimalNavbar />
      
      <main className="relative z-10 space-y-12">
        <Hero />
        <BentoFeatures />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
