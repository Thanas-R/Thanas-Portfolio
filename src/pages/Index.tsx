import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import TechCarousel from '@/components/TechCarousel';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TechCarousel />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
