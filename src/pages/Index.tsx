import TopographicBackground from '@/components/TopographicBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import TechCarousel from '@/components/TechCarousel';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import SEOHead from '@/components/SEOHead';
import HomeSideOrnament from '@/components/HomeSideOrnament';

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
        {/* Ornament rail spans hero -> tech (desktop only) */}
        <div className="relative">
          <HomeSideOrnament />
          <div className="relative z-10" id="hero">
            <HeroSection />
          </div>
          <AboutSection />
          <ExperienceSection />
          <div id="tech">
            <TechCarousel />
          </div>
        </div>
        <ProjectsSection />
        <ContactSection />
      </div>
    </>
  );
};

export default Index;
