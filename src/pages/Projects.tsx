
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectsComponent from '@/components/Projects';

const ProjectsPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to homepage and scroll to Projects section
    navigate('/#projects');
  }, [navigate]);
  
  return (
    <div className="min-h-screen">
      <Background />
      <Navbar />
      
      <main className="relative z-10 pt-24">
        <ProjectsComponent />
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectsPage;
