import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components - making all paths consistent
import ParticleAnimation from '../components/ParticleAnimation';
import Header from '../components/Header';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection'; // Fixed path
import UseCasesSection from '../components/sections/UseCasesSection';
import ResourcesSection from '../components/sections/ResourcesSection';
import CTASection from '../components/sections/CTASection';
import Footer from '../components/Footer';
import LoginModal from '../components/Login';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleNav = (path) => {
    if (path === 'login') {
      setShowLogin(true);
    } else {
      navigate(`/${path}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden">
      {/* Particle Animation Background */}
      <ParticleAnimation />
      
      {/* Header */}
      <Header handleNav={handleNav} />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection handleNav={handleNav} />

        {/* Features Section */}
        <FeaturesSection />

        {/* Use Cases */}
        <UseCasesSection />

        {/* Resources Section */}
        <ResourcesSection />

        {/* CTA Section */}
        <CTASection handleNav={handleNav} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Login Modal */}
      <LoginModal 
        showLogin={showLogin} 
        setShowLogin={setShowLogin} 
        handleNav={handleNav} 
      />
    </div>
  );
};

export default LandingPage;