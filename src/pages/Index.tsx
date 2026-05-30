import TopographicBackground from '@/components/TopographicBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import TechCarousel from '@/components/TechCarousel';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import SEOHead from '@/components/SEOHead';

const Index = () => {
  return (
    <>
      <SEOHead
        title="Thanas R"
        description="Developer & creative problem-solver. Building thoughtful digital experiences with code."
        path="/"
      />
      <TopographicBackground />
      <div className="relative z-10 overflow-x-hidden">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <TechCarousel />
        <ProjectsSection />
        <ContactSection />
      </div>
    </>
  );
};

export default Index;
