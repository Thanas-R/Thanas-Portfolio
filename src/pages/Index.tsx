import TopographicBackground from '@/components/TopographicBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TechCarousel from '@/components/TechCarousel';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <>
      <TopographicBackground />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <TechCarousel />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </>
  );
};

export default Index;
