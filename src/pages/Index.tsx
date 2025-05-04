
import { useEffect, useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import CustomCursor from '@/components/CustomCursor';
import LoadingScreen from '@/components/LoadingScreen';
import MinimalNavbar from '@/components/MinimalNavbar';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Testimonials from '@/components/Testimonials';
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
    <div className="min-h-screen">
      {!isLoaded && <LoadingScreen />}
      
      <AnimatedBackground />
      <CustomCursor />
      <MinimalNavbar />
      
      <main className="relative z-10 space-y-20">
        <Hero />
        
        <div className="container mx-auto px-4 max-w-6xl">
          <Projects />
          <Experience />
          <Testimonials />
          <Contact />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
