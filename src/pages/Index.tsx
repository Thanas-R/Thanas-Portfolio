import TopographicBackground from '@/components/TopographicBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BentoSection from '@/components/BentoSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <>
      <TopographicBackground />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <BentoSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </>
  );
};

export default Index;
