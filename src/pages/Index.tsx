import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import TechCarousel from '@/components/TechCarousel';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import TopographicBackground from '@/components/TopographicBackground';
import heroClouds from '@/assets/hero-clouds.png';

const Index = () => {
  return (
    <>
      {/* Hero area with cloud background */}
      <section className="relative min-h-screen overflow-hidden">
        <img
          src={heroClouds}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="relative z-10">
          <Navbar forceLightMode />
          <HeroSection />
        </div>
      </section>

      {/* Rest of the site with contour flow background */}
      <div className="relative">
        <TopographicBackground />
        <div className="relative z-10 overflow-x-hidden">
          <AboutSection />
          <TechCarousel />
          <ProjectsSection />
          <ContactSection />
        </div>
      </div>
    </>
  );
};

export default Index;
