
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutComponent from '@/components/About';

const AboutPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to homepage and scroll to About section
    navigate('/#about');
  }, [navigate]);
  
  return (
    <div className="min-h-screen">
      <Background />
      <Navbar />
      
      <main className="relative z-10 pt-24">
        <AboutComponent />
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
