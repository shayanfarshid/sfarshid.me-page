
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactComponent from '@/components/Contact';

const ContactPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to homepage and scroll to Contact section
    navigate('/#contact');
  }, [navigate]);
  
  return (
    <div className="min-h-screen">
      <Background />
      <Navbar />
      
      <main className="relative z-10 pt-24">
        <ContactComponent />
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
