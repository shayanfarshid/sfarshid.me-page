
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExperienceComponent from '@/components/Experience';

const ExperiencePage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to homepage and scroll to Experience section
    navigate('/#experience');
  }, [navigate]);
  
  return (
    <div className="min-h-screen">
      <Background />
      <Navbar />
      
      <main className="relative z-10 pt-24">
        <ExperienceComponent />
      </main>
      
      <Footer />
    </div>
  );
};

export default ExperiencePage;
