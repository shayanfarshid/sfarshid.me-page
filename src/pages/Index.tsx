
import { useEffect } from 'react';
import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  // Change page title and description
  useEffect(() => {
    document.title = "Shayan Farshid | Data Analytics & BizOps Professional";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Shayan Farshid - Data Analytics & BizOps Professional with experience in optimizing operations and driving growth through targeted market research and analytics.');
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Background />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
